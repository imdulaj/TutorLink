import { Card, CardContent, Typography } from '@mui/material'
import './Dashboard.css'

function DashboardCard({ title, icon, description, onClick }) {
  return (
    <Card 
      className="dashboard-card"
      onClick={onClick}
    >
      <CardContent>
        <div className="card-icon">{icon}</div>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default DashboardCard