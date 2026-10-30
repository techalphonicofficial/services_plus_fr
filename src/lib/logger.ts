type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogPayload {
  message: string;
  requestId?: string;
  context?: Record<string, unknown>;
  error?: Error | unknown;
}

function formatLog(level: LogLevel, payload: LogPayload) {
  const timestamp = new Date().toISOString();
  // ASVS Level 2: scrub PII fields if present
  let safeContext = payload.context;
  if (safeContext) {
    const scrubbed: Record<string, unknown> = { ...safeContext };
    ['pan', 'aadhaar', 'password', 'mobile', 'token'].forEach(field => {
      if (field in scrubbed) {
        scrubbed[field] = '[REDACTED]';
      }
    });
    safeContext = scrubbed;
  }

  return JSON.stringify({
    timestamp,
    level,
    requestId: payload.requestId || 'system',
    message: payload.message,
    context: safeContext,
    error: payload.error instanceof Error ? { message: payload.error.message, stack: payload.error.stack } : payload.error,
  });
}

export const logger = {
  info: (payload: LogPayload) => console.log(formatLog('info', payload)),
  warn: (payload: LogPayload) => console.warn(formatLog('warn', payload)),
  error: (payload: LogPayload) => console.error(formatLog('error', payload)),
  debug: (payload: LogPayload) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(formatLog('debug', payload));
    }
  },
};
