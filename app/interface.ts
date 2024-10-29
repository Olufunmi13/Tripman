
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
    id?: number;
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

export interface Trip {
    id: number;
    tripName: string;
    startDate: Date;
    endDate: Date;
    dropZone: { path: string }[];
    events: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        tripId: number;
        activity: string;
        startTime: Date;
        location: string;
        estimatedCost: number;
        date: Date;
    }[];
    image?: string;
}
