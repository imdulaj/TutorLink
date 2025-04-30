import express from 'express';
import { 
  createQuiz, 
  getAllQuizzes, 
  updateQuiz, 
  deleteQuiz,
  getQuizById
} from '../controllers/quiz.js'; // ✅ Import controllers

const router = express.Router();

// Create Quiz
router.post('/create', createQuiz);

// Get All Quizzes
router.get('/all', getAllQuizzes);

// Get Quiz by ID
router.get('/:id', getQuizById); 

// Update Quiz
router.put('/update/:id', updateQuiz);

// Delete Quiz
router.delete('/delete/:id', deleteQuiz);

export default router; // ✅ Ensure default export
