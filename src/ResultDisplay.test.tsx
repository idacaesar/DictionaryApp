import { act } from "react";
import { render, screen } from "@testing-library/react";
import ResultDisplay from "./ResultDisplay";

// Mockdata för testning
const mockResult = {
  word: "test",
  phonetics: [{ text: "/test/", audio: "test.mp3" }],
  meanings: [
    {
      partOfSpeech: "noun",
      definitions: [{ definition: "A procedure for critical evaluation" }],
    },
  ],
};

describe("ResultDisplay", () => {
  // Enhetstestning: Kontrollerar att komponenten renderar korrekt med givna data
  test("renders word and its details when result is provided", () => {
    render(<ResultDisplay result={mockResult} />);

    // Verifierar att ordet visas
    expect(screen.getByText("test")).toBeInTheDocument();

    // Verifierar att fonetisk text visas
    expect(screen.getByText("/test/")).toBeInTheDocument();

    // Verifierar att ordklass visas
    expect(screen.getByText("noun")).toBeInTheDocument();

    // Verifierar att definitionen visas
    expect(
      screen.getByText("A procedure for critical evaluation")
    ).toBeInTheDocument();
  });

  // Enhetstestning: Kontrollerar komponentens beteende när inget resultat finns
  test("does not render anything when result is null", () => {
    const { container } = render(<ResultDisplay result={null} />);

    // Verifierar att komponenten inte renderar något när result är null
    expect(container.firstChild).toBeNull();
  });
});
