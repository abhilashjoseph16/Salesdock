import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddDiscountModal from "./AddDiscountModal";
import '@testing-library/jest-dom';

describe("AddDiscountModal Component", () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  it("renders the modal title correctly for adding discount", () => {
    render(<AddDiscountModal onClose={mockOnClose} onSave={mockOnSave} />);
    expect(screen.getByText("Add discount")).toBeInTheDocument();
  });

  it("renders the modal title correctly for editing discount", () => {
    const discountData = { name: "Test", amount: 5, currency: "%", type: "monthly" };
    render(<AddDiscountModal onClose={mockOnClose} onSave={mockOnSave} discountData={discountData} />);
    expect(screen.getByText("Edit discount")).toBeInTheDocument();
  });

  it("renders cancel and add/save buttons", () => {
    render(<AddDiscountModal onClose={mockOnClose} onSave={mockOnSave} />);
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("calls onClose when Cancel button is clicked", () => {
    render(<AddDiscountModal onClose={mockOnClose} onSave={mockOnSave} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onSave with correct data when form is submitted", () => {
    render(<AddDiscountModal onClose={mockOnClose} onSave={mockOnSave} />);
    const discountInput = screen.getByPlaceholderText("Discount amount");
    fireEvent.change(discountInput, { target: { value: "5" } });

    const descriptionInput = screen.getByPlaceholderText("Discount description");
    fireEvent.change(descriptionInput, { target: { value: "Test Discount" } });

    fireEvent.click(screen.getByText("Add"));

    expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
      description: "Test Discount",
      price: 5,
      discountType: "%",
      priceType: "monthly"
    }));
  });

  it("shows error message when discount > 10%", () => {
    render(<AddDiscountModal onClose={mockOnClose} onSave={mockOnSave} />);
    const discountInput = screen.getByPlaceholderText("Discount amount");
    fireEvent.change(discountInput, { target: { value: "15" } });

    expect(screen.getByText("Exceeds the max. of 10%")).toBeInTheDocument();
    expect(discountInput).toHaveClass("invalid-input");
  });
});
