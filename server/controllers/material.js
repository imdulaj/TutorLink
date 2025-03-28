import Material from '../models/Material.js';
import multer from 'multer';
import path from 'path';

// File storage settings for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // File name with timestamp
  }
});

const upload = multer({ storage });

export const uploadMaterial = async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: 'File is required' });

    const newMaterial = new Material({
      title: title || file.originalname,
      description,
      filePath: file.path,
      fileType: file.mimetype.includes('pdf') ? 'pdf' : 'video',
      fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
    });

    await newMaterial.save();
    res.status(201).json(newMaterial);
  } catch (error) {
    res.status(500).json({ error: 'Error uploading material' });
  }
};


export const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching materials' });
  }
};


export const deleteMaterial = async (req, res) => {
  try {
    await Material.findByIdAndDelete(req.params.id);
    res.json({ message: 'Material deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting material' });
  }
};




export const getMaterialById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB Object ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid material ID format" });
    }

    // Fetch the material from the database
    const material = await Material.findById(id);

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    res.status(200).json(material);
  } catch (error) {
    console.error("Error fetching material:", error);
    res.status(500).json({ message: "Error fetching material", error });
  }
};

// Controller to update material
export const updateMaterial = async (req, res) => {
  try {
    const { title, description } = req.body;
    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    // Only update the title and description
    material.title = title || material.title;
    material.description = description || material.description;

    // If a new file is uploaded, handle the file logic
    if (req.file) {
      // Delete the old file if it exists
      if (material.filePath) {
        fs.unlinkSync(material.filePath);
      }

      // Update file path and other related file information
      material.filePath = req.file.path;
      material.fileType = req.file.mimetype.includes("pdf") ? "pdf" : "video";
      material.fileSize = `${(req.file.size / 1024 / 1024).toFixed(2)} MB`;
    }

    await material.save();
    res.json({ message: "Material updated successfully", material });
  } catch (error) {
    console.error("Error updating material:", error);
    res.status(500).json({ message: "Error updating material", error });
  }
};