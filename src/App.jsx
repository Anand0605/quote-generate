
import './App.css'
import React, { useState, useEffect } from 'react';

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleNewQuote = () => {
    setError(null);
    fetchQuote();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', }}>
      <h1>Random Quote Generator</h1>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <>
          <h2>"{quote}"</h2>
          <p>- {author}</p>
        </>
      )}
      <button className='btn' onClick={handleNewQuote}>
        Generate Quote
      </button>
    </div>
  );
};

export default App;
