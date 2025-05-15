/**
 * Converts date and time components to a Unix timestamp in milliseconds
 * @param {number} day - Day of the month (1-31)
 * @param {number} month - Month (1-12)
 * @param {number} year - Full year (e.g., 2025)
 * @param {number} hour - Hour (1-12)
 * @param {number} minute - Minute (0-59)
 * @param {string} ampm - "AM" or "PM"
 * @returns {number} Unix timestamp in milliseconds
 */
function convertToTimestamp(day, month, year, hour, minute, ampm) {
  // Validate inputs
  if (
    day == null ||
    month == null ||
    year == null ||
    hour == null ||
    minute == null ||
    ampm == null
  ) {
    throw new Error("All parameters are required");
  }
  
  // Convert month to 0-based index (JavaScript uses 0-11 for months)
  const monthIndex = month - 1;
  
  // Convert hour to 24-hour format
  let hour24 = hour;
  if (ampm.toUpperCase() === "PM" && hour < 12) {
    hour24 = hour + 12;
  } else if (ampm.toUpperCase() === "AM" && hour === 12) {
    hour24 = 0;
  }
  
  // Create Date object
  const date = new Date(year, monthIndex, day, hour24, minute);
  
  // Get timestamp in milliseconds
  return date.getTime();
}

// Example usage:
const timestamp = convertToTimestamp(14, 5, 2025, 1, 6, "AM");
console.log(`Timestamp UNIX: ${timestamp}`);
console.log(new Date(timestamp).toISOString())
