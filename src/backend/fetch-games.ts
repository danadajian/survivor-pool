import type { EspnResponse } from "./mocks";
import { environmentVariables } from "./env";
import { fetchForbiddenTeamsForUser, fetchPickForUser } from "./db";
import type { fetchGamesAndPicksInput } from "./router";

export async function fetchGamesAndPicks({
  username,
}: typeof fetchGamesAndPicksInput.infer) {
  const games = await fetchGames();
  const pick = await fetchPickForUser({
    username,
    week: games.week.number,
    season: games.season.year,
  });
  const forbiddenTeams = await fetchForbiddenTeamsForUser({
    username,
    week: games.week.number,
    season: games.season.year,
  });
  return {
    games,
    pick,
    forbiddenTeams,
  };
}

export async function fetchGames(fetchMethod = fetch): Promise<EspnResponse> {
  const response = await fetchMethod(environmentVariables.GAMES_API_URL);
  return response.json();
}
