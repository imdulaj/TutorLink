import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditQuiz.css';


const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    quizID: '',
    stream: '',
    duration: '',
    closingDate: '',
    questions: [{ question: '', answers: ['', '', '', ''], correctAnswer: '' }],
  });

  // Fetch quiz data when component mounts
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/quizzes/${id}`);
        setQuiz(response.data); // Set the fetched quiz data
      } catch (error) {
        console.error('Error fetching quiz data', error);
        alert('Error fetching quiz data. Please try again later.');
      }
    };

    fetchQuiz();
  }, [id]);

  // Handle input changes
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

  // Add a new question field
  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { question: '', answers: ['', '', '', ''], correctAnswer: '' },
      ],
    });
  };

  // Handle form submission (update quiz)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/quizzes/update/${id}`, quiz);
      if (response.status === 200) {
        alert('Quiz updated successfully');
        navigate('/ViewQuiz');
      } else {
        alert('Failed to update quiz');
      }
    } catch (error) {
      console.error('Error updating quiz', error);
      alert('Error updating quiz. Please try again.');
    }
  };

  return (
    <div className="edit-quiz-container">
      <div className="form-paper">
        <h2 className="form-title">
          <span className="title-icon">✏️</span> Edit Quiz
        </h2>
        <form className="quiz-form" onSubmit={handleSubmit}>
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
            min="1"
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
                className="input-field"
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
                  className="input-field"
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
            Update Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditQuiz;
