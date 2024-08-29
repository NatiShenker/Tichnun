// src/components/ActivitiesTab/ActivitiesTab.jsx
import React from 'react';
import { activities, activityTypes } from '../../data/activities';
import styles from './ActivitiesTab.module.css';

const ActivitiesTab = ({ onActivitySelect, selectedActivityType, selectedActivity }) => {
  return (
    <div className={styles.activitiesTab}>
      <h2>פעילויות</h2>
      {activityTypes.map(type => (
        <div key={type} className={styles.activityType}>
          <h3>{type}</h3>
          <div className={styles.activityList}>
            {activities[type].map(activity => (
              <button
                key={activity}
                className={`${styles.activityChip} ${selectedActivityType === type && selectedActivity === activity ? styles.selected : ''}`}
                onClick={() => onActivitySelect(type, activity)}
              >
                {activity}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivitiesTab;