"use client";

import { Button } from "../ui/button";

function Key({
  ara,
  eng,
  onClick,
}: {
  ara: string;
  eng: string;
  onClick: (key: string) => void;
}) {
  return (
    <Button
      key={ara}
      className="text-2xl md:text-3xl font-bold py-8 dark:text-teal-600"
      variant="secondary"
      onClick={() => onClick(ara)}
    >
      {ara}
      <span className="relative top-2 left-1 font-medium text-xs md:text-sm text-primary">
        {eng}
      </span>
    </Button>
  );
}

export default Key;
