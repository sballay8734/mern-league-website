// Shawn Ballay -> Shawn B.
export function formatOwnerName(str: string) {
  return (
    str.split(" ")[0] +
    " " +
    str.split(" ")[1].charAt(0).toLocaleUpperCase() +
    "."
  );
}

// Florida Panthers -> Panthers && Kansas City Chiefs -> Chiefs
export function formatTeamName(teamName: string) {
  const splitTeam = teamName.split(" ");
  const formattedTeam = splitTeam[splitTeam.length - 1];

  return formattedTeam;
}
