"use client";
import { useEffect, useState } from "react";
import Card from "./Card";

export interface BoardProps {
  numberTokens: number;
  sqrt: number;
  selectedToken: number;
  setSelectedToken: (key: number) => void;
  emojisArray: string[];
  setEmojisArray: (newValue: string[]) => void;
  isFlipped: boolean[];
  setIsFlipped: (newValue: boolean[]) => void;
  isFinded: boolean[];
  setIsFinded: (newValue: boolean[]) => void;
}

const handleClick = (
  key: number,
  emojis: string[],
  isFlipped: boolean[],
  setIsFlipped: (newValue: boolean[]) => void,
  isFinded: boolean[],
  setIsFinded: (newValue: boolean[]) => void,
  selectedToken: number,
  setSelectedToken: (key: number) => void
) => {
  if (isFinded[key] || isFlipped[key]) return;

  //flip the token
  const newIsFlipped = [...isFlipped];
  newIsFlipped[key] = true;
  setIsFlipped(newIsFlipped);

  if (selectedToken === -1) {
    setSelectedToken(key);
  } else {
    if (emojis[selectedToken] === emojis[key]) {
      const newIsFinded = [...isFinded];
      newIsFinded[selectedToken] = true;
      newIsFinded[key] = true;
      setIsFinded(newIsFinded);
    } else {
      setSelectedToken(-1);
      setTimeout(() => {
        const newIsFlipped = [...isFlipped];
        newIsFlipped[selectedToken] = false;
        newIsFlipped[key] = false;
        setIsFlipped(newIsFlipped);
      }, 500);
    }
    setSelectedToken(-1);
  }
};

//function that generate the tokens in the board, recibe the number of tokens, the array of emojis, the handleClick function for the tokens, the array of isFlipped and the array of isFinded, and return an array of tokens
function generateCards(
  numberTokens: number,
  emojisArray: string[],
  isFlipped: boolean[],
  setIsFlipped: (newValue: boolean[]) => void,
  isFinded: boolean[],
  setIsFinded: (newValue: boolean[]) => void,
  selectedToken: number,
  setSelectedToken: (key: number) => void
) {
  const cards = new Array<JSX.Element>();
  for (let i = 0; i < numberTokens; i++) {
    cards.push(
      <Card
        key={i}
        emoji={emojisArray[i]}
        handleClick={() =>
          handleClick(
            i,
            emojisArray,
            isFlipped,
            setIsFlipped,
            isFinded,
            setIsFinded,
            selectedToken,
            setSelectedToken
          )
        }
        isFlipped={isFlipped[i]}
      />
    );
  }
  console.log("termino de generar los tokens");
  return cards;
}

function Board({
  numberTokens,
  sqrt,
  emojisArray,
  isFlipped,
  setIsFlipped,
  isFinded,
  setIsFinded,
  selectedToken,
  setSelectedToken,
}: BoardProps) {
  const [cards, setCards] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    const Cards = generateCards(
      numberTokens,
      emojisArray,
      isFlipped,
      setIsFlipped,
      isFinded,
      setIsFinded,
      selectedToken,
      setSelectedToken
    );
    setCards(Cards);
  }, [
    emojisArray,
    isFlipped,
    isFinded,
    selectedToken,
    numberTokens,
    setIsFinded,
    setIsFlipped,
    setSelectedToken,
  ]);

  return (
    <div
      style={{
        gridTemplateRows: `repeat(${sqrt}, 1fr)`,
        gridTemplateColumns: `repeat(${sqrt}, 1fr)`,
        fontSize: `${90 / (sqrt * 2)}vh`,
      }}
      className="grid gap-1 w-full h-full"
    >
      {cards}
    </div>
  );
}

export default Board;
