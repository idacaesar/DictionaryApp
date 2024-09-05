import axios from "axios";

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export const searchWord = async (word: string) => {
  try {
    const response = await axios.get(`${API_URL}${word}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error("Word not found");
    }
    throw new Error("An error occurred while fetching the data");
  }
};
