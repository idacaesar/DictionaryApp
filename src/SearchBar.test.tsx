import { act } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  // Enhetstestning: Kontrollerar att komponenten renderar korrekt
  test("renders input field and search button", () => {
    render(<SearchBar onSearch={() => {}} />);

    // Verifierar att sökfältet finns
    expect(screen.getByPlaceholderText("Sök efter ord")).toBeInTheDocument();

    // Verifierar att sökknappen finns
    expect(screen.getByRole("button", { name: "Sök" })).toBeInTheDocument();
  });

  // Interaktionstestning: Kontrollerar att sökfunktionen anropas korrekt
  test("calls onSearch with input value when search button is clicked", () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    // Simulerar inmatning i sökfältet
    const input = screen.getByPlaceholderText("Sök efter ord");
    fireEvent.change(input, { target: { value: "test" } });

    // Simulerar klick på sökknappen
    const searchButton = screen.getByRole("button", { name: "Sök" });
    fireEvent.click(searchButton);

    // Verifierar att sökfunktionen anropas med rätt värde
    expect(mockOnSearch).toHaveBeenCalledWith("test");
  });

  // Interaktionstestning: Kontrollerar felhantering vid tom sökning
  test("does not call onSearch when input is empty", () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    // Simulerar klick på sökknappen utan att fylla i sökfältet
    const searchButton = screen.getByRole("button", { name: "Sök" });
    fireEvent.click(searchButton);

    // Verifierar att sökfunktionen inte anropas när sökfältet är tomt
    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
