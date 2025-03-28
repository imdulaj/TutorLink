import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardCard from './DashboardCard';
import { FaBook, FaQuestionCircle, FaGraduationCap } from 'react-icons/fa';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(`/${route}`); 
  };

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
    <div className="dashboard">
      <h1>Dashboard</h1>
      <Grid container spacing={2}>
        {cards.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <DashboardCard {...card} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Dashboard;
