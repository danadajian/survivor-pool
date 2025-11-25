import { updateResults } from "./update-results";
import { fetchCurrentGames } from "../../src/utils/fetch-current-games";

const { events, currentGameDate, currentSeason } = await fetchCurrentGames("NFL");

await updateResults(events, currentGameDate, currentSeason);

const {
  events: nbaEvents,
  currentGameDate: nbaCurrentGameDate,
  currentSeason: nbaCurrentSeason
} = await fetchCurrentGames("NBA");

await updateResults(nbaEvents, nbaCurrentGameDate, nbaCurrentSeason);
