import { z } from "zod";
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("https://www.servicesplus.in"),
  NEXT_PUBLIC_SITE_NAME: z.string().default("Services Plus"),
  NEXT_PUBLIC_WHATSAPP_PHONE: z.string().default("918800028794"),
  NEXT_PUBLIC_SUPPORT_PHONE: z.string().default("+91-9899184918"),
  NEXT_PUBLIC_SALES_PHONE: z.string().default("+91-8800028794"),
  NEXT_PUBLIC_GTM_ID: z.string().default("GTM-KS8X8MJ5"),
  BACKEND_API_URL: z.string().url().default("https://www.servicesplus.in")
});
const parsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_WHATSAPP_PHONE: process.env.NEXT_PUBLIC_WHATSAPP_PHONE,
  NEXT_PUBLIC_SUPPORT_PHONE: process.env.NEXT_PUBLIC_SUPPORT_PHONE,
  NEXT_PUBLIC_SALES_PHONE: process.env.NEXT_PUBLIC_SALES_PHONE,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  BACKEND_API_URL: process.env.BACKEND_API_URL
});
if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.format());
  throw new Error("Environment validation failed");
}
const env = parsed.data;
export {
  env
};
