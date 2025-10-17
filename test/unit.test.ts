import { describe, expect, test } from "bun:test";

import { mockEspnResponse } from "../playwright/mocks";
import { Events } from "../src/pages/pool/backend";
import { buildPickHeader } from "../src/utils/build-pick-header";

describe("unit tests", () => {
  test("pick is locked", () => {
    const result = buildPickHeader({
      events: mockEspnResponse.events as Events,
      userPickResult: "PENDING",
      teamUserPicked: "49ers",
      eliminated: false,
    });
    expect(result).toEqual("Your 49ers pick is locked. Good luck!");
  });

  test("you survived a week", () => {
    const result = buildPickHeader({
      events: mockEspnResponse.events as Events,
      userPickResult: "WON",
      teamUserPicked: "49ers",
      eliminated: false,
    });
    expect(result).toEqual("The 49ers won, and you're still alive!");
  });

  test("you were eliminated from the pool", () => {
    const result = buildPickHeader({
      events: mockEspnResponse.events as Events,
      userPickResult: "LOST",
      teamUserPicked: "49ers",
      eliminated: true,
    });
    expect(result).toEqual("Sorry, you have been eliminated from this pool.");
  });

  test("your team tied and you need to pick an underdog", () => {
    const result = buildPickHeader({
      events: mockEspnResponse.events as Events,
      userPickResult: "TIED",
      teamUserPicked: "49ers",
      eliminated: false,
    });
    expect(result).toEqual(
      "The 49ers tied their game! Pick one of the remaining underdogs if you can.",
    );
  });
});
