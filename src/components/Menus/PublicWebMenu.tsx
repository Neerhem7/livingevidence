import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';
import { RootState } from '../../redux/store';
import { toggleTheme } from '../../redux/themeSlice';
import '../../styles/navigation.css';

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
    const project = projects.find((p: any) => String(p.id) === String(projectId));
    return (
        <nav className={`navbar  navbar-expand-lg p-3 ${mode === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`} style={{ backgroundColor, color: textColor }}>
            <span className="project-name">{project ? project.name : 'Project'}</span>
            <ul className="navbar-nav justify-content-end">
                {Array.isArray(navigation) && navigation.length > 0 ? (
                    navigation.filter((item: any) => item.isvisible).map((item: any) => (
                        item.sub_nav && item.sub_nav.length > 0 ? (
                            <li className="nav-item dropdown" key={item.section}>
                                <a
                                    className="nav-link dropdown-toggle text-decoration-none px-3 py-2 rounded hover-nav"
                                    href={`#${item.section}`}
                                    id={`dropdown-${item.section}`}
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {item.title}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby={`dropdown-${item.section}`}>
                                    {item.sub_nav.filter((sub: any) => sub.isvisible).map((sub: any) => (
                                        <li key={sub.section}>
                                            <a className="dropdown-item" href={`#${sub.section}`}>{sub.title || sub.label}</a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item" key={item.section}>
                                <a className="nav-link text-decoration-none px-3 py-2 rounded hover-nav" href={`#${item.section}`}>{item.title}</a>
                            </li>
                        )
                    ))
                ) : (
                    <>
                        <li className="nav-item"><a className="nav-link text-decoration-none px-3 py-2 rounded hover-nav" href="#introduction">Introduction</a></li>
                        <li className="nav-item"><a className="nav-link text-decoration-none px-3 py-2 rounded hover-nav" href="#prisma">Prisma</a></li>
                        <li className="nav-item"><a className="nav-link text-decoration-none px-3 py-2 rounded hover-nav" href="#itable">Itable</a></li>
                    </>
                )}
                <button className="theme-toggle" onClick={() => dispatch(toggleTheme())}>
                    {mode === 'dark' ? <i className="fa-solid fa-sun icon"></i> : <i className="fa-solid fa-moon icon"></i>}
                </button>
            </ul>
        </nav>
    );
};

export default PublicWebMenu;