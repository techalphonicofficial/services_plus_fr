import { z } from "zod";
import { fetchWithRetry } from "./http-client";
import { logger } from "../lib/logger";
import { env } from "../lib/env";
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});
const RegisterSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  mobile: z.string().min(10).max(15),
  company_name: z.string().optional(),
  password: z.string().min(6),
  password_confirmation: z.string().min(6)
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"]
});
class AuthAdapter {
  baseUrl;
  constructor() {
    this.baseUrl = env.BACKEND_API_URL;
  }
  async login(input) {
    try {
      const response = await fetchWithRetry(`${this.baseUrl}/user-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "ServicesPlusNextAuth/1.0"
        },
        body: new URLSearchParams({
          email: input.email,
          password: input.password
        }),
        retries: 1
      });
      const setCookie = response.headers.get("set-cookie");
      return {
        success: response.ok,
        status: response.status,
        sessionCookie: setCookie || null
      };
    } catch (err) {
      logger.error({
        message: "Backend auth adapter login error",
        error: err
      });
      return {
        success: false,
        error: "Unable to connect to authentication server. Please try again or contact support on WhatsApp."
      };
    }
  }
  async register(input) {
    try {
      const response = await fetchWithRetry(`${this.baseUrl}/user-register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "ServicesPlusNextAuth/1.0"
        },
        body: new URLSearchParams({
          first_name: input.first_name,
          last_name: input.last_name,
          email: input.email,
          mobile: input.mobile,
          company_name: input.company_name || "",
          password: input.password,
          password_confirmation: input.password_confirmation
        }),
        retries: 1
      });
      return {
        success: response.ok,
        status: response.status
      };
    } catch (err) {
      logger.error({
        message: "Backend auth adapter register error",
        error: err
      });
      return {
        success: false,
        error: "Registration service temporarily offline. Please contact us on WhatsApp (+91 88000 28794)."
      };
    }
  }
}
const authAdapter = new AuthAdapter();
export {
  AuthAdapter,
  LoginSchema,
  RegisterSchema,
  authAdapter
};
