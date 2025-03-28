import React, { useState } from 'react';
import axios from 'axios';
import './AddQuiz.css';
import { Link } from 'react-router-dom';

const AddQuiz = () => {
  const [quiz, setQuiz] = useState({
    quizID: '',
    stream: '',
    duration: '',
    closingDate: '',
    questions: [{ question: '', answers: ['', '', '', ''], correctAnswer: '' }],
  });

  const handleChange = (e, index, field) => {
    const newQuiz = { ...quiz };
    if (field === 'question' || field === 'correctAnswer') {
      newQuiz.questions[index][field] = e.target.value;
    } else if (field === 'answers') {
      newQuiz.questions[index].answers[e.target.dataset.index] = e.target.value;
    } else {
      newQuiz[e.target.name] = e.target.value;
    }
    setQuiz(newQuiz);
  };

  const addQuestion = () => {
    setQuiz({ ...quiz, questions: [...quiz.questions, { question: '', answers: ['', '', '', ''], correctAnswer: '' }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/quizzes/create', quiz);
      alert('Quiz added successfully');
      setQuiz({
        quizID: '',
        stream: '',
        duration: '',
        closingDate: '',
        questions: [{ question: '', answers: ['', '', '', ''], correctAnswer: '' }],
      });
    } catch (error) {
      console.error(error);
      alert('Error adding quiz');
    }
  };

  // Function for the View Quiz button
  const viewQuiz = () => {
    navigate('/ViewQuiz'); 
  };

  return (
    <div className="add-quiz-container">
      <div className="form-paper">
        <h2 className="form-title">
          <span className="title-icon">📝</span> Add New Quiz
        </h2>
        <form className="quiz-form" onSubmit={handleSubmit}>
          <Link to='/ViewQuiz'><button type="button" onClick={viewQuiz} className="view-quiz-btn">
            View Quiz
          </button></Link>
          <input
            type="text"
            name="quizID"
            placeholder="Quiz ID"
            value={quiz.quizID}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="stream"
            placeholder="Stream"
            value={quiz.stream}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (mins)"
            value={quiz.duration}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="date"
            name="closingDate"
            value={quiz.closingDate}
            onChange={handleChange}
            className="input-field"
            required
          />

            {quiz.questions.map((q, index) => (
              <div key={index} className="question-section">
                <input
                  type="text"
                  placeholder="Question"
                  value={q.question}
                  onChange={(e) => handleChange(e, index, 'question')}
                  className="input-field question-input" // added new class for question input styling
                  required
                />
                {q.answers.map((answer, i) => (
                  <input
                    key={i}
                    type="text"
                    data-index={i}
                    placeholder={`Answer ${i + 1}`}
                    value={answer}
                    onChange={(e) => handleChange(e, index, 'answers')}
                    className="input-field answer-input" // added new class for answer inputs styling
                    required
                  />
                ))}
                <input
                  type="text"
                  placeholder="Correct Answer"
                  value={q.correctAnswer}
                  onChange={(e) => handleChange(e, index, 'correctAnswer')}
                  className="input-field"
                  required
                />
              </div>
            ))}

          <button type="button" onClick={addQuestion} className="add-question-btn">
            Add Question
          </button>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuiz;
