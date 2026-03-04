// lib/api.ts
export async function fetchFromLaravel<T>(endpoint: string, revalidate: number = 60): Promise<T> {
  const url = `${process.env.LARAVEL_API_URL}/${endpoint}`;

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