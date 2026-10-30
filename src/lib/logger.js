function formatLog(level, payload) {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  let safeContext = payload.context;
  if (safeContext) {
    const scrubbed = { ...safeContext };
    ["pan", "aadhaar", "password", "mobile", "token"].forEach((field) => {
      if (field in scrubbed) {
        scrubbed[field] = "[REDACTED]";
      }
    });
    safeContext = scrubbed;
  }
  return JSON.stringify({
    timestamp,
    level,
    requestId: payload.requestId || "system",
    message: payload.message,
    context: safeContext,
    error: payload.error instanceof Error ? { message: payload.error.message, stack: payload.error.stack } : payload.error
  });
}
const logger = {
  info: (payload) => console.log(formatLog("info", payload)),
  warn: (payload) => console.warn(formatLog("warn", payload)),
  error: (payload) => console.error(formatLog("error", payload)),
  debug: (payload) => {
    if (process.env.NODE_ENV !== "production") {
      console.debug(formatLog("debug", payload));
    }
  }
};
export {
  logger
};
