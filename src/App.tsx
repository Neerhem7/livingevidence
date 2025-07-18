import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { RootState, useAppDispatch, useAppSelector } from './redux/store';
import { setProjectParams, fetchProjects,fetchActiveProjectWeb } from './redux/projectSlice';
import Navigation from './components/Menus/Navigation';
import { Container } from 'react-bootstrap';
import OurResearch from './Pages/OurResearch';
import useMediaQuery from './hooks/useMediaQuery';
import PublicWeb from './Pages/PublicWeb';
import PublicWebV1 from './Pages/PublicWebV1';
import Introduction from './components/Introduction/Introduction';
import ProjectSection from './components/Projects/ProjectSection';
import PairwiseMa from './components/PairwiseMA/PairwiseMa';
import SofTable from './components/SofTable/SofTable';
import NetworkMa from './components/NetworkMA/NetworkMa';
import EvidenceMap from './components/EvidenceMap/EvidenceMap';
import Publications from './components/Publications/Publications';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

const Home = React.lazy(() => import('./Pages/Home'));
const Concept = React.lazy(() => import('./Pages/Concept'));
const Theme = React.lazy(() => import('./Pages/Theme'));
const Prisma = React.lazy(() => import('./components/Prisma/Prisma'));
const ITable = React.lazy(() => import('./components/SummaryTables/ITable'));

const LoadingFallback = () => (
  <div className="loading-spinner">
    Loading...
  </div>
);

const RouteWrapper: React.FC<{ Component: React.ComponentType<any> }> = ({ Component }) => {
  const activeProjectWeb = useAppSelector((state) => state.projects.activeProjectWeb);
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const sectionName = location.pathname.replace('/public-web/', '').split('/')[0];
  const isPublicWeb = location.pathname.startsWith('/public-web/');
  const isProtected = searchParams.get('live');
  const token = localStorage.getItem('token');

  const mainContent = activeProjectWeb?.main_content || {};
  const projectId = searchParams.get('projectId');
  const projects = useSelector((state: RootState) =>
    isProtected ? state.projects.userProjects : state.projects.projects
  );
  const project = projects.find((p: any) => String(p.project_id) === String(projectId));


  useEffect(() => {
    const projectId = searchParams.get('projectId');
    const cqId = searchParams.get('cqId');
    
    if (projectId && cqId) {
      dispatch(setProjectParams({ projectId, cqId }));
      dispatch(fetchActiveProjectWeb({ projectId, cqId }));
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (isPublicWeb && (!projects || projects.length === 0)) {
      dispatch(fetchProjects());
    }
  }, [isPublicWeb, dispatch, projects]);

  if (isProtected && (!token || token === 'null' || token === 'undefined')) {
    return <Navigate to="/login" replace />;
  }
  if (!searchParams.get('projectId') || !searchParams.get('cqId')) {
    return <Navigate to="/our-research" />;
  }
  if (sectionName) {
    const sectionData = mainContent[sectionName];
    if (!sectionData) {
      return <div>Loading...</div>;
    }
    return (
      <ProjectSection
        project={project}
        title={mainContent.introduction?.title}
        component={<Component {...sectionData} />}
      />
    );
    
  }

  return <Component />;
};

const ProtectedRoute: React.FC<{ Component: React.ComponentType<any> }> = ({ Component }) => {
  const token = useAppSelector(state => state.auth.token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Component/>;
};

const AppContent: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const location = useLocation();
  const isPublicWeb = location.pathname === '/public-web';
  const isProtectedMenu = location.pathname === '/login' || location.pathname.startsWith('/dashboard');
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
      {!isProtectedMenu &&  <Navigation />}
      <Container fluid={!isProtectedMenu} className={isMobile || isProtectedMenu?'m-0 p-0':'mt-4'}
      style={{ minHeight: "100vh", minWidth:"100vw"}}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" Component={Login} />
            <Route path="/dashboard/*" element={<ProtectedRoute Component={Dashboard}/>} />
            <Route path="/home" Component={Home} />
            <Route path="/concept" Component={Concept} />
            <Route path="/theme" Component={Theme} />
            <Route path="/our-research"  Component={OurResearch} />
            <Route path="/public-web_v1" element={<RouteWrapper Component={PublicWebV1} />} />
            <Route path="/public-web" element={<RouteWrapper Component={PublicWeb} />} />
            <Route path="/public-web/introduction" element={<RouteWrapper Component={Introduction} />} />
            <Route path="/public-web/prisma" element={<RouteWrapper Component={Prisma} />} />
            <Route path="/public-web/summary_tables" element={<RouteWrapper Component={ITable} />} />
            <Route path="/public-web/pairwise_ma" element={<RouteWrapper Component={PairwiseMa} />} />
            <Route path="/public-web/sof_table" element={<RouteWrapper Component={SofTable} />} />
            <Route path="/public-web/network_ma" element={<RouteWrapper Component={NetworkMa} />} />
            <Route path="/public-web/evidence_map" element={<RouteWrapper Component={EvidenceMap} />} />
            <Route path="/public-web/publications" element={<RouteWrapper Component={Publications} />} />
            <Route path="/prisma" element={<RouteWrapper Component={Prisma} />} />
            <Route path="/itable" element={<RouteWrapper Component={ITable} />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
};

const App: React.FC = () => (
  <Router basename="/pub"> 
    <AppContent />
    </Router>
  );

export default App;
