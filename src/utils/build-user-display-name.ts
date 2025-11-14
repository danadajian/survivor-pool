export function buildUserDisplayName({
  username,
  firstName,
  lastName,
}: {
  username: string;
  firstName?: string | null;
  lastName?: string | null;
}): string {
  const nameParts = [firstName, lastName]
    .map((name) => name?.trim())
    .filter((name): name is string => Boolean(name));

  return nameParts.length > 0 ? nameParts.join(" ") : username;
}
