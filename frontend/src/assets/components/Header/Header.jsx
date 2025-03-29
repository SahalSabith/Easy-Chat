import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, initializeTheme, selectTheme } from '../../Redux/themeSlice.js';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  return (
    <header className={currentTheme === 'dark' ? 'headerDark' : 'header'}>
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className={currentTheme === 'dark' ? 'logoDark' : 'logo'}>
            Easy Chat
          </Link>
        </div>
        <nav className="nav-links">
          <Link to="/" className={currentTheme === 'dark' ? 'nav-linkDark' : 'nav-link'}>Home</Link>
          <Link to="/explore" className={currentTheme === 'dark' ? 'nav-linkDark' : 'nav-link'}>Explore</Link>
        </nav>
        <div className="header-actions">
          <button 
            className="theme-toggle-button" 
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
          >
            {currentTheme === 'dark' ? (
              <span className="theme-icon sun-icon">☀</span>
            ) : (
              <span className="theme-icon moon-icon">☾</span>
            )}
          </button>
          <button className={currentTheme === 'dark' ? 'host-buttonDark' : 'host-button'}>
            Host a Room
          </button>
          {token != null ? (
            <div className="user-menu">
              <Link to="/profile">
                <button className={currentTheme === 'dark' ? 'profile-buttonDark' : 'profile-button'}>My Profile</button>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className={currentTheme === 'dark' ? 'login-buttonDark' : 'login-button'}>Sign In</button>
              </Link>
              <Link to="/register">
                <button className={currentTheme === 'dark' ? 'register-buttonDark' : 'register-button'}>Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
