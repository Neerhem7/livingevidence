import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';
import { RootState } from '../../redux/store';
import { toggleTheme , setTheme} from '../../redux/themeSlice';
import '../../styles/navigation.css';


interface Props {
}


const Navigation: React.FC<Props> = () => {
    const isMobileView = useMediaQuery();
    const [menuOpen, setMenuOpen] = useState(false);
    const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
    const themeDropdownRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();
    const { mode, backgroundColor, textColor, primaryColor,
        secondaryColor,
        thirdColor,
        forthCcolor } = useSelector((state: RootState) => state.theme);
    const { projectId, cqId } = useSelector((state: RootState) => state.project);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
                setThemeDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg p-3`} style={{ backgroundColor: backgroundColor, color: textColor }}>
            {isMobileView ? (
                <div className="mobile-navbar">
                    <div className="nav-header">
                        <img src="/logo.png" alt="Logo" className="logo" />
                        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <i className="fa-solid fa-xmark icon"></i> : <i className="fa-solid fa-list icon"></i>}
                        </button>
                    </div>
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
            ) : (
                <>
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link" to={`/project/${projectId}/cq/${cqId}/`}>Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to={`/project/${projectId}/cq/${cqId}/concept`}>Concept</Link></li>
                        <li className="nav-item"><Link className="nav-link" to={`/project/${projectId}/cq/${cqId}/prisma`}>Prisma</Link></li>
                    </ul>

                    <div className="position-relative" ref={themeDropdownRef}>
                        <button className="btn theme-dropdown-btn" onClick={() => setThemeDropdownOpen(prev => !prev)}>
                            {mode === 'light' ? <i className="fa-solid fa-sun icon"></i> : <i className="fa-solid fa-moon icon"></i>}
                        </button>

                        {themeDropdownOpen && (
                            <div className="theme-dropdown shadow p-3 rounded" style={{ position: 'absolute', top: '100%', right: 0, zIndex: 1000, minWidth: '380px' }}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span><b>{mode === 'dark' ? 'Dark Mode' : 'Light Mode'}</b></span>
                                    <div className="form-check form-switch m-0">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={mode === 'light'}
                                            onChange={() => dispatch(toggleTheme())}
                                        />
                                    </div>
                                </div>
                                <hr></hr>
                                {[
                                    { label: 'Primary Color', key: 'primaryColor', value: primaryColor },
                                    { label: 'Secondary Color', key: 'secondaryColor', value: secondaryColor },
                                    { label: 'Third Color', key: 'thirdColor', value: thirdColor },
                                    { label: 'Background color', key: 'backgroundColor', value: backgroundColor },
                                    { label: 'Text Color', key: 'textColor', value: textColor }
                                ].map(({ label, key, value }) => (
                                    <div key={key} className="d-flex justify-content-between align-items-center mb-2">
                                        <span><b> {label}:  </b>{value}</span>
                                        <input
                                            type="color"
                                            value={value}
                                            onChange={(e) => dispatch(setTheme({ [key]: e.target.value }))}
                                            style={{ width: '40px', height: '30px', border: 'none', cursor: 'pointer' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </nav>
    );
};

export default Navigation;
