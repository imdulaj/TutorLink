import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddQuiz.css'; // Using the same CSS as AddQuiz
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  FaHome, FaBook, FaFileAlt, FaQuestionCircle, FaChartBar,
  FaPlus, FaTimes, FaArrowLeft, FaSave, FaEdit
} from 'react-icons/fa';

const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/quizzes/${id}`);
        
        // Format the closing date to YYYY-MM-DD for input field
        const quizData = response.data;
        if (quizData.closingDate) {
          quizData.closingDate = new Date(quizData.closingDate).toISOString().split('T')[0];
        }
        
        setQuiz(quizData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz data', error);
        alert('Error fetching quiz data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchQuiz();
  }, [id]);

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
      questions: [...quiz.questions, { question: '', answers: ['', '', '', ''], correctAnswer: '' }],
    });
  };

  const removeQuestion = (indexToRemove) => {
    if (quiz.questions.length > 1) {
      setQuiz({
        ...quiz,
        questions: quiz.questions.filter((_, index) => index !== indexToRemove),
      });
    }
  };

  const handleCorrectAnswerSelection = (questionIndex, answerIndex) => {
    const newQuiz = { ...quiz };
    newQuiz.questions[questionIndex].correctAnswer =
      newQuiz.questions[questionIndex].answers[answerIndex];
    setQuiz(newQuiz);
  };

  const validateForm = () => {
    let valid = true;
    let tempErrors = {
      duration: '',
      closingDate: '',
      questions: [],
    };

    if (!quiz.duration || isNaN(quiz.duration) || quiz.duration <= 0) {
      tempErrors.duration = 'Please enter a valid duration in minutes.';
      valid = false;
    }

    const currentDate = new Date();
    const closingDate = new Date(quiz.closingDate);
    if (!quiz.closingDate || closingDate <= currentDate) {
      tempErrors.closingDate = 'Closing date must be in the future.';
      valid = false;
    }

    quiz.questions.forEach((q, index) => {
      let questionErrors = [];
      if (!q.question) questionErrors.push('Question cannot be empty.');
      if (!q.correctAnswer || !q.answers.includes(q.correctAnswer)) {
        questionErrors.push('Correct answer must be one of the provided answers.');
      }
      tempErrors.questions[index] = questionErrors;
      if (questionErrors.length > 0) valid = false;
    });

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.put(`http://localhost:3000/api/quizzes/update/${id}`, quiz);
        alert('Quiz updated successfully');
        navigate('/ViewQuiz');
      } catch (error) {
        console.error(error);
        alert('Error updating quiz');
      }
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <div className="layout-container">
        <div className="quiz-container">
          <div className="loading-state">
            <h2>Loading quiz data...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="layout-container">
      {/* Mobile Menu Toggle */}
      <div className="mobile-menu-toggle" onClick={toggleSidebar}>
        <span></span><span></span><span></span>
      </div>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h3>Learning Portal</h3>
        <ul>
          <li><Link to="/dashboard"><FaHome /> <span>Dashboard</span></Link></li>
          <li><Link to="/courses"><FaBook /> <span>Course List</span></Link></li>
          <li><Link to="/materials"><FaFileAlt /> <span>Materials</span></Link></li>
          <li><Link to="/quizzes" className="active"><FaQuestionCircle /> <span>Quizzes</span></Link></li>
          <li><Link to="/reports"><FaChartBar /> <span>Reports</span></Link></li>
        </ul>
      </div>

      <div className="quiz-container">
        <div className="quiz-header">
          <h1>Edit Quiz</h1>
          <Link to="/ViewQuiz" className="back-button">
            <FaArrowLeft /> Back to Quizzes
          </Link>
        </div>

        <div className="quiz-form-container">
          <form className="quiz-form" onSubmit={handleSubmit}>
            {/* Quiz Details */}
            <div className="form-section">
              <h2><FaEdit /> Quiz Details</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="quizID">Quiz ID</label>
                  <input
                    type="text"
                    id="quizID"
                    name="quizID"
                    placeholder="Enter quiz identifier"
                    value={quiz.quizID}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="stream">Stream/Subject</label>
                  <input
                    type="text"
                    id="stream"
                    name="stream"
                    placeholder="Enter subject"
                    value={quiz.stream}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="duration">Duration (minutes)</label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    placeholder="Enter quiz duration"
                    value={quiz.duration}
                    onChange={handleChange}
                    required
                  />
                  {errors.duration && <div className="error-message">{errors.duration}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="closingDate">Closing Date</label>
                  <input
                    type="date"
                    id="closingDate"
                    name="closingDate"
                    value={quiz.closingDate}
                    onChange={handleChange}
                    required
                  />
                  {errors.closingDate && <div className="error-message">{errors.closingDate}</div>}
                </div>
              </div>
            </div>

            {/* Questions Section */}
            <div className="form-section">
              <h2><FaQuestionCircle /> Questions</h2>
              {quiz.questions.map((q, index) => (
                <div key={index} className="question-section">
                  <div className="question-section-header">
                    <div className="question-number">Question {index + 1}</div>
                    {quiz.questions.length > 1 && (
                      <button
                        type="button"
                        className="remove-question-btn"
                        onClick={() => removeQuestion(index)}
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor={`question-${index}`}>Question Text</label>
                    <input
                      type="text"
                      id={`question-${index}`}
                      placeholder="Enter question"
                      value={q.question}
                      onChange={(e) => handleChange(e, index, 'question')}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Answer Options</label>
                    <div className="answers-group">
                      {q.answers.map((answer, i) => (
                        <input
                          key={i}
                          type="text"
                          data-index={i}
                          placeholder={`Answer ${i + 1}`}
                          value={answer}
                          onChange={(e) => handleChange(e, index, 'answers')}
                          required
                        />
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Correct Answer</label>
                    <div className="answers-group" style={{ gridTemplateColumns: '1fr' }}>
                      {q.answers.map((answer, i) => answer && (
                        <div key={i} className="answer-radio">
                          <input
                            type="radio"
                            id={`correct-${index}-${i}`}
                            name={`correct-${index}`}
                            checked={q.correctAnswer === answer}
                            onChange={() => handleCorrectAnswerSelection(index, i)}
                            required
                          />
                          <label htmlFor={`correct-${index}-${i}`}>{answer}</label>
                        </div>
                      ))}
                    </div>
                    {errors.questions[index] && errors.questions[index].map((err, idx) => (
                      <div key={idx} className="error-message">{err}</div>
                    ))}
                  </div>
                </div>
              ))}
              <button type="button" onClick={addQuestion} className="add-question-btn">
                <FaPlus /> Add Another Question
              </button>
            </div>

            {/* Form Buttons */}
            <div className="button-group">
              <Link to="/ViewQuiz" className="cancel-btn"><FaTimes /> Cancel</Link>
              <button type="submit" className="submit-btn"><FaSave /> Update Quiz</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditQuiz;