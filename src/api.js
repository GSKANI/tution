// Backend API Services for Cornerstone MathSphere
// This file handles integration with the backend server

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Submit enquiry form
 */
export const submitEnquiry = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/submit-enquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    throw error;
  }
};

/**
 * Submit contact form message
 */
export const submitContactMessage = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/submit-contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting contact message:', error);
    throw error;
  }
};

/**
 * Track analytics event
 */
export const trackEvent = async (eventName, eventData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: eventName,
        data: eventData,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.warn('Analytics tracking failed');
    }
  } catch (error) {
    console.warn('Analytics error:', error);
  }
};
