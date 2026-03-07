import axios from "axios";

// Instance is constructed at import time, before dotenv runs.
// Read env vars lazily in an interceptor so they're resolved at request time.
export const amethyst = axios.create({ timeout: 10_000 });

amethyst.interceptors.request.use((config) => {
  const url = process.env.AMETHYST_API_URL;
  if (!url) throw new Error("AMETHYST_API_URL is not set");
  config.baseURL = url;
  config.headers["x-api-key"] = process.env.AMETHYST_API_KEY ?? "";
  return config;
});
