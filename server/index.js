import express from 'express';
import dotenv from 'dotenv';
import './database/db.js';
import userRoutes from "./routes/user.js"
import coursesRoutes from "./routes/courses.js"
import adminRoutes from "./routes/admin.js"
import cors from "cors";

const app = express()
dotenv.config();
const port = process.env.PORT;

//using middlewares
app.use(express.json());
app.use(cors());
app.use("/uploads",express.static("uploads"));


app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.use('/api', userRoutes);
app.use('/api', coursesRoutes);
app.use('/api', adminRoutes);





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})