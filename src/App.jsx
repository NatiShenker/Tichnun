import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Header from './components/Header/Header';
import TabNavigation from './components/TabNavigation/TabNavigation';
import FilterTab from './components/FilterTab/FilterTab';
import ActivitiesTab from './components/ActivitiesTab/ActivitiesTab';
import StudentsTab from './components/StudentsTab/StudentsTab';
import { kids as initialKids } from './data/kids';
import styles from './App.module.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('filter');
  const [kids, setKids] = useState(initialKids);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedActivityType, setSelectedActivityType] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleFilter = (school, className, date) => {
    setSelectedSchool(school);
    setSelectedClass(className);
    setSelectedDate(date);
    setActiveTab('activities');
  };

  const handleActivitySelect = (activityType, activity) => {
    setSelectedActivityType(activityType);
    setSelectedActivity(activity);
    setActiveTab('students');
  };

  const updateKidActivities = (kidId, newActivities) => {
    setKids(prevKids =>
      prevKids.map(kid =>
        kid.id === kidId ? { ...kid, activities: newActivities } : kid
      )
    );
  };

  const filteredKids = kids.filter(
    kid => 
      kid.school === selectedSchool &&
      kid.class === selectedClass
  );

  const renderActiveTab = () => {
    switch(activeTab) {
      case 'filter':
        return <FilterTab onFilter={handleFilter} />;
      case 'activities':
        return <ActivitiesTab onActivitySelect={handleActivitySelect} selectedActivityType={selectedActivityType} selectedActivity={selectedActivity} />;
      case 'students':
        return <StudentsTab filteredKids={filteredKids} selectedDate={selectedDate} selectedActivityType={selectedActivityType} selectedActivity={selectedActivity} updateKidActivities={updateKidActivities} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.app}>
      <Header />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className={styles.mainContent}>
        <TransitionGroup>
          <CSSTransition
            key={activeTab}
            classNames={{
              enter: styles.fadeEnter,
              enterActive: styles.fadeEnterActive,
              exit: styles.fadeExit,
              exitActive: styles.fadeExitActive,
            }}
            timeout={300}
          >
            {renderActiveTab()}
          </CSSTransition>
        </TransitionGroup>
      </main>
    </div>
  );
};

export default App;