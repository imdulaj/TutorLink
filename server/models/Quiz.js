import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  quizID: { type: String, required: true },
  stream: { type: String, required: true },
  duration: { type: Number, required: true },
  questions: [
    {
      question: { type: String, required: true },
      answers: [
        { type: String, required: true }
      ],
      correctAnswer: { type: String, required: true }
    }
  ],
  addedDate: { type: Date, default: Date.now },
  closingDate: { type: Date, required: true }
});

// Export the model correctly
const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;
