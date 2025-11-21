import { updateResults } from "./update-results";
import { fetchCurrentGames } from "../../src/utils/fetch-current-games";

const { events, currentGameDate, currentSeason } = await fetchCurrentGames();

await updateResults(events, currentGameDate, currentSeason);
