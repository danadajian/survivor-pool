import spacetime from "spacetime";

import { type Sport } from "./fetch-current-games";

export function formatWeekDisplay(
  week: number | undefined,
  sport: Sport | string | undefined,
): string {
  if (!week) return "";
  if (sport === "nfl" || !sport) {
    return `Week ${week}`;
  }

  // Assuming week is stored as YYYYMMDD (e.g. 20251120) for non-NFL sports
  const weekStr = week.toString();
  if (weekStr.length === 8) {
    const year = weekStr.substring(0, 4);
    const month = weekStr.substring(4, 6);
    const day = weekStr.substring(6, 8);
    // Format: Thursday, November 20th
    const s = spacetime(`${year}-${month}-${day}`);
    return s.format("{day-name}, {month} {date-ordinal}");
  }

  return `Week ${week}`;
}

