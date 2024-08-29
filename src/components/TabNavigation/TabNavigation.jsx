// src/components/TabNavigation/TabNavigation.jsx
import React from 'react';
import styles from './TabNavigation.module.css';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <nav className={styles.tabNavigation}>
      <button 
        className={`${styles.tab} ${activeTab === 'filter' ? styles.active : ''}`}
        onClick={() => setActiveTab('filter')}
      >
        סינון
      </button>
      <button 
        className={`${styles.tab} ${activeTab === 'activities' ? styles.active : ''}`}
        onClick={() => setActiveTab('activities')}
      >
        פעילויות
      </button>
      <button 
        className={`${styles.tab} ${activeTab === 'students' ? styles.active : ''}`}
        onClick={() => setActiveTab('students')}
      >
        תלמידים
      </button>
    </nav>
  );
};

export default TabNavigation;