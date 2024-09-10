import { act } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FavoritesList from "./FavoritesList";

describe("FavoritesList", () => {
  // Mockdata och mockfunktioner för tester
  const mockFavorites = ["apple", "banana", "cherry"];
  const mockOnSelectFavorite = jest.fn();
  const mockOnRemoveFavorite = jest.fn();

  // Enhetstestning: Kontrollerar att listan av favoriter renderas korrekt
  test("renders list of favorites", () => {
    render(
      <FavoritesList
        favorites={mockFavorites}
        onSelectFavorite={mockOnSelectFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
      />
    );

    // Verifierar att varje favorit finns i dokumentet
    mockFavorites.forEach((favorite) => {
      expect(screen.getByText(favorite)).toBeInTheDocument();
    });
  });

  // Interaktionstestning: Kontrollerar att onSelectFavorite anropas när en favorit klickas
  test("calls onSelectFavorite when a favorite is clicked", () => {
    render(
      <FavoritesList
        favorites={mockFavorites}
        onSelectFavorite={mockOnSelectFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
      />
    );

    // Simulerar klick på en favorit och verifierar att callback-funktionen anropas
    fireEvent.click(screen.getByText("apple"));
    expect(mockOnSelectFavorite).toHaveBeenCalledWith("apple");
  });

  // Interaktionstestning: Kontrollerar att onRemoveFavorite anropas när ta bort-knappen klickas
  test("calls onRemoveFavorite when remove button is clicked", () => {
    render(
      <FavoritesList
        favorites={mockFavorites}
        onSelectFavorite={mockOnSelectFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
      />
    );

    // Simulerar klick på ta bort-knappen och verifierar att callback-funktionen anropas
    fireEvent.click(screen.getAllByText("Ta bort")[0]);
    expect(mockOnRemoveFavorite).toHaveBeenCalledWith("apple");
  });

  // Enhetstestning: Kontrollerar att rätt meddelande visas när favoritlistan är tom
  test("displays message when favorites list is empty", () => {
    render(
      <FavoritesList
        favorites={[]}
        onSelectFavorite={mockOnSelectFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
      />
    );

    // Verifierar att meddelandet för tom lista visas
    expect(screen.getByText("Inga favoriter sparade")).toBeInTheDocument();
  });
});
