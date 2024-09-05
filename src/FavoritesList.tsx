import React from "react";

interface FavoritesListProps {
  favorites: string[];
  onSelectFavorite: (word: string) => void;
  onRemoveFavorite: (word: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  onSelectFavorite,
  onRemoveFavorite,
}) => {
  return (
    <div className="favorites-list">
      <h3>Sparade favoriter</h3>
      {favorites.length === 0 ? (
        <p>Inga favoriter sparade</p>
      ) : (
        <ul>
          {favorites.map((word) => (
            <li key={word}>
              <span onClick={() => onSelectFavorite(word)}>{word}</span>
              <button onClick={() => onRemoveFavorite(word)}>Ta bort</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;
