import { 
    Container, 
    Box, 
    Typography, 
    Paper, 
    Avatar, 
    Grid, 
    Button, 
    Divider, 
    TextField 
} from '@mui/material';
import { FaUser, FaPencilAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function UpdateUser() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        contactNumber: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/api/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            } catch (error) {
                console.error("Fetch profile error:", error);
                alert("Failed to load profile.");
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put("http://localhost:3000/api/profile", user, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
            });

            console.log("Profile updated:", response.data);
            alert("Profile updated successfully!");
            navigate("/profile");
        } catch (error) {
            console.error("Update profile error:", error);
            alert(error.response?.data?.message || "Failed to update profile.");
        }
    };

    return (
        <Box className="update-wrapper">
            <Container component="main" maxWidth="sm" className="update-container">
                <Paper elevation={5} className="profile-paper">
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
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                className="profile-input"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                className="profile-input"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Contact Number"
                                name="contactNumber"
                                value={user.contactNumber}
                                onChange={handleChange}
                                className="profile-input"
                            />
                        </Grid>
                    </Grid>

                    <Box className="profile-actions">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<FaPencilAlt />}
                            onClick={handleUpdateProfile}
                            className="update-button"
                        >
                            Update Details
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
