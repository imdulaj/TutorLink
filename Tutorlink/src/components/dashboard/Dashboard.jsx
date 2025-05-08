import { Grid, Typography, Box, Paper, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBook, 
  FaQuestionCircle, 
  FaGraduationCap, 
  FaUsers, 
  FaChartLine, 
  FaCalendarAlt,
  FaBell,
  FaRocket,
  FaRegLightbulb
} from 'react-icons/fa';
import './Dashboard.css';

// Enhanced DashboardCard component
const DashboardCard = ({ title, icon, description, onClick }) => (
  <motion.div
    className="dashboard-card"
    onClick={onClick}
    whileHover={{ scale: 1.05, rotate: 2 }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
  >
    <div className="card-icon">{icon}</div>
    <Typography variant="h6" className="card-title">{title}</Typography>
    <Typography variant="body2" className="card-description">{description}</Typography>
  </motion.div>
);

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
    { 
      title: 'Total Students', 
      value: '1,234', 
      icon: <FaUsers size={32} />, 
      description: 'Active learners on platform'
    },
    { 
      title: 'Active Courses', 
      value: '42', 
      icon: <FaChartLine size={32} />, 
      description: 'Courses in progress'
    },
    { 
      title: 'Completed Courses', 
      value: '128', 
      icon: <FaCalendarAlt size={32} />, 
      description: 'Successfully finished courses'
    }
  ];

  const cards = [
    {
      title: 'Learning Materials',
      icon: <FaBook size={48} />,
      description: 'Access and manage all your learning resources in one place',
      onClick: () => handleCardClick('ViewMaterials')
    },
    {
      title: 'Quiz Center',
      icon: <FaQuestionCircle size={48} />,
      description: 'Create and manage interactive assessments and quizzes',
      onClick: () => handleCardClick('ViewQuiz')
    },
    {
      title: 'Course Management',
      icon: <FaGraduationCap size={48} />,
      description: 'Browse and administer all available courses',
      onClick: () => handleCardClick('ViewCourse')
    }
  ];

  const quickActions = [
    {
      title: 'New Announcement',
      icon: <FaBell size={38} />,
      description: 'Notify students about important updates',
      onClick: () => handleCardClick('NewAnnouncement')
    },
    {
      title: 'Launch Workshop',
      icon: <FaRocket size={38} />,
      description: 'Start a new interactive learning session',
      onClick: () => handleCardClick('NewWorkshop')
    },
    {
      title: 'Resource Insights',
      icon: <FaRegLightbulb size={38} />,
      description: 'Analytics on resource utilization',
      onClick: () => handleCardClick('ResourceInsights')
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Box className="dashboard">
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
        >
          <Typography variant="h3" className="dashboard-title">
            Admin Dashboard
          </Typography>
        </motion.div>

        <Box className="stats-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={3}>
              {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div variants={itemVariants}>
                    <div className="stat-card">
                      <div className="stat-icon">
                        {stat.icon}
                      </div>
                      <div className="stat-content">
                        <h4>{stat.value}</h4>
                        <Typography variant="body1">{stat.title}</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7, mt: 0.5 }}>
                          {stat.description}
                        </Typography>
                      </div>
                    </div>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>

        <Typography variant="h5" className="section-title">
          Core Functions
        </Typography>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {cards.map((card, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div variants={itemVariants}>
                  <DashboardCard {...card} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        <Typography variant="h5" className="section-title" sx={{ mt: 5 }}>
          Quick Actions
        </Typography>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div variants={itemVariants}>
                  <DashboardCard {...action} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 70 }}
        >
          <div className="activity-chart">
            <Typography variant="h5" className="chart-title">
              <FaChartLine size={20} className="chart-title-icon" /> Student Engagement Analytics
            </Typography>
            <div className="chart-placeholder">
              <FaChartLine size={60} className="chart-icon" />
            </div>
          </div>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Dashboard;