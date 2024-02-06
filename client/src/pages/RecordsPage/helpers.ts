export function formatRecordName(name: string) {
  if (name.includes(" ")) {
    return name.split(" ")[0] + " " + name.split(" ")[1].charAt(0)
  }

  return name
}
