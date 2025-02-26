import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { RootState, AppDispatch } from './redux/store';
import Navigation from './components/Menus/Navigation';
import Home from './Pages/Home';
import About from './Pages/About';
import Theme from './Pages/Theme';

const App: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme);

  useEffect(() => { 
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
    document.documentElement.style.setProperty('--background-color', theme.backgroundColor);
    document.documentElement.style.setProperty('--text-color', theme.textColor);
  }, [theme]);


  return (
    <Router>
      <Navigation></Navigation>
      <div className='contanier mt-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/theme' element={<Theme />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
