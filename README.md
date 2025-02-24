# Spaced Repetition Flashcards

## Description

This project is a spaced repetition system designed to help users memorize information more effectively by presenting flashcards at intervals based on their review history. The application uses **Flask** for the backend API, **React** for the frontend, and **SQLite** for storing the flashcards data.

## Features

- **Create Flashcards**: Users can add new flashcards with a question and an answer.
- **View Flashcards**: Users can view a list of all flashcards in the system.
- **Database Integration**: Flashcards are stored in an **SQLite** database using **SQLAlchemy** for data management.
- **RESTful API**: The backend provides API endpoints for managing flashcards, which is consumed by the React frontend.

## Technologies Used

- **Frontend**: React
- **Backend**: Flask
- **Database**: SQLite (via SQLAlchemy)
- **API Communication**: Axios (for frontend API requests)
- **State Management**: React useState and useEffect hooks

## Setup

### 1. Clone the repository:

```bash
git clone https://github.com/yourusername/spaced-repetition.git
cd spaced-repetition
