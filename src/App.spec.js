import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
}));

describe("App Component", () => {
  it("renders Header and Discounts page", () => {
    render(<App />);
    expect(screen.getByText("Discounts")).toBeInTheDocument();
  });
});
