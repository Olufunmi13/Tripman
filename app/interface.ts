

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
    activity: string;
    startTime: string;
    location: string;
    estimatedCost: string;
}

export interface DayData {
    day: string;
    events: Event[];
}

export interface DaySelectorProps {
    startDate: Date | null | undefined;
    endDate: Date | null | undefined;
    currency: string;
}
