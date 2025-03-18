import mongoose from "mongoose";

const schema = new mongoose.Schema({
  item_id: {
    type: String,
    required: true,
  },
  item_name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Mylist = mongoose.model("Mylist", schema);
