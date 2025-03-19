import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton
} from '@mui/material';
import { FaFileUpload, FaFilePdf, FaVideo, FaTimes } from 'react-icons/fa';
import './AddMaterials.css';

const AddMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [title, setTitle] = useState('');

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    const newMaterials = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      title: title || file.name,
      file: file,
      size: formatFileSize(file.size),
      type: file.type.includes('pdf') ? 'pdf' : 'video'
    }));

    setMaterials([...materials, ...newMaterials]);
    setTitle('');
    e.target.value = null; 
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleRemoveMaterial = (id) => {
    setMaterials(materials.filter(material => material.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Materials to upload:', materials);
    
  };

  return (
    <Container className="add-materials-container">
      <Paper elevation={3} className="form-paper">
        <Typography variant="h4" className="form-title">
          <FaFileUpload className="title-icon" />
          Add Course Materials
        </Typography>

        <form onSubmit={handleSubmit} className="materials-form">
          <TextField
            fullWidth
            label="Material Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            placeholder="Enter title (optional)"
          />

          <Box className="upload-section">
            <Button
              variant="contained"
              component="label"
              startIcon={<FaFilePdf />}
              className="upload-btn"
            >
              Upload PDF
              <input
                type="file"
                hidden
                accept=".pdf"
                onChange={handleFileChange}
              />
            </Button>

            <Button
              variant="contained"
              component="label"
              startIcon={<FaVideo />}
              className="upload-btn"
            >
              Upload Video
              <input
                type="file"
                hidden
                accept="video/*"
                onChange={handleFileChange}
              />
            </Button>
          </Box>

          <List className="materials-list">
            {materials.map((material) => (
              <ListItem
                key={material.id}
                className="material-item"
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveMaterial(material.id)}
                  >
                    <FaTimes />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  {material.type === 'pdf' ? <FaFilePdf /> : <FaVideo />}
                </ListItemIcon>
                <ListItemText
                  primary={material.title}
                  secondary={`Size: ${material.size}`}
                />
              </ListItem>
            ))}
          </List>

          {materials.length > 0 && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit-btn"
              size="large"
            >
              Upload Materials
            </Button>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default AddMaterials;