from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Enable CORS for cross-origin requests
CORS(app)

# Set up SQLite database URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flashcards.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking for better performance

# Initialize the database
db = SQLAlchemy(app)

# Flashcard model
class Flashcard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(100), nullable=False)
    answer = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'<Flashcard {self.id} - {self.question}>'

# Create the database tables
with app.app_context():
    db.create_all()

# Route to get flashcards
@app.route('/api/flashcards', methods=['GET'])
def get_flashcards():
    flashcards = Flashcard.query.all()
    return jsonify([{'id': f.id, 'question': f.question, 'answer': f.answer} for f in flashcards])

# Route to add a new flashcard
@app.route('/api/flashcards', methods=['POST'])
def add_flashcard():
    data = request.get_json()  # Get JSON data from the request body
    new_flashcard = Flashcard(question=data['question'], answer=data['answer'])
    db.session.add(new_flashcard)
    db.session.commit()
    return jsonify({'message': 'Flashcard added successfully!'}), 201

from flask import request

@app.route('/api/flashcards/<int:id>', methods=['DELETE'])
def delete_flashcard(id):
    flashcard = Flashcard.query.get(id)
    if flashcard:
        db.session.delete(flashcard)
        db.session.commit()
        return '', 204  # No content, successful deletion
    return {'message': 'Flashcard not found'}, 404

if __name__ == '__main__':
    app.run(debug=True)