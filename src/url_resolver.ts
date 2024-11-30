export async function resolveShortUrl(shortUrl: string): Promise<string> {
  const response = await fetch(shortUrl, {
    method: 'HEAD', // Use HEAD to get headers without downloading content
    redirect: 'manual', // Do not automatically follow redirects
  });
  console.log("URL resolved");
  // Get the `Location` header from the response (redirected URL)
  const fullUrl = response.headers.get('location');
  return fullUrl ?? shortUrl; // If no redirect, return the original URL
}