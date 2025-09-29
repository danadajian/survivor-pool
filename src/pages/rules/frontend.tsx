import React from "react";

import { Heading } from "../../components/heading";
import { withPage } from "../../components/page-wrapper";

const RulesComponent = () => {
  return (
    <>
      <Heading>Survivor Pool Rules</Heading>
      <main>
        <section id="how-it-works" className="mb-8">
          <h2 className="mb-4 border-b-2 border-indigo-500 pb-2 text-2xl font-bold text-gray-700">
            How It Works
          </h2>
          <p className="m-2 leading-relaxed text-gray-600">
            Each week, you will pick one NFL team to win their game. If your
            chosen team wins, you survive and advance to the next week. If your
            team loses, you are eliminated from the pool. The goal is to be the
            last person standing.
          </p>
        </section>

        <section id="picking-teams" className="mb-8">
          <h2 className="mb-4 border-b-2 border-indigo-500 pb-2 text-2xl font-bold text-gray-700">
            Picking Your Teams
          </h2>
          <ul className="m-2 space-y-4 text-gray-600">
            <li>
              <strong>One-Time Use:</strong> You can only use each NFL team once
              for the entire season. For example, if you pick the Kansas City
              Chiefs in Week 1, you cannot pick them again for the rest of the
              season.
            </li>
            <li>
              <strong>Deadline:</strong> Your pick just needs to be submitted
              before your team's game kicks off. Your pick does not need to be
              locked in before the first game of each week.
            </li>
          </ul>
        </section>

        <section id="elimination" className="mb-8">
          <h2 className="mb-4 border-b-2 border-indigo-500 pb-2 text-2xl font-bold text-gray-700">
            Elimination
          </h2>
          <ul className="m-2 space-y-4 text-gray-600">
            <li>
              You are eliminated from the pool if your selected team loses their
              game. You are also eliminated if you fail to pick a team by the
              time the final game of a week starts.
            </li>
            <li>
              If you pick a team that ties their game, you may re-pick any
              underdog team (according to ESPN's odds) that has yet to play that
              week. If no underdogs are left to pick that week, you are
              eliminated. Both picks will count toward teams you can no longer
              pick if you survive.
            </li>
            <li>
              If all remaining survivors fail to pick a winning team, everyone
              survives the week.
            </li>
            <li>The pool continues until only one player remains.</li>
          </ul>
        </section>

        <section id="winning" className="mb-8">
          <h2 className="mb-4 border-b-2 border-indigo-500 pb-2 text-2xl font-bold text-gray-700">
            Winning the Pool
          </h2>
          <ul className="m-2 space-y-4 text-gray-600">
            <li>The last person remaining in the pool wins the whole pot.</li>
            <li>
              If the pool reaches the end of the regular season and there is
              more than one survivor, the pool will continue through the
              playoffs. If a survivor has already picked all remaining NFL teams
              in the playoffs, they are eliminated. If all remaining survivors
              have run out of teams to pick, all picks will reset.
            </li>
            <li>
              If the pool somehow reaches the Superbowl, remaining survivors
              must submit an exact score along with their pick to the
              commissioner to act as a tiebreaker. Closest total score
              differential breaks a tie.
            </li>
          </ul>
        </section>
      </main>
    </>
  );
};

export const Rules = withPage(RulesComponent);
