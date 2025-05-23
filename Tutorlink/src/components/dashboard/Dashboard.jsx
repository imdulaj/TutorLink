import { Grid, Typography, Box, Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardCard from './DashboardCard';
import ChartComponent from './ChartComponent'; // ✅ Importing the updated chart component
import { FaBook, FaQuestionCircle, FaGraduationCap, FaUsers, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    try {
      navigate(`/${route}`);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const stats = [
    { title: 'Total Students', value: '1,234', icon: <FaUsers size={30} />, color: '#4CAF50' },
    { title: 'Active Courses', value: '42', icon: <FaChartLine size={30} />, color: '#2196F3' },
    { title: 'Completed Courses', value: '128', icon: <FaCalendarAlt size={30} />, color: '#FF9800' }
  ];

  const cards = [
    {
      title: 'Materials',
      icon: <FaBook size={40} />,
      description: 'Access your learning materials',
      onClick: () => handleCardClick('ViewMaterials')
    },
    {
      title: 'Quizzes',
      icon: <FaQuestionCircle size={40} />,
      description: 'Make quizzes and assessments',
      onClick: () => handleCardClick('ViewQuiz')
    },
    {
      title: 'Courses',
      icon: <FaGraduationCap size={40} />,
      description: 'Browse courses',
      onClick: () => handleCardClick('ViewCourse')
    }
  ];

  return (
    <Box className="dashboard">
      <Typography variant="h3" className="dashboard-title">
        Admin Dashboard
      </Typography>

      <Stack spacing={4}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={4} className="stat-card" style={{ background: `linear-gradient(135deg, ${stat.color}22, ${stat.color}44)` }}>
                <div className="stat-icon" style={{ background: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-content">
                  <h4>{stat.value}</h4>
                  <Typography>{stat.title}</Typography>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box>
          <Typography variant="h5" className="section-title">
            Quick Actions
          </Typography>
          <Grid container spacing={3}>
            {cards.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <DashboardCard {...card} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ✅ Updated activity chart section with both charts */}
        <Paper className="activity-chart">
          <Typography variant="h5" className="chart-title">
            Recent Activity
          </Typography>
          <ChartComponent /> {/* Combined Line + Bar charts */}
        </Paper>
      </Stack>
    </Box>
  );
}

export default Dashboard;
