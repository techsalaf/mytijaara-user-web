export default async function fetchWithTimeoutRetry(
  url,
  options = {},
  timeoutMs = 8000,
  maxRetries = 2
) {
  let attempts = 0;
  while (attempts <= maxRetries) {
    attempts++;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeout);
      return response;
    } catch (err) {
      clearTimeout(timeout);
      if (attempts > maxRetries) {
        throw err;
      }
      await new Promise((res) => setTimeout(res, 400 * attempts));
    }
  }
}
