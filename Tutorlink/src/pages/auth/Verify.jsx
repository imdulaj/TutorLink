import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';
import { FaLock, FaArrowLeft } from 'react-icons/fa';
import './Verify.css';

export function Verify() {
  return (
    <Container component="main" maxWidth="xs" className="verify-container">
      <Paper elevation={3} className="verify-paper">
        <Box className="verify-content">
          <div className="verify-icon">
            <FaLock size={40} />
          </div>
          
          <Typography component="h1" variant="h5" className="verify-title">
            Verify Account
          </Typography>
          
          <Box component="form" noValidate className="verify-form">
            <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              label="Enter OTP"
              name="otp"
              type="number"
              autoFocus
              InputProps={{
                inputProps: { 
                  min: 0,
                  maxLength: 6
                }
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="verify-button"
            >
              Verify
            </Button>
            
            <Button
              startIcon={<FaArrowLeft />}
              color="inherit"
              className="back-button"
              fullWidth
            >
              Back to Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Verify;
