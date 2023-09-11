import { type EspnResponse, mockEspnResponse } from "./mock-espn-response";

export async function fetchGames(fetchMethod = fetch): Promise<EspnResponse> {
  if (!process.env.GAMES_API_URL) {
    return mockEspnResponse;
  }
  const response = await fetchMethod(process.env.GAMES_API_URL);
  return response.json();
}
