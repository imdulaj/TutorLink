import React, { useState, useEffect } from 'react';
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
  LinearProgress,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { createClient } from '@supabase/supabase-js';
import { Brain, Award, Clock, Medal, CheckCircle } from 'lucide-react';
import './Quiz.css';

// Initialize Supabase client
const supabaseUrl = 'https://poogwstjghpyvidxigev.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb2d3c3RqZ2hweXZpZHhpZ2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NDcwMDAsImV4cCI6MjA2MjQyMzAwMH0.dDXbzBqDCnJojlePngYskBoU5c5aOmi1WhvUk7Gfn1w';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function Quiz() {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true);

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
      title: "Marketing Essentials",
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

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setIsLoadingLeaderboard(true);
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .order('percentage', { ascending: false });

      if (error) throw error;
      setLeaderboardData(data || []);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError('Failed to load leaderboard data');
    } finally {
      setIsLoadingLeaderboard(false);
    }
  };

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

  const handleSaveResult = async () => {
    if (!userName.trim() || !userEmail.trim()) {
      setError('Please enter both name and email');
      return;
    }
    
    if (!userEmail.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    setError('');
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('quiz_results')
        .insert([
          {
            user_name: userName,
            user_email: userEmail,
            quiz_id: activeQuiz.id,
            score: Math.round(score / 100 * questions.length),
            total_questions: questions.length,
            percentage: score,
            completed_at: new Date()
          }
        ]);

      if (error) throw error;
      await fetchLeaderboard();
      handleCloseResult();
    } catch (err) {
      console.error('Error saving result:', err);
      setError('Failed to save your score. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseResult = () => {
    setShowResult(false);
    setActiveQuiz(null);
    setUserName('');
    setUserEmail('');
    setError('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMedalColor = (index) => {
    switch(index) {
      case 0: return '#FFD700'; // Gold
      case 1: return '#C0C0C0'; // Silver
      case 2: return '#CD7F32'; // Bronze
      default: return 'transparent';
    }
  };

  if (!activeQuiz) {
    return (
      <Container component="main" maxWidth="lg" className="quiz-container">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mb: 2
          }}>
            <Brain style={{ marginRight: '12px' }} />
            Available Quizzes
          </Typography>
          
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Test your knowledge and compete for the highest scores
          </Typography>
        </Box>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3, mb: 4 }}>
          {quizzes.map((quiz) => (
            <Card key={quiz.id} sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>
                  {quiz.title}
                </Typography>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography variant="body2" sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    mr: 2
                  }}>
                    <Clock size={16} style={{ marginRight: '4px' }} />
                    {quiz.duration}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    display: 'flex', 
                    alignItems: 'center' 
                  }}>
                    <Brain size={16} style={{ marginRight: '4px' }} />
                    {quiz.totalQuestions} Questions
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {quiz.description}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => handleStartQuiz(quiz)}
                  sx={{ mt: 'auto' }}
                >
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mb: 3
          }}>
            <Award style={{ marginRight: '12px' }} />
            Leaderboard
          </Typography>

          {isLoadingLeaderboard ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
          ) : leaderboardData.length === 0 ? (
            <Alert severity="info">
              No scores yet. Be the first to complete a quiz and set a high score!
            </Alert>
          ) : (
            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme => theme.palette.grey[100] }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Rank</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Quiz</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Score</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderboardData.map((result, index) => (
                    <TableRow key={result.id} sx={{ 
                      '&:nth-of-type(odd)': { backgroundColor: theme => theme.palette.action.hover },
                      transition: 'background-color 0.2s',
                      '&:hover': { backgroundColor: theme => theme.palette.grey[100] }
                    }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {index < 3 && (
                            <Medal 
                              size={20} 
                              style={{ 
                                color: getMedalColor(index),
                                marginRight: 8,
                                filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.3))'
                              }} 
                            />
                          )}
                          {index + 1}
                        </Box>
                      </TableCell>
                      <TableCell>{result.user_name}</TableCell>
                      <TableCell>
                        {quizzes.find(q => q.id === result.quiz_id)?.title || 'Unknown Quiz'}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={`${result.percentage.toFixed(1)}%`}
                          color={
                            result.percentage >= 80 ? 'success' : 
                            result.percentage >= 60 ? 'primary' : 
                            result.percentage >= 40 ? 'warning' : 'error'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{formatDate(result.completed_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="md" className="quiz-container">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          {activeQuiz.title}
        </Typography>

        <LinearProgress 
          variant="determinate" 
          value={(currentQuestion + 1) / questions.length * 100} 
          sx={{ mb: 3, height: 8, borderRadius: 4 }}
        />

        <Stepper activeStep={currentQuestion} alternativeLabel sx={{ mb: 4 }}>
          {questions.map((_, index) => (
            <Step key={index}>
              <StepLabel>Q{index + 1}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mb: 4 }}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" sx={{ mb: 2, fontSize: '1.1rem', fontWeight: 500 }}>
              {questions[currentQuestion].question}
            </FormLabel>
            <RadioGroup
              value={answers[currentQuestion] !== undefined ? answers[currentQuestion].toString() : ''}
              onChange={handleAnswerSelect}
            >
              {questions[currentQuestion].options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index.toString()}
                  control={<Radio />}
                  label={option}
                  sx={{ mb: 1 }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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

      <Dialog 
        open={showResult} 
        onClose={handleCloseResult}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center',
          backgroundColor: theme => theme.palette.primary.main,
          color: 'white'
        }}>
          <CheckCircle style={{ marginRight: '8px' }} />
          Quiz Results
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ 
              mb: 1, 
              color: score >= 70 ? 'success.main' : score >= 40 ? 'warning.main' : 'error.main' 
            }}>
              {score.toFixed(1)}%
            </Typography>
            <Typography variant="h6">
              You answered {Math.round(score / 100 * questions.length)} out of {questions.length} questions correctly.
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Save your result to the leaderboard:
            </Typography>
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={isSaving}
            />
            <TextField
              label="Your Email"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              disabled={isSaving}
              helperText="We'll use this to track your progress"
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseResult} color="inherit">
            Close
          </Button>
          <Button 
            onClick={handleSaveResult} 
            color="primary" 
            variant="contained"
            disabled={isSaving}
            startIcon={isSaving ? <CircularProgress size={20} /> : null}
          >
            {isSaving ? 'Saving...' : 'Save Score'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}