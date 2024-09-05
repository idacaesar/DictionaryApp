import { act } from "react";
import { render, screen } from "@testing-library/react";
import ResultDisplay from "./ResultDisplay";

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
  test("renders word and its details when result is provided", () => {
    render(<ResultDisplay result={mockResult} />);
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("/test/")).toBeInTheDocument();
    expect(screen.getByText("noun")).toBeInTheDocument();
    expect(
      screen.getByText("A procedure for critical evaluation")
    ).toBeInTheDocument();
  });

  test("does not render anything when result is null", () => {
    const { container } = render(<ResultDisplay result={null} />);
    expect(container.firstChild).toBeNull();
  });
});
