import express from 'express';
import { uploadMaterial, getMaterials, deleteMaterial, updateMaterial ,getMaterialById} from '../controllers/material.js';
import multer from 'multer';

const router = express.Router();

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Upload Course Material
router.post('/materials/upload', upload.single('file'), uploadMaterial);

// Get All Materials
router.get('/materials', getMaterials);

// Delete Material by ID
router.delete('/materials/:id', deleteMaterial);

router.get("/materials/:id", getMaterialById); // Get material by ID
router.put("/materials/update/:id", upload.single("file"), updateMaterial);

export default router;
