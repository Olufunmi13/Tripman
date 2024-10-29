export const formatDate = (date: Date | null | undefined): string => {
    if (!date) return 'N/A';
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
};

export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;

  return `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export const getDatesBetween = (startDate: Date, endDate: Date): string[] => {
    const dates: string[] = [];
    const currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      // Format the date to "MMM DD"
      const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit' };
      dates.push(currentDate.toLocaleDateString('en-US', options));
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
  
    return dates;
};

// app/utils/utils.ts

export function formatTripDates(startDate: Date | null | undefined, endDate: Date | null | undefined): string {
  if (!startDate || !endDate) {
      return 'N/A';
  }

  // Ensure startDate and endDate are Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return 'Invalid dates';
  }

  const startMonth = start.toLocaleString('default', { month: 'long' });
  const endMonth = end.toLocaleString('default', { month: 'long' });
  const startDay = start.getDate();
  const endDay = end.getDate();

  if (start.getFullYear() === end.getFullYear()) {
      return `${startMonth} ${startDay}-${endDay}`;
  } else {
      return `${startMonth} ${startDay}, ${start.getFullYear()} - ${endMonth} ${endDay}, ${end.getFullYear()}`;
  }
}