// src/components/Filter/Filter.jsx
import React, { useState } from 'react';
import { schools } from '../../data/schools';
import styles from './Filter.module.css';

const Filter = ({ onFilter }) => {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleSchoolChange = (e) => {
    setSelectedSchool(e.target.value);
    setSelectedClass('');
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleFilter = () => {
    if (selectedSchool && selectedClass && selectedDate) {
      const schoolName = schools.find(school => school.id === parseInt(selectedSchool)).name;
      onFilter(schoolName, selectedClass, selectedDate);
    }
  };

  return (
    <div className={styles.filter}>
      <h2>סינון</h2>
      <select value={selectedSchool} onChange={handleSchoolChange}>
        <option value="">בחר בית ספר</option>
        {schools.map((school) => (
          <option key={school.id} value={school.id}>
            {school.name}
          </option>
        ))}
      </select>
      <select value={selectedClass} onChange={handleClassChange} disabled={!selectedSchool}>
        <option value="">בחר כיתה</option>
        {selectedSchool &&
          schools
            .find((school) => school.id === parseInt(selectedSchool))
            .classes.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
      </select>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        disabled={!selectedClass}
      />
      <button onClick={handleFilter} disabled={!selectedSchool || !selectedClass || !selectedDate}>
        סנן
      </button>
    </div>
  );
};

export default Filter;