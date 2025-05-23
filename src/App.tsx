import React, { useEffect, Suspense } from 'react';
import { Navigate, useSearchParams, useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { RootState} from './redux/store';
import { setProjectParams } from './redux/projectSlice';
import Navigation from './components/Menus/Navigation';
import { Container } from 'react-bootstrap';

// Lazy load components
const Home = React.lazy(() => import('./Pages/Home'));
const Concept = React.lazy(() => import('./Pages/Concept'));
const Theme = React.lazy(() => import('./Pages/Theme'));
const Prisma = React.lazy(() => import('./Pages/Prisma'));
const ITable = React.lazy(() => import('./Pages/ITable'));

// Loading component
const LoadingFallback = () => (
  <div className="loading-spinner">
    Loading...
  </div>
);

// RouteWrapper component to handle query parameters
const RouteWrapper: React.FC<{ Component: React.ComponentType }> = ({ Component }) => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const projectId = searchParams.get('projectId');
    const cqId = searchParams.get('cqId');
    
    if (projectId && cqId) {
      dispatch(setProjectParams({ projectId, cqId }));
    }
  }, [searchParams, dispatch]);

  // If projectId or cqId is missing, redirect to ITable with default parameters
  if (!searchParams.get('projectId') || !searchParams.get('cqId')) {
    return <Navigate to="/itable?projectId=202&cqId=116" />;
  }

  return <Component />;
};

const App: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);

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
      <Navigation />
      <Container fluid className='mt-4'>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Navigate to="/itable?projectId=202&cqId=116" />} />
            <Route path="/home" element={<RouteWrapper Component={Home} />} />
            <Route path="/concept" element={<RouteWrapper Component={Concept} />} />
            <Route path="/theme" element={<RouteWrapper Component={Theme} />} />
            <Route path="/prisma" element={<RouteWrapper Component={Prisma} />} />
            <Route path="/itable" element={<RouteWrapper Component={ITable} />} />
          </Routes>
        </Suspense>
      </Container>
    </Router>
  );
}

export default App;
