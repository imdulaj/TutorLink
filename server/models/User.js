import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  stream: {
    type: String,
    required: true,
    enum: ['science', 'maths', 'art', 'commerce', 'tech']
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  subscription: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  }]
}, {
  timestamps: true
});

export const User = mongoose.model("User", userSchema);
