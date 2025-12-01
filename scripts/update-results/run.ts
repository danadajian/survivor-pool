import { updateResults } from "./update-results";
import { fetchCurrentGames } from "../../src/utils/fetch-current-games";
import { SPORTS } from "src/schema";

for (const sport of SPORTS) {
  const { events, currentGameDate, currentSeason } =
    await fetchCurrentGames(sport);
  console.log(`Updating ${sport} results...`);

  await updateResults(events, sport, currentGameDate, currentSeason);
}
