import { logger } from '../lib/logger';

interface RequestOptions extends RequestInit {
  timeoutMs?: number;
  retries?: number;
  backoffMs?: number;
}

export async function fetchWithRetry(url: string, options: RequestOptions = {}): Promise<Response> {
  const { timeoutMs = 8000, retries = 2, backoffMs = 500, ...fetchOpts } = options;

  let attempt = 0;
  let lastError: Error | unknown;

  while (attempt <= retries) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...fetchOpts,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (response.ok || attempt === retries) {
        return response;
      }

      logger.warn({
        message: `HTTP request attempt ${attempt + 1} failed with status ${response.status}`,
        context: { url, status: response.status },
      });
    } catch (err: unknown) {
      clearTimeout(timeout);
      lastError = err;
      logger.warn({
        message: `HTTP request attempt ${attempt + 1} threw error`,
        context: { url },
        error: err,
      });
    }

    attempt++;
    if (attempt <= retries) {
      // Exponential backoff + jitter
      const jitter = Math.random() * 200;
      const delay = backoffMs * Math.pow(2, attempt - 1) + jitter;
      await new Promise(r => setTimeout(r, delay));
    }
  }

  throw lastError || new Error(`Failed to fetch ${url} after ${retries + 1} attempts`);
}
