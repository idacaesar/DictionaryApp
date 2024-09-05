import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (word: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [word, setWord] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (word.trim()) {
      onSearch(word);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Sök efter ord"
      />
      <button type="submit">Sök</button>
    </form>
  );
};

export default SearchBar;
