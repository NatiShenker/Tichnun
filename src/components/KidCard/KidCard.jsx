import React, { useState, useEffect } from 'react';
import styles from './KidCard.module.css';

const KidCard = ({
  kid,
  selectedDate,
  selectedActivityType,
  selectedActivity,
  updateKidActivities
}) => {
  const [isActivityChanging, setIsActivityChanging] = useState(false);

  const relevantActivity = kid.activities.find(
    (activity) =>
      activity.date.toDateString() === new Date(selectedDate).toDateString() &&
      activity.type === selectedActivityType &&
      activity.activity === selectedActivity
  );

  const isActivityScheduled = !!relevantActivity;

  useEffect(() => {
    if (isActivityChanging) {
      const timer = setTimeout(() => setIsActivityChanging(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isActivityChanging]);

  const handleActivityToggle = () => {
    setIsActivityChanging(true);
    let newActivities;
    if (isActivityScheduled) {
      newActivities = kid.activities.filter(activity => activity !== relevantActivity);
    } else {
      newActivities = [
        ...kid.activities,
        {
          date: new Date(selectedDate),
          type: selectedActivityType,
          activity: selectedActivity,
        },
      ];
    }
    updateKidActivities(kid.id, newActivities);
  };

  return (
    <div className={styles.kidCard}>
      <img src={kid.picture} alt={kid.fullName} className={styles.kidPicture} />
      <h3>{kid.fullName}</h3>
      <p className={styles.kidId}>ת"ז: {kid.id}</p>
      <p className={styles.kidClass}>כיתה: {kid.class}</p>
      <div className={`${styles.activityInfo} ${isActivityChanging ? styles.changing : ''}`}>
        {relevantActivity ? (
          <>
            <h4>פעילות:</h4>
            <p>{relevantActivity.activity} ({relevantActivity.type})</p>
            <p>תאריך: {new Date(relevantActivity.date).toLocaleDateString()}</p>
          </>
        ) : (
          <p>אין פעילות מתאימה לסינון הנוכחי</p>
        )}
      </div>
      <button 
        className={styles.activityButton}
        onClick={handleActivityToggle} 
        disabled={!selectedDate || !selectedActivityType || !selectedActivity}
      >
        {isActivityScheduled ? 'הסר פעילות' : 'הוסף פעילות'}
      </button>
    </div>
  );
};

export default KidCard;