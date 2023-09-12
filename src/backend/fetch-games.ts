import type { EspnResponse } from "./mock-espn-response";
import { environmentVariables } from "./env";

export async function fetchGames(fetchMethod = fetch): Promise<EspnResponse> {
  const response = await fetchMethod(environmentVariables.GAMES_API_URL);
  return response.json();
}
