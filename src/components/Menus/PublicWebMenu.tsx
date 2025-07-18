import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';
import { RootState } from '../../redux/store';
import { toggleTheme } from '../../redux/themeSlice';
import '../../styles/navigation.css';
import { Nav, NavDropdown } from 'react-bootstrap';

interface Props {}

const PublicWebMenu: React.FC<Props> = () => {
    const isMobileView = useMediaQuery();
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const { mode, backgroundColor, textColor } = useSelector((state: RootState) => state.theme);
    const activeProjectWeb = useSelector((state: RootState) => state.projects.activeProjectWeb);
    const navigation = activeProjectWeb?.navigation;
    const [searchParams] = useSearchParams();
    const projectId = searchParams.get('projectId');
    const projects = useSelector((state: RootState) => state.projects.projects);
    const project = projects.find((p: any) => String(p.project_id) === String(projectId));
    return (
        <nav className={`navbar navbar-expand-lg p-3 ${mode === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`} style={{ backgroundColor, color: textColor }}>
            <span className="project-name">{project ? project.name : 'Project'}</span>
            <Nav className="ms-auto align-items-center">
                {Array.isArray(navigation) && navigation.length > 0 ? (
                    navigation.filter((item: any) => item.isvisible).map((item: any) => (
                        item.sub_nav && item.sub_nav.length > 0 ? (
                            <NavDropdown
                                key={item.section}
                                title={item?.title}
                                id={`dropdown-${item.section}`}
                                className="px-3 py-2 rounded hover-nav"
                            >
                                {item.sub_nav.filter((sub: any) => sub.isvisible).map((sub: any) => (
                                    <NavDropdown.Item key={sub.section} href={`#${sub.section}`}>
                                        {sub.title || sub.label}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                        ) : (
                            <Nav.Link
                                key={item.section}
                                href={`#${item.section}`}
                                className="text-decoration-none px-3 py-2 rounded hover-nav"
                            >
                                {item.title}
                            </Nav.Link>
                        )
                    ))
                ) : (
                    <>
                        <Nav.Link href="#introduction" className="text-decoration-none px-3 py-2 rounded hover-nav">Introduction</Nav.Link>
                        <Nav.Link href="#prisma" className="text-decoration-none px-3 py-2 rounded hover-nav">Prisma</Nav.Link>
                        <Nav.Link href="#itable" className="text-decoration-none px-3 py-2 rounded hover-nav">Itable</Nav.Link>
                    </>
                )}
                <button className="theme-toggle ms-3" onClick={() => dispatch(toggleTheme())}>
                    {mode === 'dark' ? <i className="fa-solid fa-sun icon"></i> : <i className="fa-solid fa-moon icon"></i>}
                </button>
            </Nav>
        </nav>
    );
};

export default PublicWebMenu;