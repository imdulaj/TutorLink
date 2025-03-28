import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import './database/db.js';
import userRoutes from "./routes/user.js";
import coursesRoutes from "./routes/courses.js";
import adminRoutes from "./routes/admin.js";
import quizRoutes from './routes/quiz.js';



dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(cors());
app.use('/api', userRoutes);
app.use('/api', coursesRoutes);
app.use('/api', adminRoutes);
app.use('/api/quizzes', quizRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
