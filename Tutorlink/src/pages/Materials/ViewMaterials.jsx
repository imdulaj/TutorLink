import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
  Container,
} from "@mui/material";
import { FaEdit, FaTrash, FaFilePdf, FaVideo } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./ViewMaterials.css";

const ViewMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate();

  // Fetch materials when component mounts
  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/materials");
      setMaterials(response.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/materials/${id}`);
      fetchMaterials(); // Reload the materials list after deletion
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };

  const handleEdit = (id) => {
    // Navigating to the update page with the material ID
    navigate(`/updateMaterials/${id}`);
  };

  return (
    <Container className="view-materials-container">
      <Link to="/AddMaterials">
        <Button variant="contained" color="primary" className="add-button">
          Add New Material
        </Button>
      </Link>

      <div className="materials-list">
        {materials.length === 0 ? (
          <Typography variant="h6">No materials uploaded yet.</Typography>
        ) : (
          materials.map((material) => (
            <Card key={material._id} className="material-card">
              <CardContent className="material-content">
                <div className="icon">
                  {material.fileType === "pdf" ? <FaFilePdf /> : <FaVideo />}
                </div>
                <div>
                  <Typography variant="h6">{material.title}</Typography>
                  <Typography variant="body2">{material.description}</Typography>
                  <Typography variant="body2">Size: {material.fileSize}</Typography>
                  <a
                    href={`http://localhost:3000/${material.filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </div>
                <div className="action-buttons">
                  <IconButton color="primary" onClick={() => handleEdit(material._id)}>
                    <FaEdit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(material._id)}>
                    <FaTrash />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </Container>
  );
};

export default ViewMaterials;
