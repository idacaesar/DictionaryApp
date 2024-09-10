import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import DictionaryPage from "./pages/DictionaryPage";
import { searchWord } from "./dictionaryService";
import { ThemeProvider } from "./ThemeContext";

// Mockar dictionaryService för att kontrollera dess beteende i tester
jest.mock("./dictionaryService");

const mockSearchWord = searchWord as jest.MockedFunction<typeof searchWord>;

describe("DictionaryPage", () => {
  beforeEach(() => {
    // Rensar mock-funktionen före varje test
    mockSearchWord.mockClear();
  });

  // Enhetstestning: Kontrollerar att komponenter renderas korrekt
  test("renders SearchBar and FavoritesList", () => {
    render(
      <ThemeProvider>
        <DictionaryPage />
      </ThemeProvider>
    );
    // Verifierar att sökfältet och favoritlistan finns på sidan
    expect(screen.getByPlaceholderText("Sök efter ord")).toBeInTheDocument();
    expect(screen.getByText("Sparade favoriter")).toBeInTheDocument();
  });

  // Integrationstestning: Testar interaktion mellan komponenter och API
  test("displays search results when a word is searched", async () => {
    // Mockar API-svaret
    mockSearchWord.mockResolvedValue([
      {
        word: "test",
        phonetics: [],
        meanings: [
          {
            partOfSpeech: "noun",
            definitions: [{ definition: "A sample definition" }],
          },
        ],
      },
    ]);

    render(
      <ThemeProvider>
        <DictionaryPage />
      </ThemeProvider>
    );

    // Simulerar användarinteraktion
    const input = screen.getByPlaceholderText("Sök efter ord");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(screen.getByRole("button", { name: "Sök" }));

    // Verifierar att sökresultaten visas korrekt
    await waitFor(() => {
      expect(screen.getByText("test")).toBeInTheDocument();
      expect(screen.getByText("A sample definition")).toBeInTheDocument();
    });
  });

  // Felhanteringstestning: Kontrollerar hur applikationen hanterar fel
  test("displays error message when search fails", async () => {
    // Mockar ett API-fel
    mockSearchWord.mockRejectedValue(new Error("Word not found"));

    render(
      <ThemeProvider>
        <DictionaryPage />
      </ThemeProvider>
    );

    // Simulerar en sökning som misslyckas
    const input = screen.getByPlaceholderText("Sök efter ord");
    fireEvent.change(input, { target: { value: "nonexistentword" } });
    fireEvent.click(screen.getByRole("button", { name: "Sök" }));

    // Verifierar att felmeddelandet visas
    await waitFor(() => {
      expect(screen.getByText("Word not found")).toBeInTheDocument();
    });
  });
});
