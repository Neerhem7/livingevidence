import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';
import { RootState } from '../../redux/store';
import { toggleTheme } from '../../redux/themeSlice';
import '../../styles/navigation.css';

interface Props {
}

const Navigation: React.FC<Props> = () => {
    const isMobileView = useMediaQuery();
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const { mode, backgroundColor, textColor } = useSelector((state: RootState) => state.theme);
    const { projectId, cqId } = useSelector((state: RootState) => state.project);

    return (
        <nav className={`navbar  navbar-expand-lg p-3 ${mode === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`} style={{ backgroundColor, color: textColor }}>
       
            {isMobileView ?
                <div className="mobile-navbar">
                    <div className="nav-header">
                        <img src="/logo.png" alt="Logo" className="logo" />
                        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <i className="fa-solid fa-xmark icon"></i> :<i className="fa-solid fa-list icon"></i>}
                        </button>
                    </div>

                    {/* Sidebar Menu */}
                    <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
                        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                        <i className="fa-solid fa-xmark icon"></i>

                        </button>
                        <ul>
                            <li><Link to={`/project/${projectId}/cq/${cqId}/`} onClick={() => setMenuOpen(false)}>Home</Link></li>
                            <li><Link to={`/project/${projectId}/cq/${cqId}/concept`} onClick={() => setMenuOpen(false)}>Concept</Link></li>
                            <li><Link to={`/project/${projectId}/cq/${cqId}/prisma`} onClick={() => setMenuOpen(false)}>Prisma</Link></li>
                        </ul>
                    </div>
                </div> 
                : <>
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link" to={`/project/${projectId}/cq/${cqId}/`}>Home</Link></li> 
                        <li className="nav-item"><Link className="nav-link" to={`/project/${projectId}/cq/${cqId}/concept`}>Concept</Link></li>
                        <li className="nav-item"><Link className="nav-link" to={`/project/${projectId}/cq/${cqId}/prisma`}>Prisma</Link></li>
                    </ul>
                    <button className="theme-toggle" onClick={() => dispatch(toggleTheme())}>
                        {mode === 'dark' ? <i className="fa-solid fa-sun icon"></i> : <i className="fa-solid fa-moon icon"></i>}
                    </button>
                </>}
        </nav>

    );
};

export default Navigation;