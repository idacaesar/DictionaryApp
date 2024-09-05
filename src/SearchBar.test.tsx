import { act } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  test("renders input field and search button", () => {
    render(<SearchBar onSearch={() => {}} />);
    expect(screen.getByPlaceholderText("Sök efter ord")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sök" })).toBeInTheDocument();
  });

  test("calls onSearch with input value when search button is clicked", () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("Sök efter ord");
    fireEvent.change(input, { target: { value: "test" } });

    const searchButton = screen.getByRole("button", { name: "Sök" });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith("test");
  });

  test("does not call onSearch when input is empty", () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const searchButton = screen.getByRole("button", { name: "Sök" });
    fireEvent.click(searchButton);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
