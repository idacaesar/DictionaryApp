import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DictionaryPage from "./pages/DictionaryPage";
import { ThemeProvider } from "./ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>React Dictionary App</h1>
        </header>
        <main>
          <DictionaryPage />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
