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
