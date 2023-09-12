import { type } from "arktype";

export const makePickInput = type({
  username: "string",
  teamPicked: "string",
  week: "number",
  season: "number",
});
