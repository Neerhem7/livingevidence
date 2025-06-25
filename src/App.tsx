import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import { RootState, useAppDispatch } from './redux/store';
import { setProjectParams, fetchProjects } from './redux/projectSlice';
import Navigation from './components/Menus/Navigation';
import PublicWebMenu from './components/Menus/PublicWebMenu';
import { Container } from 'react-bootstrap';
import OurResearch from './Pages/OurResearch';
import useMediaQuery from './hooks/useMediaQuery';
import PublicWeb from './Pages/PublicWeb';

const Home = React.lazy(() => import('./Pages/Home'));
const Concept = React.lazy(() => import('./Pages/Concept'));
const Theme = React.lazy(() => import('./Pages/Theme'));
const Prisma = React.lazy(() => import('./components/Prisma/Prisma'));
const ITable = React.lazy(() => import('./components/ITable/ITable'));

const LoadingFallback = () => (
  <div className="loading-spinner">
    Loading...
  </div>
);

const RouteWrapper: React.FC<{ Component: React.ComponentType }> = ({ Component }) => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
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

const AppContent: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const location = useLocation();
  const isPublicWeb = location.pathname === '/public-web';
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isPublicWeb) {
      dispatch(fetchProjects());
    }
  }, [isPublicWeb, dispatch]);

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
    <>
      {isPublicWeb ? <PublicWebMenu /> : <Navigation />}
      <Container fluid className={isMobile?'m-0':'mt-4'}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" Component={Home} />
            <Route path="/concept" Component={Concept} />
            <Route path="/theme" Component={Theme} />
            <Route path="/our-research"  Component={OurResearch} />
            <Route path="/public-web" element={<RouteWrapper Component={PublicWeb} />} />
            <Route path="/prisma" element={<RouteWrapper Component={Prisma} />} />
            <Route path="/itable" element={<RouteWrapper Component={ITable} />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
