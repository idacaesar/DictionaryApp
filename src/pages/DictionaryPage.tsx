import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import ResultDisplay from "../ResultDisplay";
import FavoritesList from "../FavoritesList";
import ThemeToggle from "../ThemeToggle";
import { searchWord } from "../dictionaryService";
import { useTheme } from "../ThemeContext";
import "../Dictionary.css";

interface WordData {
  word: string;
  phonetics: Array<{ text?: string; audio?: string }>;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{ definition: string; example?: string }>;
  }>;
}

const DictionaryPage: React.FC = () => {
  const [result, setResult] = useState<WordData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleSearch = async (word: string) => {
    try {
      const data = await searchWord(word);
      setResult(data[0]);
      setError(null);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Error");
    }
  };

  const addToFavorites = (word: string) => {
    if (!favorites.includes(word)) {
      const newFavorites = [...favorites, word];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (word: string) => {
    const newFavorites = favorites.filter((fav) => fav !== word);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <div className={`dictionary-page ${theme}`}>
      <ThemeToggle />
      <SearchBar onSearch={handleSearch} />
      {error && <p className="error">{error}</p>}
      <ResultDisplay result={result} />
      {result && (
        <button onClick={() => addToFavorites(result.word)}>
          Lägg till som favorit
        </button>
      )}
      <FavoritesList
        favorites={favorites}
        onSelectFavorite={handleSearch}
        onRemoveFavorite={removeFromFavorites}
      />
    </div>
  );
};

export default DictionaryPage;
