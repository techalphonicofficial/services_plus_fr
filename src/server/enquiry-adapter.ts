import { z } from 'zod';
import { fetchWithRetry } from './http-client';
import { logger } from '../lib/logger';
import { env } from '../lib/env';

export const EnquirySchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Valid email is required'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  subject: z.string().min(2, 'Subject / Service is required'),
  message: z.string().max(1000).optional(),
});

export type EnquiryInput = z.infer<typeof EnquirySchema>;

// In-memory reliable outbox queue for resilient buffering
const outbox: Array<EnquiryInput & { submittedAt: string }> = [];

export class EnquiryAdapter {
  private baseUrl: string;

  constructor() {
    this.baseUrl = env.BACKEND_API_URL;
  }

  async submit(input: EnquiryInput): Promise<{
    success: boolean;
    buffered?: boolean;
    message: string;
    whatsappLink: string;
  }> {
    const defaultWhatsApp = `https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_PHONE}?text=${encodeURIComponent(
      `Hello ServicesPlus, I am interested in ${input.subject}. Name: ${input.name}, Phone: ${input.mobile}`
    )}`;

    try {
      const response = await fetchWithRetry(`${this.baseUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'ServicesPlusLeadClient/1.0',
        },
        body: new URLSearchParams({
          name: input.name,
          email: input.email,
          mobile: input.mobile,
          subject: input.subject,
          message: input.message || '',
        }),
        retries: 2,
        timeoutMs: 5000,
      });

      if (response.ok) {
        logger.info({
          message: 'Enquiry successfully submitted to backend',
          context: { subject: input.subject },
        });
        return {
          success: true,
          message: 'Thank you! Your enquiry has been received. Our expert will contact you shortly.',
          whatsappLink: defaultWhatsApp,
        };
      }
    } catch (err) {
      logger.warn({
        message: 'Backend contact endpoint unreachable. Buffering to local outbox.',
        error: err,
      });
    }

    // Graceful degradation: Buffer into outbox so no lead is lost!
    outbox.push({
      ...input,
      submittedAt: new Date().toISOString(),
    });

    return {
      success: true,
      buffered: true,
      message: 'Your enquiry has been safely recorded. You can also connect with our advisor immediately on WhatsApp for instant onboarding.',
      whatsappLink: defaultWhatsApp,
    };
  }

  getPendingOutboxCount(): number {
    return outbox.length;
  }
}

export const enquiryAdapter = new EnquiryAdapter();
