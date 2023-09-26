"use client";
import { useState } from "react";
import Link from "next/link";

function DificultSelection() {
  const [dificult, setDificult] = useState<number>(1);

  function increaseDificult() {
    if (dificult === 9) {
      return;
    }
    setDificult((prev) => (prev < 9 ? prev + 1 : prev));
  }

  function decreaseDificult() {
    if (dificult === 1) {
      return;
    }
    setDificult((prev) => (prev > 1 ? prev - 1 : prev));
  }

  return (
    <div className=" h-screen w-screen flex flex-col justify-center items-center gap-[15px text-black transition-colors rounded-xl]">
      <h1 className=" text-4xl text-white">Select Dificult</h1>
      <div className=" flex flex-col gap-3">
        <button
          onClick={increaseDificult}
          className=" text-2xl text-black transition-colors rounded-xl bg-white hover:bg-black hover:text-white"
        >
          ⬆
        </button>
        <span className=" border-white bg-black text-white text-center">
          {dificult}
        </span>
        <button
          onClick={decreaseDificult}
          className=" text-2xl text-black transition-colors rounded-xl bg-white hover:bg-black hover:text-white"
        >
          ⬇
        </button>
        <Link
          href={`/${dificult}`}
          className="text-xl bg-white rounded-lg w-20 h-7 hover:bg-blue-400 text-center"
        >
          Play
        </Link>
      </div>
    </div>
  );
}

export default DificultSelection;
