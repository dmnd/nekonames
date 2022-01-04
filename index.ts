/**
 * Given a full name, generate candidate compact names by abbreviating names
 * subsequent to the first. Assumes the first name is the given name. Returns
 * names in ascending order of length.
 *
 * E.g: candidateNames("George Raymond Richard Martin") -> [
 *   "George",
 *   "George M.",
 *   "George Martin",
 *   "George R. R. M.",
 *   "George R. R. Martin",
 *   "George Raymond Richard Martin"
 * ]
 */
function candidateNames(fullName: string): Array<string> {
  const names = fullName.split(" ");
  if (names.length === 1 || fullName.length <= 8) return [fullName];

  const firstName = names.shift()!;
  const lastName = names.pop()!;
  const middleNames = names;

  const candidates = [
    firstName,
    `${firstName} ${lastName[0]}.`,
    `${firstName} ${lastName}`,
  ];
  if (middleNames.length > 0) {
    const middleInitials = middleNames.map((n) => `${n[0]}.`).join(" ");
    candidates.push(
      `${firstName} ${middleInitials} ${lastName[0]}.`,
      `${firstName} ${middleInitials} ${lastName}`,
      fullName
    );
  }

  names.sort((a, b) => a.length - b.length);
  return candidates;
}

/**
 * Given an array of unique full names, returns an object mapping them to more
 * compact but still unambiguous names.
 */
export default function nekonames(
  names: Array<string>
): Record<string, string> {
  const all = names.map(candidateNames);
  const counts = new Map<string, number>();
  for (const nicks of all) {
    for (const nick of nicks) {
      counts.set(nick, (counts.get(nick) ?? 0) + 1);
    }
  }

  return all.reduce((result, nicks) => {
    const fullName = nicks[nicks.length - 1];
    result[fullName] = nicks.find((n) => counts.get(n) === 1) ?? fullName;
    return result;
  }, {} as Record<string, string>);
}
