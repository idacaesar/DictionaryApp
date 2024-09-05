// dictionaryService.ts

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export interface WordData {
  word: string;
  phonetics: Array<{ text?: string; audio?: string }>;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{ definition: string; example?: string }>;
  }>;
}

export async function searchWord(word: string): Promise<WordData[]> {
  try {
    const response = await fetch(`${API_URL}${word}`);

    if (!response.ok) {
      throw new Error("Ordet hittades inte");
    }

    const data: WordData[] = await response.json();
    return data;
  } catch (error) {
    console.error("Ett fel uppstod vid sökningen:", error);
    throw error;
  }
}
