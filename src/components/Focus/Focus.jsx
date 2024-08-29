// src/components/Focus/Focus.jsx
import React, { useState } from 'react';
import { activityTypes, activities } from '../../data/activities';
import styles from './Focus.module.css';

const Focus = ({ onFocus }) => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setSelectedActivity('');
  };

  const handleActivityChange = (e) => {
    setSelectedActivity(e.target.value);
    onFocus(selectedType, e.target.value);
  };

  return (
    <div className={styles.focus}>
      <h2>מיקוד</h2>
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="">בחר סוג פעילות</option>
        {activityTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <select
        value={selectedActivity}
        onChange={handleActivityChange}
        disabled={!selectedType}
      >
        <option value="">בחר פעילות</option>
        {selectedType &&
          activities[selectedType].map((activity) => (
            <option key={activity} value={activity}>
              {activity}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Focus;