import React from 'react';

// Flashcard component
function Flashcard({ question, answer }) {
    return (
        <div className="flashcard">
            <h3>Question: {question}</h3>
            <p>Answer: {answer}</p>
        </div>
    );
}

export default Flashcard;