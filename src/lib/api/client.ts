import type { HierarchyContent, Part } from "@/types/content";
import { appConfig } from "@/lib/config";
import { getCachedContent, storeCachedContent } from "@/lib/storage/content-cache";

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchJson<T>(path: string) {
  let response: Response;

  try {
    const headers = new Headers({
      Accept: "application/json",
    });

    if (appConfig.apiKey) {
      headers.set("x-api-key", appConfig.apiKey);
    }

    response = await fetch(`${appConfig.webBaseUrl}${path}`, { headers });
  } catch {
    throw new ApiError("Unable to reach the Summa Navigator service.", 0);
  }

  if (!response.ok) {
    throw new ApiError("The Summa Navigator service returned an error.", response.status);
  }

  return (await response.json()) as T;
}

export async function fetchParts() {
  return fetchJson<Part[]>("/api/content/all");
}

export async function fetchContentById(id: string) {
  try {
    const data = await fetchJson<HierarchyContent>(`/api/content/${id}`);
    await storeCachedContent(id, data);
    return data;
  } catch (error) {
    const cached = await getCachedContent(id);
    if (cached) {
      return cached;
    }

    throw error;
  }
}
