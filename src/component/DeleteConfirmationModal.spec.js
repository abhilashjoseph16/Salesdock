import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import '@testing-library/jest-dom';

describe("DeleteConfirmationModal Component", () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  it("renders the modal title and message", () => {
    render(<DeleteConfirmationModal onClose={mockOnClose} onConfirm={mockOnConfirm} />);
    expect(screen.getByRole('heading', { name: /Delete discount/i })).toBeInTheDocument();
    expect(screen.getByText("Are you sure you want to delete this discount?")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(<DeleteConfirmationModal onClose={mockOnClose} onConfirm={mockOnConfirm} />);
    fireEvent.click(screen.getByRole('button', { name: /Close/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when delete button is clicked", () => {
    render(<DeleteConfirmationModal onClose={mockOnClose} onConfirm={mockOnConfirm} />);
    fireEvent.click(screen.getByRole('button', { name: /Delete discount/i }));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });
});
