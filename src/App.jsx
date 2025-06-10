import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import './App.css';

function App() {
  const [quote, setQuote] = useState("");
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState(""); // State for user input
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner

  const fetchQuote = async () => {
    try {
      setIsLoading(true); // Show loading spinner
      setError(""); // Clear previous errors
      setQuote(""); // Clear previous quote

      const apiKey = import.meta.env.VITE_API_KEY; // Access API key from environment variables
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(userInput || "best english quotes."); // Use user input or default
      setQuote(result.response.text());
    } catch (err) {
      setError(err.message || "An error occurred while fetching the quote.");
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">✨ AI Quote Generator ✨</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a topic for the quote..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="input-field"
        />
        <button onClick={fetchQuote} className="generate-button">
          Generate Quote
        </button>
      </div>

      {isLoading && (
        <div className="loading-container">
          <p>Generating your quote... ✨</p>
          <div className="spinner"></div>
        </div>
      )}

      {error && (
        <div className="error-container">
          <p className="error-title">🚨 Error:</p>
          <p>{error}</p>
        </div>
      )}

      {quote && (
        <div className="quote-container">
          <h2 className="quote-title">🌿 Your Quote 🌿</h2>
          <p className="quote-text">{quote}</p>
        </div>
      )}
    </div>
  );
}

export default App;
