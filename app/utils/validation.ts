export const validateDropzone = (pendingFiles: File[]): string | null => {
  return pendingFiles && pendingFiles.length === 0 ? 'please upload an image' : null;
};

export const validateTrip = (value: string): string | null => {
  return value.length < 3 ? 'Invalid country' : null;
};

export const validateStartDate = (value: Date | null): string | null => {
  if (!value) return 'Date is required';
  const date = new Date(value);
  return isNaN(date.getTime()) ? 'Invalid date format' : null;
};

export const validateEndDate = (value: Date | null, startDate: Date | null): string | null => {
  if (!value) return 'Date is required';
  const date = new Date(value);
  if (isNaN(date.getTime())) return 'Invalid date format';
  if (startDate && new Date(value) < new Date(startDate)) {
    return 'End date must be after start date';
  }
  return null;
};

export const validateBudget = (value: number | ''): string | null => {
  if (value === '') return 'Budget is required';
  if (value <= 0) return 'Set a realistic budget';
  return null;
};

export const validateActivity = (value: string) => {
  if (value.length < 3) {
    return 'Activity must be at least 3 characters long';
  }
  if (!/^[a-zA-Z\s]+$/.test(value)) {
    return 'Activity should only contain letters and spaces';
  }
  return null;
};

export const validateStartTime = (value: string) => {
  return value.trim() === '' ? 'Time cannot be empty' : null;
};

export const validateLocation = (value: string) => {
  if (value.length === 0) {
    return 'Location is required';
  }
  if (!/^[a-zA-Z\s]+$/.test(value)) {
    return 'Location should only contain letters and spaces';
  }
  return null;
};

export const validateEstimatedCost = (value: string, budget: number): string | null => {
  const numericValue = parseFloat(value.replace(/[^\d.-]/g, ''));

  if(isNaN(numericValue)){
    return 'Invalid cost format. Please enter a valid number.'
  }

  if (numericValue > budget){
    return `Estimated cost exceed the trip budget of ${budget}`
  }
  if (value.length === 0) {
    return "Please type 'Free' if it at no cost to you";
  }
  if (!/^\d+(\.\d{1,2})?$/.test(value)) {
    return 'Invalid cost format. Use number with optional decimal places';
  }
  return null;
};

