import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { FaFileUpload } from "react-icons/fa";
import "./AddMaterials.css";

const UpdateMaterials = () => {
  const { id } = useParams(); // Get material ID from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [existingFile, setExistingFile] = useState("");

  useEffect(() => {
    if (!id) {
      console.error("Material ID is missing");
      return;
    }

    const fetchMaterial = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/materials/${id}`);
        const material = response.data;
        setTitle(material.title);
        setDescription(material.description);
        setExistingFile(material.filePath);
      } catch (error) {
        console.log("Error fetching material details:", error);
      }
    };

    fetchMaterial();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    try {
      await axios.put(`http://localhost:3000/api/materials/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/ViewMaterials");
    } catch (error) {
      console.error("Error updating material:", error);
    }
  };

  return (
    <Container className="add-materials-container">
      <Paper elevation={3} className="form-paper">
        <Typography variant="h4" className="form-title">
          <FaFileUpload className="title-icon" /> Update Course Material
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

          {/* This section shows the existing file if it exists */}
          {!existingFile ? (
            <Typography variant="body2" className="existing-file">
              
            </Typography>
          ) : (
            <Typography variant="body2" className="existing-file">
              Current File:{" "}
              <a
                href={`http://localhost:3000/${existingFile}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Existing File
              </a>
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="submit-btn"
            size="large"
          >
            Update Material
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateMaterials;
