/**
 * A custom fetch wrapper that implements exponential backoff for 429 errors.
 * @param url The API endpoint to fetch
 * @param options Fetch options (headers, method, etc.)
 * @param retries Maximum number of retry attempts
 * @param backoff Base delay in milliseconds
 */
export const fetchWithRetry = async (
  url: string,
  options: RequestInit = {},
  retries: number = 3,
  backoff: number = 300
): Promise<Response> => {
  for (let i = 0; i < retries; i++) {
    const response = await fetch(url, options);

    // If the response is successful, return immediately
    if (response.ok) {
      return response;
    }

    // If we hit a rate limit (429), calculate the wait time and retry
    if (response.status === 429) {
      // Respect the 'Retry-After' header if the API provides one
      const retryAfter = response.headers.get('Retry-After');
      const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : backoff * Math.pow(2, i);

      console.warn(`⚠️ API Throttled (429). Retrying attempt ${i + 1} in ${waitTime}ms...`);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      continue; // Move to the next loop iteration to retry
    }

    // If it's a different error (404, 500), return it so the main app can handle it
    return response;
  }

  throw new Error('Max retries reached. The server is currently too busy.');
};