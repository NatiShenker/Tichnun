import { useState } from 'react';
import { studentsData as initialStudentsData } from '../Data';

export const useStudentData = () => {
  const [studentsData, setStudentsData] = useState(initialStudentsData);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [tempChanges, setTempChanges] = useState([]);

  const handleFilter = (selectedSchool, selectedClass) => {
    if (selectedSchool && selectedClass) {
      setFilteredStudents(studentsData[selectedSchool]?.[selectedClass] || []);
    } else {
      setFilteredStudents([]);
    }
  };

  const updateStudentActivity = (studentId, activity, isAdding) => {
    setTempChanges(prevChanges => [
      ...prevChanges,
      { studentId, activity, isAdding }
    ]);
    
    setFilteredStudents(prevStudents =>
      prevStudents.map(student => {
        if (student.id === studentId) {
          const updatedActivities = isAdding
            ? [...student.activities, activity]
            : student.activities.filter(act => act !== activity);
          return { ...student, activities: updatedActivities };
        }
        return student;
      })
    );
  };

  const handleSave = (selectedSchool, selectedClass) => {
    setStudentsData(prevData => {
      const newData = {...prevData};
      tempChanges.forEach(({ studentId, activity, isAdding }) => {
        newData[selectedSchool][selectedClass] = newData[selectedSchool][selectedClass].map(student => {
          if (student.id === studentId) {
            const updatedActivities = isAdding
              ? [...student.activities, activity]
              : student.activities.filter(act => act !== activity);
            return { ...student, activities: updatedActivities };
          }
          return student;
        });
      });
      return newData;
    });
    setTempChanges([]);
    alert('השינויים נשמרו בהצלחה');
  };

  const discardChanges = (selectedSchool, selectedClass) => {
    setFilteredStudents(studentsData[selectedSchool]?.[selectedClass] || []);
    setTempChanges([]);
  };

  return {
    filteredStudents,
    handleFilter,
    updateStudentActivity,
    handleSave,
    discardChanges,
    hasChanges: tempChanges.length > 0
  };
};