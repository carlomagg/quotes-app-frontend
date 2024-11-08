import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [quote, setQuote] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Function to fetch a random quote from the backend
  const fetchQuote = async () => {
    try {
      const response = await axios.get('http://localhost:5000/quote');
      setQuote(response.data);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  // Function to save the current quote to favorites
  const saveQuote = async () => {
    if (quote) {
      setFavorites([...favorites, quote]); // Update favorites list
    }
  };

  // Fetch a quote on initial render
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="App">
      <h1>Random Quotes</h1>
      <div>
        {quote ? (
          <>
            <p>"{quote.content}"</p>
            <p>- {quote.author}</p>
            <button onClick={fetchQuote}>New Quote</button>
            <button onClick={saveQuote}>Save</button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((fav, index) => (
          <li key={index}>
            "{fav.content}" - {fav.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
