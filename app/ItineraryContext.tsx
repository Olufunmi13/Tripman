'use client';
import React, { createContext, useContext, useState } from 'react';

interface ItineraryContextType {
  itinerary: any; // You can define a more specific type based on your needs
  setItinerary: (data: any) => void;
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

export const ItineraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [itinerary, setItinerary] = useState<any>(null);

  return (
    <ItineraryContext.Provider value={{ itinerary, setItinerary }}>
      {children}
    </ItineraryContext.Provider>
  );
};

export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error('useItinerary must be used within an ItineraryProvider');
  }
  return context;
};
