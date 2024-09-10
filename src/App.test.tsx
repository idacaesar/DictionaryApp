import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Enhetstestning: Kontrollerar att App-komponenten renderas korrekt
test("renders learn react link", () => {
  // Renderar App-komponenten
  render(<App />);

  // Söker efter ett element med texten "React Dictionary App" (case-insensitive)
  const linkElement = screen.getByText(/React Dictionary App/i);

  // Verifierar att elementet finns i dokumentet
  expect(linkElement).toBeInTheDocument();
});
