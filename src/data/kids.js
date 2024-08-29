// src/data/kids.js
import { activities, activityTypes } from './activities';
import { schools } from './schools';

const generateRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateRandomActivities = () => {
  const startDate = new Date('2024-08-30');
  const endDate = new Date('2024-10-01');
  const numberOfActivities = Math.floor(Math.random() * 5) + 1; // 1 to 5 activities
  
  const randomActivities = [];
  for (let i = 0; i < numberOfActivities; i++) {
    const randomType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const randomActivity = activities[randomType][Math.floor(Math.random() * activities[randomType].length)];
    const randomDate = generateRandomDate(startDate, endDate);
    randomActivities.push({ type: randomType, activity: randomActivity, date: randomDate });
  }
  return randomActivities;
};

const hebrewFirstNames = [
  "אביב", "אדם", "אופיר", "איתי", "אלון", "אמיר", "אסף", "ארי", "בן", "גד",
  "גיא", "דן", "דניאל", "הראל", "זיו", "חן", "יאיר", "יהונתן", "יואב", "יובל",
  "יוסף", "יותם", "ליאם", "מאיר", "מיכאל", "נדב", "נועם", "ניר", "עומר", "עידו",
  "רון", "רועי", "שגיא", "שי", "תומר",
  "אביגיל", "אגם", "אדווה", "אור", "איה", "איילה", "אלה", "אמה", "אריאל", "גאיה",
  "גילי", "דנה", "הדר", "הילה", "יעל", "ליאור", "ליהי", "מאיה", "מיכל", "נועה",
  "נוי", "ניצן", "עדי", "רוני", "רותם", "שחר", "שיר", "שירה", "תמר", "יהלי"
];

const hebrewLastNames = [
  "כהן", "לוי", "מזרחי", "פרץ", "ביטון", "דהן", "אברהם", "פרידמן", "אגבאריה", "מלכה",
  "אזולאי", "אוחיון", "גבאי", "יוסף", "אלון", "לביא", "שלום", "רוזנברג", "אדרי", "שמעוני",
  "חדד", "עמר", "אוחנה", "סויסה", "גולן", "טל", "ששון", "אשכנזי", "דוד", "חזן",
  "וקנין", "אלבז", "אייזנברג", "בוזגלו", "אטיאס", "ברוך", "נחום", "גולדשטיין", "סגל", "קליין"
];

const generateAvatar = (seed) => {
  return `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${encodeURIComponent(seed)}`;
};

export const kids = schools.flatMap(school =>
  school.classes.flatMap((className, classIndex) =>
    Array.from({ length: 5 }, (_, kidIndex) => {
      const firstNameIndex = Math.floor(Math.random() * hebrewFirstNames.length);
      const lastNameIndex = Math.floor(Math.random() * hebrewLastNames.length);
      const firstName = hebrewFirstNames[firstNameIndex];
      const lastName = hebrewLastNames[lastNameIndex];
      const id = `${school.id}-${classIndex + 1}-${kidIndex + 1}`;
      const fullName = `${firstName} ${lastName}`;
      return {
        id: id,
        firstName: firstName,
        lastName: lastName,
        fullName: fullName,
        picture: generateAvatar(fullName),
        school: school.name,
        class: className,
        activities: generateRandomActivities()
      };
    })
  )
);

console.log("First few kids:", kids.slice(0, 5));