import { env } from "@/config/env";
 
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}
 
type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  revalidate?: number | false; // Next.js cache control (seconds)
};
 
export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, revalidate = 60, headers, ...rest } = options;
 
  const res = await fetch(`${env.API_URL}${path}`, {
    ...rest,
    headers: { "Content-Type": "application/json", ...headers },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    next: { revalidate },
  });
 
  if (!res.ok) {
    throw new ApiError(res.status, `Request to ${path} failed (${res.status})`);
  }
 
  return res.json() as Promise<T>;
}
 