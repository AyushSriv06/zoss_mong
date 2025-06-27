// Date utility functions for service scheduling and warranty calculations

/**
 * Add months to a date
 * @param {Date} date - Starting date
 * @param {number} months - Number of months to add
 * @returns {Date} - New date with months added
 */
const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * Add days to a date
 * @param {Date} date - Starting date
 * @param {number} days - Number of days to add
 * @returns {Date} - New date with days added
 */
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Calculate warranty end date
 * @param {Date} purchaseDate - Product purchase date
 * @param {number} warrantyMonths - Warranty period in months
 * @returns {Date} - Warranty end date
 */
const calculateWarrantyEnd = (purchaseDate, warrantyMonths) => {
  return addMonths(new Date(purchaseDate), warrantyMonths);
};

/**
 * Calculate AMC end date
 * @param {Date} startDate - AMC start date
 * @param {number} amcMonths - AMC period in months
 * @returns {Date} - AMC end date
 */
const calculateAmcEnd = (startDate, amcMonths) => {
  return addMonths(new Date(startDate), amcMonths);
};

/**
 * Calculate next service date
 * @param {Date} lastServiceDate - Last service date (or purchase date for first service)
 * @param {number} frequencyDays - Service frequency in days
 * @returns {Date} - Next service date
 */
const calculateNextServiceDate = (lastServiceDate, frequencyDays) => {
  return addDays(new Date(lastServiceDate), frequencyDays);
};

/**
 * Check if a date is within a certain number of days from now
 * @param {Date} date - Date to check
 * @param {number} days - Number of days threshold
 * @returns {boolean} - True if date is within the threshold
 */
const isWithinDays = (date, days) => {
  const now = new Date();
  const diffTime = new Date(date) - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= days && diffDays >= 0;
};

/**
 * Check if a date is overdue
 * @param {Date} date - Date to check
 * @returns {boolean} - True if date is in the past
 */
const isOverdue = (date) => {
  return new Date(date) < new Date();
};

/**
 * Get service status based on next service date
 * @param {Date} nextServiceDate - Next service date
 * @returns {string} - Service status: 'Upcoming', 'Due Soon', or 'Overdue'
 */
const getServiceStatus = (nextServiceDate) => {
  if (isOverdue(nextServiceDate)) {
    return 'Overdue';
  } else if (isWithinDays(nextServiceDate, 7)) {
    return 'Due Soon';
  } else {
    return 'Upcoming';
  }
};

/**
 * Check if warranty is active
 * @param {Date} warrantyEndDate - Warranty end date
 * @returns {boolean} - True if warranty is still active
 */
const isWarrantyActive = (warrantyEndDate) => {
  return new Date(warrantyEndDate) > new Date();
};

/**
 * Check if AMC is active
 * @param {Date} amcEndDate - AMC end date
 * @returns {boolean} - True if AMC is still active
 */
const isAmcActive = (amcEndDate) => {
  return new Date(amcEndDate) > new Date();
};

module.exports = {
  addMonths,
  addDays,
  calculateWarrantyEnd,
  calculateAmcEnd,
  calculateNextServiceDate,
  isWithinDays,
  isOverdue,
  getServiceStatus,
  isWarrantyActive,
  isAmcActive
};