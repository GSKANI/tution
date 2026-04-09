// Utility functions for Cornerstone MathSphere

/**
 * Format phone number to Indian standard
 */
export const formatPhoneNumber = (phone) => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return phone;
};

/**
 * Validate email address
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Indian phone number
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

/**
 * Get greeting based on time of day
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

/**
 * Send analytics event
 */
export const sendAnalytics = async (eventName, data) => {
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        data,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.warn('Analytics error:', error);
  }
};

/**
 * Debounce function for form input
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Local storage utility
 */
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage error:', error);
      return null;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
};

/**
 * Get student statistics
 */
export const getStudentStats = () => {
  return [
    { number: '1200+', label: 'Students Trained' },
    { number: '98%', label: 'Board Pass Rate' },
    { number: '10+', label: 'Years Experience' },
    { number: '3', label: 'Exam Tracks' },
  ];
};

/**
 * Grade list utility
 */
export const getGradesList = () => [
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  'Class 11', 'Class 12'
];

/**
 * Subjects list
 */
export const getSubjectsList = () => [
  'Mathematics',
  'Chemistry',
  'Physics',
  'Biology',
  'All Subjects'
];

/**
 * Exams list
 */
export const getExamsList = () => [
  'Not Applicable',
  'NEET',
  'JEE Mains',
  'JEE Advanced',
  'UPSC'
];

/**
 * Batch times list
 */
export const getBatchTimesList = () => [
  'Morning (7am – 10am)',
  'Afternoon (1pm – 4pm)',
  'Evening (5pm – 8pm)',
  'Weekend Batch'
];
