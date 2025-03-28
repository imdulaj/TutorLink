import { Card, CardContent, Typography } from '@mui/material'
import './Dashboard.css'

function DashboardCard({ title, icon, description, onClick }) {
  return (
    <Card 
      className="dashboard-card"
      onClick={onClick}
      sx={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
        }
      }}
    >
      <CardContent>
        <div className="card-icon">{icon}</div>
        <Typography 
          variant="h5" 
          component="div" 
          gutterBottom 
          sx={{ color: 'white', fontWeight: 500 }}
        >
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default DashboardCard