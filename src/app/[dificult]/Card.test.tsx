import React from "react";
import { getByText, render, screen } from "@testing-library/react";
import Card from "./Card";

interface CardProps {
  key: number;
  emoji: string;
  isFlipped: boolean;
  handleClick: () => void;
}

test("renders Card component", () => {
  const props: CardProps = {
    key: 1,
    emoji: "🐶",
    isFlipped: true,
    handleClick: () => {},
  };
  const cardElement = render(<Card {...props} />);

  cardElement.getByText("🐶");
});
