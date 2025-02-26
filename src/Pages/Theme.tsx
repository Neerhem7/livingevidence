import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import { RootState } from '../redux/store';
import { toggleTheme } from '../redux/themeSlice';

interface Props {
}

const Theme: React.FC<Props> = () => {
    const dispatch: AppDispatch = useDispatch();
    const { mode, backgroundColor, textColor } = useSelector((state: RootState) => state.theme);


    return (
        <div className="container mt-4">
       
       <button className="theme-toggle" onClick={() => dispatch(toggleTheme())}>
                        {mode === 'dark' ? <FaSun size={24} color="#f8f9fa" /> : <FaMoon size={24} />}
                    </button>
      </div>

    );
};

export default Theme;