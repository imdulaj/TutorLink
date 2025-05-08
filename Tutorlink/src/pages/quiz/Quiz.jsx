import { 
    Container, 
    Typography, 
    Card, 
    CardContent, 
    Button, 
    Radio, 
    RadioGroup,
    FormControlLabel, 
    FormControl,
    FormLabel,
    Box,
    Stepper,
    Step,
    StepLabel,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    LinearProgress
  } from '@mui/material';
  import { useState } from 'react';
  import { FaCheckCircle, FaClock } from 'react-icons/fa';
  import './Quiz.css';
  import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
  
  export function Quiz() {
    const [activeQuiz, setActiveQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
  
   
    const quizzes = [
      {
        id: 1,
        title: "Web Development Fundamentals",
        duration: "30 minutes",
        totalQuestions: 10,
        description: "Test your knowledge of HTML, CSS, and JavaScript basics."
      },
      {
        id: 2,
        title: "Science Mastery",
        duration: "45 minutes",
        totalQuestions: 15,
        description: "Advanced quiz on science"
      },
      {
        id: 3,
        title: "marketing",
        duration: "25 minutes",
        totalQuestions: 8,
        description: "Essential concepts of marketing."
      }
    ];
  
    
    const questions = [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Hyper Transfer Markup Language",
          "Home Tool Markup Language"
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "Which CSS property is used to change the text color?",
        options: [
          "text-style",
          "font-color",
          "color",
          "text-color"
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "What is the correct way to declare a JavaScript variable?",
        options: [
          "variable name = value",
          "var name = value",
          "v name = value",
          "variable = value"
        ],
        correctAnswer: 1
      }
    ];
  
    const handleStartQuiz = (quiz) => {
      setActiveQuiz(quiz);
      setCurrentQuestion(0);
      setAnswers({});
      setShowResult(false);
      setScore(0);
    };
  
    const handleAnswerSelect = (event) => {
      setAnswers({
        ...answers,
        [currentQuestion]: parseInt(event.target.value)
      });
    };
  
    const handleNext = () => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    };
  
    const handlePrevious = () => {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
      }
    };
  
    const handleSubmit = () => {
      let correctAnswers = 0;
      questions.forEach((question, index) => {
        if (answers[index] === question.correctAnswer) {
          correctAnswers++;
        }
      });
      setScore((correctAnswers / questions.length) * 100);
      setShowResult(true);
    };
  
    const handleCloseResult = () => {
      setShowResult(false);
      setActiveQuiz(null);
    };
  
    if (!activeQuiz) {
      return (
       <div>
        <Container component="main" maxWidth="lg" className="quiz-container">
           <Header />
          <Typography variant="h4" component="h1" className="quiz-title">
            Available Quizzes
          </Typography>
          
          <Box className="quiz-list">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="quiz-card">
                <CardContent>
                  <Typography variant="h6" className="quiz-card-title">
                    {quiz.title}
                  </Typography>
                  <Box className="quiz-card-info">
                    <Typography variant="body2" className="quiz-info-item">
                      <FaClock className="quiz-icon" /> {quiz.duration}
                    </Typography>
                    <Typography variant="body2" className="quiz-info-item">
                      {quiz.totalQuestions} Questions
                    </Typography>
                  </Box>
                  <Typography variant="body2" className="quiz-description">
                    {quiz.description}
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary"
                    fullWidth
                    onClick={() => handleStartQuiz(quiz)}
                    className="start-quiz-button"
                  >
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
        <Footer />
        </div>
      );
    }
  
    return (
      <div>
       
      <Container component="main" maxWidth="md" className="quiz-container">
      
        <Paper elevation={3} className="quiz-paper">
          <Typography variant="h5" className="active-quiz-title">
            {activeQuiz.title}
          </Typography>
  
          <LinearProgress 
            variant="determinate" 
            value={(currentQuestion + 1) / questions.length * 100} 
            className="quiz-progress"
          />
  
          <Stepper activeStep={currentQuestion} alternativeLabel className="quiz-stepper">
            {questions.map((_, index) => (
              <Step key={index}>
                <StepLabel>Q{index + 1}</StepLabel>
              </Step>
            ))}
          </Stepper>
  
          <Box className="question-container">
            <FormControl component="fieldset" className="question-form">
              <FormLabel component="legend" className="question-text">
                {questions[currentQuestion].question}
              </FormLabel>
              <RadioGroup
                value={answers[currentQuestion] || ''}
                onChange={handleAnswerSelect}
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={index}
                    control={<Radio />}
                    label={option}
                    className="answer-option"
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
  
          <Box className="quiz-actions">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outlined"
            >
              Previous
            </Button>
            {currentQuestion === questions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                disabled={Object.keys(answers).length !== questions.length}
              >
                Submit
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                variant="contained"
                color="primary"
                disabled={answers[currentQuestion] === undefined}
              >
                Next
              </Button>
            )}
          </Box>
        </Paper>
  
        <Dialog open={showResult} onClose={handleCloseResult}>
          <DialogTitle className="result-title">
            <FaCheckCircle className="result-icon" />
            Quiz Results
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6" className="score-text">
              Your Score: {score.toFixed(1)}%
            </Typography>
            <Typography variant="body1">
              You answered {Math.round(score / 100 * questions.length)} out of {questions.length} questions correctly.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseResult} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footer />
      </div>
      
    );
    
  }
  
  