export default function ChallengeHistory() {
  // fetch challenges
  return (
    <>
      <nav className="flex h-full w-full items-start justify-center">
        <ul className="flex gap-6">
          <li className="font-bold text-red-500">
            <button className="underline">League History</button>
          </li>
          <li className="font-bold text-red-500">
            <button>My History</button>
          </li>
        </ul>
      </nav>
    </>
  );
}
