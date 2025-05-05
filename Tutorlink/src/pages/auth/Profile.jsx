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
import { FaUser, FaPencilAlt, FaTrash, FaFileDownload } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "./Profile.css";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";

export function Profile() {
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
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
    navigate("/UpdateUser", { state: { studentData } });
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete("http://localhost:3000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("Account deleted successfully.");
        localStorage.removeItem("token");
        navigate("/");
      } catch (err) {
        console.error("Error deleting account:", err);
        alert("Failed to delete account.");
      }
    }
  };

  const handleGenerateReport = () => {
    const doc = new jsPDF();

    // Add logo
    const logoBase64 =
      "data:image/jpeg;base64,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"; // replace with your image
    doc.addImage(logoBase64, "JPEG", 80, 5, 40, 40); // (x, y, width, height)

    // Title
    doc.setFontSize(20);
    doc.setTextColor(0, 102, 204);
    doc.text("Student Profile Report", 105, 40, null, null, "center");

    // Divider line
    doc.setDrawColor(0, 102, 204);
    doc.setLineWidth(1);
    doc.line(20, 45, 190, 45);

    // Content
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    let y = 60;
    const lineSpacing = 10;

    doc.text(`Name: ${studentData.name || "N/A"}`, 20, y);
    y += lineSpacing;
    doc.text(`Email: ${studentData.email || "N/A"}`, 20, y);
    y += lineSpacing;
    doc.text(
      `Registration Number: ${studentData.registrationNumber || "N/A"}`,
      20,
      y
    );
    y += lineSpacing;
    doc.text(`Contact Number: ${studentData.contactNumber || "N/A"}`, 20, y);
    y += lineSpacing;
    doc.text(`Stream: ${studentData.stream || "N/A"}`, 20, y);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Generated by Our Platform", 105, 280, null, null, "center");

    doc.save("Student_Profile_Report.pdf");
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
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

          <Box className="profile-actions" display="flex" gap={2} mt={3}>
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

            <Button
              variant="contained"
              color="secondary"
              startIcon={<FaFileDownload />}
              onClick={handleGenerateReport}
              className="report-button"
            >
              Download Report
            </Button>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
}
