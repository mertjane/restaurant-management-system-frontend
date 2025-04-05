export const logPageView = (url: string) => {
  console.log(`[Analytics] Page viewed: ${url}`);
  // Example: window.gtag("config", "GA_TRACKING_ID", { page_path: url });
};

export const logEvent = (event: string, data?: Record<string, any>) => {
  console.log(`[Analytics] Event: ${event}`, data);
  // Example: window.gtag("event", event, data);
};
