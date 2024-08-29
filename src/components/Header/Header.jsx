// src/components/Header/Header.jsx
import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>ניהול פעילויות אחרי בית ספר</h1>
      <div className={styles.userProfile}>
        <span>שלום, מנהל</span>
        <img src="../../../android-chrome-512x512.png" alt="User profile" className={styles.avatar} />
      </div>
    </header>
  );
};

export default Header;