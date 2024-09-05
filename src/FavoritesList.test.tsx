import { act } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FavoritesList from "./FavoritesList";

describe("FavoritesList", () => {
  const mockFavorites = ["apple", "banana", "cherry"];
  const mockOnSelectFavorite = jest.fn();
  const mockOnRemoveFavorite = jest.fn();

  test("renders list of favorites", () => {
    render(
      <FavoritesList
        favorites={mockFavorites}
        onSelectFavorite={mockOnSelectFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
      />
    );

    mockFavorites.forEach((favorite) => {
      expect(screen.getByText(favorite)).toBeInTheDocument();
    });
  });

  test("calls onSelectFavorite when a favorite is clicked", () => {
    render(
      <FavoritesList
        favorites={mockFavorites}
        onSelectFavorite={mockOnSelectFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
      />
    );

    fireEvent.click(screen.getByText("apple"));
    expect(mockOnSelectFavorite).toHaveBeenCalledWith("apple");
  });

  test("calls onRemoveFavorite when remove button is clicked", () => {
    render(
      <FavoritesList
        favorites={mockFavorites}
        onSelectFavorite={mockOnSelectFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
      />
    );

    fireEvent.click(screen.getAllByText("Ta bort")[0]);
    expect(mockOnRemoveFavorite).toHaveBeenCalledWith("apple");
  });

  test("displays message when favorites list is empty", () => {
    render(
      <FavoritesList
        favorites={[]}
        onSelectFavorite={mockOnSelectFavorite}
        onRemoveFavorite={mockOnRemoveFavorite}
      />
    );

    expect(screen.getByText("Inga favoriter sparade")).toBeInTheDocument();
  });
});
