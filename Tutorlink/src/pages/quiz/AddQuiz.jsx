import React, { useState } from 'react';
import axios from 'axios';
import './AddQuiz.css';
import { Link, useNavigate } from 'react-router-dom';

const AddQuiz = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    quizID: '',
    stream: '',
    duration: '',
    closingDate: '',
    questions: [{ question: '', answers: ['', '', '', ''], correctAnswer: '' }],
  });

  const [errors, setErrors] = useState({
    duration: '',
    closingDate: '',
    questions: [],
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
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { question: '', answers: ['', '', '', ''], correctAnswer: '' },
      ],
    });
  };

  const validateForm = () => {
    let valid = true;
    let tempErrors = {
      duration: '',
      closingDate: '',
      questions: [],
    };

    // Duration validation (positive integer)
    if (!quiz.duration || isNaN(quiz.duration) || quiz.duration <= 0) {
      tempErrors.duration = 'Please enter a valid duration in minutes.';
      valid = false;
    }

    // Closing date validation (must be in the future)
    const currentDate = new Date();
    const closingDate = new Date(quiz.closingDate);
    if (!quiz.closingDate || closingDate <= currentDate) {
      tempErrors.closingDate = 'Closing date must be in the future.';
      valid = false;
    }

    // Questions validation (check each question and correct answer)
    quiz.questions.forEach((q, index) => {
      let questionErrors = [];
      if (!q.question) {
        questionErrors.push('Question cannot be empty.');
      }
      if (!q.correctAnswer || !q.answers.includes(q.correctAnswer)) {
        questionErrors.push('Correct answer must be one of the provided answers.');
      }
      tempErrors.questions[index] = questionErrors;

      if (questionErrors.length > 0) {
        valid = false;
      }
    });

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('http://localhost:3000/api/quizzes/create', quiz);
        alert('Quiz added successfully');
        
        // Reset the quiz form after submission
        setQuiz({
          quizID: '',
          stream: '',
          duration: '',
          closingDate: '',
          questions: [{ question: '', answers: ['', '', '', ''], correctAnswer: '' }],
        });
  
        // Redirect to the ViewQuiz page
        navigate('/ViewQuiz');
      } catch (error) {
        console.error(error);
        alert('Error adding quiz');
      }
    }
  };
  

  return (
    <div className="add-quiz-container">
      <div className="form-paper">
        <h2 className="form-title">
          <span className="title-icon">📝</span> Add New Quiz
        </h2>
        {/* <Link to='/ViewQuiz' className="view-quiz-link"> */}
          {/* <button type="button" className="view-quiz-btn">View Quiz</button> */}
        {/* </Link> */}
        <form className="quiz-form" onSubmit={handleSubmit}>
          <div className="form-group">
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
          </div>
          <div className="form-group">
            <input
              type="number"
              name="duration"
              placeholder="Duration (mins)"
              value={quiz.duration}
              onChange={handleChange}
              className="input-field"
              required
            />
            {errors.duration && <div className="error-message">{errors.duration}</div>}
            <input
              type="date"
              name="closingDate"
              placeholder='Closing Date'
              value={quiz.closingDate}
              onChange={handleChange}
              className="input-field"
              required
            />
            {errors.closingDate && <div className="error-message">{errors.closingDate}</div>}
          </div>

          {quiz.questions.map((q, index) => (
            <div key={index} className="question-section">
              <input
                type="text"
                placeholder="Question"
                value={q.question}
                onChange={(e) => handleChange(e, index, 'question')}
                className="input-field question-input"
                required
              />
              <div className="answers-group">
                {q.answers.map((answer, i) => (
                  <input
                    key={i}
                    type="text"
                    data-index={i}
                    placeholder={`Answer ${i + 1}`}
                    value={answer}
                    onChange={(e) => handleChange(e, index, 'answers')}
                    className="input-field answer-input"
                    required
                  />
                ))}
              </div>
              <input
                type="text"
                placeholder="Correct Answer"
                value={q.correctAnswer}
                onChange={(e) => handleChange(e, index, 'correctAnswer')}
                className="input-field"
                required
              />
              {errors.questions[index] && errors.questions[index].map((error, idx) => (
                <div key={idx} className="error-message">{error}</div>
              ))}
            </div>
          ))}

          <button type="button" onClick={addQuestion} className="add-question-btn">Add Question</button>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddQuiz;
