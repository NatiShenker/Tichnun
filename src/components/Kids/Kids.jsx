// src/components/Kids/Kids.jsx
import React from 'react';
import KidCard from '../KidCard/KidCard';
import styles from './Kids.module.css';

const Kids = ({
  filteredKids,
  selectedDate,
  selectedActivityType,
  selectedActivity,
  updateKidActivities
}) => {
  return (
    <div className={styles.kids}>
      <h2>תלמידים</h2>
      <div className={styles.kidsList}>
        {filteredKids.length > 0 ? (
          filteredKids.map((kid) => (
            <KidCard
              key={kid.id}
              kid={kid}
              selectedDate={selectedDate}
              selectedActivityType={selectedActivityType}
              selectedActivity={selectedActivity}
              updateKidActivities={updateKidActivities}
            />
          ))
        ) : (
          <p>אין תלמידים תואמים לסינון הנוכחי</p>
        )}
      </div>
    </div>
  );
};

export default Kids;