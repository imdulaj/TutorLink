import React from 'react';
import { Card, CardContent, CardActionArea, Typography, Box } from '@mui/material';



const DashboardCard = ({ title, icon, description, onClick }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        color: '#fff',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
        },
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box sx={{ fontSize: 40 }}>{icon}</Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, textAlign: 'center' }}>
              {description}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DashboardCard;
