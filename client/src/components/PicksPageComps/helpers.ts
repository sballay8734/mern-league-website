export function formatTeamName(teamName: string) {
  const splitTeam = teamName.split(" ")
  const formattedTeam = splitTeam[splitTeam.length - 1]

  return formattedTeam
}
