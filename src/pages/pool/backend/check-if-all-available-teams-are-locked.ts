import { Events } from "../../../utils/fetch-current-games";

export function checkIfAllAvailableTeamsAreLocked({
  events,
  previouslyPickedTeams,
}: {
  events: Events;
  previouslyPickedTeams: string[];
}) {
  const teamsAvailableToPick = events.flatMap((event) =>
    event.competitions.flatMap((competition) =>
      competition.competitors.map((competitor) => competitor.team.name),
    ),
  );

  const unpickedTeams = teamsAvailableToPick.filter(
    (team) => !previouslyPickedTeams.includes(team),
  );

  return (
    unpickedTeams.length > 0 &&
    unpickedTeams.every((team) => {
      const event = events.find((event) =>
        event.competitions.some((competition) =>
          competition.competitors.some(
            (competitor) => competitor.team.name === team,
          ),
        ),
      );
      return event?.competitions[0]?.status.type.name !== "STATUS_SCHEDULED";
    })
  );
}
