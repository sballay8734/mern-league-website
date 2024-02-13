import { useState } from "react";

interface PlayerPropFilterBtnInterface {
  handleFilterBtns: (str: string) => void;
  type: string;
  filterKey: string;
  activeFilter: string;
}

export default function PlayerPropFilterBtn({
  handleFilterBtns,
  type,
  filterKey,
  activeFilter,
}: PlayerPropFilterBtnInterface) {
  const [active, setActive] = useState<boolean>(false);

  function handleClick(filterKey: string) {
    setActive(!active);

    handleFilterBtns(filterKey);
  }

  return (
    <button
      className={`${activeFilter === filterKey && "active"}`}
      key={type}
      onClick={() => handleClick(filterKey)}
    >
      {type}
    </button>
  );
}
