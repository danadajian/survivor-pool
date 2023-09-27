import { describe, expect, it, mock } from "bun:test";

import { mockEspnResponse } from "../../mocks";
import { fetchGames } from "./backend";

const mockFetch = mock(fetch).mockResolvedValue(
  new Response(JSON.stringify(mockEspnResponse)),
);

describe("test", () => {
  it("should parse api response", async () => {
    const result = await fetchGames(mockFetch);
    expect(result).toEqual(mockEspnResponse);
  });
});
