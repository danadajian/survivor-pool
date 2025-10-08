export function gameHasStartedOrFinished(gameState?: string) {
  return gameState !== "pre";
}
