/**
 * Formats a 'YYYY-MM-DD' date string to 'Month DD, YYYY'
 * @param {string} dateStr - The input date string (e.g., '2026-06-10')
 * @returns {string} The formatted date string (e.g., 'June 10, 2026')
 */
export const formatDate = (dateStr) => {
    if (!dateStr) return '';

    // Split to avoid UTC timezone shifting issues
    const [year, month, day] = dateStr.split('-');
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
};

// Example usage:
// console.log(formatDate('2026-06-10')); // Output: June 10, 2026
