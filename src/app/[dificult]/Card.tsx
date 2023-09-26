"use client";
interface CardProps {
  emoji: string;
  isFlipped: boolean;
  handleClick: () => void;
}

function Card({ emoji, isFlipped, handleClick }: CardProps) {
  return (
    <div
      style={{ transform: `rotateY(${isFlipped ? "180deg" : "0deg"})` }}
      className=" flex justify-center items-center transition-transform bg-white w-full h-full rounded-lg shadow-lg cursor-pointer text-[5vw]"
      onClick={handleClick}
    >
      {isFlipped ? emoji : ""}
    </div>
  );
}

export default Card;
