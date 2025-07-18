import React, { useEffect, useState } from "react";
import { Row, Col, Nav, Dropdown } from "react-bootstrap";
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchUserProjects } from "../redux/projectSlice";
import { logout } from '../redux/authSlice';
import DashboardProjects from "../components/Dashboard/DashboardProjects";
import '../styles/style.css';


interface Props { }

const Settings = () => <div>Settings</div>;

const menuItems = [
    { label: "Projects", path: "projects", icon: "bi-kanban" },
    // { label: "Settings", path: "settings", icon: "bi-gear" },
];

const getRouteName = (pathname: string) => {
    const match = menuItems.find(item => pathname.endsWith(item.path));
    return match ? match.label : "Dashboard";
};

const Dashboard: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);

    useEffect(() => {
        dispatch(fetchUserProjects());
    }, [dispatch]);

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch(logout());
      navigate('/login');
    };

    return (
        <Row className="h-100">
            <Col xs={12} md={3} lg={2} className="bg-light p-0">
                <Nav
                    variant="pills"
                    className="flex-column vh-100 p-3 dashboard-nav-pills"
                >
                    <img src="/pub/logo.png" alt="Logo" className="logo mb-5" />
                    {/* User Info Nav Item */}
                    {user && (
                        <Nav.Item className="mb-4">
                            <div className="d-flex align-items-center gap-2 px-2 py-2 bg-light rounded">
                                <i className="bi bi-person-circle fs-4"></i>
                                <div>
                                    <div className="fw-bold">{user.name}</div>
                                    <div className="text-muted" style={{ fontSize: '0.85em' }}>{user.role}</div>
                                </div>
                            </div>
                        </Nav.Item>
                    )}
                    {menuItems.map((item) => (
                        <Nav.Item key={item.path} className="mb-2">
                            <Nav.Link
                                as={Link}
                                to={`/dashboard/${item.path}`}
                                active={location.pathname === `/dashboard/${item.path}`}
                                className="text-start d-flex align-items-center gap-2"
                            >
                                {item.icon && <i className={`bi ${item.icon}`}></i>}
                                {item.label}
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>
            </Col>
            <Col xs={12} md={9} lg={10}>
                <Row className="align-items-center py-2 px-3 border-bottom bg-white" style={{ minHeight: 60 }}>
                    <Col xs={6} className="fw-bold fs-5 text-capitalize">
                        {getRouteName(location.pathname)}
                    </Col>
                    <Col xs={6} className="d-flex justify-content-end align-items-center">
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="link" id="dropdown-user" className="p-0 border-0 shadow-none">
                                <i className="bi bi-person-circle fs-3"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleLogout} className="text-danger">Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <Routes>
                    <Route path="projects" element={<DashboardProjects />} />
                    <Route path="settings" element={<Settings />} />
                    {/* Default route */}
                    <Route path="*" element={<DashboardProjects />} />
                </Routes>
            </Col>
        </Row>
    );
};

export default Dashboard;