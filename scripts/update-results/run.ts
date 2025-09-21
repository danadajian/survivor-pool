import { updateResults } from "./update-results";
import { fetchCurrentGames } from "../../src/pages/pool/backend";

const { events, week, season } = await fetchCurrentGames();

await updateResults(events, week.number, season.year);

process.exit(0);
