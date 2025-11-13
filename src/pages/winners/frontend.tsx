import {
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { TrophyIcon } from "@heroicons/react/24/solid";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import React, { Fragment } from "react";

import { Heading } from "../../components/heading";
import { type PageProps, withPage } from "../../components/page-wrapper";
import { Surface } from "../../components/ui/surface";
import { type RouterOutput, trpc } from "../../trpc";

type WinnersData = RouterOutput["winners"];
type WinnerRecord = WinnersData["winners"][number];

const WinnersComponent = ({ user: { username } }: PageProps) => {
  const [{ seasons, winners }] = trpc.winners.useSuspenseQuery({ username });
  const [selectedSeason, setSelectedSeason] = React.useState<number | null>(
    seasons[0] ?? null,
  );

  React.useEffect(() => {
    if (!seasons.length) {
      if (selectedSeason !== null) {
        setSelectedSeason(null);
      }
      return;
    }
    if (selectedSeason === null || !seasons.includes(selectedSeason)) {
      setSelectedSeason(seasons[0] ?? null);
    }
  }, [seasons, selectedSeason]);

  const winnersForSeason =
    selectedSeason === null
      ? []
      : winners.filter(
          (winner) => winner.season === selectedSeason && winner.winner,
        );
  const hasAnyWinners = winners.some((winner) => winner.winner);

  return (
    <div className="flex w-full flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-2 sm:gap-3">
        <Heading>Pool Winners</Heading>
        <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
          Celebrate past champions from the pools you joined. Choose a season to
          see who survived the longest.
        </p>
      </div>
      <Surface className="flex flex-col gap-4 sm:gap-6">
        {seasons.length === 0 ? (
          <div className="flex flex-col gap-2 text-left sm:gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 sm:text-sm">
              History
            </p>
            <p className="text-base font-semibold text-slate-800 sm:text-lg">
              No completed pools yet
            </p>
            <p className="text-sm text-slate-500 sm:text-base">
              Once your pools finish, you&apos;ll be able to revisit the
              winners right here.
            </p>
          </div>
        ) : (
          <>
            <SeasonSelector
              seasons={seasons}
              selectedSeason={selectedSeason}
              onChange={setSelectedSeason}
            />
            <WinnersList
              winners={winnersForSeason}
              season={selectedSeason}
              hasAnyWinners={hasAnyWinners}
            />
          </>
        )}
      </Surface>
    </div>
  );
};

const SeasonSelector = ({
  seasons,
  selectedSeason,
  onChange,
}: {
  seasons: WinnersData["seasons"];
  selectedSeason: number | null;
  onChange: (season: number) => void;
}) => {
  if (!seasons.length || selectedSeason === null) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1.5 text-left sm:gap-2">
      <label
        htmlFor="season-select"
        className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 sm:text-sm"
      >
        Season
      </label>
      <Listbox value={selectedSeason} onChange={onChange}>
        <div className="relative mt-0.5">
          <ListboxButton
            id="season-select"
            className="relative w-full cursor-pointer rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-left text-sm font-medium text-slate-700 shadow-sm shadow-slate-900/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 sm:px-4 sm:py-2.5"
          >
            <span>{selectedSeason}</span>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center sm:right-4">
              <ChevronUpDownIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-slate-200 bg-white/95 py-1 shadow-lg focus:outline-none">
              {seasons.map((season) => (
                <ListboxOption
                  key={season}
                  value={season}
                  className={({ focus }) =>
                    `relative cursor-pointer select-none px-3 py-2 text-sm sm:px-4 ${focus ? "bg-slate-100 text-slate-900" : "text-slate-600"}`
                  }
                >
                  {({ selected }) => (
                    <div className="flex items-center justify-between gap-3">
                      <span className={selected ? "font-semibold text-slate-900" : "font-medium"}>
                        {season}
                      </span>
                      {selected ? (
                        <CheckIcon className="h-4 w-4 text-slate-900" aria-hidden="true" />
                      ) : null}
                    </div>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

const WinnersList = ({
  winners,
  season,
  hasAnyWinners,
}: {
  winners: WinnerRecord[];
  season: number | null;
  hasAnyWinners: boolean;
}) => {
  if (!season) {
    return null;
  }

  if (!hasAnyWinners) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white/60 p-4 text-left shadow-sm shadow-slate-900/5">
        <p className="text-base font-semibold text-slate-800">
          None of your pools have winners yet.
        </p>
        <p className="text-sm text-slate-500">
          Keep playing—once a pool wraps up, the champion will appear here.
        </p>
      </div>
    );
  }

  if (!winners.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white/60 p-4 text-left shadow-sm shadow-slate-900/5">
        <p className="text-base font-semibold text-slate-800">
          No winners recorded for {season}.
        </p>
        <p className="text-sm text-slate-500">
          It looks like none of your pools were completed in this season.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {winners.map((winner) => (
        <WinnerCard key={winner.poolId} winner={winner} />
      ))}
    </div>
  );
};

const WinnerCard = ({ winner }: { winner: WinnerRecord }) => {
  const winnerDisplay = winner.winner;
  const weekRange =
    winner.weekEnded && winner.weekEnded !== winner.weekStarted
      ? `Weeks ${winner.weekStarted} – ${winner.weekEnded}`
      : `Week ${winner.weekStarted}`;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm shadow-slate-900/10 transition hover:-translate-y-0.5 hover:shadow-lg sm:rounded-3xl sm:p-6">
      <div className="flex flex-col gap-3 text-left sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600 shadow-inner shadow-amber-200 sm:h-12 sm:w-12">
            <TrophyIcon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-amber-700 sm:text-xs sm:tracking-[0.34em]">
              {winner.poolName}
            </p>
            <p className="text-base font-semibold text-slate-900 sm:text-lg">
              {winnerDisplay}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-baseline sm:text-sm">
          <span className="inline-flex w-max items-center rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600 sm:px-3.5">
            {weekRange}
          </span>
          <span className="hidden sm:inline">Champion locked in and the pool is complete.</span>
        </div>
      </div>
    </div>
  );
};

export const Winners = withPage(WinnersComponent);

