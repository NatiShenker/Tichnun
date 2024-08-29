// src/components/StudentsTab/StudentsTab.jsx
import React from 'react';
import KidCard from '../KidCard/KidCard';
import styles from './StudentsTab.module.css';

const StudentsTab = ({
  filteredKids,
  selectedDate,
  selectedActivityType,
  selectedActivity,
  updateKidActivities
}) => {
  return (
    <div className={styles.studentsTab}>
      <h2>תלמידים</h2>
      <div className={styles.studentGrid}>
        {filteredKids.map(kid => (
          <KidCard
            key={kid.id}
            kid={kid}
            selectedDate={selectedDate}
            selectedActivityType={selectedActivityType}
            selectedActivity={selectedActivity}
            updateKidActivities={updateKidActivities}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentsTab;