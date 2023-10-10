import spacetime, { type ParsableDate } from "spacetime";

export function gameHasStartedOrFinished(gameTime?: ParsableDate) {
  return (
    Boolean(gameTime) &&
    spacetime(Date.now()).toNativeDate() >
      spacetime(gameTime).goto(null).toNativeDate()
  );
}
