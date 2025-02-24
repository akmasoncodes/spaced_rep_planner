import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Flashcard Component
function Flashcard({ card, onDelete }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-container">
      <div
        className={`flashcard ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
      >
        {/* FRONT (Question) */}
        <div className="front">
          <h3>Question: {card.question}</h3>
        </div>

        {/* BACK (Answer) */}
        <div className="back">
          <h3>Answer: {card.answer}</h3>
        </div>
      </div>

      {/* Delete button is below the card now */}
      <button className="delete-button" onClick={() => onDelete(card.id)}>
        Delete
      </button>
    </div>
  );
}

// Main App Component
function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current flashcard index
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  // Fetch flashcards from Flask API
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/flashcards')
      .then((response) => {
        setFlashcards(response.data);
      })
      .catch((error) => {
        console.error('Error fetching flashcards:', error);
      });
  }, []);

  // Add a new flashcard
  const handleAddFlashcard = (e) => {
    e.preventDefault();
    const newFlashcard = { question, answer };
    axios
      .post('http://localhost:5000/api/flashcards', newFlashcard)
      .then((response) => {
        setFlashcards([...flashcards, response.data]);
        setQuestion('');
        setAnswer('');
      })
      .catch((error) => {
        console.error('Error adding flashcard:', error);
      });
  };

  // Remove a flashcard
  const handleDeleteFlashcard = (id) => {
    axios
      .delete(`http://localhost:5000/api/flashcards/${id}`)
      .then(() => {
        setFlashcards(flashcards.filter((card) => card.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting flashcard:', error);
      });
  };

  // Cycle through flashcards
  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="App">
      <h1>Flashcards</h1>

      {/* Flashcard navigation */}
      <div>
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
        >
          Next
        </button>
      </div>

      {/* Display the current flashcard */}
      {flashcards.length > 0 && (
        <Flashcard
          key={flashcards[currentIndex].id}
          card={flashcards[currentIndex]}
          onDelete={handleDeleteFlashcard}
        />
      )}

      {/* Add flashcard form */}
      <form onSubmit={handleAddFlashcard}>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button type="submit">Add Flashcard</button>
      </form>
    </div>
  );
}

export default App;