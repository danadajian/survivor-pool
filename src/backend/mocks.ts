import type { TRPCResponse } from "@trpc/server/rpc";

import type { RouterOutput } from "../frontend/trpc";

export const mockPick: RouterOutput["pick"]["userPick"] = {
  id: "123",
  username: "test@user.com",
  teamPicked: "Chiefs",
  week: 1,
  season: 2023,
  poolId: "12345",
  timestamp: "123",
};

export type EspnResponse = typeof mockEspnResponse;
export const mockEspnResponse = {
  leagues: [
    {
      id: "28",
      uid: "s:20~l:28",
      name: "National Football League",
      abbreviation: "NFL",
      slug: "nfl",
      season: {
        year: 2023,
        startDate: "2023-08-01T07:00Z",
        endDate: "2024-02-15T07:59Z",
        displayName: "2023",
        type: {
          id: "2",
          type: 2,
          name: "Regular Season",
          abbreviation: "reg",
        },
      },
      logos: [
        {
          href: "https://a.espncdn.com/i/teamlogos/leagues/500/nfl.png",
          width: 500,
          height: 500,
          alt: "",
          rel: ["full", "default"],
          lastUpdated: "2018-06-05T12:07Z",
        },
      ],
      calendarType: "list",
      calendarIsWhitelist: true,
      calendarStartDate: "2023-08-01T07:00Z",
      calendarEndDate: "2024-02-15T07:59Z",
      calendar: [
        {
          label: "Preseason",
          value: "1",
          startDate: "2023-08-01T07:00Z",
          endDate: "2023-09-07T06:59Z",
          entries: [
            {
              label: "Hall of Fame Weekend",
              alternateLabel: "HOF",
              detail: "Aug 1-8",
              value: "1",
              startDate: "2023-08-01T07:00Z",
              endDate: "2023-08-09T06:59Z",
            },
            {
              label: "Preseason Week 1",
              alternateLabel: "Pre Wk 1",
              detail: "Aug 9-15",
              value: "2",
              startDate: "2023-08-09T07:00Z",
              endDate: "2023-08-16T06:59Z",
            },
            {
              label: "Preseason Week 2",
              alternateLabel: "Pre Wk 2",
              detail: "Aug 16-22",
              value: "3",
              startDate: "2023-08-16T07:00Z",
              endDate: "2023-08-23T06:59Z",
            },
            {
              label: "Preseason Week 3",
              alternateLabel: "Pre Wk 3",
              detail: "Aug 23-Sep 6",
              value: "4",
              startDate: "2023-08-23T07:00Z",
              endDate: "2023-09-07T06:59Z",
            },
          ],
        },
        {
          label: "Regular Season",
          value: "2",
          startDate: "2023-09-07T07:00Z",
          endDate: "2024-01-13T07:59Z",
          entries: [
            {
              label: "Week 1",
              alternateLabel: "Week 1",
              detail: "Sep 7-12",
              value: "1",
              startDate: "2023-09-07T07:00Z",
              endDate: "2023-09-13T06:59Z",
            },
            {
              label: "Week 2",
              alternateLabel: "Week 2",
              detail: "Sep 13-19",
              value: "2",
              startDate: "2023-09-13T07:00Z",
              endDate: "2023-09-20T06:59Z",
            },
            {
              label: "Week 3",
              alternateLabel: "Week 3",
              detail: "Sep 20-26",
              value: "3",
              startDate: "2023-09-20T07:00Z",
              endDate: "2023-09-27T06:59Z",
            },
            {
              label: "Week 4",
              alternateLabel: "Week 4",
              detail: "Sep 27-Oct 3",
              value: "4",
              startDate: "2023-09-27T07:00Z",
              endDate: "2023-10-04T06:59Z",
            },
            {
              label: "Week 5",
              alternateLabel: "Week 5",
              detail: "Oct 4-10",
              value: "5",
              startDate: "2023-10-04T07:00Z",
              endDate: "2023-10-11T06:59Z",
            },
            {
              label: "Week 6",
              alternateLabel: "Week 6",
              detail: "Oct 11-17",
              value: "6",
              startDate: "2023-10-11T07:00Z",
              endDate: "2023-10-18T06:59Z",
            },
            {
              label: "Week 7",
              alternateLabel: "Week 7",
              detail: "Oct 18-24",
              value: "7",
              startDate: "2023-10-18T07:00Z",
              endDate: "2023-10-25T06:59Z",
            },
            {
              label: "Week 8",
              alternateLabel: "Week 8",
              detail: "Oct 25-31",
              value: "8",
              startDate: "2023-10-25T07:00Z",
              endDate: "2023-11-01T06:59Z",
            },
            {
              label: "Week 9",
              alternateLabel: "Week 9",
              detail: "Nov 1-7",
              value: "9",
              startDate: "2023-11-01T07:00Z",
              endDate: "2023-11-08T07:59Z",
            },
            {
              label: "Week 10",
              alternateLabel: "Week 10",
              detail: "Nov 8-14",
              value: "10",
              startDate: "2023-11-08T08:00Z",
              endDate: "2023-11-15T07:59Z",
            },
            {
              label: "Week 11",
              alternateLabel: "Week 11",
              detail: "Nov 15-21",
              value: "11",
              startDate: "2023-11-15T08:00Z",
              endDate: "2023-11-22T07:59Z",
            },
            {
              label: "Week 12",
              alternateLabel: "Week 12",
              detail: "Nov 22-28",
              value: "12",
              startDate: "2023-11-22T08:00Z",
              endDate: "2023-11-29T07:59Z",
            },
            {
              label: "Week 13",
              alternateLabel: "Week 13",
              detail: "Nov 29-Dec 5",
              value: "13",
              startDate: "2023-11-29T08:00Z",
              endDate: "2023-12-06T07:59Z",
            },
            {
              label: "Week 14",
              alternateLabel: "Week 14",
              detail: "Dec 6-12",
              value: "14",
              startDate: "2023-12-06T08:00Z",
              endDate: "2023-12-13T07:59Z",
            },
            {
              label: "Week 15",
              alternateLabel: "Week 15",
              detail: "Dec 13-19",
              value: "15",
              startDate: "2023-12-13T08:00Z",
              endDate: "2023-12-20T07:59Z",
            },
            {
              label: "Week 16",
              alternateLabel: "Week 16",
              detail: "Dec 20-26",
              value: "16",
              startDate: "2023-12-20T08:00Z",
              endDate: "2023-12-27T07:59Z",
            },
            {
              label: "Week 17",
              alternateLabel: "Week 17",
              detail: "Dec 27-Jan 2",
              value: "17",
              startDate: "2023-12-27T08:00Z",
              endDate: "2024-01-03T07:59Z",
            },
            {
              label: "Week 18",
              alternateLabel: "Week 18",
              detail: "Jan 3-12",
              value: "18",
              startDate: "2024-01-03T08:00Z",
              endDate: "2024-01-13T07:59Z",
            },
          ],
        },
        {
          label: "Postseason",
          value: "3",
          startDate: "2024-01-13T08:00Z",
          endDate: "2024-02-15T07:59Z",
          entries: [
            {
              label: "Wild Card",
              alternateLabel: "Wild Card",
              detail: "Jan 13-16",
              value: "1",
              startDate: "2024-01-13T08:00Z",
              endDate: "2024-01-17T07:59Z",
            },
            {
              label: "Divisional Round",
              alternateLabel: "Div Rd",
              detail: "Jan 17-23",
              value: "2",
              startDate: "2024-01-17T08:00Z",
              endDate: "2024-01-24T07:59Z",
            },
            {
              label: "Conference Championship",
              alternateLabel: "Conf Champ",
              detail: "Jan 24-30",
              value: "3",
              startDate: "2024-01-24T08:00Z",
              endDate: "2024-01-31T07:59Z",
            },
            {
              label: "Pro Bowl",
              alternateLabel: "Pro Bowl",
              detail: "Jan 31-Feb 6",
              value: "4",
              startDate: "2024-01-31T08:00Z",
              endDate: "2024-02-07T07:59Z",
            },
            {
              label: "Super Bowl",
              alternateLabel: "Super Bowl",
              detail: "Feb 7-14",
              value: "5",
              startDate: "2024-02-07T08:00Z",
              endDate: "2024-02-15T07:59Z",
            },
          ],
        },
        {
          label: "Off Season",
          value: "4",
          startDate: "2024-02-15T08:00Z",
          endDate: "2024-08-01T06:59Z",
          entries: [
            {
              label: "Week 1",
              alternateLabel: "Week 1",
              detail: "Mar 7-Jul 31",
              value: "1",
              startDate: "2024-03-07T08:00Z",
              endDate: "2024-08-01T06:59Z",
            },
          ],
        },
      ],
    },
  ],
  season: {
    type: 2,
    year: 2023,
  },
  week: {
    number: 1,
  },
  events: [
    {
      id: "401547352",
      uid: "s:20~l:28~e:401547352",
      date: "2023-09-12T00:15Z",
      name: "Buffalo Bills at New York Jets",
      shortName: "BUF @ NYJ",
      season: {
        year: 2023,
        type: 2,
        slug: "regular-season",
      },
      week: {
        number: 1,
      },
      competitions: [
        {
          id: "401547352",
          uid: "s:20~l:28~e:401547352~c:401547352",
          date: "2023-09-12T00:15Z",
          attendance: 0,
          type: {
            id: "1",
            abbreviation: "STD",
          },
          timeValid: true,
          neutralSite: false,
          conferenceCompetition: false,
          playByPlayAvailable: false,
          recent: false,
          venue: {
            id: "3839",
            fullName: "MetLife Stadium",
            address: {
              city: "East Rutherford",
              state: "NJ",
            },
            capacity: 82500,
            indoor: false,
          },
          competitors: [
            {
              id: "20",
              uid: "s:20~l:28~t:20",
              type: "team",
              order: 0,
              homeAway: "home",
              team: {
                id: "20",
                uid: "s:20~l:28~t:20",
                location: "New York",
                name: "Jets",
                abbreviation: "NYJ",
                displayName: "New York Jets",
                shortDisplayName: "Jets",
                color: "115740",
                alternateColor: "ffffff",
                isActive: true,
                venue: {
                  id: "3839",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/nyj/new-york-jets",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/nyj/new-york-jets",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/nyj/new-york-jets",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/nyj",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/nyj",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/new-york-jets-tickets--sports-nfl-football/performer/601?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/nyj/new-york-jets",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/nyj",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/nyj",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/nyj",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/nyj.png",
              },
              score: "0",
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Any",
                  type: "total",
                  summary: "0-0",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-0",
                },
              ],
            },
            {
              id: "2",
              uid: "s:20~l:28~t:2",
              type: "team",
              order: 1,
              homeAway: "away",
              team: {
                id: "2",
                uid: "s:20~l:28~t:2",
                location: "Buffalo",
                name: "Bills",
                abbreviation: "BUF",
                displayName: "Buffalo Bills",
                shortDisplayName: "Bills",
                color: "00338d",
                alternateColor: "d50a0a",
                isActive: true,
                venue: {
                  id: "3883",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/buf/buffalo-bills",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/buf/buffalo-bills",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/buf/buffalo-bills",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/buf",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/buf",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/buffalo-bills-tickets--sports-nfl-football/performer/128?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/buf/buffalo-bills",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/buf",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/buf",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/buf",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/buf.png",
              },
              score: "0",
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Any",
                  type: "total",
                  summary: "0-0",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-0",
                },
              ],
            },
          ],
          notes: [],
          status: {
            clock: 0,
            displayClock: "0:00",
            period: 0,
            type: {
              id: "1",
              name: "STATUS_SCHEDULED",
              state: "pre",
              completed: false,
              description: "Scheduled",
              detail: "Mon, September 11th at 8:15 PM EDT",
              shortDetail: "9/11 - 8:15 PM EDT",
            },
          },
          broadcasts: [
            {
              market: "national",
              names: ["ESPN", "ABC", "ESPN+"],
            },
          ],
          format: {
            regulation: {
              periods: 4,
            },
          },
          tickets: [
            {
              summary: "Tickets as low as $137",
              numberAvailable: 2673,
              links: [
                {
                  href: "https://www.vividseats.com/new-york-jets-tickets-metlife-stadium-3-11-2024--sports-nfl-football/production/4311892?wsUser=717",
                },
                {
                  href: "https://www.vividseats.com/metlife-stadium-tickets/venue/8136?wsUser=717",
                },
              ],
            },
          ],
          startDate: "2023-09-12T00:15Z",
          geoBroadcasts: [
            {
              type: {
                id: "1",
                shortName: "TV",
              },
              market: {
                id: "1",
                type: "National",
              },
              media: {
                shortName: "ESPN",
              },
              lang: "en",
              region: "us",
            },
            {
              type: {
                id: "1",
                shortName: "TV",
              },
              market: {
                id: "1",
                type: "National",
              },
              media: {
                shortName: "ABC",
              },
              lang: "en",
              region: "us",
            },
            {
              type: {
                id: "4",
                shortName: "Web",
              },
              market: {
                id: "1",
                type: "National",
              },
              media: {
                shortName: "ESPN+",
              },
              lang: "en",
              region: "us",
            },
          ],
          odds: [
            {
              provider: {
                id: "45",
                name: "Caesars Sportsbook (New Jersey)",
                priority: 1,
              },
              details: "BUF -2.0",
              overUnder: 45,
            },
          ],
        },
      ],
      links: [
        {
          language: "en-US",
          rel: ["summary", "desktop", "event"],
          href: "https://www.espn.com/nfl/game/_/gameId/401547352",
          text: "Gamecast",
          shortText: "Gamecast",
          isExternal: false,
          isPremium: false,
        },
      ],
      weather: {
        displayValue: "Clear",
        temperature: 76,
        highTemperature: 76,
        conditionId: "33",
        link: {
          language: "en-US",
          rel: ["07073"],
          href: "http://www.accuweather.com/en/us/metlife-stadium-nj/07073/hourly-weather-forecast/52866_poi?day=11&hbhhour=20&lang=en-us",
          text: "Weather",
          shortText: "Weather",
          isExternal: true,
          isPremium: false,
        },
      },
      status: {
        clock: 0,
        displayClock: "0:00",
        period: 0,
        type: {
          id: "1",
          name: "STATUS_SCHEDULED",
          state: "pre",
          completed: false,
          description: "Scheduled",
          detail: "Mon, September 11th at 8:15 PM EDT",
          shortDetail: "9/11 - 8:15 PM EDT",
        },
      },
    },
    {
      id: "401547353",
      uid: "s:20~l:28~e:401547353",
      date: "2023-09-08T00:20Z",
      name: "Detroit Lions at Kansas City Chiefs",
      shortName: "DET @ KC",
      season: {
        year: 2023,
        type: 2,
        slug: "regular-season",
      },
      week: {
        number: 1,
      },
      competitions: [
        {
          id: "401547353",
          uid: "s:20~l:28~e:401547353~c:401547353",
          date: "2023-09-08T00:20Z",
          attendance: 73522,
          type: {
            id: "1",
            abbreviation: "STD",
          },
          timeValid: true,
          neutralSite: false,
          conferenceCompetition: false,
          playByPlayAvailable: true,
          recent: false,
          venue: {
            id: "3622",
            fullName: "GEHA Field at Arrowhead Stadium",
            address: {
              city: "Kansas City",
              state: "MO",
            },
            capacity: 73426,
            indoor: false,
          },
          competitors: [
            {
              id: "12",
              uid: "s:20~l:28~t:12",
              type: "team",
              order: 0,
              homeAway: "home",
              winner: false,
              team: {
                id: "12",
                uid: "s:20~l:28~t:12",
                location: "Kansas City",
                name: "Chiefs",
                abbreviation: "KC",
                displayName: "Kansas City Chiefs",
                shortDisplayName: "Chiefs",
                color: "e31837",
                alternateColor: "ffb612",
                isActive: true,
                venue: {
                  id: "3622",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/kc/kansas-city-chiefs",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/kc/kansas-city-chiefs",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/kc/kansas-city-chiefs",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/kc",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/kc",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/kansas-city-chiefs-tickets--sports-nfl-football/performer/427?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/kc/kansas-city-chiefs",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/kc",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/kc",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/kc",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/kc.png",
              },
              score: "20",
              linescores: [
                {
                  value: 0,
                },
                {
                  value: 14,
                },
                {
                  value: 3,
                },
                {
                  value: 3,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "0-1",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-1",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-0",
                },
              ],
            },
            {
              id: "8",
              uid: "s:20~l:28~t:8",
              type: "team",
              order: 1,
              homeAway: "away",
              winner: true,
              team: {
                id: "8",
                uid: "s:20~l:28~t:8",
                location: "Detroit",
                name: "Lions",
                abbreviation: "DET",
                displayName: "Detroit Lions",
                shortDisplayName: "Lions",
                color: "0076b6",
                alternateColor: "bbbbbb",
                isActive: true,
                venue: {
                  id: "3727",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/det/detroit-lions",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/det/detroit-lions",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/det/detroit-lions",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/det",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/det",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/detroit-lions-tickets--sports-nfl-football/performer/238?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/det/detroit-lions",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/det",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/det",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/det",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/det.png",
              },
              score: "21",
              linescores: [
                {
                  value: 7,
                },
                {
                  value: 0,
                },
                {
                  value: 7,
                },
                {
                  value: 7,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "1-0",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "1-0",
                },
              ],
            },
          ],
          notes: [],
          status: {
            clock: 0,
            displayClock: "0:00",
            period: 4,
            type: {
              id: "3",
              name: "STATUS_FINAL",
              state: "post",
              completed: true,
              description: "Final",
              detail: "Final",
              shortDetail: "Final",
            },
          },
          broadcasts: [
            {
              market: "national",
              names: ["NBC"],
            },
          ],
          leaders: [
            {
              name: "passingYards",
              displayName: "Passing Leader",
              shortDisplayName: "PASS",
              abbreviation: "PYDS",
              leaders: [
                {
                  displayValue: "253 YDS, 1 TD",
                  value: 253,
                  athlete: {
                    id: "3046779",
                    fullName: "Jared Goff",
                    displayName: "Jared Goff",
                    shortName: "J. Goff",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3046779/jared-goff",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/3046779/jared-goff",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/3046779/jared-goff",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/3046779/jared-goff",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/3046779/jared-goff",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/3046779/jared-goff",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3046779/jared-goff",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/3046779.png",
                    jersey: "16",
                    position: {
                      abbreviation: "QB",
                    },
                    team: {
                      id: "8",
                    },
                    active: true,
                  },
                  team: {
                    id: "8",
                  },
                },
              ],
            },
            {
              name: "rushingYards",
              displayName: "Rushing Leader",
              shortDisplayName: "RUSH",
              abbreviation: "RYDS",
              leaders: [
                {
                  displayValue: "21 CAR, 74 YDS, 1 TD",
                  value: 74,
                  athlete: {
                    id: "4035538",
                    fullName: "David Montgomery",
                    displayName: "David Montgomery",
                    shortName: "D. Montgomery",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4035538/david-montgomery",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4035538/david-montgomery",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4035538/david-montgomery",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4035538/david-montgomery",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4035538/david-montgomery",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4035538/david-montgomery",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4035538/david-montgomery",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4035538.png",
                    jersey: "5",
                    position: {
                      abbreviation: "RB",
                    },
                    team: {
                      id: "8",
                    },
                    active: true,
                  },
                  team: {
                    id: "8",
                  },
                },
              ],
            },
            {
              name: "receivingYards",
              displayName: "Receiving Leader",
              shortDisplayName: "REC",
              abbreviation: "RECYDS",
              leaders: [
                {
                  displayValue: "4 REC, 80 YDS",
                  value: 80,
                  athlete: {
                    id: "3115306",
                    fullName: "Josh Reynolds",
                    displayName: "Josh Reynolds",
                    shortName: "J. Reynolds",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3115306/josh-reynolds",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/3115306/josh-reynolds",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/3115306/josh-reynolds",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/3115306/josh-reynolds",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/3115306/josh-reynolds",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/3115306/josh-reynolds",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3115306/josh-reynolds",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/3115306.png",
                    jersey: "8",
                    position: {
                      abbreviation: "WR",
                    },
                    team: {
                      id: "8",
                    },
                    active: true,
                  },
                  team: {
                    id: "8",
                  },
                },
              ],
            },
          ],
          format: {
            regulation: {
              periods: 4,
            },
          },
          startDate: "2023-09-08T00:20Z",
          geoBroadcasts: [
            {
              type: {
                id: "1",
                shortName: "TV",
              },
              market: {
                id: "1",
                type: "National",
              },
              media: {
                shortName: "NBC",
              },
              lang: "en",
              region: "us",
            },
          ],
          headlines: [
            {
              description:
                "— The Lions walked into roaring Arrowhead Stadium on Thursday night, where the Kansas City Chiefs are nearly unbeatable and were trying to open their latest Super Bowl title defense with a win, and proved what Detroit coach Dan Campbell has come to...",
              type: "Recap",
              shortLinkText:
                "Lions spoil Chiefs' celebration of Super Bowl title by rallying for a 21-20 win in the NFL's opener",
            },
          ],
        },
      ],
      links: [
        {
          language: "en-US",
          rel: ["summary", "desktop", "event"],
          href: "https://www.espn.com/nfl/game/_/gameId/401547353",
          text: "Gamecast",
          shortText: "Gamecast",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["boxscore", "desktop", "event"],
          href: "https://www.espn.com/nfl/boxscore/_/gameId/401547353",
          text: "Box Score",
          shortText: "Box Score",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["highlights", "desktop"],
          href: "https://www.espn.com/nfl/video?gameId=401547353",
          text: "Highlights",
          shortText: "Highlights",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["pbp", "desktop", "event"],
          href: "https://www.espn.com/nfl/playbyplay/_/gameId/401547353",
          text: "Play-by-Play",
          shortText: "Play-by-Play",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["recap", "desktop", "event"],
          href: "https://www.espn.com/nfl/recap?gameId=401547353",
          text: "Recap",
          shortText: "Recap",
          isExternal: false,
          isPremium: false,
        },
      ],
      status: {
        clock: 0,
        displayClock: "0:00",
        period: 4,
        type: {
          id: "3",
          name: "STATUS_FINAL",
          state: "post",
          completed: true,
          description: "Final",
          detail: "Final",
          shortDetail: "Final",
        },
      },
    },
    {
      id: "401547403",
      uid: "s:20~l:28~e:401547403",
      date: "2023-09-10T17:00Z",
      name: "Carolina Panthers at Atlanta Falcons",
      shortName: "CAR @ ATL",
      season: {
        year: 2023,
        type: 2,
        slug: "regular-season",
      },
      week: {
        number: 1,
      },
      competitions: [
        {
          id: "401547403",
          uid: "s:20~l:28~e:401547403~c:401547403",
          date: "2023-09-10T17:00Z",
          attendance: 69597,
          type: {
            id: "1",
            abbreviation: "STD",
          },
          timeValid: true,
          neutralSite: false,
          conferenceCompetition: false,
          playByPlayAvailable: true,
          recent: false,
          venue: {
            id: "5348",
            fullName: "Mercedes-Benz Stadium",
            address: {
              city: "Atlanta",
              state: "GA",
            },
            capacity: 75000,
            indoor: true,
          },
          competitors: [
            {
              id: "1",
              uid: "s:20~l:28~t:1",
              type: "team",
              order: 0,
              homeAway: "home",
              winner: true,
              team: {
                id: "1",
                uid: "s:20~l:28~t:1",
                location: "Atlanta",
                name: "Falcons",
                abbreviation: "ATL",
                displayName: "Atlanta Falcons",
                shortDisplayName: "Falcons",
                color: "a71930",
                alternateColor: "000000",
                isActive: true,
                venue: {
                  id: "5348",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/atl/atlanta-falcons",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/atl/atlanta-falcons",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/atl/atlanta-falcons",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/atl",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/atl",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/atlanta-falcons-tickets--sports-nfl-football/performer/51?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/atl/atlanta-falcons",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/atl",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/atl",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/atl",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/atl.png",
              },
              score: "24",
              linescores: [
                {
                  value: 0,
                },
                {
                  value: 7,
                },
                {
                  value: 3,
                },
                {
                  value: 14,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "1-0",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "1-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-0",
                },
              ],
            },
            {
              id: "29",
              uid: "s:20~l:28~t:29",
              type: "team",
              order: 1,
              homeAway: "away",
              winner: false,
              team: {
                id: "29",
                uid: "s:20~l:28~t:29",
                location: "Carolina",
                name: "Panthers",
                abbreviation: "CAR",
                displayName: "Carolina Panthers",
                shortDisplayName: "Panthers",
                color: "0085ca",
                alternateColor: "000000",
                isActive: true,
                venue: {
                  id: "3628",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/car/carolina-panthers",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/car/carolina-panthers",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/car/carolina-panthers",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/car",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/car",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/carolina-panthers-tickets--sports-nfl-football/performer/144?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/car/carolina-panthers",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/car",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/car",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/car",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/car.png",
              },
              score: "10",
              linescores: [
                {
                  value: 0,
                },
                {
                  value: 7,
                },
                {
                  value: 3,
                },
                {
                  value: 0,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "0-1",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-1",
                },
              ],
            },
          ],
          notes: [],
          status: {
            clock: 0,
            displayClock: "0:00",
            period: 4,
            type: {
              id: "3",
              name: "STATUS_FINAL",
              state: "post",
              completed: true,
              description: "Final",
              detail: "Final",
              shortDetail: "Final",
            },
          },
          broadcasts: [
            {
              market: "national",
              names: ["FOX"],
            },
          ],
          leaders: [
            {
              name: "passingYards",
              displayName: "Passing Leader",
              shortDisplayName: "PASS",
              abbreviation: "PYDS",
              leaders: [
                {
                  displayValue: "146 YDS, 1 TD, 2 INT",
                  value: 146,
                  athlete: {
                    id: "4685720",
                    fullName: "Bryce Young",
                    displayName: "Bryce Young",
                    shortName: "B. Young",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4685720/bryce-young",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4685720/bryce-young",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4685720/bryce-young",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4685720/bryce-young",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4685720/bryce-young",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4685720/bryce-young",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4685720/bryce-young",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4685720.png",
                    jersey: "9",
                    position: {
                      abbreviation: "QB",
                    },
                    team: {
                      id: "29",
                    },
                    active: true,
                  },
                  team: {
                    id: "29",
                  },
                },
              ],
            },
            {
              name: "rushingYards",
              displayName: "Rushing Leader",
              shortDisplayName: "RUSH",
              abbreviation: "RYDS",
              leaders: [
                {
                  displayValue: "15 CAR, 75 YDS, 2 TD",
                  value: 75,
                  athlete: {
                    id: "4373626",
                    fullName: "Tyler Allgeier",
                    displayName: "Tyler Allgeier",
                    shortName: "T. Allgeier",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4373626/tyler-allgeier",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4373626/tyler-allgeier",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4373626/tyler-allgeier",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4373626/tyler-allgeier",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4373626/tyler-allgeier",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4373626/tyler-allgeier",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4373626/tyler-allgeier",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4373626.png",
                    jersey: "25",
                    position: {
                      abbreviation: "RB",
                    },
                    team: {
                      id: "1",
                    },
                    active: true,
                  },
                  team: {
                    id: "1",
                  },
                },
              ],
            },
            {
              name: "receivingYards",
              displayName: "Receiving Leader",
              shortDisplayName: "REC",
              abbreviation: "RECYDS",
              leaders: [
                {
                  displayValue: "2 REC, 44 YDS",
                  value: 44,
                  athlete: {
                    id: "4360248",
                    fullName: "Kyle Pitts",
                    displayName: "Kyle Pitts",
                    shortName: "K. Pitts",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4360248/kyle-pitts",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4360248/kyle-pitts",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4360248/kyle-pitts",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4360248/kyle-pitts",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4360248/kyle-pitts",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4360248/kyle-pitts",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4360248/kyle-pitts",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4360248.png",
                    jersey: "8",
                    position: {
                      abbreviation: "TE",
                    },
                    team: {
                      id: "1",
                    },
                    active: true,
                  },
                  team: {
                    id: "1",
                  },
                },
              ],
            },
          ],
          format: {
            regulation: {
              periods: 4,
            },
          },
          startDate: "2023-09-10T17:00Z",
          geoBroadcasts: [
            {
              type: {
                id: "1",
                shortName: "TV",
              },
              market: {
                id: "1",
                type: "National",
              },
              media: {
                shortName: "FOX",
              },
              lang: "en",
              region: "us",
            },
          ],
        },
      ],
      links: [
        {
          language: "en-US",
          rel: ["summary", "desktop", "event"],
          href: "https://www.espn.com/nfl/game/_/gameId/401547403",
          text: "Gamecast",
          shortText: "Gamecast",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["boxscore", "desktop", "event"],
          href: "https://www.espn.com/nfl/boxscore/_/gameId/401547403",
          text: "Box Score",
          shortText: "Box Score",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["highlights", "desktop"],
          href: "https://www.espn.com/nfl/video?gameId=401547403",
          text: "Highlights",
          shortText: "Highlights",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["pbp", "desktop", "event"],
          href: "https://www.espn.com/nfl/playbyplay/_/gameId/401547403",
          text: "Play-by-Play",
          shortText: "Play-by-Play",
          isExternal: false,
          isPremium: false,
        },
      ],
      status: {
        clock: 0,
        displayClock: "0:00",
        period: 4,
        type: {
          id: "3",
          name: "STATUS_FINAL",
          state: "post",
          completed: true,
          description: "Final",
          detail: "Final",
          shortDetail: "Final",
        },
      },
    },
    {
      id: "401547397",
      uid: "s:20~l:28~e:401547397",
      date: "2023-09-10T17:00Z",
      name: "Cincinnati Bengals at Cleveland Browns",
      shortName: "CIN @ CLE",
      season: {
        year: 2023,
        type: 2,
        slug: "regular-season",
      },
      week: {
        number: 1,
      },
      competitions: [
        {
          id: "401547397",
          uid: "s:20~l:28~e:401547397~c:401547397",
          date: "2023-09-10T17:00Z",
          attendance: 67919,
          type: {
            id: "1",
            abbreviation: "STD",
          },
          timeValid: true,
          neutralSite: false,
          conferenceCompetition: false,
          playByPlayAvailable: true,
          recent: false,
          venue: {
            id: "3679",
            fullName: "Cleveland Browns Stadium",
            address: {
              city: "Cleveland",
              state: "OH",
            },
            capacity: 67431,
            indoor: false,
          },
          competitors: [
            {
              id: "5",
              uid: "s:20~l:28~t:5",
              type: "team",
              order: 0,
              homeAway: "home",
              winner: true,
              team: {
                id: "5",
                uid: "s:20~l:28~t:5",
                location: "Cleveland",
                name: "Browns",
                abbreviation: "CLE",
                displayName: "Cleveland Browns",
                shortDisplayName: "Browns",
                color: "472a08",
                alternateColor: "ff3c00",
                isActive: true,
                venue: {
                  id: "3679",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/cle/cleveland-browns",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/cle/cleveland-browns",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/cle/cleveland-browns",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/cle",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/cle",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/cleveland-browns-tickets--sports-nfl-football/performer/181?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/cle/cleveland-browns",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/cle",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/cle",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/cle",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/cle.png",
              },
              score: "24",
              linescores: [
                {
                  value: 0,
                },
                {
                  value: 10,
                },
                {
                  value: 3,
                },
                {
                  value: 11,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "1-0",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "1-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-0",
                },
              ],
            },
            {
              id: "4",
              uid: "s:20~l:28~t:4",
              type: "team",
              order: 1,
              homeAway: "away",
              winner: false,
              team: {
                id: "4",
                uid: "s:20~l:28~t:4",
                location: "Cincinnati",
                name: "Bengals",
                abbreviation: "CIN",
                displayName: "Cincinnati Bengals",
                shortDisplayName: "Bengals",
                color: "fb4f14",
                alternateColor: "000000",
                isActive: true,
                venue: {
                  id: "3874",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/cin/cincinnati-bengals",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/cin/cincinnati-bengals",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/cin/cincinnati-bengals",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/cin",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/cin",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/cincinnati-bengals-tickets--sports-nfl-football/performer/172?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/cin/cincinnati-bengals",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/cin",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/cin",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/cin",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/cin.png",
              },
              score: "3",
              linescores: [
                {
                  value: 0,
                },
                {
                  value: 0,
                },
                {
                  value: 3,
                },
                {
                  value: 0,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "0-1",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-1",
                },
              ],
            },
          ],
          notes: [],
          status: {
            clock: 0,
            displayClock: "0:00",
            period: 4,
            type: {
              id: "3",
              name: "STATUS_FINAL",
              state: "post",
              completed: true,
              description: "Final",
              detail: "Final",
              shortDetail: "Final",
            },
          },
          broadcasts: [
            {
              market: "national",
              names: ["CBS"],
            },
          ],
          leaders: [
            {
              name: "passingYards",
              displayName: "Passing Leader",
              shortDisplayName: "PASS",
              abbreviation: "PYDS",
              leaders: [
                {
                  displayValue: "154 YDS, 1 TD, 1 INT",
                  value: 154,
                  athlete: {
                    id: "3122840",
                    fullName: "Deshaun Watson",
                    displayName: "Deshaun Watson",
                    shortName: "D. Watson",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3122840/deshaun-watson",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/3122840/deshaun-watson",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/3122840/deshaun-watson",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/3122840/deshaun-watson",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/3122840/deshaun-watson",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/3122840/deshaun-watson",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3122840/deshaun-watson",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/3122840.png",
                    jersey: "4",
                    position: {
                      abbreviation: "QB",
                    },
                    team: {
                      id: "5",
                    },
                    active: true,
                  },
                  team: {
                    id: "5",
                  },
                },
              ],
            },
            {
              name: "rushingYards",
              displayName: "Rushing Leader",
              shortDisplayName: "RUSH",
              abbreviation: "RYDS",
              leaders: [
                {
                  displayValue: "18 CAR, 106 YDS",
                  value: 106,
                  athlete: {
                    id: "3128720",
                    fullName: "Nick Chubb",
                    displayName: "Nick Chubb",
                    shortName: "N. Chubb",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3128720/nick-chubb",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/3128720/nick-chubb",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/3128720/nick-chubb",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/3128720/nick-chubb",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/3128720/nick-chubb",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/3128720/nick-chubb",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3128720/nick-chubb",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/3128720.png",
                    jersey: "24",
                    position: {
                      abbreviation: "RB",
                    },
                    team: {
                      id: "5",
                    },
                    active: true,
                  },
                  team: {
                    id: "5",
                  },
                },
              ],
            },
            {
              name: "receivingYards",
              displayName: "Receiving Leader",
              shortDisplayName: "REC",
              abbreviation: "RECYDS",
              leaders: [
                {
                  displayValue: "3 REC, 43 YDS",
                  value: 43,
                  athlete: {
                    id: "4372414",
                    fullName: "Elijah Moore",
                    displayName: "Elijah Moore",
                    shortName: "E. Moore",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4372414/elijah-moore",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4372414/elijah-moore",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4372414/elijah-moore",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4372414/elijah-moore",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4372414/elijah-moore",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4372414/elijah-moore",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4372414/elijah-moore",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4372414.png",
                    jersey: "8",
                    position: {
                      abbreviation: "WR",
                    },
                    team: {
                      id: "5",
                    },
                    active: true,
                  },
                  team: {
                    id: "5",
                  },
                },
              ],
            },
          ],
          format: {
            regulation: {
              periods: 4,
            },
          },
          startDate: "2023-09-10T17:00Z",
          geoBroadcasts: [
            {
              type: {
                id: "1",
                shortName: "TV",
              },
              market: {
                id: "1",
                type: "National",
              },
              media: {
                shortName: "CBS",
              },
              lang: "en",
              region: "us",
            },
          ],
          headlines: [
            {
              description:
                "— The Cleveland Browns took Ja'Marr Chase's trash talk personally.",
              type: "Recap",
              shortLinkText:
                "Deshaun Watson runs for TD, Browns bottle up Joe Burrow in 24-3 win over Bengals in season opener",
              video: [
                {
                  id: 38371095,
                  source: "espn",
                  headline:
                    "Deshaun Watson connects with Harrison Bryant for a TD",
                  thumbnail:
                    "https://a.espncdn.com/media/motion/2023/0910/dm_230910_Harrison_Bryant_TD/dm_230910_Harrison_Bryant_TD.jpg",
                  duration: 30,
                  tracking: {
                    sportName: "nfl",
                    leagueName: "No League",
                    coverageType: "Final Game Highlight",
                    trackingName:
                      "*UNPUB 9/12* NFL_One-Play (Deshaun Watson connects with Harrison Bryant for a TD) 2023/9/10 ESHEET",
                    trackingId: "dm_230910_Harrison_Bryant_TD",
                  },
                  deviceRestrictions: {
                    type: "whitelist",
                    devices: ["desktop", "settop", "handset", "tablet"],
                  },
                  links: {
                    api: {
                      self: {
                        href: "http://api.espn.com/v1/video/clips/38371095",
                      },
                      artwork: {
                        href: "https://artwork.api.espn.com/artwork/collections/media/ea37bfe9-4d6d-47f4-8591-17fe1c3a069f",
                      },
                    },
                    web: {
                      href: "https://www.espn.com/video/clip?id=38371095&ex_cid=espnapi_internal",
                      short: {
                        href: "https://www.espn.com/video/clip?id=38371095",
                      },
                      self: {
                        href: "https://www.espn.com/video/clip?id=38371095&ex_cid=espnapi_internal",
                      },
                    },
                    source: {
                      mezzanine: {
                        href: "https://media.video-origin.espn.com/espnvideo/2023/0910/dm_230910_Harrison_Bryant_TD/dm_230910_Harrison_Bryant_TD.mp4",
                      },
                      flash: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Harrison_Bryant_TD/dm_230910_Harrison_Bryant_TD.smil",
                      },
                      hds: {
                        href: "https://hds.video-cdn.espn.com/z/motion/2023/0910/dm_230910_Harrison_Bryant_TD/dm_230910_Harrison_Bryant_TD_rel.smil/manifest.f4m",
                      },
                      HLS: {
                        href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_Harrison_Bryant_TD/dm_230910_Harrison_Bryant_TD/playlist.m3u8",
                        HD: {
                          href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_Harrison_Bryant_TD/dm_230910_Harrison_Bryant_TD/playlist.m3u8",
                        },
                      },
                      HD: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Harrison_Bryant_TD/dm_230910_Harrison_Bryant_TD_720p30_2896k.mp4",
                      },
                      full: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Harrison_Bryant_TD/dm_230910_Harrison_Bryant_TD_360p30_1464k.mp4",
                      },
                      href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Harrison_Bryant_TD/dm_230910_Harrison_Bryant_TD_360p30_1464k.mp4",
                    },
                    mobile: {
                      alert: {
                        href: "http://m.espn.go.com/general/video/videoAlert?vid=38371095&ex_cid=espnapi_internal",
                      },
                      source: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Harrison_Bryant_TD/dm_230910_Harrison_Bryant_TD.mp4",
                      },
                      href: "https://watch.auth.api.espn.com/video/auth/brightcove/ea37bfe9-4d6d-47f4-8591-17fe1c3a069f/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38371095",
                      streaming: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/ea37bfe9-4d6d-47f4-8591-17fe1c3a069f/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38371095",
                      },
                      progressiveDownload: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/ea37bfe9-4d6d-47f4-8591-17fe1c3a069f/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38371095",
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      links: [
        {
          language: "en-US",
          rel: ["summary", "desktop", "event"],
          href: "https://www.espn.com/nfl/game/_/gameId/401547397",
          text: "Gamecast",
          shortText: "Gamecast",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["boxscore", "desktop", "event"],
          href: "https://www.espn.com/nfl/boxscore/_/gameId/401547397",
          text: "Box Score",
          shortText: "Box Score",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["highlights", "desktop"],
          href: "https://www.espn.com/nfl/video?gameId=401547397",
          text: "Highlights",
          shortText: "Highlights",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["pbp", "desktop", "event"],
          href: "https://www.espn.com/nfl/playbyplay/_/gameId/401547397",
          text: "Play-by-Play",
          shortText: "Play-by-Play",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["recap", "desktop", "event"],
          href: "https://www.espn.com/nfl/recap?gameId=401547397",
          text: "Recap",
          shortText: "Recap",
          isExternal: false,
          isPremium: false,
        },
      ],
      status: {
        clock: 0,
        displayClock: "0:00",
        period: 4,
        type: {
          id: "3",
          name: "STATUS_FINAL",
          state: "post",
          completed: true,
          description: "Final",
          detail: "Final",
          shortDetail: "Final",
        },
      },
    },
    {
      id: "401547404",
      uid: "s:20~l:28~e:401547404",
      date: "2023-09-10T17:00Z",
      name: "Jacksonville Jaguars at Indianapolis Colts",
      shortName: "JAX @ IND",
      season: {
        year: 2023,
        type: 2,
        slug: "regular-season",
      },
      week: {
        number: 1,
      },
      competitions: [
        {
          id: "401547404",
          uid: "s:20~l:28~e:401547404~c:401547404",
          date: "2023-09-10T17:00Z",
          attendance: 65749,
          type: {
            id: "1",
            abbreviation: "STD",
          },
          timeValid: true,
          neutralSite: false,
          conferenceCompetition: false,
          playByPlayAvailable: true,
          recent: false,
          venue: {
            id: "3812",
            fullName: "Lucas Oil Stadium",
            address: {
              city: "Indianapolis",
              state: "IN",
            },
            capacity: 63000,
            indoor: true,
          },
          competitors: [
            {
              id: "11",
              uid: "s:20~l:28~t:11",
              type: "team",
              order: 0,
              homeAway: "home",
              winner: false,
              team: {
                id: "11",
                uid: "s:20~l:28~t:11",
                location: "Indianapolis",
                name: "Colts",
                abbreviation: "IND",
                displayName: "Indianapolis Colts",
                shortDisplayName: "Colts",
                color: "003b75",
                alternateColor: "ffffff",
                isActive: true,
                venue: {
                  id: "3812",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/ind/indianapolis-colts",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/ind/indianapolis-colts",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/ind/indianapolis-colts",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/ind",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/ind",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/indianapolis-colts-tickets--sports-nfl-football/performer/370?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/ind/indianapolis-colts",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/ind",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/ind",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/ind",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/ind.png",
              },
              score: "21",
              linescores: [
                {
                  value: 0,
                },
                {
                  value: 7,
                },
                {
                  value: 14,
                },
                {
                  value: 0,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "0-1",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-1",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-0",
                },
              ],
            },
            {
              id: "30",
              uid: "s:20~l:28~t:30",
              type: "team",
              order: 1,
              homeAway: "away",
              winner: true,
              team: {
                id: "30",
                uid: "s:20~l:28~t:30",
                location: "Jacksonville",
                name: "Jaguars",
                abbreviation: "JAX",
                displayName: "Jacksonville Jaguars",
                shortDisplayName: "Jaguars",
                color: "007487",
                alternateColor: "d7a22a",
                isActive: true,
                venue: {
                  id: "3712",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/jax/jacksonville-jaguars",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/jax/jacksonville-jaguars",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/jax/jacksonville-jaguars",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/jax",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/jax",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/jacksonville-jaguars-tickets--sports-nfl-football/performer/381?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/jax/jacksonville-jaguars",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/jax",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/jax",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/jax",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/jax.png",
              },
              score: "31",
              linescores: [
                {
                  value: 7,
                },
                {
                  value: 7,
                },
                {
                  value: 3,
                },
                {
                  value: 14,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "1-0",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "1-0",
                },
              ],
            },
          ],
          notes: [],
          status: {
            clock: 0,
            displayClock: "0:00",
            period: 4,
            type: {
              id: "3",
              name: "STATUS_FINAL",
              state: "post",
              completed: true,
              description: "Final",
              detail: "Final",
              shortDetail: "Final",
            },
          },
          broadcasts: [
            {
              market: "national",
              names: ["FOX"],
            },
          ],
          leaders: [
            {
              name: "passingYards",
              displayName: "Passing Leader",
              shortDisplayName: "PASS",
              abbreviation: "PYDS",
              leaders: [
                {
                  displayValue: "241 YDS, 2 TD, 1 INT",
                  value: 241,
                  athlete: {
                    id: "4360310",
                    fullName: "Trevor Lawrence",
                    displayName: "Trevor Lawrence",
                    shortName: "T. Lawrence",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4360310/trevor-lawrence",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4360310/trevor-lawrence",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4360310/trevor-lawrence",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4360310/trevor-lawrence",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4360310/trevor-lawrence",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4360310/trevor-lawrence",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4360310/trevor-lawrence",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4360310.png",
                    jersey: "16",
                    position: {
                      abbreviation: "QB",
                    },
                    team: {
                      id: "30",
                    },
                    active: true,
                  },
                  team: {
                    id: "30",
                  },
                },
              ],
            },
            {
              name: "rushingYards",
              displayName: "Rushing Leader",
              shortDisplayName: "RUSH",
              abbreviation: "RYDS",
              leaders: [
                {
                  displayValue: "18 CAR, 77 YDS, 1 TD",
                  value: 77,
                  athlete: {
                    id: "4239996",
                    fullName: "Travis Etienne Jr.",
                    displayName: "Travis Etienne Jr.",
                    shortName: "T. Etienne Jr.",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4239996/travis-etienne-jr",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4239996/travis-etienne-jr",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4239996/travis-etienne-jr",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4239996/travis-etienne-jr",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4239996/travis-etienne-jr",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4239996/travis-etienne-jr",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4239996/travis-etienne-jr",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4239996.png",
                    jersey: "1",
                    position: {
                      abbreviation: "RB",
                    },
                    team: {
                      id: "30",
                    },
                    active: true,
                  },
                  team: {
                    id: "30",
                  },
                },
              ],
            },
            {
              name: "receivingYards",
              displayName: "Receiving Leader",
              shortDisplayName: "REC",
              abbreviation: "RECYDS",
              leaders: [
                {
                  displayValue: "8 REC, 101 YDS, 1 TD",
                  value: 101,
                  athlete: {
                    id: "3925357",
                    fullName: "Calvin Ridley",
                    displayName: "Calvin Ridley",
                    shortName: "C. Ridley",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3925357/calvin-ridley",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/3925357/calvin-ridley",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/3925357/calvin-ridley",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/3925357/calvin-ridley",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/3925357/calvin-ridley",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/3925357/calvin-ridley",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3925357/calvin-ridley",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/3925357.png",
                    jersey: "0",
                    position: {
                      abbreviation: "WR",
                    },
                    team: {
                      id: "30",
                    },
                    active: true,
                  },
                  team: {
                    id: "30",
                  },
                },
              ],
            },
          ],
          format: {
            regulation: {
              periods: 4,
            },
          },
          startDate: "2023-09-10T17:00Z",
          geoBroadcasts: [
            {
              type: {
                id: "1",
                shortName: "TV",
              },
              market: {
                id: "1",
                type: "National",
              },
              media: {
                shortName: "FOX",
              },
              lang: "en",
              region: "us",
            },
          ],
          headlines: [
            {
              description:
                '— Tank Bigsby had the perfect response <a href="https://www.colts.com/video/highlight-deforest-buckner-with-a-spectacular-sack-fumble-recovery-and-touchdown">for his rookie mistake</a>.',
              type: "Recap",
              shortLinkText:
                "Bigsby makes amends for big mistake by helping Jags earn rare 31-21 victory at Indy",
              video: [
                {
                  id: 38369962,
                  source: "espn",
                  headline:
                    "Zay Jones makes an incredible catch in the end zone",
                  thumbnail:
                    "https://a.espncdn.com/media/motion/2023/0910/dm_230910_nfl_jags_jones_td/dm_230910_nfl_jags_jones_td.jpg",
                  duration: 39,
                  tracking: {
                    sportName: "nfl",
                    leagueName: "No League",
                    coverageType: "Final Game Highlight",
                    trackingName:
                      "*UNPUB 9/12* NFL_One-Play (Zay Jones makes an incredible catch in the end zone) 2023/9/10 ESHEET",
                    trackingId: "dm_230910_nfl_jags_jones_td",
                  },
                  deviceRestrictions: {
                    type: "whitelist",
                    devices: ["desktop", "settop", "handset", "tablet"],
                  },
                  links: {
                    api: {
                      self: {
                        href: "http://api.espn.com/v1/video/clips/38369962",
                      },
                      artwork: {
                        href: "https://artwork.api.espn.com/artwork/collections/media/c7b4eaee-fbbe-41fe-99c4-e87a032e7698",
                      },
                    },
                    web: {
                      href: "https://www.espn.com/video/clip?id=38369962&ex_cid=espnapi_internal",
                      short: {
                        href: "https://www.espn.com/video/clip?id=38369962",
                      },
                      self: {
                        href: "https://www.espn.com/video/clip?id=38369962&ex_cid=espnapi_internal",
                      },
                    },
                    source: {
                      mezzanine: {
                        href: "https://media.video-origin.espn.com/espnvideo/2023/0910/dm_230910_nfl_jags_jones_td/dm_230910_nfl_jags_jones_td.mp4",
                      },
                      flash: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_nfl_jags_jones_td/dm_230910_nfl_jags_jones_td.smil",
                      },
                      hds: {
                        href: "https://hds.video-cdn.espn.com/z/motion/2023/0910/dm_230910_nfl_jags_jones_td/dm_230910_nfl_jags_jones_td_rel.smil/manifest.f4m",
                      },
                      HLS: {
                        href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_nfl_jags_jones_td/dm_230910_nfl_jags_jones_td/playlist.m3u8",
                        HD: {
                          href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_nfl_jags_jones_td/dm_230910_nfl_jags_jones_td/playlist.m3u8",
                        },
                      },
                      HD: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_nfl_jags_jones_td/dm_230910_nfl_jags_jones_td_720p30_2896k.mp4",
                      },
                      full: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_nfl_jags_jones_td/dm_230910_nfl_jags_jones_td_360p30_1464k.mp4",
                      },
                      href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_nfl_jags_jones_td/dm_230910_nfl_jags_jones_td_360p30_1464k.mp4",
                    },
                    mobile: {
                      alert: {
                        href: "http://m.espn.go.com/general/video/videoAlert?vid=38369962&ex_cid=espnapi_internal",
                      },
                      source: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_nfl_jags_jones_td/dm_230910_nfl_jags_jones_td.mp4",
                      },
                      href: "https://watch.auth.api.espn.com/video/auth/brightcove/c7b4eaee-fbbe-41fe-99c4-e87a032e7698/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38369962",
                      streaming: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/c7b4eaee-fbbe-41fe-99c4-e87a032e7698/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38369962",
                      },
                      progressiveDownload: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/c7b4eaee-fbbe-41fe-99c4-e87a032e7698/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38369962",
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      links: [
        {
          language: "en-US",
          rel: ["summary", "desktop", "event"],
          href: "https://www.espn.com/nfl/game/_/gameId/401547404",
          text: "Gamecast",
          shortText: "Gamecast",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["boxscore", "desktop", "event"],
          href: "https://www.espn.com/nfl/boxscore/_/gameId/401547404",
          text: "Box Score",
          shortText: "Box Score",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["highlights", "desktop"],
          href: "https://www.espn.com/nfl/video?gameId=401547404",
          text: "Highlights",
          shortText: "Highlights",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["pbp", "desktop", "event"],
          href: "https://www.espn.com/nfl/playbyplay/_/gameId/401547404",
          text: "Play-by-Play",
          shortText: "Play-by-Play",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["recap", "desktop", "event"],
          href: "https://www.espn.com/nfl/recap?gameId=401547404",
          text: "Recap",
          shortText: "Recap",
          isExternal: false,
          isPremium: false,
        },
      ],
      status: {
        clock: 0,
        displayClock: "0:00",
        period: 4,
        type: {
          id: "3",
          name: "STATUS_FINAL",
          state: "post",
          completed: true,
          description: "Final",
          detail: "Final",
          shortDetail: "Final",
        },
      },
    },
    {
      id: "401547398",
      uid: "s:20~l:28~e:401547398",
      date: "2023-09-10T17:00Z",
      name: "Tampa Bay Buccaneers at Minnesota Vikings",
      shortName: "TB @ MIN",
      season: {
        year: 2023,
        type: 2,
        slug: "regular-season",
      },
      week: {
        number: 1,
      },
      competitions: [
        {
          id: "401547398",
          uid: "s:20~l:28~e:401547398~c:401547398",
          date: "2023-09-10T17:00Z",
          attendance: 66741,
          type: {
            id: "1",
            abbreviation: "STD",
          },
          timeValid: true,
          neutralSite: false,
          conferenceCompetition: false,
          playByPlayAvailable: true,
          recent: false,
          venue: {
            id: "5239",
            fullName: "U.S. Bank Stadium",
            address: {
              city: "Minneapolis",
              state: "MN",
            },
            capacity: 67202,
            indoor: true,
          },
          competitors: [
            {
              id: "16",
              uid: "s:20~l:28~t:16",
              type: "team",
              order: 0,
              homeAway: "home",
              winner: false,
              team: {
                id: "16",
                uid: "s:20~l:28~t:16",
                location: "Minnesota",
                name: "Vikings",
                abbreviation: "MIN",
                displayName: "Minnesota Vikings",
                shortDisplayName: "Vikings",
                color: "4f2683",
                alternateColor: "ffc62f",
                isActive: true,
                venue: {
                  id: "5239",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/min/minnesota-vikings",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/min/minnesota-vikings",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/min/minnesota-vikings",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/min",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/min",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/minnesota-vikings-tickets--sports-nfl-football/performer/555?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/min/minnesota-vikings",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/min",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/min",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/min",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/min.png",
              },
              score: "17",
              linescores: [
                {
                  value: 0,
                },
                {
                  value: 10,
                },
                {
                  value: 0,
                },
                {
                  value: 7,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "0-1",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-1",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-0",
                },
              ],
            },
            {
              id: "27",
              uid: "s:20~l:28~t:27",
              type: "team",
              order: 1,
              homeAway: "away",
              winner: true,
              team: {
                id: "27",
                uid: "s:20~l:28~t:27",
                location: "Tampa Bay",
                name: "Buccaneers",
                abbreviation: "TB",
                displayName: "Tampa Bay Buccaneers",
                shortDisplayName: "Buccaneers",
                color: "bd1c36",
                alternateColor: "3e3a35",
                isActive: true,
                venue: {
                  id: "3886",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/tb/tampa-bay-buccaneers",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/tb/tampa-bay-buccaneers",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/tb/tampa-bay-buccaneers",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/tb",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/tb",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/tampa-bay-buccaneers-tickets--sports-nfl-football/performer/839?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/tb/tampa-bay-buccaneers",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/tb",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/tb",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/tb",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/tb.png",
              },
              score: "20",
              linescores: [
                {
                  value: 3,
                },
                {
                  value: 7,
                },
                {
                  value: 7,
                },
                {
                  value: 3,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "1-0",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "1-0",
                },
              ],
            },
          ],
          notes: [],
          status: {
            clock: 0,
            displayClock: "0:00",
            period: 4,
            type: {
              id: "3",
              name: "STATUS_FINAL",
              state: "post",
              completed: true,
              description: "Final",
              detail: "Final",
              shortDetail: "Final",
            },
          },
          broadcasts: [
            {
              market: "national",
              names: ["CBS"],
            },
          ],
          leaders: [
            {
              name: "passingYards",
              displayName: "Passing Leader",
              shortDisplayName: "PASS",
              abbreviation: "PYDS",
              leaders: [
                {
                  displayValue: "344 YDS, 2 TD, 1 INT",
                  value: 344,
                  athlete: {
                    id: "14880",
                    fullName: "Kirk Cousins",
                    displayName: "Kirk Cousins",
                    shortName: "K. Cousins",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/14880/kirk-cousins",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/14880/kirk-cousins",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/14880/kirk-cousins",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/14880/kirk-cousins",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/14880/kirk-cousins",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/14880/kirk-cousins",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/14880/kirk-cousins",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/14880.png",
                    jersey: "8",
                    position: {
                      abbreviation: "QB",
                    },
                    team: {
                      id: "16",
                    },
                    active: true,
                  },
                  team: {
                    id: "16",
                  },
                },
              ],
            },
            {
              name: "rushingYards",
              displayName: "Rushing Leader",
              shortDisplayName: "RUSH",
              abbreviation: "RYDS",
              leaders: [
                {
                  displayValue: "17 CAR, 39 YDS",
                  value: 39,
                  athlete: {
                    id: "4697815",
                    fullName: "Rachaad White",
                    displayName: "Rachaad White",
                    shortName: "R. White",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4697815/rachaad-white",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4697815/rachaad-white",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4697815/rachaad-white",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4697815/rachaad-white",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4697815/rachaad-white",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4697815/rachaad-white",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4697815/rachaad-white",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4697815.png",
                    jersey: "1",
                    position: {
                      abbreviation: "RB",
                    },
                    team: {
                      id: "27",
                    },
                    active: true,
                  },
                  team: {
                    id: "27",
                  },
                },
              ],
            },
            {
              name: "receivingYards",
              displayName: "Receiving Leader",
              shortDisplayName: "REC",
              abbreviation: "RECYDS",
              leaders: [
                {
                  displayValue: "9 REC, 150 YDS",
                  value: 150,
                  athlete: {
                    id: "4262921",
                    fullName: "Justin Jefferson",
                    displayName: "Justin Jefferson",
                    shortName: "J. Jefferson",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4262921/justin-jefferson",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4262921/justin-jefferson",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4262921/justin-jefferson",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4262921/justin-jefferson",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4262921/justin-jefferson",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4262921/justin-jefferson",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4262921/justin-jefferson",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4262921.png",
                    jersey: "18",
                    position: {
                      abbreviation: "WR",
                    },
                    team: {
                      id: "16",
                    },
                    active: true,
                  },
                  team: {
                    id: "16",
                  },
                },
              ],
            },
          ],
          format: {
            regulation: {
              periods: 4,
            },
          },
          startDate: "2023-09-10T17:00Z",
          geoBroadcasts: [
            {
              type: {
                id: "1",
                shortName: "TV",
              },
              market: {
                id: "1",
                type: "National",
              },
              media: {
                shortName: "CBS",
              },
              lang: "en",
              region: "us",
            },
          ],
        },
      ],
      links: [
        {
          language: "en-US",
          rel: ["summary", "desktop", "event"],
          href: "https://www.espn.com/nfl/game/_/gameId/401547398",
          text: "Gamecast",
          shortText: "Gamecast",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["boxscore", "desktop", "event"],
          href: "https://www.espn.com/nfl/boxscore/_/gameId/401547398",
          text: "Box Score",
          shortText: "Box Score",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["highlights", "desktop"],
          href: "https://www.espn.com/nfl/video?gameId=401547398",
          text: "Highlights",
          shortText: "Highlights",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["pbp", "desktop", "event"],
          href: "https://www.espn.com/nfl/playbyplay/_/gameId/401547398",
          text: "Play-by-Play",
          shortText: "Play-by-Play",
          isExternal: false,
          isPremium: false,
        },
      ],
      status: {
        clock: 0,
        displayClock: "0:00",
        period: 4,
        type: {
          id: "3",
          name: "STATUS_FINAL",
          state: "post",
          completed: true,
          description: "Final",
          detail: "Final",
          shortDetail: "Final",
        },
      },
    },
    {
      id: "401547399",
      uid: "s:20~l:28~e:401547399",
      date: "2023-09-10T17:00Z",
      name: "Tennessee Titans at New Orleans Saints",
      shortName: "TEN @ NO",
      season: {
        year: 2023,
        type: 2,
        slug: "regular-season",
      },
      week: {
        number: 1,
      },
      competitions: [
        {
          id: "401547399",
          uid: "s:20~l:28~e:401547399~c:401547399",
          date: "2023-09-10T17:00Z",
          attendance: 70024,
          type: {
            id: "1",
            abbreviation: "STD",
          },
          timeValid: true,
          neutralSite: false,
          conferenceCompetition: false,
          playByPlayAvailable: true,
          recent: false,
          venue: {
            id: "3493",
            fullName: "Caesars Superdome",
            address: {
              city: "New Orleans",
              state: "LA",
            },
            capacity: 73000,
            indoor: true,
          },
          competitors: [
            {
              id: "18",
              uid: "s:20~l:28~t:18",
              type: "team",
              order: 0,
              homeAway: "home",
              winner: true,
              team: {
                id: "18",
                uid: "s:20~l:28~t:18",
                location: "New Orleans",
                name: "Saints",
                abbreviation: "NO",
                displayName: "New Orleans Saints",
                shortDisplayName: "Saints",
                color: "d3bc8d",
                alternateColor: "000000",
                isActive: true,
                venue: {
                  id: "3493",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/no/new-orleans-saints",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/no/new-orleans-saints",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/no/new-orleans-saints",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/no",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/no",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/new-orleans-saints-tickets--sports-nfl-football/performer/597?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/no/new-orleans-saints",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/no",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/no",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/no",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/no.png",
              },
              score: "16",
              linescores: [
                {
                  value: 3,
                },
                {
                  value: 3,
                },
                {
                  value: 10,
                },
                {
                  value: 0,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "1-0",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "1-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-0",
                },
              ],
            },
            {
              id: "10",
              uid: "s:20~l:28~t:10",
              type: "team",
              order: 1,
              homeAway: "away",
              winner: false,
              team: {
                id: "10",
                uid: "s:20~l:28~t:10",
                location: "Tennessee",
                name: "Titans",
                abbreviation: "TEN",
                displayName: "Tennessee Titans",
                shortDisplayName: "Titans",
                color: "4b92db",
                alternateColor: "002a5c",
                isActive: true,
                venue: {
                  id: "3810",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/ten/tennessee-titans",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/ten/tennessee-titans",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/ten/tennessee-titans",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/ten",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/ten",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/tennessee-titans-tickets--sports-nfl-football/performer/848?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/ten/tennessee-titans",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/ten",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/ten",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/ten",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/ten.png",
              },
              score: "15",
              linescores: [
                {
                  value: 6,
                },
                {
                  value: 3,
                },
                {
                  value: 0,
                },
                {
                  value: 6,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "0-1",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-1",
                },
              ],
            },
          ],
          notes: [],
          status: {
            clock: 0,
            displayClock: "0:00",
            period: 4,
            type: {
              id: "3",
              name: "STATUS_FINAL",
              state: "post",
              completed: true,
              description: "Final",
              detail: "Final",
              shortDetail: "Final",
            },
          },
          broadcasts: [
            {
              market: "national",
              names: ["CBS"],
            },
          ],
          leaders: [
            {
              name: "passingYards",
              displayName: "Passing Leader",
              shortDisplayName: "PASS",
              abbreviation: "PYDS",
              leaders: [
                {
                  displayValue: "305 YDS, 1 TD, 1 INT",
                  value: 305,
                  athlete: {
                    id: "16757",
                    fullName: "Derek Carr",
                    displayName: "Derek Carr",
                    shortName: "D. Carr",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/16757/derek-carr",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/16757/derek-carr",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/16757/derek-carr",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/16757/derek-carr",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/16757/derek-carr",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/16757/derek-carr",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/16757/derek-carr",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/16757.png",
                    jersey: "4",
                    position: {
                      abbreviation: "QB",
                    },
                    team: {
                      id: "18",
                    },
                    active: true,
                  },
                  team: {
                    id: "18",
                  },
                },
              ],
            },
            {
              name: "rushingYards",
              displayName: "Rushing Leader",
              shortDisplayName: "RUSH",
              abbreviation: "RYDS",
              leaders: [
                {
                  displayValue: "15 CAR, 63 YDS",
                  value: 63,
                  athlete: {
                    id: "3043078",
                    fullName: "Derrick Henry",
                    displayName: "Derrick Henry",
                    shortName: "D. Henry",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3043078/derrick-henry",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/3043078/derrick-henry",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/3043078/derrick-henry",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/3043078/derrick-henry",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/3043078/derrick-henry",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/3043078/derrick-henry",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3043078/derrick-henry",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/3043078.png",
                    jersey: "22",
                    position: {
                      abbreviation: "RB",
                    },
                    team: {
                      id: "10",
                    },
                    active: true,
                  },
                  team: {
                    id: "10",
                  },
                },
              ],
            },
            {
              name: "receivingYards",
              displayName: "Receiving Leader",
              shortDisplayName: "REC",
              abbreviation: "RECYDS",
              leaders: [
                {
                  displayValue: "8 REC, 112 YDS",
                  value: 112,
                  athlete: {
                    id: "4361370",
                    fullName: "Chris Olave",
                    displayName: "Chris Olave",
                    shortName: "C. Olave",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4361370/chris-olave",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4361370/chris-olave",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4361370/chris-olave",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4361370/chris-olave",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4361370/chris-olave",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4361370/chris-olave",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4361370/chris-olave",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4361370.png",
                    jersey: "12",
                    position: {
                      abbreviation: "WR",
                    },
                    team: {
                      id: "18",
                    },
                    active: true,
                  },
                  team: {
                    id: "18",
                  },
                },
              ],
            },
          ],
          format: {
            regulation: {
              periods: 4,
            },
          },
          startDate: "2023-09-10T17:00Z",
          geoBroadcasts: [
            {
              type: {
                id: "1",
                shortName: "TV",
              },
              market: {
                id: "1",
                type: "National",
              },
              media: {
                shortName: "CBS",
              },
              lang: "en",
              region: "us",
            },
          ],
          headlines: [
            {
              description:
                "— After taking four sacks, throwing an interception and being flattened by a forearm to the face, a sore but determined Derek Carr pulled out the kind of finish he wanted in his New Orleans Saints debut.",
              type: "Recap",
              shortLinkText:
                "Derek Carr's New Orleans debut is a success as the Saints edge the Titans 16-15",
              video: [
                {
                  id: 38370972,
                  source: "espn",
                  headline:
                    "Derek Carr throws his first TD as a Saint to take the lead",
                  thumbnail:
                    "https://a.espncdn.com/media/motion/2023/0910/dm_230910_Derek_Carr_throws_TD/dm_230910_Derek_Carr_throws_TD.jpg",
                  duration: 25,
                  tracking: {
                    sportName: "nfl",
                    leagueName: "No League",
                    coverageType: "Final Game Highlight",
                    trackingName:
                      "*UNPUB 9/10* NFL_One-Play (Derek Carr throws his first TD as a Saint to take the lead) 2023/09/10 ESHEET",
                    trackingId: "dm_230910_Derek_Carr_throws_TD",
                  },
                  deviceRestrictions: {
                    type: "whitelist",
                    devices: ["desktop", "settop", "handset", "tablet"],
                  },
                  links: {
                    api: {
                      self: {
                        href: "http://api.espn.com/v1/video/clips/38370972",
                      },
                      artwork: {
                        href: "https://artwork.api.espn.com/artwork/collections/media/36e7e520-93be-468f-a987-67eeee871760",
                      },
                    },
                    web: {
                      href: "https://www.espn.com/video/clip?id=38370972&ex_cid=espnapi_internal",
                      short: {
                        href: "https://www.espn.com/video/clip?id=38370972",
                      },
                      self: {
                        href: "https://www.espn.com/video/clip?id=38370972&ex_cid=espnapi_internal",
                      },
                    },
                    source: {
                      mezzanine: {
                        href: "https://media.video-origin.espn.com/espnvideo/2023/0910/dm_230910_Derek_Carr_throws_TD/dm_230910_Derek_Carr_throws_TD.mp4",
                      },
                      flash: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Derek_Carr_throws_TD/dm_230910_Derek_Carr_throws_TD.smil",
                      },
                      hds: {
                        href: "https://hds.video-cdn.espn.com/z/motion/2023/0910/dm_230910_Derek_Carr_throws_TD/dm_230910_Derek_Carr_throws_TD_rel.smil/manifest.f4m",
                      },
                      HLS: {
                        href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_Derek_Carr_throws_TD/dm_230910_Derek_Carr_throws_TD/playlist.m3u8",
                        HD: {
                          href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_Derek_Carr_throws_TD/dm_230910_Derek_Carr_throws_TD/playlist.m3u8",
                        },
                      },
                      HD: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Derek_Carr_throws_TD/dm_230910_Derek_Carr_throws_TD_720p30_2896k.mp4",
                      },
                      full: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Derek_Carr_throws_TD/dm_230910_Derek_Carr_throws_TD_360p30_1464k.mp4",
                      },
                      href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Derek_Carr_throws_TD/dm_230910_Derek_Carr_throws_TD_360p30_1464k.mp4",
                    },
                    mobile: {
                      alert: {
                        href: "http://m.espn.go.com/general/video/videoAlert?vid=38370972&ex_cid=espnapi_internal",
                      },
                      source: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Derek_Carr_throws_TD/dm_230910_Derek_Carr_throws_TD.mp4",
                      },
                      href: "https://watch.auth.api.espn.com/video/auth/brightcove/36e7e520-93be-468f-a987-67eeee871760/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38370972",
                      streaming: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/36e7e520-93be-468f-a987-67eeee871760/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38370972",
                      },
                      progressiveDownload: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/36e7e520-93be-468f-a987-67eeee871760/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38370972",
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      links: [
        {
          language: "en-US",
          rel: ["summary", "desktop", "event"],
          href: "https://www.espn.com/nfl/game/_/gameId/401547399",
          text: "Gamecast",
          shortText: "Gamecast",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["boxscore", "desktop", "event"],
          href: "https://www.espn.com/nfl/boxscore/_/gameId/401547399",
          text: "Box Score",
          shortText: "Box Score",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["highlights", "desktop"],
          href: "https://www.espn.com/nfl/video?gameId=401547399",
          text: "Highlights",
          shortText: "Highlights",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["pbp", "desktop", "event"],
          href: "https://www.espn.com/nfl/playbyplay/_/gameId/401547399",
          text: "Play-by-Play",
          shortText: "Play-by-Play",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["recap", "desktop", "event"],
          href: "https://www.espn.com/nfl/recap?gameId=401547399",
          text: "Recap",
          shortText: "Recap",
          isExternal: false,
          isPremium: false,
        },
      ],
      status: {
        clock: 0,
        displayClock: "0:00",
        period: 4,
        type: {
          id: "3",
          name: "STATUS_FINAL",
          state: "post",
          completed: true,
          description: "Final",
          detail: "Final",
          shortDetail: "Final",
        },
      },
    },
    {
      id: "401547405",
      uid: "s:20~l:28~e:401547405",
      date: "2023-09-10T17:00Z",
      name: "San Francisco 49ers at Pittsburgh Steelers",
      shortName: "SF @ PIT",
      season: {
        year: 2023,
        type: 2,
        slug: "regular-season",
      },
      week: {
        number: 1,
      },
      competitions: [
        {
          id: "401547405",
          uid: "s:20~l:28~e:401547405~c:401547405",
          date: "2023-09-10T17:00Z",
          attendance: 67679,
          type: {
            id: "1",
            abbreviation: "STD",
          },
          timeValid: true,
          neutralSite: false,
          conferenceCompetition: false,
          playByPlayAvailable: true,
          recent: false,
          venue: {
            id: "3752",
            fullName: "Acrisure Stadium",
            address: {
              city: "Pittsburgh",
              state: "PA",
            },
            capacity: 68400,
            indoor: false,
          },
          competitors: [
            {
              id: "23",
              uid: "s:20~l:28~t:23",
              type: "team",
              order: 0,
              homeAway: "home",
              winner: false,
              team: {
                id: "23",
                uid: "s:20~l:28~t:23",
                location: "Pittsburgh",
                name: "Steelers",
                abbreviation: "PIT",
                displayName: "Pittsburgh Steelers",
                shortDisplayName: "Steelers",
                color: "000000",
                alternateColor: "ffb612",
                isActive: true,
                venue: {
                  id: "3752",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/pit/pittsburgh-steelers",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/pit/pittsburgh-steelers",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/pit/pittsburgh-steelers",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/pit",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/pit",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/pittsburgh-steelers-tickets--sports-nfl-football/performer/686?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/pit/pittsburgh-steelers",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/pit",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/pit",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/pit",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/pit.png",
              },
              score: "7",
              linescores: [
                {
                  value: 0,
                },
                {
                  value: 7,
                },
                {
                  value: 0,
                },
                {
                  value: 0,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "0-1",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-1",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-0",
                },
              ],
            },
            {
              id: "25",
              uid: "s:20~l:28~t:25",
              type: "team",
              order: 1,
              homeAway: "away",
              winner: true,
              team: {
                id: "25",
                uid: "s:20~l:28~t:25",
                location: "San Francisco",
                name: "49ers",
                abbreviation: "SF",
                displayName: "San Francisco 49ers",
                shortDisplayName: "49ers",
                color: "aa0000",
                alternateColor: "b3995d",
                isActive: true,
                venue: {
                  id: "4738",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/sf/san-francisco-49ers",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/sf/san-francisco-49ers",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/sf/san-francisco-49ers",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/sf",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/sf",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/san-francisco-49ers-tickets--sports-nfl-football/performer/758?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/sf/san-francisco-49ers",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/sf",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/sf",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/sf",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/sf.png",
              },
              score: "30",
              linescores: [
                {
                  value: 10,
                },
                {
                  value: 10,
                },
                {
                  value: 7,
                },
                {
                  value: 3,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "1-0",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "1-0",
                },
              ],
            },
          ],
          notes: [],
          status: {
            clock: 0,
            displayClock: "0:00",
            period: 4,
            type: {
              id: "3",
              name: "STATUS_FINAL",
              state: "post",
              completed: true,
              description: "Final",
              detail: "Final",
              shortDetail: "Final",
            },
          },
          broadcasts: [
            {
              market: "national",
              names: ["FOX"],
            },
          ],
          leaders: [
            {
              name: "passingYards",
              displayName: "Passing Leader",
              shortDisplayName: "PASS",
              abbreviation: "PYDS",
              leaders: [
                {
                  displayValue: "232 YDS, 1 TD, 2 INT",
                  value: 232,
                  athlete: {
                    id: "4240703",
                    fullName: "Kenny Pickett",
                    displayName: "Kenny Pickett",
                    shortName: "K. Pickett",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4240703/kenny-pickett",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4240703/kenny-pickett",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4240703/kenny-pickett",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4240703/kenny-pickett",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4240703/kenny-pickett",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4240703/kenny-pickett",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4240703/kenny-pickett",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4240703.png",
                    jersey: "8",
                    position: {
                      abbreviation: "QB",
                    },
                    team: {
                      id: "23",
                    },
                    active: true,
                  },
                  team: {
                    id: "23",
                  },
                },
              ],
            },
            {
              name: "rushingYards",
              displayName: "Rushing Leader",
              shortDisplayName: "RUSH",
              abbreviation: "RYDS",
              leaders: [
                {
                  displayValue: "22 CAR, 152 YDS, 1 TD",
                  value: 152,
                  athlete: {
                    id: "3117251",
                    fullName: "Christian McCaffrey",
                    displayName: "Christian McCaffrey",
                    shortName: "C. McCaffrey",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3117251/christian-mccaffrey",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/3117251/christian-mccaffrey",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/3117251/christian-mccaffrey",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/3117251/christian-mccaffrey",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/3117251/christian-mccaffrey",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/3117251/christian-mccaffrey",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3117251/christian-mccaffrey",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/3117251.png",
                    jersey: "23",
                    position: {
                      abbreviation: "RB",
                    },
                    team: {
                      id: "25",
                    },
                    active: true,
                  },
                  team: {
                    id: "25",
                  },
                },
              ],
            },
            {
              name: "receivingYards",
              displayName: "Receiving Leader",
              shortDisplayName: "REC",
              abbreviation: "RECYDS",
              leaders: [
                {
                  displayValue: "8 REC, 129 YDS, 2 TD",
                  value: 129,
                  athlete: {
                    id: "4360438",
                    fullName: "Brandon Aiyuk",
                    displayName: "Brandon Aiyuk",
                    shortName: "B. Aiyuk",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4360438/brandon-aiyuk",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4360438/brandon-aiyuk",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4360438/brandon-aiyuk",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4360438/brandon-aiyuk",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4360438/brandon-aiyuk",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4360438/brandon-aiyuk",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4360438/brandon-aiyuk",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4360438.png",
                    jersey: "11",
                    position: {
                      abbreviation: "WR",
                    },
                    team: {
                      id: "25",
                    },
                    active: true,
                  },
                  team: {
                    id: "25",
                  },
                },
              ],
            },
          ],
          format: {
            regulation: {
              periods: 4,
            },
          },
          startDate: "2023-09-10T17:00Z",
          geoBroadcasts: [
            {
              type: {
                id: "1",
                shortName: "TV",
              },
              market: {
                id: "1",
                type: "National",
              },
              media: {
                shortName: "FOX",
              },
              lang: "en",
              region: "us",
            },
          ],
          headlines: [
            {
              description:
                '— Brock Purdy spent months rehabbing <a href="https://apnews.com/article/brock-purdy-49ers-surgery-elbow-7c51b0500990ba4099dc936de1cecb04">his surgically repaired right elbow</a> and an entire training camp wondering if he could regain the magic he...',
              type: "Recap",
              shortLinkText:
                "Purdy throws 2 TDs in return from elbow surgery; 49ers drill Steelers 30-7 in season opener",
              video: [
                {
                  id: 38370513,
                  source: "espn",
                  headline: "Christian McCaffrey goes 65 yards for a TD",
                  thumbnail:
                    "https://a.espncdn.com/media/motion/2023/0910/dm_230910_Niners_McCaffrey_long_TD/dm_230910_Niners_McCaffrey_long_TD.jpg",
                  duration: 42,
                  tracking: {
                    sportName: "nfl",
                    leagueName: "No League",
                    coverageType: "Final Game Highlight",
                    trackingName:
                      "*UNPUB 9/12* NFL_One-Play (Christian McCaffrey goes 65 yards for a TD) 2023/09/10 ESHEET",
                    trackingId: "dm_230910_Niners_McCaffrey_long_TD",
                  },
                  deviceRestrictions: {
                    type: "whitelist",
                    devices: ["desktop", "settop", "handset", "tablet"],
                  },
                  links: {
                    api: {
                      self: {
                        href: "http://api.espn.com/v1/video/clips/38370513",
                      },
                      artwork: {
                        href: "https://artwork.api.espn.com/artwork/collections/media/9f828768-e822-45d2-b8db-ffb61f30625a",
                      },
                    },
                    web: {
                      href: "https://www.espn.com/video/clip?id=38370513&ex_cid=espnapi_internal",
                      short: {
                        href: "https://www.espn.com/video/clip?id=38370513",
                      },
                      self: {
                        href: "https://www.espn.com/video/clip?id=38370513&ex_cid=espnapi_internal",
                      },
                    },
                    source: {
                      mezzanine: {
                        href: "https://media.video-origin.espn.com/espnvideo/2023/0910/dm_230910_Niners_McCaffrey_long_TD/dm_230910_Niners_McCaffrey_long_TD.mp4",
                      },
                      flash: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Niners_McCaffrey_long_TD/dm_230910_Niners_McCaffrey_long_TD.smil",
                      },
                      hds: {
                        href: "https://hds.video-cdn.espn.com/z/motion/2023/0910/dm_230910_Niners_McCaffrey_long_TD/dm_230910_Niners_McCaffrey_long_TD_rel.smil/manifest.f4m",
                      },
                      HLS: {
                        href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_Niners_McCaffrey_long_TD/dm_230910_Niners_McCaffrey_long_TD/playlist.m3u8",
                        HD: {
                          href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_Niners_McCaffrey_long_TD/dm_230910_Niners_McCaffrey_long_TD/playlist.m3u8",
                        },
                      },
                      HD: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Niners_McCaffrey_long_TD/dm_230910_Niners_McCaffrey_long_TD_720p30_2896k.mp4",
                      },
                      full: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Niners_McCaffrey_long_TD/dm_230910_Niners_McCaffrey_long_TD_360p30_1464k.mp4",
                      },
                      href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Niners_McCaffrey_long_TD/dm_230910_Niners_McCaffrey_long_TD_360p30_1464k.mp4",
                    },
                    mobile: {
                      alert: {
                        href: "http://m.espn.go.com/general/video/videoAlert?vid=38370513&ex_cid=espnapi_internal",
                      },
                      source: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Niners_McCaffrey_long_TD/dm_230910_Niners_McCaffrey_long_TD.mp4",
                      },
                      href: "https://watch.auth.api.espn.com/video/auth/brightcove/9f828768-e822-45d2-b8db-ffb61f30625a/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38370513",
                      streaming: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/9f828768-e822-45d2-b8db-ffb61f30625a/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38370513",
                      },
                      progressiveDownload: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/9f828768-e822-45d2-b8db-ffb61f30625a/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38370513",
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      links: [
        {
          language: "en-US",
          rel: ["summary", "desktop", "event"],
          href: "https://www.espn.com/nfl/game/_/gameId/401547405",
          text: "Gamecast",
          shortText: "Gamecast",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["boxscore", "desktop", "event"],
          href: "https://www.espn.com/nfl/boxscore/_/gameId/401547405",
          text: "Box Score",
          shortText: "Box Score",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["highlights", "desktop"],
          href: "https://www.espn.com/nfl/video?gameId=401547405",
          text: "Highlights",
          shortText: "Highlights",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["pbp", "desktop", "event"],
          href: "https://www.espn.com/nfl/playbyplay/_/gameId/401547405",
          text: "Play-by-Play",
          shortText: "Play-by-Play",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["recap", "desktop", "event"],
          href: "https://www.espn.com/nfl/recap?gameId=401547405",
          text: "Recap",
          shortText: "Recap",
          isExternal: false,
          isPremium: false,
        },
      ],
      status: {
        clock: 0,
        displayClock: "0:00",
        period: 4,
        type: {
          id: "3",
          name: "STATUS_FINAL",
          state: "post",
          completed: true,
          description: "Final",
          detail: "Final",
          shortDetail: "Final",
        },
      },
    },
    {
      id: "401547406",
      uid: "s:20~l:28~e:401547406",
      date: "2023-09-10T17:00Z",
      name: "Arizona Cardinals at Washington Commanders",
      shortName: "ARI @ WSH",
      season: {
        year: 2023,
        type: 2,
        slug: "regular-season",
      },
      week: {
        number: 1,
      },
      competitions: [
        {
          id: "401547406",
          uid: "s:20~l:28~e:401547406~c:401547406",
          date: "2023-09-10T17:00Z",
          attendance: 64693,
          type: {
            id: "1",
            abbreviation: "STD",
          },
          timeValid: true,
          neutralSite: false,
          conferenceCompetition: false,
          playByPlayAvailable: true,
          recent: false,
          venue: {
            id: "3719",
            fullName: "FedExField",
            address: {
              city: "Landover",
              state: "MD",
            },
            capacity: 67617,
            indoor: false,
          },
          competitors: [
            {
              id: "28",
              uid: "s:20~l:28~t:28",
              type: "team",
              order: 0,
              homeAway: "home",
              winner: true,
              team: {
                id: "28",
                uid: "s:20~l:28~t:28",
                location: "Washington",
                name: "Commanders",
                abbreviation: "WSH",
                displayName: "Washington Commanders",
                shortDisplayName: "Commanders",
                color: "5a1414",
                alternateColor: "ffb612",
                isActive: true,
                venue: {
                  id: "3719",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/wsh/washington-commanders",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/wsh/washington-commanders",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/wsh/washington-commanders",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/wsh",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/wsh",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/washington-commanders-tickets--sports-nfl-football/performer/925?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/wsh/washington-commanders",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/wsh",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/wsh",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/wsh",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/wsh.png",
              },
              score: "20",
              linescores: [
                {
                  value: 7,
                },
                {
                  value: 3,
                },
                {
                  value: 0,
                },
                {
                  value: 10,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "1-0",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "1-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-0",
                },
              ],
            },
            {
              id: "22",
              uid: "s:20~l:28~t:22",
              type: "team",
              order: 1,
              homeAway: "away",
              winner: false,
              team: {
                id: "22",
                uid: "s:20~l:28~t:22",
                location: "Arizona",
                name: "Cardinals",
                abbreviation: "ARI",
                displayName: "Arizona Cardinals",
                shortDisplayName: "Cardinals",
                color: "a4113e",
                alternateColor: "ffffff",
                isActive: true,
                venue: {
                  id: "3970",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/ari/arizona-cardinals",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/ari/arizona-cardinals",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/ari/arizona-cardinals",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/ari",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/ari",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/arizona-cardinals-tickets--sports-nfl-football/performer/40?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/ari/arizona-cardinals",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/ari",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/ari",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/ari",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/ari.png",
              },
              score: "16",
              linescores: [
                {
                  value: 3,
                },
                {
                  value: 10,
                },
                {
                  value: 3,
                },
                {
                  value: 0,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "0-1",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-1",
                },
              ],
            },
          ],
          notes: [],
          status: {
            clock: 0,
            displayClock: "0:00",
            period: 4,
            type: {
              id: "3",
              name: "STATUS_FINAL",
              state: "post",
              completed: true,
              description: "Final",
              detail: "Final",
              shortDetail: "Final",
            },
          },
          broadcasts: [
            {
              market: "national",
              names: ["FOX"],
            },
          ],
          leaders: [
            {
              name: "passingYards",
              displayName: "Passing Leader",
              shortDisplayName: "PASS",
              abbreviation: "PYDS",
              leaders: [
                {
                  displayValue: "202 YDS, 1 TD, 1 INT",
                  value: 202,
                  athlete: {
                    id: "4426875",
                    fullName: "Sam Howell",
                    displayName: "Sam Howell",
                    shortName: "S. Howell",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4426875/sam-howell",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4426875/sam-howell",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4426875/sam-howell",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4426875/sam-howell",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4426875/sam-howell",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4426875/sam-howell",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4426875/sam-howell",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4426875.png",
                    jersey: "14",
                    position: {
                      abbreviation: "QB",
                    },
                    team: {
                      id: "28",
                    },
                    active: true,
                  },
                  team: {
                    id: "28",
                  },
                },
              ],
            },
            {
              name: "rushingYards",
              displayName: "Rushing Leader",
              shortDisplayName: "RUSH",
              abbreviation: "RYDS",
              leaders: [
                {
                  displayValue: "14 CAR, 62 YDS",
                  value: 62,
                  athlete: {
                    id: "3045147",
                    fullName: "James Conner",
                    displayName: "James Conner",
                    shortName: "J. Conner",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3045147/james-conner",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/3045147/james-conner",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/3045147/james-conner",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/3045147/james-conner",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/3045147/james-conner",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/3045147/james-conner",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3045147/james-conner",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/3045147.png",
                    jersey: "6",
                    position: {
                      abbreviation: "RB",
                    },
                    team: {
                      id: "22",
                    },
                    active: true,
                  },
                  team: {
                    id: "22",
                  },
                },
              ],
            },
            {
              name: "receivingYards",
              displayName: "Receiving Leader",
              shortDisplayName: "REC",
              abbreviation: "RECYDS",
              leaders: [
                {
                  displayValue: "5 REC, 54 YDS",
                  value: 54,
                  athlete: {
                    id: "3121427",
                    fullName: "Curtis Samuel",
                    displayName: "Curtis Samuel",
                    shortName: "C. Samuel",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3121427/curtis-samuel",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/3121427/curtis-samuel",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/3121427/curtis-samuel",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/3121427/curtis-samuel",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/3121427/curtis-samuel",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/3121427/curtis-samuel",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3121427/curtis-samuel",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/3121427.png",
                    jersey: "4",
                    position: {
                      abbreviation: "WR",
                    },
                    team: {
                      id: "28",
                    },
                    active: true,
                  },
                  team: {
                    id: "28",
                  },
                },
              ],
            },
          ],
          format: {
            regulation: {
              periods: 4,
            },
          },
          startDate: "2023-09-10T17:00Z",
          geoBroadcasts: [
            {
              type: {
                id: "1",
                shortName: "TV",
              },
              market: {
                id: "1",
                type: "National",
              },
              media: {
                shortName: "FOX",
              },
              lang: "en",
              region: "us",
            },
          ],
          headlines: [
            {
              description:
                "— Throughout the second half, Montez Sweat looked around at his defensive teammates and asked who was going to be the closer the Washington Commanders needed.",
              type: "Recap",
              shortLinkText:
                "Washington's defense takes over to help the Commanders rally past the Cardinals 20-16",
              video: [
                {
                  id: 38371161,
                  source: "espn",
                  headline: "Sam Howell keeps it for a go-ahead rushing TD",
                  thumbnail:
                    "https://a.espncdn.com/media/motion/2023/0910/dm_230910_was_howell_td/dm_230910_was_howell_td.jpg",
                  duration: 18,
                  tracking: {
                    sportName: "nfl",
                    leagueName: "No League",
                    coverageType: "Final Game Highlight",
                    trackingName:
                      "*UNPUB 9/12 4p* NFL_One-Play (Sam Howell keeps it for a go-ahead rushing TD) 2023/9/10 ESHEET",
                    trackingId: "dm_230910_was_howell_td",
                  },
                  deviceRestrictions: {
                    type: "whitelist",
                    devices: ["desktop", "settop", "handset", "tablet"],
                  },
                  links: {
                    api: {
                      self: {
                        href: "http://api.espn.com/v1/video/clips/38371161",
                      },
                      artwork: {
                        href: "https://artwork.api.espn.com/artwork/collections/media/2128f9ba-7ec2-4188-b3e1-68a9168cdb7a",
                      },
                    },
                    web: {
                      href: "https://www.espn.com/video/clip?id=38371161&ex_cid=espnapi_internal",
                      short: {
                        href: "https://www.espn.com/video/clip?id=38371161",
                      },
                      self: {
                        href: "https://www.espn.com/video/clip?id=38371161&ex_cid=espnapi_internal",
                      },
                    },
                    source: {
                      mezzanine: {
                        href: "https://media.video-origin.espn.com/espnvideo/2023/0910/dm_230910_was_howell_td/dm_230910_was_howell_td.mp4",
                      },
                      flash: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_was_howell_td/dm_230910_was_howell_td.smil",
                      },
                      hds: {
                        href: "https://hds.video-cdn.espn.com/z/motion/2023/0910/dm_230910_was_howell_td/dm_230910_was_howell_td_rel.smil/manifest.f4m",
                      },
                      HLS: {
                        href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_was_howell_td/dm_230910_was_howell_td/playlist.m3u8",
                        HD: {
                          href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_was_howell_td/dm_230910_was_howell_td/playlist.m3u8",
                        },
                      },
                      HD: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_was_howell_td/dm_230910_was_howell_td_720p30_2896k.mp4",
                      },
                      full: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_was_howell_td/dm_230910_was_howell_td_360p30_1464k.mp4",
                      },
                      href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_was_howell_td/dm_230910_was_howell_td_360p30_1464k.mp4",
                    },
                    mobile: {
                      alert: {
                        href: "http://m.espn.go.com/general/video/videoAlert?vid=38371161&ex_cid=espnapi_internal",
                      },
                      source: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_was_howell_td/dm_230910_was_howell_td.mp4",
                      },
                      href: "https://watch.auth.api.espn.com/video/auth/brightcove/2128f9ba-7ec2-4188-b3e1-68a9168cdb7a/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38371161",
                      streaming: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/2128f9ba-7ec2-4188-b3e1-68a9168cdb7a/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38371161",
                      },
                      progressiveDownload: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/2128f9ba-7ec2-4188-b3e1-68a9168cdb7a/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38371161",
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      links: [
        {
          language: "en-US",
          rel: ["summary", "desktop", "event"],
          href: "https://www.espn.com/nfl/game/_/gameId/401547406",
          text: "Gamecast",
          shortText: "Gamecast",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["boxscore", "desktop", "event"],
          href: "https://www.espn.com/nfl/boxscore/_/gameId/401547406",
          text: "Box Score",
          shortText: "Box Score",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["highlights", "desktop"],
          href: "https://www.espn.com/nfl/video?gameId=401547406",
          text: "Highlights",
          shortText: "Highlights",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["pbp", "desktop", "event"],
          href: "https://www.espn.com/nfl/playbyplay/_/gameId/401547406",
          text: "Play-by-Play",
          shortText: "Play-by-Play",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["recap", "desktop", "event"],
          href: "https://www.espn.com/nfl/recap?gameId=401547406",
          text: "Recap",
          shortText: "Recap",
          isExternal: false,
          isPremium: false,
        },
      ],
      status: {
        clock: 0,
        displayClock: "0:00",
        period: 4,
        type: {
          id: "3",
          name: "STATUS_FINAL",
          state: "post",
          completed: true,
          description: "Final",
          detail: "Final",
          shortDetail: "Final",
        },
      },
    },
    {
      id: "401547396",
      uid: "s:20~l:28~e:401547396",
      date: "2023-09-10T17:00Z",
      name: "Houston Texans at Baltimore Ravens",
      shortName: "HOU @ BAL",
      season: {
        year: 2023,
        type: 2,
        slug: "regular-season",
      },
      week: {
        number: 1,
      },
      competitions: [
        {
          id: "401547396",
          uid: "s:20~l:28~e:401547396~c:401547396",
          date: "2023-09-10T17:00Z",
          attendance: 70136,
          type: {
            id: "1",
            abbreviation: "STD",
          },
          timeValid: true,
          neutralSite: false,
          conferenceCompetition: false,
          playByPlayAvailable: true,
          recent: false,
          venue: {
            id: "3814",
            fullName: "M&T Bank Stadium",
            address: {
              city: "Baltimore",
              state: "MD",
            },
            capacity: 70745,
            indoor: false,
          },
          competitors: [
            {
              id: "33",
              uid: "s:20~l:28~t:33",
              type: "team",
              order: 0,
              homeAway: "home",
              winner: true,
              team: {
                id: "33",
                uid: "s:20~l:28~t:33",
                location: "Baltimore",
                name: "Ravens",
                abbreviation: "BAL",
                displayName: "Baltimore Ravens",
                shortDisplayName: "Ravens",
                color: "24135f",
                alternateColor: "9a7611",
                isActive: true,
                venue: {
                  id: "3814",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/bal/baltimore-ravens",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/bal/baltimore-ravens",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/bal/baltimore-ravens",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/bal",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/bal",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/baltimore-ravens-tickets--sports-nfl-football/performer/60?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/bal/baltimore-ravens",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/bal",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/bal",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/bal",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/bal.png",
              },
              score: "25",
              linescores: [
                {
                  value: 7,
                },
                {
                  value: 0,
                },
                {
                  value: 15,
                },
                {
                  value: 3,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "1-0",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "1-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-0",
                },
              ],
            },
            {
              id: "34",
              uid: "s:20~l:28~t:34",
              type: "team",
              order: 1,
              homeAway: "away",
              winner: false,
              team: {
                id: "34",
                uid: "s:20~l:28~t:34",
                location: "Houston",
                name: "Texans",
                abbreviation: "HOU",
                displayName: "Houston Texans",
                shortDisplayName: "Texans",
                color: "00143f",
                alternateColor: "c41230",
                isActive: true,
                venue: {
                  id: "3891",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/hou/houston-texans",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/hou/houston-texans",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/hou/houston-texans",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/hou",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/hou",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/houston-texans-tickets--sports-nfl-football/performer/2559?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/hou/houston-texans",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/hou",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/hou",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/hou",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/hou.png",
              },
              score: "9",
              linescores: [
                {
                  value: 0,
                },
                {
                  value: 6,
                },
                {
                  value: 0,
                },
                {
                  value: 3,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "0-1",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-1",
                },
              ],
            },
          ],
          notes: [],
          status: {
            clock: 0,
            displayClock: "0:00",
            period: 4,
            type: {
              id: "3",
              name: "STATUS_FINAL",
              state: "post",
              completed: true,
              description: "Final",
              detail: "Final",
              shortDetail: "Final",
            },
          },
          broadcasts: [
            {
              market: "national",
              names: ["CBS"],
            },
          ],
          leaders: [
            {
              name: "passingYards",
              displayName: "Passing Leader",
              shortDisplayName: "PASS",
              abbreviation: "PYDS",
              leaders: [
                {
                  displayValue: "242 YDS",
                  value: 242,
                  athlete: {
                    id: "4432577",
                    fullName: "C.J. Stroud",
                    displayName: "C.J. Stroud",
                    shortName: "C.J. Stroud",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4432577/cj-stroud",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4432577/cj-stroud",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4432577/cj-stroud",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4432577/cj-stroud",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4432577/cj-stroud",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4432577/cj-stroud",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4432577/cj-stroud",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4432577.png",
                    jersey: "7",
                    position: {
                      abbreviation: "QB",
                    },
                    team: {
                      id: "34",
                    },
                    active: true,
                  },
                  team: {
                    id: "34",
                  },
                },
              ],
            },
            {
              name: "rushingYards",
              displayName: "Rushing Leader",
              shortDisplayName: "RUSH",
              abbreviation: "RYDS",
              leaders: [
                {
                  displayValue: "6 CAR, 38 YDS",
                  value: 38,
                  athlete: {
                    id: "3916387",
                    fullName: "Lamar Jackson",
                    displayName: "Lamar Jackson",
                    shortName: "L. Jackson",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3916387/lamar-jackson",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/3916387/lamar-jackson",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/3916387/lamar-jackson",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/3916387/lamar-jackson",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/3916387/lamar-jackson",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/3916387/lamar-jackson",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3916387/lamar-jackson",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/3916387.png",
                    jersey: "8",
                    position: {
                      abbreviation: "QB",
                    },
                    team: {
                      id: "33",
                    },
                    active: true,
                  },
                  team: {
                    id: "33",
                  },
                },
              ],
            },
            {
              name: "receivingYards",
              displayName: "Receiving Leader",
              shortDisplayName: "REC",
              abbreviation: "RECYDS",
              leaders: [
                {
                  displayValue: "6 REC, 80 YDS",
                  value: 80,
                  athlete: {
                    id: "4258173",
                    fullName: "Nico Collins",
                    displayName: "Nico Collins",
                    shortName: "N. Collins",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4258173/nico-collins",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4258173/nico-collins",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4258173/nico-collins",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4258173/nico-collins",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4258173/nico-collins",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4258173/nico-collins",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4258173/nico-collins",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4258173.png",
                    jersey: "12",
                    position: {
                      abbreviation: "WR",
                    },
                    team: {
                      id: "34",
                    },
                    active: true,
                  },
                  team: {
                    id: "34",
                  },
                },
              ],
            },
          ],
          format: {
            regulation: {
              periods: 4,
            },
          },
          startDate: "2023-09-10T17:00Z",
          geoBroadcasts: [
            {
              type: {
                id: "1",
                shortName: "TV",
              },
              market: {
                id: "1",
                type: "National",
              },
              media: {
                shortName: "CBS",
              },
              lang: "en",
              region: "us",
            },
          ],
          headlines: [
            {
              description:
                '— With J.K. Dobbins <a href="https://apnews.com/article/baltimore-ravens-jk-dobbins-injury-83a2f612904afed85999373c14532dea">lost for the season</a> because of a torn Achilles tendon, the Baltimore Ravens are again facing some major questions about...',
              type: "Recap",
              shortLinkText:
                "Ravens beat Texans 25-9, but will be without running back J.K. Dobbins for the rest of the season",
              video: [
                {
                  id: 38370900,
                  source: "espn",
                  headline:
                    "Justice Hill spins into the end zone for his 2nd TD",
                  thumbnail:
                    "https://a.espncdn.com/media/motion/2023/0910/dm_230910_rev1_Justice_Hill_2nd_TD/dm_230910_rev1_Justice_Hill_2nd_TD.jpg",
                  duration: 25,
                  tracking: {
                    sportName: "nfl",
                    leagueName: "No League",
                    coverageType: "Final Game Highlight",
                    trackingName:
                      "*UNPUB 09/12 12pm * NFL_One-Play (Justice Hill spins into the end zone for his 2nd TD) 2023/09/10 ESHEET",
                    trackingId: "dm_230910_rev1_Justice_Hill_2nd_TD",
                  },
                  deviceRestrictions: {
                    type: "whitelist",
                    devices: ["desktop", "settop", "handset", "tablet"],
                  },
                  links: {
                    api: {
                      self: {
                        href: "http://api.espn.com/v1/video/clips/38370900",
                      },
                      artwork: {
                        href: "https://artwork.api.espn.com/artwork/collections/media/d7f52116-ca31-4a61-91ae-05b38f220e47",
                      },
                    },
                    web: {
                      href: "https://www.espn.com/video/clip?id=38370900&ex_cid=espnapi_internal",
                      short: {
                        href: "https://www.espn.com/video/clip?id=38370900",
                      },
                      self: {
                        href: "https://www.espn.com/video/clip?id=38370900&ex_cid=espnapi_internal",
                      },
                    },
                    source: {
                      mezzanine: {
                        href: "https://media.video-origin.espn.com/espnvideo/2023/0910/dm_230910_rev1_Justice_Hill_2nd_TD/dm_230910_rev1_Justice_Hill_2nd_TD.mp4",
                      },
                      flash: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_rev1_Justice_Hill_2nd_TD/dm_230910_rev1_Justice_Hill_2nd_TD.smil",
                      },
                      hds: {
                        href: "https://hds.video-cdn.espn.com/z/motion/2023/0910/dm_230910_rev1_Justice_Hill_2nd_TD/dm_230910_rev1_Justice_Hill_2nd_TD_rel.smil/manifest.f4m",
                      },
                      HLS: {
                        href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_rev1_Justice_Hill_2nd_TD/dm_230910_rev1_Justice_Hill_2nd_TD/playlist.m3u8",
                        HD: {
                          href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_rev1_Justice_Hill_2nd_TD/dm_230910_rev1_Justice_Hill_2nd_TD/playlist.m3u8",
                        },
                      },
                      HD: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_rev1_Justice_Hill_2nd_TD/dm_230910_rev1_Justice_Hill_2nd_TD_720p30_2896k.mp4",
                      },
                      full: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_rev1_Justice_Hill_2nd_TD/dm_230910_rev1_Justice_Hill_2nd_TD_360p30_1464k.mp4",
                      },
                      href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_rev1_Justice_Hill_2nd_TD/dm_230910_rev1_Justice_Hill_2nd_TD_360p30_1464k.mp4",
                    },
                    mobile: {
                      alert: {
                        href: "http://m.espn.go.com/general/video/videoAlert?vid=38370900&ex_cid=espnapi_internal",
                      },
                      source: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_rev1_Justice_Hill_2nd_TD/dm_230910_rev1_Justice_Hill_2nd_TD.mp4",
                      },
                      href: "https://watch.auth.api.espn.com/video/auth/brightcove/d7f52116-ca31-4a61-91ae-05b38f220e47/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38370900",
                      streaming: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/d7f52116-ca31-4a61-91ae-05b38f220e47/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38370900",
                      },
                      progressiveDownload: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/d7f52116-ca31-4a61-91ae-05b38f220e47/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38370900",
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      links: [
        {
          language: "en-US",
          rel: ["summary", "desktop", "event"],
          href: "https://www.espn.com/nfl/game/_/gameId/401547396",
          text: "Gamecast",
          shortText: "Gamecast",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["boxscore", "desktop", "event"],
          href: "https://www.espn.com/nfl/boxscore/_/gameId/401547396",
          text: "Box Score",
          shortText: "Box Score",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["highlights", "desktop"],
          href: "https://www.espn.com/nfl/video?gameId=401547396",
          text: "Highlights",
          shortText: "Highlights",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["pbp", "desktop", "event"],
          href: "https://www.espn.com/nfl/playbyplay/_/gameId/401547396",
          text: "Play-by-Play",
          shortText: "Play-by-Play",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["recap", "desktop", "event"],
          href: "https://www.espn.com/nfl/recap?gameId=401547396",
          text: "Recap",
          shortText: "Recap",
          isExternal: false,
          isPremium: false,
        },
      ],
      status: {
        clock: 0,
        displayClock: "0:00",
        period: 4,
        type: {
          id: "3",
          name: "STATUS_FINAL",
          state: "post",
          completed: true,
          description: "Final",
          detail: "Final",
          shortDetail: "Final",
        },
      },
    },
    {
      id: "401547407",
      uid: "s:20~l:28~e:401547407",
      date: "2023-09-10T20:25Z",
      name: "Green Bay Packers at Chicago Bears",
      shortName: "GB @ CHI",
      season: {
        year: 2023,
        type: 2,
        slug: "regular-season",
      },
      week: {
        number: 1,
      },
      competitions: [
        {
          id: "401547407",
          uid: "s:20~l:28~e:401547407~c:401547407",
          date: "2023-09-10T20:25Z",
          attendance: 62456,
          type: {
            id: "1",
            abbreviation: "STD",
          },
          timeValid: true,
          neutralSite: false,
          conferenceCompetition: false,
          playByPlayAvailable: true,
          recent: false,
          venue: {
            id: "3933",
            fullName: "Soldier Field",
            address: {
              city: "Chicago",
              state: "IL",
            },
            capacity: 61500,
            indoor: false,
          },
          competitors: [
            {
              id: "3",
              uid: "s:20~l:28~t:3",
              type: "team",
              order: 0,
              homeAway: "home",
              winner: false,
              team: {
                id: "3",
                uid: "s:20~l:28~t:3",
                location: "Chicago",
                name: "Bears",
                abbreviation: "CHI",
                displayName: "Chicago Bears",
                shortDisplayName: "Bears",
                color: "0b1c3a",
                alternateColor: "e64100",
                isActive: true,
                venue: {
                  id: "3933",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/chi/chicago-bears",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/chi/chicago-bears",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/chi/chicago-bears",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/chi",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/chi",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/chicago-bears-tickets--sports-nfl-football/performer/159?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/chi/chicago-bears",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/chi",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/chi",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/chi",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/chi.png",
              },
              score: "20",
              linescores: [
                {
                  value: 3,
                },
                {
                  value: 3,
                },
                {
                  value: 8,
                },
                {
                  value: 6,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "0-1",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-1",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-0",
                },
              ],
            },
            {
              id: "9",
              uid: "s:20~l:28~t:9",
              type: "team",
              order: 1,
              homeAway: "away",
              winner: true,
              team: {
                id: "9",
                uid: "s:20~l:28~t:9",
                location: "Green Bay",
                name: "Packers",
                abbreviation: "GB",
                displayName: "Green Bay Packers",
                shortDisplayName: "Packers",
                color: "204e32",
                alternateColor: "ffb612",
                isActive: true,
                venue: {
                  id: "3798",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/gb/green-bay-packers",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/gb/green-bay-packers",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/gb/green-bay-packers",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/gb",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/gb",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/green-bay-packers-tickets--sports-nfl-football/performer/339?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/gb/green-bay-packers",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/gb",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/gb",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/gb",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/gb.png",
              },
              score: "38",
              linescores: [
                {
                  value: 7,
                },
                {
                  value: 3,
                },
                {
                  value: 14,
                },
                {
                  value: 14,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "1-0",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "1-0",
                },
              ],
            },
          ],
          notes: [],
          status: {
            clock: 0,
            displayClock: "0:00",
            period: 4,
            type: {
              id: "3",
              name: "STATUS_FINAL",
              state: "post",
              completed: true,
              description: "Final",
              detail: "Final",
              shortDetail: "Final",
            },
          },
          broadcasts: [
            {
              market: "national",
              names: ["FOX"],
            },
          ],
          leaders: [
            {
              name: "passingYards",
              displayName: "Passing Leader",
              shortDisplayName: "PASS",
              abbreviation: "PYDS",
              leaders: [
                {
                  displayValue: "245 YDS, 3 TD",
                  value: 245,
                  athlete: {
                    id: "4036378",
                    fullName: "Jordan Love",
                    displayName: "Jordan Love",
                    shortName: "J. Love",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4036378/jordan-love",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4036378/jordan-love",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4036378/jordan-love",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4036378/jordan-love",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4036378/jordan-love",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4036378/jordan-love",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4036378/jordan-love",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4036378.png",
                    jersey: "10",
                    position: {
                      abbreviation: "QB",
                    },
                    team: {
                      id: "9",
                    },
                    active: true,
                  },
                  team: {
                    id: "9",
                  },
                },
              ],
            },
            {
              name: "rushingYards",
              displayName: "Rushing Leader",
              shortDisplayName: "RUSH",
              abbreviation: "RYDS",
              leaders: [
                {
                  displayValue: "9 CAR, 59 YDS",
                  value: 59,
                  athlete: {
                    id: "4362887",
                    fullName: "Justin Fields",
                    displayName: "Justin Fields",
                    shortName: "J. Fields",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4362887/justin-fields",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4362887/justin-fields",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4362887/justin-fields",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4362887/justin-fields",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4362887/justin-fields",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4362887/justin-fields",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4362887/justin-fields",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4362887.png",
                    jersey: "1",
                    position: {
                      abbreviation: "QB",
                    },
                    team: {
                      id: "3",
                    },
                    active: true,
                  },
                  team: {
                    id: "3",
                  },
                },
              ],
            },
            {
              name: "receivingYards",
              displayName: "Receiving Leader",
              shortDisplayName: "REC",
              abbreviation: "RECYDS",
              leaders: [
                {
                  displayValue: "2 REC, 86 YDS, 1 TD",
                  value: 86,
                  athlete: {
                    id: "3042519",
                    fullName: "Aaron Jones",
                    displayName: "Aaron Jones",
                    shortName: "A. Jones",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3042519/aaron-jones",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/3042519/aaron-jones",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/3042519/aaron-jones",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/3042519/aaron-jones",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/3042519/aaron-jones",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/3042519/aaron-jones",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3042519/aaron-jones",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/3042519.png",
                    jersey: "33",
                    position: {
                      abbreviation: "RB",
                    },
                    team: {
                      id: "9",
                    },
                    active: true,
                  },
                  team: {
                    id: "9",
                  },
                },
              ],
            },
          ],
          format: {
            regulation: {
              periods: 4,
            },
          },
          startDate: "2023-09-10T20:25Z",
          geoBroadcasts: [
            {
              type: {
                id: "1",
                shortName: "TV",
              },
              market: {
                id: "1",
                type: "National",
              },
              media: {
                shortName: "FOX",
              },
              lang: "en",
              region: "us",
            },
          ],
          headlines: [
            {
              description:
                "— Jordan Love kept telling himself he and his teammates were going to play great. He imagined how it would feel to leave the field with a win, too.",
              type: "Recap",
              shortLinkText:
                "Jordan Love delivers in opener, throws 3 TD passes as Packers beat Bears 38-20",
              video: [
                {
                  id: 38373678,
                  source: "espn",
                  headline: "Pick-6! Quay Walker takes INT to the house",
                  thumbnail:
                    "https://a.espncdn.com/media/motion/2023/0910/dm_230910_Quay_Walker_pick_6/dm_230910_Quay_Walker_pick_6.jpg",
                  duration: 39,
                  tracking: {
                    sportName: "nfl",
                    leagueName: "No League",
                    coverageType: "Final Game Highlight",
                    trackingName:
                      "*UNPUB 9/12* NFL_One-Play (Pick-6! Quay Walker takes INT to the house) 2023/9/10 ESHEET",
                    trackingId: "dm_230910_Quay_Walker_pick_6",
                  },
                  deviceRestrictions: {
                    type: "whitelist",
                    devices: ["desktop", "settop", "handset", "tablet"],
                  },
                  links: {
                    api: {
                      self: {
                        href: "http://api.espn.com/v1/video/clips/38373678",
                      },
                      artwork: {
                        href: "https://artwork.api.espn.com/artwork/collections/media/fbe0ab83-9949-4be8-9a0f-f3137b09fe4c",
                      },
                    },
                    web: {
                      href: "https://www.espn.com/video/clip?id=38373678&ex_cid=espnapi_internal",
                      short: {
                        href: "https://www.espn.com/video/clip?id=38373678",
                      },
                      self: {
                        href: "https://www.espn.com/video/clip?id=38373678&ex_cid=espnapi_internal",
                      },
                    },
                    source: {
                      mezzanine: {
                        href: "https://media.video-origin.espn.com/espnvideo/2023/0910/dm_230910_Quay_Walker_pick_6/dm_230910_Quay_Walker_pick_6.mp4",
                      },
                      flash: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Quay_Walker_pick_6/dm_230910_Quay_Walker_pick_6.smil",
                      },
                      hds: {
                        href: "https://hds.video-cdn.espn.com/z/motion/2023/0910/dm_230910_Quay_Walker_pick_6/dm_230910_Quay_Walker_pick_6_rel.smil/manifest.f4m",
                      },
                      HLS: {
                        href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_Quay_Walker_pick_6/dm_230910_Quay_Walker_pick_6/playlist.m3u8",
                        HD: {
                          href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_Quay_Walker_pick_6/dm_230910_Quay_Walker_pick_6/playlist.m3u8",
                        },
                      },
                      HD: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Quay_Walker_pick_6/dm_230910_Quay_Walker_pick_6_720p30_2896k.mp4",
                      },
                      full: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Quay_Walker_pick_6/dm_230910_Quay_Walker_pick_6_360p30_1464k.mp4",
                      },
                      href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Quay_Walker_pick_6/dm_230910_Quay_Walker_pick_6_360p30_1464k.mp4",
                    },
                    mobile: {
                      alert: {
                        href: "http://m.espn.go.com/general/video/videoAlert?vid=38373678&ex_cid=espnapi_internal",
                      },
                      source: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Quay_Walker_pick_6/dm_230910_Quay_Walker_pick_6.mp4",
                      },
                      href: "https://watch.auth.api.espn.com/video/auth/brightcove/fbe0ab83-9949-4be8-9a0f-f3137b09fe4c/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38373678",
                      streaming: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/fbe0ab83-9949-4be8-9a0f-f3137b09fe4c/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38373678",
                      },
                      progressiveDownload: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/fbe0ab83-9949-4be8-9a0f-f3137b09fe4c/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38373678",
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      links: [
        {
          language: "en-US",
          rel: ["summary", "desktop", "event"],
          href: "https://www.espn.com/nfl/game/_/gameId/401547407",
          text: "Gamecast",
          shortText: "Gamecast",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["boxscore", "desktop", "event"],
          href: "https://www.espn.com/nfl/boxscore/_/gameId/401547407",
          text: "Box Score",
          shortText: "Box Score",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["highlights", "desktop"],
          href: "https://www.espn.com/nfl/video?gameId=401547407",
          text: "Highlights",
          shortText: "Highlights",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["pbp", "desktop", "event"],
          href: "https://www.espn.com/nfl/playbyplay/_/gameId/401547407",
          text: "Play-by-Play",
          shortText: "Play-by-Play",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["recap", "desktop", "event"],
          href: "https://www.espn.com/nfl/recap?gameId=401547407",
          text: "Recap",
          shortText: "Recap",
          isExternal: false,
          isPremium: false,
        },
      ],
      status: {
        clock: 0,
        displayClock: "0:00",
        period: 4,
        type: {
          id: "3",
          name: "STATUS_FINAL",
          state: "post",
          completed: true,
          description: "Final",
          detail: "Final",
          shortDetail: "Final",
        },
      },
    },
    {
      id: "401547400",
      uid: "s:20~l:28~e:401547400",
      date: "2023-09-10T20:25Z",
      name: "Las Vegas Raiders at Denver Broncos",
      shortName: "LV @ DEN",
      season: {
        year: 2023,
        type: 2,
        slug: "regular-season",
      },
      week: {
        number: 1,
      },
      competitions: [
        {
          id: "401547400",
          uid: "s:20~l:28~e:401547400~c:401547400",
          date: "2023-09-10T20:25Z",
          attendance: 76299,
          type: {
            id: "1",
            abbreviation: "STD",
          },
          timeValid: true,
          neutralSite: false,
          conferenceCompetition: false,
          playByPlayAvailable: true,
          recent: false,
          venue: {
            id: "3937",
            fullName: "Empower Field at Mile High",
            address: {
              city: "Denver",
              state: "CO",
            },
            capacity: 76125,
            indoor: false,
          },
          competitors: [
            {
              id: "7",
              uid: "s:20~l:28~t:7",
              type: "team",
              order: 0,
              homeAway: "home",
              winner: false,
              team: {
                id: "7",
                uid: "s:20~l:28~t:7",
                location: "Denver",
                name: "Broncos",
                abbreviation: "DEN",
                displayName: "Denver Broncos",
                shortDisplayName: "Broncos",
                color: "0a2343",
                alternateColor: "fc4c02",
                isActive: true,
                venue: {
                  id: "3937",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/den/denver-broncos",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/den/denver-broncos",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/den/denver-broncos",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/den",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/den",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/denver-broncos-tickets--sports-nfl-football/performer/234?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/den/denver-broncos",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/den",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/den",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/den",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/den.png",
              },
              score: "16",
              linescores: [
                {
                  value: 6,
                },
                {
                  value: 7,
                },
                {
                  value: 0,
                },
                {
                  value: 3,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "0-1",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-1",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-0",
                },
              ],
            },
            {
              id: "13",
              uid: "s:20~l:28~t:13",
              type: "team",
              order: 1,
              homeAway: "away",
              winner: true,
              team: {
                id: "13",
                uid: "s:20~l:28~t:13",
                location: "Las Vegas",
                name: "Raiders",
                abbreviation: "LV",
                displayName: "Las Vegas Raiders",
                shortDisplayName: "Raiders",
                color: "000000",
                alternateColor: "a5acaf",
                isActive: true,
                venue: {
                  id: "6501",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/lv/las-vegas-raiders",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/lv/las-vegas-raiders",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/lv/las-vegas-raiders",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/lv",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/lv",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/las-vegas-raiders-tickets--sports-nfl-football/performer/626?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/lv/las-vegas-raiders",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/lv",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/lv",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/lv",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/lv.png",
              },
              score: "17",
              linescores: [
                {
                  value: 7,
                },
                {
                  value: 3,
                },
                {
                  value: 0,
                },
                {
                  value: 7,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "1-0",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "1-0",
                },
              ],
            },
          ],
          notes: [],
          status: {
            clock: 0,
            displayClock: "0:00",
            period: 4,
            type: {
              id: "3",
              name: "STATUS_FINAL",
              state: "post",
              completed: true,
              description: "Final",
              detail: "Final",
              shortDetail: "Final",
            },
          },
          broadcasts: [
            {
              market: "national",
              names: ["CBS"],
            },
          ],
          leaders: [
            {
              name: "passingYards",
              displayName: "Passing Leader",
              shortDisplayName: "PASS",
              abbreviation: "PYDS",
              leaders: [
                {
                  displayValue: "200 YDS, 2 TD, 1 INT",
                  value: 200,
                  athlete: {
                    id: "16760",
                    fullName: "Jimmy Garoppolo",
                    displayName: "Jimmy Garoppolo",
                    shortName: "J. Garoppolo",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/16760/jimmy-garoppolo",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/16760/jimmy-garoppolo",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/16760/jimmy-garoppolo",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/16760/jimmy-garoppolo",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/16760/jimmy-garoppolo",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/16760/jimmy-garoppolo",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/16760/jimmy-garoppolo",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/16760.png",
                    jersey: "10",
                    position: {
                      abbreviation: "QB",
                    },
                    team: {
                      id: "13",
                    },
                    active: true,
                  },
                  team: {
                    id: "13",
                  },
                },
              ],
            },
            {
              name: "rushingYards",
              displayName: "Rushing Leader",
              shortDisplayName: "RUSH",
              abbreviation: "RYDS",
              leaders: [
                {
                  displayValue: "13 CAR, 52 YDS",
                  value: 52,
                  athlete: {
                    id: "4361579",
                    fullName: "Javonte Williams",
                    displayName: "Javonte Williams",
                    shortName: "J. Williams",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4361579/javonte-williams",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4361579/javonte-williams",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4361579/javonte-williams",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4361579/javonte-williams",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4361579/javonte-williams",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4361579/javonte-williams",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4361579/javonte-williams",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4361579.png",
                    jersey: "33",
                    position: {
                      abbreviation: "RB",
                    },
                    team: {
                      id: "7",
                    },
                    active: true,
                  },
                  team: {
                    id: "7",
                  },
                },
              ],
            },
            {
              name: "receivingYards",
              displayName: "Receiving Leader",
              shortDisplayName: "REC",
              abbreviation: "RECYDS",
              leaders: [
                {
                  displayValue: "9 REC, 81 YDS, 2 TD",
                  value: 81,
                  athlete: {
                    id: "3916433",
                    fullName: "Jakobi Meyers",
                    displayName: "Jakobi Meyers",
                    shortName: "J. Meyers",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3916433/jakobi-meyers",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/3916433/jakobi-meyers",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/3916433/jakobi-meyers",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/3916433/jakobi-meyers",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/3916433/jakobi-meyers",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/3916433/jakobi-meyers",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3916433/jakobi-meyers",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/3916433.png",
                    jersey: "16",
                    position: {
                      abbreviation: "WR",
                    },
                    team: {
                      id: "13",
                    },
                    active: true,
                  },
                  team: {
                    id: "13",
                  },
                },
              ],
            },
          ],
          format: {
            regulation: {
              periods: 4,
            },
          },
          startDate: "2023-09-10T20:25Z",
          geoBroadcasts: [
            {
              type: {
                id: "1",
                shortName: "TV",
              },
              market: {
                id: "1",
                type: "National",
              },
              media: {
                shortName: "CBS",
              },
              lang: "en",
              region: "us",
            },
          ],
          headlines: [
            {
              description:
                "— Change the coaches and switch the quarterbacks, the Raiders still own the Broncos.",
              type: "Recap",
              shortLinkText:
                "Garoppolo and Meyers spoil Payton's Denver debut in Raiders' 7th straight win over Broncos",
              video: [
                {
                  id: 38373648,
                  source: "espn",
                  headline:
                    "Jimmy G, Jakobi Meyers connect for their 2nd TD to give Raiders the lead",
                  thumbnail:
                    "https://a.espncdn.com/media/motion/2023/0910/dm_230910_Jimmy_Gto_Meyers/dm_230910_Jimmy_Gto_Meyers.jpg",
                  duration: 24,
                  tracking: {
                    sportName: "nfl",
                    leagueName: "No League",
                    coverageType: "Final Game Highlight",
                    trackingName:
                      "*UNPUB 9/12* NFL_One-Play (Jimmy G, Jakobi Meyers connect for their 2nd TD to give Raiders the lead) 2023/09/10 ESHEET",
                    trackingId: "dm_230910_Jimmy_Gto_Meyers",
                  },
                  deviceRestrictions: {
                    type: "whitelist",
                    devices: ["desktop", "settop", "handset", "tablet"],
                  },
                  links: {
                    api: {
                      self: {
                        href: "http://api.espn.com/v1/video/clips/38373648",
                      },
                      artwork: {
                        href: "https://artwork.api.espn.com/artwork/collections/media/a6a3eea5-9fc0-470c-9641-ac1fcef643fa",
                      },
                    },
                    web: {
                      href: "https://www.espn.com/video/clip?id=38373648&ex_cid=espnapi_internal",
                      short: {
                        href: "https://www.espn.com/video/clip?id=38373648",
                      },
                      self: {
                        href: "https://www.espn.com/video/clip?id=38373648&ex_cid=espnapi_internal",
                      },
                    },
                    source: {
                      mezzanine: {
                        href: "https://media.video-origin.espn.com/espnvideo/2023/0910/dm_230910_Jimmy_Gto_Meyers/dm_230910_Jimmy_Gto_Meyers.mp4",
                      },
                      flash: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Jimmy_Gto_Meyers/dm_230910_Jimmy_Gto_Meyers.smil",
                      },
                      hds: {
                        href: "https://hds.video-cdn.espn.com/z/motion/2023/0910/dm_230910_Jimmy_Gto_Meyers/dm_230910_Jimmy_Gto_Meyers_rel.smil/manifest.f4m",
                      },
                      HLS: {
                        href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_Jimmy_Gto_Meyers/dm_230910_Jimmy_Gto_Meyers/playlist.m3u8",
                        HD: {
                          href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_Jimmy_Gto_Meyers/dm_230910_Jimmy_Gto_Meyers/playlist.m3u8",
                        },
                      },
                      HD: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Jimmy_Gto_Meyers/dm_230910_Jimmy_Gto_Meyers_720p30_2896k.mp4",
                      },
                      full: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Jimmy_Gto_Meyers/dm_230910_Jimmy_Gto_Meyers_360p30_1464k.mp4",
                      },
                      href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Jimmy_Gto_Meyers/dm_230910_Jimmy_Gto_Meyers_360p30_1464k.mp4",
                    },
                    mobile: {
                      alert: {
                        href: "http://m.espn.go.com/general/video/videoAlert?vid=38373648&ex_cid=espnapi_internal",
                      },
                      source: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Jimmy_Gto_Meyers/dm_230910_Jimmy_Gto_Meyers.mp4",
                      },
                      href: "https://watch.auth.api.espn.com/video/auth/brightcove/a6a3eea5-9fc0-470c-9641-ac1fcef643fa/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38373648",
                      streaming: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/a6a3eea5-9fc0-470c-9641-ac1fcef643fa/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38373648",
                      },
                      progressiveDownload: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/a6a3eea5-9fc0-470c-9641-ac1fcef643fa/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38373648",
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      links: [
        {
          language: "en-US",
          rel: ["summary", "desktop", "event"],
          href: "https://www.espn.com/nfl/game/_/gameId/401547400",
          text: "Gamecast",
          shortText: "Gamecast",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["boxscore", "desktop", "event"],
          href: "https://www.espn.com/nfl/boxscore/_/gameId/401547400",
          text: "Box Score",
          shortText: "Box Score",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["highlights", "desktop"],
          href: "https://www.espn.com/nfl/video?gameId=401547400",
          text: "Highlights",
          shortText: "Highlights",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["pbp", "desktop", "event"],
          href: "https://www.espn.com/nfl/playbyplay/_/gameId/401547400",
          text: "Play-by-Play",
          shortText: "Play-by-Play",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["recap", "desktop", "event"],
          href: "https://www.espn.com/nfl/recap?gameId=401547400",
          text: "Recap",
          shortText: "Recap",
          isExternal: false,
          isPremium: false,
        },
      ],
      status: {
        clock: 0,
        displayClock: "0:00",
        period: 4,
        type: {
          id: "3",
          name: "STATUS_FINAL",
          state: "post",
          completed: true,
          description: "Final",
          detail: "Final",
          shortDetail: "Final",
        },
      },
    },
    {
      id: "401547402",
      uid: "s:20~l:28~e:401547402",
      date: "2023-09-10T20:25Z",
      name: "Philadelphia Eagles at New England Patriots",
      shortName: "PHI @ NE",
      season: {
        year: 2023,
        type: 2,
        slug: "regular-season",
      },
      week: {
        number: 1,
      },
      competitions: [
        {
          id: "401547402",
          uid: "s:20~l:28~e:401547402~c:401547402",
          date: "2023-09-10T20:25Z",
          attendance: 64628,
          type: {
            id: "1",
            abbreviation: "STD",
          },
          timeValid: true,
          neutralSite: false,
          conferenceCompetition: false,
          playByPlayAvailable: true,
          recent: false,
          venue: {
            id: "3738",
            fullName: "Gillette Stadium",
            address: {
              city: "Foxborough",
              state: "MA",
            },
            capacity: 64628,
            indoor: false,
          },
          competitors: [
            {
              id: "17",
              uid: "s:20~l:28~t:17",
              type: "team",
              order: 0,
              homeAway: "home",
              winner: false,
              team: {
                id: "17",
                uid: "s:20~l:28~t:17",
                location: "New England",
                name: "Patriots",
                abbreviation: "NE",
                displayName: "New England Patriots",
                shortDisplayName: "Patriots",
                color: "002a5c",
                alternateColor: "c60c30",
                isActive: true,
                venue: {
                  id: "3738",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/ne/new-england-patriots",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/ne/new-england-patriots",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/ne/new-england-patriots",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/ne",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/ne",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/new-england-patriots-tickets--sports-nfl-football/performer/592?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/ne/new-england-patriots",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/ne",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/ne",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/ne",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/ne.png",
              },
              score: "20",
              linescores: [
                {
                  value: 0,
                },
                {
                  value: 14,
                },
                {
                  value: 0,
                },
                {
                  value: 6,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "0-1",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-1",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-0",
                },
              ],
            },
            {
              id: "21",
              uid: "s:20~l:28~t:21",
              type: "team",
              order: 1,
              homeAway: "away",
              winner: true,
              team: {
                id: "21",
                uid: "s:20~l:28~t:21",
                location: "Philadelphia",
                name: "Eagles",
                abbreviation: "PHI",
                displayName: "Philadelphia Eagles",
                shortDisplayName: "Eagles",
                color: "06424d",
                alternateColor: "a2aaad",
                isActive: true,
                venue: {
                  id: "3806",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/phi/philadelphia-eagles",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/phi/philadelphia-eagles",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/phi/philadelphia-eagles",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/phi",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/phi",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/philadelphia-eagles-tickets--sports-nfl-football/performer/669?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/phi/philadelphia-eagles",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/phi",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/phi",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/phi",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/phi.png",
              },
              score: "25",
              linescores: [
                {
                  value: 16,
                },
                {
                  value: 0,
                },
                {
                  value: 3,
                },
                {
                  value: 6,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "1-0",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "1-0",
                },
              ],
            },
          ],
          notes: [],
          status: {
            clock: 0,
            displayClock: "0:00",
            period: 4,
            type: {
              id: "3",
              name: "STATUS_FINAL",
              state: "post",
              completed: true,
              description: "Final",
              detail: "Final",
              shortDetail: "Final",
            },
          },
          broadcasts: [
            {
              market: "national",
              names: ["CBS"],
            },
          ],
          leaders: [
            {
              name: "passingYards",
              displayName: "Passing Leader",
              shortDisplayName: "PASS",
              abbreviation: "PYDS",
              leaders: [
                {
                  displayValue: "316 YDS, 3 TD, 1 INT",
                  value: 316,
                  athlete: {
                    id: "4241464",
                    fullName: "Mac Jones",
                    displayName: "Mac Jones",
                    shortName: "M. Jones",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4241464/mac-jones",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4241464/mac-jones",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4241464/mac-jones",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4241464/mac-jones",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4241464/mac-jones",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4241464/mac-jones",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4241464/mac-jones",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4241464.png",
                    jersey: "10",
                    position: {
                      abbreviation: "QB",
                    },
                    team: {
                      id: "17",
                    },
                    active: true,
                  },
                  team: {
                    id: "17",
                  },
                },
              ],
            },
            {
              name: "rushingYards",
              displayName: "Rushing Leader",
              shortDisplayName: "RUSH",
              abbreviation: "RYDS",
              leaders: [
                {
                  displayValue: "14 CAR, 54 YDS",
                  value: 54,
                  athlete: {
                    id: "4371733",
                    fullName: "Kenneth Gainwell",
                    displayName: "Kenneth Gainwell",
                    shortName: "K. Gainwell",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4371733/kenneth-gainwell",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4371733/kenneth-gainwell",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4371733/kenneth-gainwell",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4371733/kenneth-gainwell",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4371733/kenneth-gainwell",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4371733/kenneth-gainwell",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4371733/kenneth-gainwell",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4371733.png",
                    jersey: "14",
                    position: {
                      abbreviation: "RB",
                    },
                    team: {
                      id: "21",
                    },
                    active: true,
                  },
                  team: {
                    id: "21",
                  },
                },
              ],
            },
            {
              name: "receivingYards",
              displayName: "Receiving Leader",
              shortDisplayName: "REC",
              abbreviation: "RECYDS",
              leaders: [
                {
                  displayValue: "7 REC, 79 YDS",
                  value: 79,
                  athlete: {
                    id: "4047646",
                    fullName: "A.J. Brown",
                    displayName: "A.J. Brown",
                    shortName: "A.J. Brown",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4047646/aj-brown",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4047646/aj-brown",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4047646/aj-brown",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4047646/aj-brown",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4047646/aj-brown",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4047646/aj-brown",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4047646/aj-brown",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4047646.png",
                    jersey: "11",
                    position: {
                      abbreviation: "WR",
                    },
                    team: {
                      id: "21",
                    },
                    active: true,
                  },
                  team: {
                    id: "21",
                  },
                },
              ],
            },
          ],
          format: {
            regulation: {
              periods: 4,
            },
          },
          startDate: "2023-09-10T20:25Z",
          geoBroadcasts: [
            {
              type: {
                id: "1",
                shortName: "TV",
              },
              market: {
                id: "1",
                type: "National",
              },
              media: {
                shortName: "CBS",
              },
              lang: "en",
              region: "us",
            },
          ],
          headlines: [
            {
              description:
                "— Jalen Hurts walked off the field following the Eagles' season-opening victory unsure of what the offense he leads can achieve this season.",
              type: "Recap",
              shortLinkText:
                "Jalen Hurts, Eagles build early lead, hang on to beat Patriots 25-20 as Tom Brady is honored",
              video: [
                {
                  id: 38372259,
                  source: "espn",
                  headline:
                    "Darius Slay takes interception 70 yards to the house",
                  thumbnail:
                    "https://a.espncdn.com/media/motion/2023/0910/dm_230910_DM_NFL_MAC_JONES_PICK_SIX/dm_230910_DM_NFL_MAC_JONES_PICK_SIX.jpg",
                  duration: 32,
                  tracking: {
                    sportName: "nfl",
                    leagueName: "No League",
                    coverageType: "Final Game Highlight",
                    trackingName:
                      "*UNPUB 9/12* NFL_One-Play (Darius Slay takes interception 70 yards to the house) 2023/9/10 ESHEET",
                    trackingId: "dm_230910_DM_NFL_MAC_JONES_PICK_SIX",
                  },
                  deviceRestrictions: {
                    type: "whitelist",
                    devices: ["desktop", "settop", "handset", "tablet"],
                  },
                  links: {
                    api: {
                      self: {
                        href: "http://api.espn.com/v1/video/clips/38372259",
                      },
                      artwork: {
                        href: "https://artwork.api.espn.com/artwork/collections/media/b037b0db-6ddb-41cf-9f10-5f43d1fbac0b",
                      },
                    },
                    web: {
                      href: "https://www.espn.com/video/clip?id=38372259&ex_cid=espnapi_internal",
                      short: {
                        href: "https://www.espn.com/video/clip?id=38372259",
                      },
                      self: {
                        href: "https://www.espn.com/video/clip?id=38372259&ex_cid=espnapi_internal",
                      },
                    },
                    source: {
                      mezzanine: {
                        href: "https://media.video-origin.espn.com/espnvideo/2023/0910/dm_230910_DM_NFL_MAC_JONES_PICK_SIX/dm_230910_DM_NFL_MAC_JONES_PICK_SIX.mp4",
                      },
                      flash: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_DM_NFL_MAC_JONES_PICK_SIX/dm_230910_DM_NFL_MAC_JONES_PICK_SIX.smil",
                      },
                      hds: {
                        href: "https://hds.video-cdn.espn.com/z/motion/2023/0910/dm_230910_DM_NFL_MAC_JONES_PICK_SIX/dm_230910_DM_NFL_MAC_JONES_PICK_SIX_rel.smil/manifest.f4m",
                      },
                      HLS: {
                        href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_DM_NFL_MAC_JONES_PICK_SIX/dm_230910_DM_NFL_MAC_JONES_PICK_SIX/playlist.m3u8",
                        HD: {
                          href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_DM_NFL_MAC_JONES_PICK_SIX/dm_230910_DM_NFL_MAC_JONES_PICK_SIX/playlist.m3u8",
                        },
                      },
                      HD: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_DM_NFL_MAC_JONES_PICK_SIX/dm_230910_DM_NFL_MAC_JONES_PICK_SIX_720p30_2896k.mp4",
                      },
                      full: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_DM_NFL_MAC_JONES_PICK_SIX/dm_230910_DM_NFL_MAC_JONES_PICK_SIX_360p30_1464k.mp4",
                      },
                      href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_DM_NFL_MAC_JONES_PICK_SIX/dm_230910_DM_NFL_MAC_JONES_PICK_SIX_360p30_1464k.mp4",
                    },
                    mobile: {
                      alert: {
                        href: "http://m.espn.go.com/general/video/videoAlert?vid=38372259&ex_cid=espnapi_internal",
                      },
                      source: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_DM_NFL_MAC_JONES_PICK_SIX/dm_230910_DM_NFL_MAC_JONES_PICK_SIX.mp4",
                      },
                      href: "https://watch.auth.api.espn.com/video/auth/brightcove/b037b0db-6ddb-41cf-9f10-5f43d1fbac0b/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38372259",
                      streaming: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/b037b0db-6ddb-41cf-9f10-5f43d1fbac0b/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38372259",
                      },
                      progressiveDownload: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/b037b0db-6ddb-41cf-9f10-5f43d1fbac0b/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38372259",
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      links: [
        {
          language: "en-US",
          rel: ["summary", "desktop", "event"],
          href: "https://www.espn.com/nfl/game/_/gameId/401547402",
          text: "Gamecast",
          shortText: "Gamecast",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["boxscore", "desktop", "event"],
          href: "https://www.espn.com/nfl/boxscore/_/gameId/401547402",
          text: "Box Score",
          shortText: "Box Score",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["highlights", "desktop"],
          href: "https://www.espn.com/nfl/video?gameId=401547402",
          text: "Highlights",
          shortText: "Highlights",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["pbp", "desktop", "event"],
          href: "https://www.espn.com/nfl/playbyplay/_/gameId/401547402",
          text: "Play-by-Play",
          shortText: "Play-by-Play",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["recap", "desktop", "event"],
          href: "https://www.espn.com/nfl/recap?gameId=401547402",
          text: "Recap",
          shortText: "Recap",
          isExternal: false,
          isPremium: false,
        },
      ],
      status: {
        clock: 0,
        displayClock: "0:00",
        period: 4,
        type: {
          id: "3",
          name: "STATUS_FINAL",
          state: "post",
          completed: true,
          description: "Final",
          detail: "Final",
          shortDetail: "Final",
        },
      },
    },
    {
      id: "401547401",
      uid: "s:20~l:28~e:401547401",
      date: "2023-09-10T20:25Z",
      name: "Miami Dolphins at Los Angeles Chargers",
      shortName: "MIA @ LAC",
      season: {
        year: 2023,
        type: 2,
        slug: "regular-season",
      },
      week: {
        number: 1,
      },
      competitions: [
        {
          id: "401547401",
          uid: "s:20~l:28~e:401547401~c:401547401",
          date: "2023-09-10T20:25Z",
          attendance: 70240,
          type: {
            id: "1",
            abbreviation: "STD",
          },
          timeValid: true,
          neutralSite: false,
          conferenceCompetition: false,
          playByPlayAvailable: true,
          recent: false,
          venue: {
            id: "7065",
            fullName: "SoFi Stadium",
            address: {
              city: "Inglewood",
              state: "CA",
            },
            capacity: 71500,
            indoor: true,
          },
          competitors: [
            {
              id: "24",
              uid: "s:20~l:28~t:24",
              type: "team",
              order: 0,
              homeAway: "home",
              winner: false,
              team: {
                id: "24",
                uid: "s:20~l:28~t:24",
                location: "Los Angeles",
                name: "Chargers",
                abbreviation: "LAC",
                displayName: "Los Angeles Chargers",
                shortDisplayName: "Chargers",
                color: "0080c6",
                alternateColor: "ffc20e",
                isActive: true,
                venue: {
                  id: "538",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/lac/los-angeles-chargers",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/lac/los-angeles-chargers",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/lac/los-angeles-chargers",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/lac",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/lac",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/los-angeles-chargers-tickets--sports-nfl-football/performer/755?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/lac/los-angeles-chargers",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/lac",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/lac",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/lac",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/lac.png",
              },
              score: "34",
              linescores: [
                {
                  value: 7,
                },
                {
                  value: 10,
                },
                {
                  value: 7,
                },
                {
                  value: 10,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "0-1",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-1",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-0",
                },
              ],
            },
            {
              id: "15",
              uid: "s:20~l:28~t:15",
              type: "team",
              order: 1,
              homeAway: "away",
              winner: true,
              team: {
                id: "15",
                uid: "s:20~l:28~t:15",
                location: "Miami",
                name: "Dolphins",
                abbreviation: "MIA",
                displayName: "Miami Dolphins",
                shortDisplayName: "Dolphins",
                color: "008e97",
                alternateColor: "fc4c02",
                isActive: true,
                venue: {
                  id: "3948",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/mia/miami-dolphins",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/mia/miami-dolphins",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/mia/miami-dolphins",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/mia",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/mia",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/miami-dolphins-tickets--sports-nfl-football/performer/532?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/mia/miami-dolphins",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/mia",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/mia",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/mia",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/mia.png",
              },
              score: "36",
              linescores: [
                {
                  value: 7,
                },
                {
                  value: 13,
                },
                {
                  value: 7,
                },
                {
                  value: 9,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "1-0",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "1-0",
                },
              ],
            },
          ],
          notes: [],
          status: {
            clock: 0,
            displayClock: "0:00",
            period: 4,
            type: {
              id: "3",
              name: "STATUS_FINAL",
              state: "post",
              completed: true,
              description: "Final",
              detail: "Final",
              shortDetail: "Final",
            },
          },
          broadcasts: [
            {
              market: "national",
              names: ["CBS"],
            },
          ],
          leaders: [
            {
              name: "passingYards",
              displayName: "Passing Leader",
              shortDisplayName: "PASS",
              abbreviation: "PYDS",
              leaders: [
                {
                  displayValue: "466 YDS, 3 TD, 1 INT",
                  value: 466,
                  athlete: {
                    id: "4241479",
                    fullName: "Tua Tagovailoa",
                    displayName: "Tua Tagovailoa",
                    shortName: "T. Tagovailoa",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4241479/tua-tagovailoa",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4241479/tua-tagovailoa",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4241479/tua-tagovailoa",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4241479/tua-tagovailoa",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4241479/tua-tagovailoa",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4241479/tua-tagovailoa",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4241479/tua-tagovailoa",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4241479.png",
                    jersey: "1",
                    position: {
                      abbreviation: "QB",
                    },
                    team: {
                      id: "15",
                    },
                    active: true,
                  },
                  team: {
                    id: "15",
                  },
                },
              ],
            },
            {
              name: "rushingYards",
              displayName: "Rushing Leader",
              shortDisplayName: "RUSH",
              abbreviation: "RYDS",
              leaders: [
                {
                  displayValue: "16 CAR, 117 YDS, 1 TD",
                  value: 117,
                  athlete: {
                    id: "3068267",
                    fullName: "Austin Ekeler",
                    displayName: "Austin Ekeler",
                    shortName: "A. Ekeler",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3068267/austin-ekeler",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/3068267/austin-ekeler",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/3068267/austin-ekeler",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/3068267/austin-ekeler",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/3068267/austin-ekeler",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/3068267/austin-ekeler",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3068267/austin-ekeler",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/3068267.png",
                    jersey: "30",
                    position: {
                      abbreviation: "RB",
                    },
                    team: {
                      id: "24",
                    },
                    active: true,
                  },
                  team: {
                    id: "24",
                  },
                },
              ],
            },
            {
              name: "receivingYards",
              displayName: "Receiving Leader",
              shortDisplayName: "REC",
              abbreviation: "RECYDS",
              leaders: [
                {
                  displayValue: "11 REC, 215 YDS, 2 TD",
                  value: 215,
                  athlete: {
                    id: "3116406",
                    fullName: "Tyreek Hill",
                    displayName: "Tyreek Hill",
                    shortName: "T. Hill",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3116406/tyreek-hill",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/3116406/tyreek-hill",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/3116406/tyreek-hill",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/3116406/tyreek-hill",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/3116406/tyreek-hill",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/3116406/tyreek-hill",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3116406/tyreek-hill",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/3116406.png",
                    jersey: "10",
                    position: {
                      abbreviation: "WR",
                    },
                    team: {
                      id: "15",
                    },
                    active: true,
                  },
                  team: {
                    id: "15",
                  },
                },
              ],
            },
          ],
          format: {
            regulation: {
              periods: 4,
            },
          },
          startDate: "2023-09-10T20:25Z",
          geoBroadcasts: [
            {
              type: {
                id: "1",
                shortName: "TV",
              },
              market: {
                id: "1",
                type: "National",
              },
              media: {
                shortName: "CBS",
              },
              lang: "en",
              region: "us",
            },
          ],
          headlines: [
            {
              description:
                "— Tua Tagovailoa might have shocked some observers by putting up one of the best passing days in an opener in NFL history.",
              type: "Recap",
              shortLinkText:
                "Hill, Tagovailoa too much for Chargers as Dolphins open with 36-34 victory",
              video: [
                {
                  id: 38374161,
                  source: "espn",
                  headline: "Dolphins outlast Chargers in Week 1 thriller",
                  thumbnail:
                    "https://a.espncdn.com/media/motion/2023/0910/dm_230910_Chargers_Dolphins_full_HL/dm_230910_Chargers_Dolphins_full_HL.jpg",
                  duration: 101,
                  tracking: {
                    sportName: "nfl",
                    leagueName: "No League",
                    coverageType: "Final Game Highlight",
                    trackingName:
                      "*UNPUB 9/12* COM_NFL Highlight (Dolphins outlast Chargers in Week 1 thriller) 2023/09/10 ESHEET SOTFULL",
                    trackingId: "dm_230910_Chargers_Dolphins_full_HL",
                  },
                  deviceRestrictions: {
                    type: "whitelist",
                    devices: ["desktop", "settop", "handset", "tablet"],
                  },
                  links: {
                    api: {
                      self: {
                        href: "http://api.espn.com/v1/video/clips/38374161",
                      },
                      artwork: {
                        href: "https://artwork.api.espn.com/artwork/collections/media/0abb18d5-17ba-4252-b842-50050e6336e9",
                      },
                    },
                    web: {
                      href: "https://www.espn.com/video/clip?id=38374161&ex_cid=espnapi_internal",
                      short: {
                        href: "https://www.espn.com/video/clip?id=38374161",
                      },
                      self: {
                        href: "https://www.espn.com/video/clip?id=38374161&ex_cid=espnapi_internal",
                      },
                    },
                    source: {
                      mezzanine: {
                        href: "https://media.video-origin.espn.com/espnvideo/2023/0910/dm_230910_Chargers_Dolphins_full_HL/dm_230910_Chargers_Dolphins_full_HL.mp4",
                      },
                      flash: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Chargers_Dolphins_full_HL/dm_230910_Chargers_Dolphins_full_HL.smil",
                      },
                      hds: {
                        href: "https://hds.video-cdn.espn.com/z/motion/2023/0910/dm_230910_Chargers_Dolphins_full_HL/dm_230910_Chargers_Dolphins_full_HL_rel.smil/manifest.f4m",
                      },
                      HLS: {
                        href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_Chargers_Dolphins_full_HL/dm_230910_Chargers_Dolphins_full_HL/playlist.m3u8",
                        HD: {
                          href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_Chargers_Dolphins_full_HL/dm_230910_Chargers_Dolphins_full_HL/playlist.m3u8",
                        },
                      },
                      HD: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Chargers_Dolphins_full_HL/dm_230910_Chargers_Dolphins_full_HL_720p30_2896k.mp4",
                      },
                      full: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Chargers_Dolphins_full_HL/dm_230910_Chargers_Dolphins_full_HL_360p30_1464k.mp4",
                      },
                      href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Chargers_Dolphins_full_HL/dm_230910_Chargers_Dolphins_full_HL_360p30_1464k.mp4",
                    },
                    mobile: {
                      alert: {
                        href: "http://m.espn.go.com/general/video/videoAlert?vid=38374161&ex_cid=espnapi_internal",
                      },
                      source: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_Chargers_Dolphins_full_HL/dm_230910_Chargers_Dolphins_full_HL.mp4",
                      },
                      href: "https://watch.auth.api.espn.com/video/auth/brightcove/0abb18d5-17ba-4252-b842-50050e6336e9/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38374161",
                      streaming: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/0abb18d5-17ba-4252-b842-50050e6336e9/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38374161",
                      },
                      progressiveDownload: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/0abb18d5-17ba-4252-b842-50050e6336e9/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38374161",
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      links: [
        {
          language: "en-US",
          rel: ["summary", "desktop", "event"],
          href: "https://www.espn.com/nfl/game/_/gameId/401547401",
          text: "Gamecast",
          shortText: "Gamecast",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["boxscore", "desktop", "event"],
          href: "https://www.espn.com/nfl/boxscore/_/gameId/401547401",
          text: "Box Score",
          shortText: "Box Score",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["highlights", "desktop"],
          href: "https://www.espn.com/nfl/video?gameId=401547401",
          text: "Highlights",
          shortText: "Highlights",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["pbp", "desktop", "event"],
          href: "https://www.espn.com/nfl/playbyplay/_/gameId/401547401",
          text: "Play-by-Play",
          shortText: "Play-by-Play",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["recap", "desktop", "event"],
          href: "https://www.espn.com/nfl/recap?gameId=401547401",
          text: "Recap",
          shortText: "Recap",
          isExternal: false,
          isPremium: false,
        },
      ],
      status: {
        clock: 0,
        displayClock: "0:00",
        period: 4,
        type: {
          id: "3",
          name: "STATUS_FINAL",
          state: "post",
          completed: true,
          description: "Final",
          detail: "Final",
          shortDetail: "Final",
        },
      },
    },
    {
      id: "401547408",
      uid: "s:20~l:28~e:401547408",
      date: "2023-09-10T20:25Z",
      name: "Los Angeles Rams at Seattle Seahawks",
      shortName: "LAR @ SEA",
      season: {
        year: 2023,
        type: 2,
        slug: "regular-season",
      },
      week: {
        number: 1,
      },
      competitions: [
        {
          id: "401547408",
          uid: "s:20~l:28~e:401547408~c:401547408",
          date: "2023-09-10T20:25Z",
          attendance: 68683,
          type: {
            id: "1",
            abbreviation: "STD",
          },
          timeValid: true,
          neutralSite: false,
          conferenceCompetition: false,
          playByPlayAvailable: true,
          recent: false,
          venue: {
            id: "3673",
            fullName: "Lumen Field",
            address: {
              city: "Seattle",
              state: "WA",
            },
            capacity: 68740,
            indoor: false,
          },
          competitors: [
            {
              id: "26",
              uid: "s:20~l:28~t:26",
              type: "team",
              order: 0,
              homeAway: "home",
              winner: false,
              team: {
                id: "26",
                uid: "s:20~l:28~t:26",
                location: "Seattle",
                name: "Seahawks",
                abbreviation: "SEA",
                displayName: "Seattle Seahawks",
                shortDisplayName: "Seahawks",
                color: "002a5c",
                alternateColor: "69be28",
                isActive: true,
                venue: {
                  id: "3673",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/sea/seattle-seahawks",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/sea/seattle-seahawks",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/sea/seattle-seahawks",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/sea",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/sea",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/seattle-seahawks-tickets--sports-nfl-football/performer/772?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/sea/seattle-seahawks",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/sea",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/sea",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/sea",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/sea.png",
              },
              score: "13",
              linescores: [
                {
                  value: 3,
                },
                {
                  value: 10,
                },
                {
                  value: 0,
                },
                {
                  value: 0,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "0-1",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-1",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-0",
                },
              ],
            },
            {
              id: "14",
              uid: "s:20~l:28~t:14",
              type: "team",
              order: 1,
              homeAway: "away",
              winner: true,
              team: {
                id: "14",
                uid: "s:20~l:28~t:14",
                location: "Los Angeles",
                name: "Rams",
                abbreviation: "LAR",
                displayName: "Los Angeles Rams",
                shortDisplayName: "Rams",
                color: "003594",
                alternateColor: "ffd100",
                isActive: true,
                venue: {
                  id: "477",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/lar/los-angeles-rams",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/lar/los-angeles-rams",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/lar/los-angeles-rams",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/lar",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/lar",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/los-angeles-rams-tickets--sports-nfl-football/performer/808?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/lar/los-angeles-rams",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/lar",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/lar",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/lar",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/lar.png",
              },
              score: "30",
              linescores: [
                {
                  value: 7,
                },
                {
                  value: 0,
                },
                {
                  value: 10,
                },
                {
                  value: 13,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "1-0",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "1-0",
                },
              ],
            },
          ],
          notes: [],
          status: {
            clock: 0,
            displayClock: "0:00",
            period: 4,
            type: {
              id: "3",
              name: "STATUS_FINAL",
              state: "post",
              completed: true,
              description: "Final",
              detail: "Final",
              shortDetail: "Final",
            },
          },
          broadcasts: [
            {
              market: "national",
              names: ["FOX"],
            },
          ],
          leaders: [
            {
              name: "passingYards",
              displayName: "Passing Leader",
              shortDisplayName: "PASS",
              abbreviation: "PYDS",
              leaders: [
                {
                  displayValue: "334 YDS",
                  value: 334,
                  athlete: {
                    id: "12483",
                    fullName: "Matthew Stafford",
                    displayName: "Matthew Stafford",
                    shortName: "M. Stafford",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/12483/matthew-stafford",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/12483/matthew-stafford",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/12483/matthew-stafford",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/12483/matthew-stafford",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/12483/matthew-stafford",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/12483/matthew-stafford",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/12483/matthew-stafford",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/12483.png",
                    jersey: "9",
                    position: {
                      abbreviation: "QB",
                    },
                    team: {
                      id: "14",
                    },
                    active: true,
                  },
                  team: {
                    id: "14",
                  },
                },
              ],
            },
            {
              name: "rushingYards",
              displayName: "Rushing Leader",
              shortDisplayName: "RUSH",
              abbreviation: "RYDS",
              leaders: [
                {
                  displayValue: "12 CAR, 64 YDS",
                  value: 64,
                  athlete: {
                    id: "4567048",
                    fullName: "Kenneth Walker III",
                    displayName: "Kenneth Walker III",
                    shortName: "K. Walker III",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4567048/kenneth-walker-iii",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4567048/kenneth-walker-iii",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4567048/kenneth-walker-iii",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4567048/kenneth-walker-iii",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4567048/kenneth-walker-iii",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4567048/kenneth-walker-iii",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4567048/kenneth-walker-iii",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4567048.png",
                    jersey: "9",
                    position: {
                      abbreviation: "RB",
                    },
                    team: {
                      id: "26",
                    },
                    active: true,
                  },
                  team: {
                    id: "26",
                  },
                },
              ],
            },
            {
              name: "receivingYards",
              displayName: "Receiving Leader",
              shortDisplayName: "REC",
              abbreviation: "RECYDS",
              leaders: [
                {
                  displayValue: "6 REC, 119 YDS",
                  value: 119,
                  athlete: {
                    id: "4360797",
                    fullName: "Tutu Atwell",
                    displayName: "Tutu Atwell",
                    shortName: "T. Atwell",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4360797/tutu-atwell",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4360797/tutu-atwell",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4360797/tutu-atwell",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4360797/tutu-atwell",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4360797/tutu-atwell",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4360797/tutu-atwell",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4360797/tutu-atwell",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4360797.png",
                    jersey: "5",
                    position: {
                      abbreviation: "WR",
                    },
                    team: {
                      id: "14",
                    },
                    active: true,
                  },
                  team: {
                    id: "14",
                  },
                },
              ],
            },
          ],
          format: {
            regulation: {
              periods: 4,
            },
          },
          startDate: "2023-09-10T20:25Z",
          geoBroadcasts: [
            {
              type: {
                id: "1",
                shortName: "TV",
              },
              market: {
                id: "1",
                type: "National",
              },
              media: {
                shortName: "FOX",
              },
              lang: "en",
              region: "us",
            },
          ],
          headlines: [
            {
              description:
                "— Matthew Stafford started the season without his favorite target, with a rebuilt and unproven offensive line, and with an outside narrative that the ceiling for the Los Angeles Rams this season is just being competitive.",
              type: "Recap",
              shortLinkText:
                "Rams show they can be more than competitive and thump Seahawks 30-13 in season opener",
              video: [
                {
                  id: 38373405,
                  source: "espn",
                  headline:
                    "'Oh my god!' Aaron Donald scares Geno Smith on a blitz",
                  thumbnail:
                    "https://a.espncdn.com/media/motion/2023/0910/dm_230910_donald_scares_geno/dm_230910_donald_scares_geno.jpg",
                  duration: 16,
                  tracking: {
                    sportName: "nfl",
                    leagueName: "No League",
                    coverageType: "Final Game Highlight",
                    trackingName:
                      "*UNPUB 9/12 7p* NFL_One-Play ('Oh my god!' Aaron Donald scares Geno Smith on a blitz) 2023/9/10 ESHEET",
                    trackingId: "dm_230910_donald_scares_geno",
                  },
                  deviceRestrictions: {
                    type: "whitelist",
                    devices: ["desktop", "settop", "handset", "tablet"],
                  },
                  links: {
                    api: {
                      self: {
                        href: "http://api.espn.com/v1/video/clips/38373405",
                      },
                      artwork: {
                        href: "https://artwork.api.espn.com/artwork/collections/media/bba61528-ff26-47fd-8de3-b1946df4b017",
                      },
                    },
                    web: {
                      href: "https://www.espn.com/video/clip?id=38373405&ex_cid=espnapi_internal",
                      short: {
                        href: "https://www.espn.com/video/clip?id=38373405",
                      },
                      self: {
                        href: "https://www.espn.com/video/clip?id=38373405&ex_cid=espnapi_internal",
                      },
                    },
                    source: {
                      mezzanine: {
                        href: "https://media.video-origin.espn.com/espnvideo/2023/0910/dm_230910_donald_scares_geno/dm_230910_donald_scares_geno.mp4",
                      },
                      flash: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_donald_scares_geno/dm_230910_donald_scares_geno.smil",
                      },
                      hds: {
                        href: "https://hds.video-cdn.espn.com/z/motion/2023/0910/dm_230910_donald_scares_geno/dm_230910_donald_scares_geno_rel.smil/manifest.f4m",
                      },
                      HLS: {
                        href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_donald_scares_geno/dm_230910_donald_scares_geno/playlist.m3u8",
                        HD: {
                          href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_donald_scares_geno/dm_230910_donald_scares_geno/playlist.m3u8",
                        },
                      },
                      HD: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_donald_scares_geno/dm_230910_donald_scares_geno_720p30_2896k.mp4",
                      },
                      full: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_donald_scares_geno/dm_230910_donald_scares_geno_360p30_1464k.mp4",
                      },
                      href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_donald_scares_geno/dm_230910_donald_scares_geno_360p30_1464k.mp4",
                    },
                    mobile: {
                      alert: {
                        href: "http://m.espn.go.com/general/video/videoAlert?vid=38373405&ex_cid=espnapi_internal",
                      },
                      source: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_donald_scares_geno/dm_230910_donald_scares_geno.mp4",
                      },
                      href: "https://watch.auth.api.espn.com/video/auth/brightcove/bba61528-ff26-47fd-8de3-b1946df4b017/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38373405",
                      streaming: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/bba61528-ff26-47fd-8de3-b1946df4b017/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38373405",
                      },
                      progressiveDownload: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/bba61528-ff26-47fd-8de3-b1946df4b017/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38373405",
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      links: [
        {
          language: "en-US",
          rel: ["summary", "desktop", "event"],
          href: "https://www.espn.com/nfl/game/_/gameId/401547408",
          text: "Gamecast",
          shortText: "Gamecast",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["boxscore", "desktop", "event"],
          href: "https://www.espn.com/nfl/boxscore/_/gameId/401547408",
          text: "Box Score",
          shortText: "Box Score",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["highlights", "desktop"],
          href: "https://www.espn.com/nfl/video?gameId=401547408",
          text: "Highlights",
          shortText: "Highlights",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["pbp", "desktop", "event"],
          href: "https://www.espn.com/nfl/playbyplay/_/gameId/401547408",
          text: "Play-by-Play",
          shortText: "Play-by-Play",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["recap", "desktop", "event"],
          href: "https://www.espn.com/nfl/recap?gameId=401547408",
          text: "Recap",
          shortText: "Recap",
          isExternal: false,
          isPremium: false,
        },
      ],
      status: {
        clock: 0,
        displayClock: "0:00",
        period: 4,
        type: {
          id: "3",
          name: "STATUS_FINAL",
          state: "post",
          completed: true,
          description: "Final",
          detail: "Final",
          shortDetail: "Final",
        },
      },
    },
    {
      id: "401547409",
      uid: "s:20~l:28~e:401547409",
      date: "2023-09-11T00:20Z",
      name: "Dallas Cowboys at New York Giants",
      shortName: "DAL @ NYG",
      season: {
        year: 2023,
        type: 2,
        slug: "regular-season",
      },
      week: {
        number: 1,
      },
      competitions: [
        {
          id: "401547409",
          uid: "s:20~l:28~e:401547409~c:401547409",
          date: "2023-09-11T00:20Z",
          attendance: 80809,
          type: {
            id: "1",
            abbreviation: "STD",
          },
          timeValid: true,
          neutralSite: false,
          conferenceCompetition: false,
          playByPlayAvailable: true,
          recent: false,
          venue: {
            id: "3839",
            fullName: "MetLife Stadium",
            address: {
              city: "East Rutherford",
              state: "NJ",
            },
            capacity: 82500,
            indoor: false,
          },
          competitors: [
            {
              id: "19",
              uid: "s:20~l:28~t:19",
              type: "team",
              order: 0,
              homeAway: "home",
              winner: false,
              team: {
                id: "19",
                uid: "s:20~l:28~t:19",
                location: "New York",
                name: "Giants",
                abbreviation: "NYG",
                displayName: "New York Giants",
                shortDisplayName: "Giants",
                color: "003c7f",
                alternateColor: "c9243f",
                isActive: true,
                venue: {
                  id: "3839",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/nyg/new-york-giants",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/nyg/new-york-giants",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/nyg/new-york-giants",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/nyg",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/nyg",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/new-york-giants-tickets--sports-nfl-football/performer/599?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/nyg/new-york-giants",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/nyg",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/nyg",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/nyg",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/nyg.png",
              },
              score: "0",
              linescores: [
                {
                  value: 0,
                },
                {
                  value: 0,
                },
                {
                  value: 0,
                },
                {
                  value: 0,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "0-1",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-1",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "0-0",
                },
              ],
            },
            {
              id: "6",
              uid: "s:20~l:28~t:6",
              type: "team",
              order: 1,
              homeAway: "away",
              winner: true,
              team: {
                id: "6",
                uid: "s:20~l:28~t:6",
                location: "Dallas",
                name: "Cowboys",
                abbreviation: "DAL",
                displayName: "Dallas Cowboys",
                shortDisplayName: "Cowboys",
                color: "002a5c",
                alternateColor: "b0b7bc",
                isActive: true,
                venue: {
                  id: "3687",
                },
                links: [
                  {
                    rel: ["clubhouse", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/_/name/dal/dallas-cowboys",
                    text: "Clubhouse",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["roster", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/roster/_/name/dal/dallas-cowboys",
                    text: "Roster",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["stats", "desktop", "team"],
                    href: "http://www.espn.com/nfl/team/stats/_/name/dal/dallas-cowboys",
                    text: "Statistics",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["schedule", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/schedule/_/name/dal",
                    text: "Schedule",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["photos", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/photos/_/name/dal",
                    text: "photos",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["tickets", "desktop", "team"],
                    href: "https://www.vividseats.com/dallas-cowboys-tickets--sports-nfl-football/performer/214?wsUser=717",
                    text: "Tickets",
                    isExternal: true,
                    isPremium: false,
                  },
                  {
                    rel: ["draftpicks", "desktop", "team"],
                    href: "https://www.espn.com/nfl/draft/teams/_/name/dal/dallas-cowboys",
                    text: "Draft Picks",
                    isExternal: false,
                    isPremium: true,
                  },
                  {
                    rel: ["transactions", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/transactions/_/name/dal",
                    text: "Transactions",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["injuries", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/injuries/_/name/dal",
                    text: "Injuries",
                    isExternal: false,
                    isPremium: false,
                  },
                  {
                    rel: ["depthchart", "desktop", "team"],
                    href: "https://www.espn.com/nfl/team/depth/_/name/dal",
                    text: "Depth Chart",
                    isExternal: false,
                    isPremium: false,
                  },
                ],
                logo: "https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/dal.png",
              },
              score: "40",
              linescores: [
                {
                  value: 16,
                },
                {
                  value: 10,
                },
                {
                  value: 7,
                },
                {
                  value: 7,
                },
              ],
              statistics: [],
              records: [
                {
                  name: "overall",
                  abbreviation: "Game",
                  type: "total",
                  summary: "1-0",
                },
                {
                  name: "Home",
                  type: "home",
                  summary: "0-0",
                },
                {
                  name: "Road",
                  type: "road",
                  summary: "1-0",
                },
              ],
            },
          ],
          notes: [],
          status: {
            clock: 0,
            displayClock: "0:00",
            period: 4,
            type: {
              id: "3",
              name: "STATUS_FINAL",
              state: "post",
              completed: true,
              description: "Final",
              detail: "Final",
              shortDetail: "Final",
            },
          },
          broadcasts: [
            {
              market: "national",
              names: ["NBC"],
            },
          ],
          leaders: [
            {
              name: "passingYards",
              displayName: "Passing Leader",
              shortDisplayName: "PASS",
              abbreviation: "PYDS",
              leaders: [
                {
                  displayValue: "143 YDS",
                  value: 143,
                  athlete: {
                    id: "2577417",
                    fullName: "Dak Prescott",
                    displayName: "Dak Prescott",
                    shortName: "D. Prescott",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/2577417/dak-prescott",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/2577417/dak-prescott",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/2577417/dak-prescott",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/2577417/dak-prescott",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/2577417/dak-prescott",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/2577417/dak-prescott",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/2577417/dak-prescott",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/2577417.png",
                    jersey: "4",
                    position: {
                      abbreviation: "QB",
                    },
                    team: {
                      id: "6",
                    },
                    active: true,
                  },
                  team: {
                    id: "6",
                  },
                },
              ],
            },
            {
              name: "rushingYards",
              displayName: "Rushing Leader",
              shortDisplayName: "RUSH",
              abbreviation: "RYDS",
              leaders: [
                {
                  displayValue: "14 CAR, 70 YDS, 2 TD",
                  value: 70,
                  athlete: {
                    id: "3916148",
                    fullName: "Tony Pollard",
                    displayName: "Tony Pollard",
                    shortName: "T. Pollard",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3916148/tony-pollard",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/3916148/tony-pollard",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/3916148/tony-pollard",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/3916148/tony-pollard",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/3916148/tony-pollard",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/3916148/tony-pollard",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/3916148/tony-pollard",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/3916148.png",
                    jersey: "20",
                    position: {
                      abbreviation: "RB",
                    },
                    team: {
                      id: "6",
                    },
                    active: true,
                  },
                  team: {
                    id: "6",
                  },
                },
              ],
            },
            {
              name: "receivingYards",
              displayName: "Receiving Leader",
              shortDisplayName: "REC",
              abbreviation: "RECYDS",
              leaders: [
                {
                  displayValue: "4 REC, 77 YDS",
                  value: 77,
                  athlete: {
                    id: "4241389",
                    fullName: "CeeDee Lamb",
                    displayName: "CeeDee Lamb",
                    shortName: "C. Lamb",
                    links: [
                      {
                        rel: ["playercard", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4241389/ceedee-lamb",
                      },
                      {
                        rel: ["stats", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/stats/_/id/4241389/ceedee-lamb",
                      },
                      {
                        rel: ["splits", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/splits/_/id/4241389/ceedee-lamb",
                      },
                      {
                        rel: ["gamelog", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/gamelog/_/id/4241389/ceedee-lamb",
                      },
                      {
                        rel: ["news", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/news/_/id/4241389/ceedee-lamb",
                      },
                      {
                        rel: ["bio", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/bio/_/id/4241389/ceedee-lamb",
                      },
                      {
                        rel: ["overview", "desktop", "athlete"],
                        href: "http://www.espn.com/nfl/player/_/id/4241389/ceedee-lamb",
                      },
                    ],
                    headshot:
                      "https://a.espncdn.com/i/headshots/nfl/players/full/4241389.png",
                    jersey: "88",
                    position: {
                      abbreviation: "WR",
                    },
                    team: {
                      id: "6",
                    },
                    active: true,
                  },
                  team: {
                    id: "6",
                  },
                },
              ],
            },
          ],
          format: {
            regulation: {
              periods: 4,
            },
          },
          startDate: "2023-09-11T00:20Z",
          geoBroadcasts: [
            {
              type: {
                id: "1",
                shortName: "TV",
              },
              market: {
                id: "1",
                type: "National",
              },
              media: {
                shortName: "NBC",
              },
              lang: "en",
              region: "us",
            },
          ],
          headlines: [
            {
              description:
                "— The Dallas Cowboys have not only put some distance between themselves and the New York Giants in the NFC East, they showed Sunday night they are going to be a contender for more than a division title.",
              type: "Recap",
              shortLinkText:
                "Cowboys rip error-prone Giants 40-0 for worst shutout loss in the series between NFC East rivals",
              video: [
                {
                  id: 38375854,
                  source: "espn",
                  headline:
                    "Cowboys' defense stifles Giants in dominant 40-0 rout",
                  thumbnail:
                    "https://a.espncdn.com/media/motion/2023/0910/dm_230910_NFL_Highlight_Cowboys_defensive_sot/dm_230910_NFL_Highlight_Cowboys_defensive_sot.jpg",
                  duration: 104,
                  tracking: {
                    sportName: "nfl",
                    leagueName: "No League",
                    coverageType: "Final Game Highlight",
                    trackingName:
                      "COM_NFL Highlight (Cowboys' defense stifles Giants in dominant 40-0 rout) 2023/09/10 ESHEET SOTFULL",
                    trackingId: "dm_230910_NFL_Highlight_Cowboys_defensive_sot",
                  },
                  deviceRestrictions: {
                    type: "whitelist",
                    devices: ["desktop", "settop", "handset", "tablet"],
                  },
                  links: {
                    api: {
                      self: {
                        href: "http://api.espn.com/v1/video/clips/38375854",
                      },
                      artwork: {
                        href: "https://artwork.api.espn.com/artwork/collections/media/00dd29ac-1a21-42f6-bb32-f40e763dbf4c",
                      },
                    },
                    web: {
                      href: "https://www.espn.com/video/clip?id=38375854&ex_cid=espnapi_internal",
                      short: {
                        href: "https://www.espn.com/video/clip?id=38375854",
                      },
                      self: {
                        href: "https://www.espn.com/video/clip?id=38375854&ex_cid=espnapi_internal",
                      },
                    },
                    source: {
                      mezzanine: {
                        href: "https://media.video-origin.espn.com/espnvideo/2023/0910/dm_230910_NFL_Highlight_Cowboys_defensive_sot/dm_230910_NFL_Highlight_Cowboys_defensive_sot.mp4",
                      },
                      flash: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_NFL_Highlight_Cowboys_defensive_sot/dm_230910_NFL_Highlight_Cowboys_defensive_sot.smil",
                      },
                      hds: {
                        href: "https://hds.video-cdn.espn.com/z/motion/2023/0910/dm_230910_NFL_Highlight_Cowboys_defensive_sot/dm_230910_NFL_Highlight_Cowboys_defensive_sot_rel.smil/manifest.f4m",
                      },
                      HLS: {
                        href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_NFL_Highlight_Cowboys_defensive_sot/dm_230910_NFL_Highlight_Cowboys_defensive_sot/playlist.m3u8",
                        HD: {
                          href: "https://service-pkgespn.akamaized.net/opp/hls/espn/2023/0910/dm_230910_NFL_Highlight_Cowboys_defensive_sot/dm_230910_NFL_Highlight_Cowboys_defensive_sot/playlist.m3u8",
                        },
                      },
                      HD: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_NFL_Highlight_Cowboys_defensive_sot/dm_230910_NFL_Highlight_Cowboys_defensive_sot_720p30_2896k.mp4",
                      },
                      full: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_NFL_Highlight_Cowboys_defensive_sot/dm_230910_NFL_Highlight_Cowboys_defensive_sot_360p30_1464k.mp4",
                      },
                      href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_NFL_Highlight_Cowboys_defensive_sot/dm_230910_NFL_Highlight_Cowboys_defensive_sot_360p30_1464k.mp4",
                    },
                    mobile: {
                      alert: {
                        href: "http://m.espn.go.com/general/video/videoAlert?vid=38375854&ex_cid=espnapi_internal",
                      },
                      source: {
                        href: "https://media.video-cdn.espn.com/motion/2023/0910/dm_230910_NFL_Highlight_Cowboys_defensive_sot/dm_230910_NFL_Highlight_Cowboys_defensive_sot.mp4",
                      },
                      href: "https://watch.auth.api.espn.com/video/auth/brightcove/00dd29ac-1a21-42f6-bb32-f40e763dbf4c/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38375854",
                      streaming: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/00dd29ac-1a21-42f6-bb32-f40e763dbf4c/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38375854",
                      },
                      progressiveDownload: {
                        href: "https://watch.auth.api.espn.com/video/auth/brightcove/00dd29ac-1a21-42f6-bb32-f40e763dbf4c/asset?UMADPARAMreferer=http://www.espn.com/video/clip?id=38375854",
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      links: [
        {
          language: "en-US",
          rel: ["summary", "desktop", "event"],
          href: "https://www.espn.com/nfl/game/_/gameId/401547409",
          text: "Gamecast",
          shortText: "Gamecast",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["boxscore", "desktop", "event"],
          href: "https://www.espn.com/nfl/boxscore/_/gameId/401547409",
          text: "Box Score",
          shortText: "Box Score",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["highlights", "desktop"],
          href: "https://www.espn.com/nfl/video?gameId=401547409",
          text: "Highlights",
          shortText: "Highlights",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["pbp", "desktop", "event"],
          href: "https://www.espn.com/nfl/playbyplay/_/gameId/401547409",
          text: "Play-by-Play",
          shortText: "Play-by-Play",
          isExternal: false,
          isPremium: false,
        },
        {
          language: "en-US",
          rel: ["recap", "desktop", "event"],
          href: "https://www.espn.com/nfl/recap?gameId=401547409",
          text: "Recap",
          shortText: "Recap",
          isExternal: false,
          isPremium: false,
        },
      ],
      status: {
        clock: 0,
        displayClock: "0:00",
        period: 4,
        type: {
          id: "3",
          name: "STATUS_FINAL",
          state: "post",
          completed: true,
          description: "Final",
          detail: "Final",
          shortDetail: "Final",
        },
      },
    },
  ],
};

export const basicGamesAndPicksResponse: TRPCResponse<RouterOutput["pick"]> = {
  result: {
    data: {
      games: mockEspnResponse,
      poolName: "Test Pool",
    },
  },
};
export const responseWithPick: TRPCResponse<RouterOutput["pick"]> = {
  result: {
    data: {
      userPick: mockPick,
      games: mockEspnResponse,
      poolName: "Test Pool",
    },
  },
};

export const responseWithPickAndForbiddenTeams: TRPCResponse<
  RouterOutput["pick"]
> = {
  result: {
    data: {
      userPick: mockPick,
      games: mockEspnResponse,
      forbiddenTeams: ["Bills", "Jets"],
      poolName: "Test Pool",
    },
  },
};

export const picksForPoolResponse: TRPCResponse<RouterOutput["picksForPool"]> =
  {
    result: {
      data: {
        week: 1,
        picks: [
          {
            id: "123",
            username: "test@user.com",
            teamPicked: "Chiefs",
            week: 1,
            season: 2023,
            poolId: "12345",
            timestamp: "123",
          },
          {
            id: "456",
            username: "test2@user.com",
            teamPicked: "Bills",
            week: 1,
            season: 2023,
            poolId: "12345",
            timestamp: "123",
          },
        ],
      },
    },
  };
