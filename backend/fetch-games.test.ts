import { beforeEach, describe, expect, it, mock } from "bun:test";
import { fetchGames } from "./fetch-games";
import { mockEspnResponse } from "./mock-espn-response";

const mockFetch = mock(fetch).mockResolvedValue(
  new Response(JSON.stringify(mockEspnResponse)),
);

describe("test", () => {
  beforeEach(() => {
    process.env.GAMES_API_URL = "https://some-api-url";
  });

  it("should parse api response", async () => {
    const result = await fetchGames(mockFetch);
    expect(result).toEqual(mockEspnResponse);
  });
});