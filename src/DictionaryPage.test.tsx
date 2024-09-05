import { act } from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import DictionaryPage from "./pages/DictionaryPage";
import { searchWord } from "./dictionaryService";
import { ThemeProvider } from "./ThemeContext";

jest.mock("./dictionaryService");

const mockSearchWord = searchWord as jest.MockedFunction<typeof searchWord>;

describe("DictionaryPage", () => {
  beforeEach(() => {
    mockSearchWord.mockClear();
  });

  test("renders SearchBar and FavoritesList", () => {
    render(
      <ThemeProvider>
        <DictionaryPage />
      </ThemeProvider>
    );
    expect(screen.getByPlaceholderText("Sök efter ord")).toBeInTheDocument();
    expect(screen.getByText("Sparade favoriter")).toBeInTheDocument();
  });

  test("displays search results when a word is searched", async () => {
    mockSearchWord.mockResolvedValue([
      {
        word: "test",
        meanings: [{ definitions: [{ definition: "A sample definition" }] }],
      },
    ]);

    render(
      <ThemeProvider>
        <DictionaryPage />
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText("Sök efter ord");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(screen.getByRole("button", { name: "Sök" }));

    await waitFor(() => {
      expect(screen.getByText("test")).toBeInTheDocument();
      expect(screen.getByText("A sample definition")).toBeInTheDocument();
    });
  });

  test("displays error message when search fails", async () => {
    mockSearchWord.mockRejectedValue(new Error("Word not found"));

    render(
      <ThemeProvider>
        <DictionaryPage />
      </ThemeProvider>
    );

    const input = screen.getByPlaceholderText("Sök efter ord");
    fireEvent.change(input, { target: { value: "nonexistentword" } });
    fireEvent.click(screen.getByRole("button", { name: "Sök" }));

    await waitFor(() => {
      expect(screen.getByText("Word not found")).toBeInTheDocument();
    });
  });
});
