import React, { useState, useEffect } from 'react';
import { schools } from '../../data/schools';
import styles from './FilterTab.module.css';

const FilterTab = ({ onFilter }) => {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isClassSelectVisible, setIsClassSelectVisible] = useState(false);

  useEffect(() => {
    if (selectedSchool) {
      setIsClassSelectVisible(true);
    } else {
      setIsClassSelectVisible(false);
      setSelectedClass('');
    }
  }, [selectedSchool]);

  const handleFilter = () => {
    if (selectedSchool && selectedClass && selectedDate) {
      onFilter(selectedSchool, selectedClass, selectedDate);
    }
  };

  return (
    <div className={styles.filterTab}>
      <h2>סינון תלמידים</h2>
      <select 
        value={selectedSchool} 
        onChange={(e) => setSelectedSchool(e.target.value)}
        className={styles.select}
      >
        <option value="">בחר בית ספר</option>
        {schools.map((school) => (
          <option key={school.id} value={school.name}>{school.name}</option>
        ))}
      </select>
      <div className={`${styles.selectWrapper} ${isClassSelectVisible ? styles.visible : ''}`}>
        <select 
          value={selectedClass} 
          onChange={(e) => setSelectedClass(e.target.value)}
          disabled={!selectedSchool}
          className={styles.select}
        >
          <option value="">בחר כיתה</option>
          {selectedSchool && schools
            .find(school => school.name === selectedSchool)
            .classes.map(className => (
              <option key={className} value={className}>{className}</option>
            ))
          }
        </select>
      </div>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className={styles.dateInput}
      />
      <button 
        onClick={handleFilter} 
        disabled={!selectedSchool || !selectedClass || !selectedDate}
        className={styles.filterButton}
      >
        סנן
      </button>
    </div>
  );
};

export default FilterTab;