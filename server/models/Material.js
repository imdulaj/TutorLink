import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  filePath: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: String, required: true },
}, { timestamps: true });

const Material = mongoose.model('Material', materialSchema);

export default Material;
