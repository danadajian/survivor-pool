import { updateResults } from "./update-results";
import { fetchCurrentGames } from "@/utils/fetch-current-games";
import { SPORTS } from "@/schema";

for (const sport of SPORTS) {
  const { events, currentGameDate, currentSeason } =
    await fetchCurrentGames(sport);
  console.log(`Updating ${sport} results...`);

  await updateResults(events, sport, currentGameDate, currentSeason);
}
