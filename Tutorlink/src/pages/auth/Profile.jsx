import {
  Container,
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  Button,
  Divider,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import { FaUser, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation after deletion
import * as jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import "./Profile.css";
import {Header} from "../../components/Header/Header";
import {Footer} from "../../components/Footer/Footer";


export function Profile() {
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        const response = await axios.get("http://localhost:3000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        });
        setStudentData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = () => {
    console.log("Update profile clicked");
    // Logic for updating the profile can be added here
  };

  const handleDeleteAccount = async () => {
    // Ask the user for confirmation before proceeding with deletion
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete("http://localhost:3000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Inform the user and redirect to login page or home page
        alert("Account deleted successfully.");
        localStorage.removeItem("token"); // Remove token from localStorage
        navigate("/"); // Redirect to login page
      } catch (err) {
        console.error("Error deleting account:", err);
        alert("Failed to delete account.");
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
   <>
   <Header />
    <Container component="main" maxWidth="md" className="profile-container">
    
      <Paper elevation={3} className="profile-paper">
        <Box className="profile-header">
          <Avatar className="profile-avatar">
            <FaUser size={40} />
          </Avatar>
          <Typography variant="h4" className="profile-name">
            Student Profile
          </Typography>
        </Box>

        <Divider className="profile-divider" />

        <Grid container spacing={3} className="profile-form">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              value={studentData.name || ""}
              className="profile-input"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              value={studentData.email || ""}
              className="profile-input"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Registration Number"
              value={studentData.registrationNumber || ""}
              className="profile-input"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Contact Number"
              value={studentData.contactNumber || ""}
              className="profile-input"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Stream"
              value={studentData.stream || ""}
              className="profile-input"
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        <Box className="profile-actions">
          <Link to="/UpdateUser">
            <Button
              variant="contained"
              color="primary"
              startIcon={<FaPencilAlt />}
              onClick={handleUpdateProfile}
              className="update-button"
            >
              Update Details
            </Button>
          </Link>
          <Button
            variant="outlined"
            startIcon={<FaTrash />}
            onClick={handleDeleteAccount}
            className="delete-button"
           
           
          >
            Delete Account
          </Button>
        </Box>
      </Paper>
      
    </Container>
   <Footer />
    </>
   
  );
}

























