import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from '.Flashcard';

function FlashcardList() {
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/flashcards')
            .then(response => {
                setFlashcards(response.data);
            })
            .catch(error => {
                console.error('Error fetching flashcards:', error);
            }); 
    }, []);

    return (
        <div className="flashcard-list">
            {flashcards.map(flashcard => (
                <Flashcard key={flashcard.id} question={flashcard.question} answer={flashcard.answer} />
            ))}
        </div>
    );
}

export default FlashcardList;