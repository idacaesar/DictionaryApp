import React from "react";

interface WordData {
  word: string;
  phonetics: Array<{ text?: string; audio?: string }>;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{ definition: string; example?: string }>;
  }>;
}

interface ResultDisplayProps {
  result: WordData | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="result-display">
      <h2>{result.word}</h2>
      {result.phonetics.map((phonetic, index) => (
        <div key={index} className="phonetics">
          {phonetic.text && <p>{phonetic.text}</p>}
          {phonetic.audio && (
            <audio controls src={phonetic.audio}>
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      ))}
      {result.meanings.map((meaning, index) => (
        <div key={index} className="meaning">
          <h3>{meaning.partOfSpeech}</h3>
          <ol>
            {meaning.definitions.map((def, defIndex) => (
              <li key={defIndex}>
                <p>{def.definition}</p>
                {def.example && (
                  <p>
                    <em>Exempel: {def.example}</em>
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

export default ResultDisplay;
