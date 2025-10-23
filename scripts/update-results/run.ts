import { updateResults } from "./update-results";
import { fetchCurrentGames } from "../../src/utils/fetch-current-games";

const { events, week, season } = await fetchCurrentGames();

await updateResults(events, week.number, season.year);
