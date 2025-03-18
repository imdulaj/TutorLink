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
  import { 
    FaUser, 
    FaPencilAlt, 
    FaTrash 
  } from 'react-icons/fa';
  import './Profile.css';
  
  export function Profile() {
   
    const studentData = {
      name: "dulaj indula",
      email: "dulaj@gmail.com",
      registrationNumber: "REG2024001",
      contactNumber: "+1232343434",
      stream: "Maths"
    };
  
    const handleUpdateProfile = () => {
      console.log("Update profile clicked");
    };
  
    const handleDeleteAccount = () => {
      console.log("Delete account clicked");
    };
  
    return (
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
                value={studentData.name}
                className="profile-input"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                value={studentData.email}
                className="profile-input"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Registration Number"
                value={studentData.registrationNumber}
                className="profile-input"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Number"
                value={studentData.contactNumber}
                className="profile-input"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Stream"
                value={studentData.stream}
                className="profile-input"
                InputProps={{
                  readOnly: true,
                }}
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
            <Button
              variant="outlined"
              color="error"
              startIcon={<FaTrash />}
              onClick={handleDeleteAccount}
              className="delete-button"
            >
              Delete Account
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }
  
