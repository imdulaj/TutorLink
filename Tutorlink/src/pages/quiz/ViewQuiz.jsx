import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './ViewQuiz.css';
import { FaEdit, FaTrashAlt, FaFilePdf } from 'react-icons/fa';
import jsPDF from 'jspdf';

const ViewQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/quizzes/all');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const handleEdit = (quizId) => {
    navigate(`/EditQuiz/${quizId}`);
  };

  const handleDelete = async (quizId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this quiz?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/quizzes/delete/${quizId}`);
        setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
        alert('Quiz deleted successfully!');
      } catch (error) {
        console.error('Error deleting quiz:', error);
        alert('Failed to delete the quiz.');
      }
    }
  };

  const exportToPDF = (quiz) => {
    const doc = new jsPDF();
    
    // Set the document title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Quiz Details", 105, 15, null, null, "center");
  
    // Quiz Info Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Quiz ID:", 10, 30);
    doc.setFont("helvetica", "normal");
    doc.text(`${quiz.quizID}`, 40, 30);
  
    doc.setFont("helvetica", "bold");
    doc.text("Stream:", 10, 40);
    doc.setFont("helvetica", "normal");
    doc.text(`${quiz.stream}`, 40, 40);
  
    doc.setFont("helvetica", "bold");
    doc.text("Duration:", 10, 50);
    doc.setFont("helvetica", "normal");
    doc.text(`${quiz.duration} mins`, 40, 50);
  
    doc.setFont("helvetica", "bold");
    doc.text("Closing Date:", 10, 60);
    doc.setFont("helvetica", "normal");
    doc.text(`${new Date(quiz.closingDate).toLocaleDateString()}`, 50, 60);
  
    // Add a line separator
    doc.setLineWidth(0.5);
    doc.line(10, 70, 200, 70);
  
    // Questions Section
    let y = 80;
    quiz.questions.forEach((q, index) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(`Q${index + 1}:`, 10, y);
      doc.setFont("helvetica", "normal");
      doc.text(q.question, 20, y);
      y += 10;
  
      // Answer options
      q.answers.forEach((answer, i) => {
        doc.setFontSize(12);
        doc.text(`• ${answer}`, 25, y);
        y += 8;
      });
  
      y += 10; // Extra space before the next question
    });
  
    // Save the PDF with a proper name
    doc.save(`Quiz_${quiz.quizID}.pdf`);
  };
  
  

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2 className="quiz-heading">All Quizzes</h2>
        <Link to='/AddQuiz'><button className="add-quiz-button" onClick={() => navigate('/AddQuiz')}>
          Add New Quiz
        </button></Link>
      </div>

      {loading ? (
        <p className="loading">Loading quizzes...</p>
      ) : quizzes.length === 0 ? (
        <p className="no-quizzes">No quizzes available. Add some quizzes to display here.</p>
      ) : (
        <div className="quiz-grid">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="quiz-card">
              <h3 className="quiz-title">{quiz.quizID} - {quiz.stream}</h3>
              <p><strong>Duration:</strong> {quiz.duration} mins</p>
              <p><strong>Closing Date:</strong> {new Date(quiz.closingDate).toLocaleDateString()}</p>
              <h4>Questions:</h4>
              <ul className="question-list">
                {quiz.questions.map((q, index) => (
                  <li key={index} className="question-item">
                    <p><strong>Q:</strong> {q.question}</p>
                    <ul className="answer-list">
                      {q.answers.map((answer, i) => (
                        <li key={i} className="answer-item">{answer}</li>
                      ))}
                    </ul>
                    <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
                  </li>
                ))}
              </ul>
              <div className="quiz-actions">
                <button className="edit-button" onClick={() => handleEdit(quiz._id)}>
                  <FaEdit /> Edit
                </button>
                <button className="export-button" onClick={() => exportToPDF(quiz)}>
                  <FaFilePdf /> Export to PDF
                </button>
                <button className="delete-button" onClick={() => handleDelete(quiz._id)}>
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewQuiz;
