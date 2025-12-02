import React from "react";

import { Heading } from "../../components/heading";
import { Surface } from "../../components/ui/surface";

export const rulesSections = [
  {
    id: "how-it-works",
    title: "How it works",
    body: [
      "Each round, pick one team to win their game. If they win, you survive to play another round. If they lose or tie, you're out.",
      "A round represents a week of games for NFL, and a day where any games are played for all other sports.",
      "The goal is simple: be the last person standing.",
    ],
  },
  {
    id: "picking-teams",
    title: "Picking your teams",
    body: [
      "You can only pick each team once. Choose wisely and plan several rounds ahead.",
      "Submit your pick before that team's game starts. You can wait until closer to game time—just don't miss the start time.",
    ],
  },
  {
    id: "elimination",
    title: "Elimination",
    body: [
      "Missed picks or losing selections cost you a life. Run out of lives and you're eliminated.",
      "If every remaining player misses in the same round, everyone survives to fight another round.",
    ],
  },
  {
    id: "winning",
    title: "Winning the pool",
    body: [
      "Last player standing takes the pot. If multiple players survive the regular season, the pool continues into the playoffs.",
      "Run out of teams to pick in the postseason? You're eliminated. If everyone runs out, picks reset.",
      "Reached the championship game with multiple survivors? Submit a final score prediction as a tiebreaker—the closest total score differential wins.",
    ],
  },
] as const;

export const RulesContent = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Heading>Survivor Pool Rules</Heading>
        <p className="max-w-3xl text-left text-base text-slate-600">
          Here's everything you need to know to run your pool smoothly and keep
          players on the same page.
        </p>
      </div>
      <article>
        <Surface className="flex flex-col gap-8">
          {rulesSections.map(({ id, title, body }) => (
            <section key={id} id={id} className="flex flex-col gap-3 text-left">
              <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
              <div className="flex flex-col gap-3 text-sm leading-relaxed text-slate-600">
                {body.map((paragraph, index) => (
                  <p key={`${id}-paragraph-${index}`}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </Surface>
      </article>
    </div>
  );
};
