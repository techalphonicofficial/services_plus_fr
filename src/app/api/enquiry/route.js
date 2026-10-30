import { NextResponse } from "next/server";
import { EnquirySchema, enquiryAdapter } from "../../../server/enquiry-adapter";
import { checkRateLimit } from "../../../lib/security";
export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    if (!checkRateLimit(`enquiry-${ip}`, 5, 0.5)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again shortly or contact WhatsApp support." },
        { status: 429 }
      );
    }
    const body = await req.json();
    const parsed = EnquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.format() },
        { status: 400 }
      );
    }
    const result = await enquiryAdapter.submit(parsed.data);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal Server Error", message },
      { status: 500 }
    );
  }
}
