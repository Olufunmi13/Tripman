

export interface FormValues {
    dropZone: File[];
    trip: string;
    startDate: Date | null;
    endDate: Date | null;
    budget: number | '';
    currency: string;
    itinerary: object
}

export interface DateButtonProps {
    day: string;
    date: string;
    isActive: boolean;
    onClick: () => void;
}
export interface Event {
    title: string;
    time: string;
    address: string;
    estimatedCost: string;
}
export interface EventFormProps {
    onAddEvent: (event: {
      title: string;
      time: string;
      address: string;
      estimatedCost: string;
    }) => void;
}
export interface DayData {
    day: string;
    events: Event[];
}

export interface DaySelectorProps {
    startDate: Date | null | undefined;
    endDate: Date | null | undefined;
}
