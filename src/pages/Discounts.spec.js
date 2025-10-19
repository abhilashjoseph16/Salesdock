import React from "react";
import { render, screen } from "@testing-library/react";
import Discounts from "./Discounts";

describe("Discounts Component", () => {
  it("renders without crashing", () => {
    render(<Discounts />);
    expect(screen.getByText("Discounts")).toBeInTheDocument();
  });

  it("renders the add manual discount button", () => {
    render(<Discounts />);
    expect(screen.getByText("+ Add manual discount")).toBeInTheDocument();
  });
});
