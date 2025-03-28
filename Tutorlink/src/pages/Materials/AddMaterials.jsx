import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { FaFileUpload, FaFilePdf } from "react-icons/fa";
import "./AddMaterials.css";

const AddMaterials = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:3000/api/materials/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Clear form fields
      setTitle("");
      setDescription("");
      setFile(null);

      // Navigate back to ViewMaterials page
      navigate("/ViewMaterials");
    } catch (error) {
      console.error("Error uploading material:", error);
    }
  };

  return (
    <Container className="add-materials-container">
      <Paper elevation={3} className="form-paper">
        <Typography variant="h4" className="form-title">
          <FaFileUpload className="title-icon" /> Add Course Materials
        </Typography>

        <form onSubmit={handleSubmit} className="materials-form">
          <TextField
            fullWidth
            label="Material Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            placeholder="Enter title"
          />

          <TextField
            fullWidth
            label="Material Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            placeholder="Enter description"
            multiline
            rows={3}
          />

          <Box className="upload-section">
            <Button
              variant="contained"
              component="label"
              startIcon={<FaFilePdf />}
              className="upload-btn"
            >
              Upload File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
          </Box>

          {file && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit-btn"
              size="large"
            >
              Upload Material
            </Button>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default AddMaterials;
