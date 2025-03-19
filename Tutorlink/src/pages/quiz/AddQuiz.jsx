import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { FaQuestionCircle } from 'react-icons/fa';
import './AddQuiz.css';

const AddQuiz = () => {
  const [quizData, setQuizData] = useState({
    title: '',
    duration: '',
    totalQuestions: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Quiz Data:', quizData);
   
  };

  return (
    <Container className="add-quiz-container">
      <Paper elevation={3} className="form-paper">
        <Typography variant="h4" className="form-title">
          <FaQuestionCircle className="title-icon" />
          Add New Quiz
        </Typography>

        <form onSubmit={handleSubmit} className="quiz-form">
          <TextField
            fullWidth
            label="Quiz Title"
            name="title"
            value={quizData.title}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Duration (in minutes)"
            name="duration"
            type="number"
            value={quizData.duration}
            onChange={handleChange}
            required
            margin="normal"
            inputProps={{ min: 1 }}
          />

          <TextField
            fullWidth
            label="Total Questions"
            name="totalQuestions"
            type="number"
            value={quizData.totalQuestions}
            onChange={handleChange}
            required
            margin="normal"
            inputProps={{ min: 1 }}
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={quizData.description}
            onChange={handleChange}
            required
            margin="normal"
            multiline
            rows={4}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="submit-btn"
            size="large"
          >
            Create Quiz
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddQuiz;