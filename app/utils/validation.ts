export const validateTrip = (value: string): string | null => {
    return value.length < 3 ? "Invalid country" : null;
  };
  
  export const validateStartDate = (value: Date | null): string | null => {
    if (!value) return "Date is required";
    const date = new Date(value);
    return isNaN(date.getTime()) ? "Invalid date format" : null;
  };
  
  export const validateEndDate = (value: Date | null, startDate: Date | null): string | null => {
    if (!value) return "Date is required";
    const date = new Date(value);
    if (isNaN(date.getTime())) return "Invalid date format";
    if (startDate && new Date(value) < new Date(startDate)) {
      return "End date must be after start date";
    }
    return null;
  };
  
  export const validateBudget = (value: number | ""): string | null => {
    if (value === "") return "Budget is required";
    if (value <= 0) return "Set a realistic budget";
    return null;
  };