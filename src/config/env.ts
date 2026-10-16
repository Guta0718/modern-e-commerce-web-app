const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("Missing NEXT_PUBLIC_API_URL. Copy .env.example to .env.local.");
}

export const env = {
  API_URL: apiUrl,
} as const;