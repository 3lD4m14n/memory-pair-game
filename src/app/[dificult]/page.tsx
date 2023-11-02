"use client";
import Board from "./Board";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { BoardProps } from "./Board";
import arrowBack from "./assets/arrow-back-up.svg";
import reload from "./assets/reload.svg";

//function that recibe the number of emojis and return an array with that number of emojis, the emojis are ramdom, the amojis should be not repeated, and the array is duplicated and shufled, the emojis must be generated from their unicodes
function getEmojis(numberEmojis: number) {
  let randomEmoji = require("random-unicode-emoji");
  const emojis = randomEmoji.random({ count: numberEmojis });
  const emojisDuplicated = [...emojis, ...emojis];
  const emojisShufled = emojisDuplicated.sort(() => Math.random() - 0.5);
  return emojisShufled;
}

function Game({ params }: { params: { dificult: string } }) {
  //perimeter is dificult + 1, max dificult is 9, so max perimeter is 10, validate that perimeter is not greater than 10
  const perimeter = Math.min(parseInt(params.dificult) * 2, 10);
  const numberTokens = perimeter ** 2;
  const [selectedToken, setSelectedToken] = useState<number>(-1);
  const [emojisArray, setEmojisArray] = useState(getEmojis(numberTokens / 2));
  const [isFlipped, setIsFlipped] = useState(
    new Array<boolean>(numberTokens).fill(false)
  );
  const [isFinded, setIsFinded] = useState(
    new Array<boolean>(numberTokens).fill(false)
  );

  function reestartGame() {
    setSelectedToken(-1);
    setEmojisArray(getEmojis(numberTokens / 2));
    setIsFlipped(new Array<boolean>(numberTokens).fill(false));
    setIsFinded(new Array<boolean>(numberTokens).fill(false));
  }

  const boardProps: BoardProps = {
    numberTokens,
    sqrt: perimeter,
    selectedToken,
    setSelectedToken,
    emojisArray,
    setEmojisArray,
    isFlipped,
    setIsFlipped,
    isFinded,
    setIsFinded,
  };

  return (
    <div className="h-screen">
      <div className=" flex justify-between items-center p-5 h-[10%]">
        <button
          onClick={reestartGame}
          className=" h-[30px] w-[30px] bg-white rounded-full transition-colors hover:bg-gray-600"
        >
          <Image src={reload} alt="reload" width={30} height={30} />
        </button>
        <Link
          href={"../"}
          className=" h-[30px] w-[30px] bg-white rounded-full transition-colors hover:bg-gray-600"
        >
          <Image src={arrowBack} alt="back" width={30} height={30} />
        </Link>
      </div>
      <div className="flex justify-center w-full h-[90%]">
        <Board {...boardProps} />
      </div>
    </div>
  );
}

export default Game;
