import type { EspnResponse } from "./mock-espn-response";

export async function fetchGames(fetchMethod = fetch): Promise<EspnResponse> {
  if (!process.env.GAMES_API_URL) {
    throw new Error("Missing GAMES_API_URL");
  }
  const response = await fetchMethod(process.env.GAMES_API_URL);
  return response.json();
}
