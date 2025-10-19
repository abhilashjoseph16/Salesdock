import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import '@testing-library/jest-dom';

describe("Header Component", () => {
  it("renders without crashing", () => {
    render(<Header />);
  });

  it("renders the navigation items", () => {
    render(<Header />);
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("Leads")).toBeInTheDocument();
    expect(screen.getByText("Transacties")).toBeInTheDocument();
    expect(screen.getByText("Relaties")).toBeInTheDocument();
    expect(screen.getByText("Taken")).toBeInTheDocument();
    expect(screen.getByText("Media")).toBeInTheDocument();
  });

  it("renders the profile avatar", () => {
    render(<Header />);
    expect(screen.getByText("AB")).toBeInTheDocument();
  });
});
