import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [quote, setQuote] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("best english quotes.");
        setQuote(result.response.text());
      } catch (err) {
        setError(err.message || "An error occurred while fetching the quote.");
      }
    };

    fetchQuote();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h1 style={{ color: "#4A90E2", marginBottom: "20px" }}>✨ AI Quote Generator ✨</h1>
      {error ? (
        <div style={{
          backgroundColor: "#FFE4E4",
          color: "#D8000C",
          padding: "15px",
          borderRadius: "8px",
          border: "1px solid #FFBABA",
          display: "inline-block",
          maxWidth: "500px",
          margin: "20px auto",
        }}>
          <p style={{ fontWeight: "bold" }}>🚨 Error:</p>
          <p>{error}</p>
        </div>
      ) : quote ? (
        <div style={{
          backgroundColor: "#F0F8FF",
          color: "#333",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          display: "inline-block",
          maxWidth: "600px",
          margin: "20px auto",
        }}>
          <h2 style={{ fontSize: "1.5em", marginBottom: "10px" }}>🌿 Your Quote 🌿</h2>
          <p style={{ fontSize: "1.2em", lineHeight: "1.6" }}>{quote}</p>
        </div>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <p style={{ fontSize: "1.2em", color: "#666" }}>Generating your quote... ✨</p>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #ccc",
              borderTop: "4px solid #4A90E2",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "20px auto",
            }}
          />
        </div>
      )}
    </div>
  );
  
}

export default App;
