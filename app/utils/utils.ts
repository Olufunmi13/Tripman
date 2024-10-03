export const formatDate = (date: Date | null | undefined): string => {
    if (!date) return 'N/A';
    return date.toLocaleDateString('en-US', {
      // year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
