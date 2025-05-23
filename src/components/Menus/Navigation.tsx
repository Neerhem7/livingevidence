import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
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
    const [searchParams] = useSearchParams();
    
    const getLink = (path: string) => {
        const currentProjectId = searchParams.get('projectId') || projectId || '202';
        const currentCqId = searchParams.get('cqId') || cqId || '116';
        return `${path}?projectId=${currentProjectId}&cqId=${currentCqId}`;
    };

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
                            <li><Link to={getLink('/home')} onClick={() => setMenuOpen(false)}>Home</Link></li>
                            <li><Link to={getLink('/concept')} onClick={() => setMenuOpen(false)}>Concept</Link></li>
                            <li><Link to={getLink('/prisma')} onClick={() => setMenuOpen(false)}>Prisma</Link></li>
                            <li><Link to={getLink('/itable')} onClick={() => setMenuOpen(false)}>ITable</Link></li>
                        </ul>
                    </div>
                </div> 
                : <>
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link text-decoration-none px-3 py-2 rounded hover-nav" to={getLink('/home')}>Home</Link></li> 
                        <li className="nav-item"><Link className="nav-link text-decoration-none px-3 py-2 rounded hover-nav" to={getLink('/concept')}>Concept</Link></li>
                        <li className="nav-item"><Link className="nav-link text-decoration-none px-3 py-2 rounded hover-nav" to={getLink('/prisma')}>Prisma</Link></li>
                        <li className="nav-item"><Link className="nav-link text-decoration-none px-3 py-2 rounded hover-nav" to={getLink('/itable')}>ITable</Link></li>
                    </ul>
                    <button className="theme-toggle" onClick={() => dispatch(toggleTheme())}>
                        {mode === 'dark' ? <i className="fa-solid fa-sun icon"></i> : <i className="fa-solid fa-moon icon"></i>}
                    </button>
                </>}
        </nav>
    );
};

export default Navigation;