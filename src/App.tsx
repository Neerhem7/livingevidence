import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { RootState} from './redux/store';
import { setProjectParams } from './redux/projectSlice';
import Navigation from './components/Menus/Navigation';
import Home from './Pages/Home';
import Concept from './Pages/Concept';
import Theme from './Pages/Theme';
import Prisma from './Pages/Prisma';
import ITable from './Pages/ITable';
import { Container } from 'react-bootstrap';

const App: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const { projectId, cqId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (projectId && cqId) {
      dispatch(setProjectParams({ projectId, cqId }));
    }
  }, [projectId, cqId, dispatch]);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
    document.documentElement.style.setProperty('--third-color', theme.thirdColor);
    document.documentElement.style.setProperty('--forth-color', theme.forthCcolor);
    document.documentElement.style.setProperty('--background-color', theme.backgroundColor);
    document.documentElement.style.setProperty('--text-color', theme.textColor);
    document.documentElement.style.setProperty('--body-color', theme.bodyColor);
  }, [theme]);


  return (
    <Router>
      <Navigation></Navigation>
      <Container fluid className='mt-4'>
        <Routes>
          <Route path="/project/:projectId/cq/:cqId" element={<Home />} />
          <Route path="/project/:projectId/cq/:cqId/concept" element={<Concept />} />
          <Route path="/project/:projectId/cq/:cqId/theme" element={<Theme />} />
          <Route path="/project/:projectId/cq/:cqId/prisma" element={<Prisma />} />
          <Route path="/project/:projectId/cq/:cqId/itable" element={<ITable />} />
          <Route path="/" element={<Navigate to="/project/:projectId/cq/:cqId/itable" />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
