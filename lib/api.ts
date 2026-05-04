// lib/api.ts
export async function fetchFromLaravel<T>(endpoint: string, revalidate: number = 60): Promise<T> {
  const apiBaseUrl = process.env.LARAVEL_API_URL;

  if (!apiBaseUrl) {
    throw new Error("Missing LARAVEL_API_URL environment variable.");
  }

  const normalizedBaseUrl = apiBaseUrl.replace(/\/+$/, "");
  const normalizedEndpoint = endpoint.replace(/^\/+/, "");
  const url = `${normalizedBaseUrl}/${normalizedEndpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json", // ensure JSON request
    Accept: "application/json",          // optional but good practice
  };

  const res = await fetch(url, { headers, next: { revalidate } });

  if (!res.ok) {
    throw new Error(`Failed to fetch from Laravel API: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
