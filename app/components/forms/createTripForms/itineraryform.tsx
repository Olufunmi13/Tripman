import React, { useState } from 'react';
import { Text, Group, Card, Modal, Button } from '@mantine/core';
import { getDatesBetween } from '@/app/utils/utils';
import EventForm from './eventForm';
import { useDisclosure } from '@mantine/hooks';
import { DaySelectorProps, DayData, Event } from '@/app/interface';
import DateButton from '@/app/components/buttons/daySelectorButton';

const ItineraryForm: React.FC<DaySelectorProps> = ({ startDate, endDate }) => {
  const [activeDateIndex, setActiveDateIndex] = useState<number | null>(null);
  const [itinerary, setItinerary] = useState<DayData[]>([]);
  const [modalOpened, modalHandlers] = useDisclosure(false);

  if (!startDate || !endDate) {
    return <div>Please provide valid start and end dates.</div>;
  }
  const dateList = getDatesBetween(startDate, endDate);

  const handleAddEvent = (newEvent: Event) => {
    if (activeDateIndex !== null) {
      setItinerary((prev) => {
        const newItinerary = [...prev];
        if (!newItinerary[activeDateIndex]) {
          newItinerary[activeDateIndex] = { day: `Day ${activeDateIndex + 1}`, events: [] };
        }
        newItinerary[activeDateIndex].events.push(newEvent);
        return newItinerary;
      });
      modalHandlers.close();
    }
  };

  const handleDateClicked = (index: number) => {
    setActiveDateIndex(index);
    modalHandlers.open();
  };

  return (
    <div>
      <Group gap="md">
        {dateList.map((date, index) => (
          <DateButton
            key={index}
            day={`Day ${index + 1}`}
            date={date}
            isActive={activeDateIndex === index}
            onClick={() => handleDateClicked(index)}
          />
        ))}
      </Group>

      <Modal opened={modalOpened} onClose={modalHandlers.close} withCloseButton={false}>
        <Group justify="space-between" mb="lg">
          <Button color="blue" variant="subtle" onClick={() => modalHandlers.close()}>
            Cancel
          </Button>
          <Button color="gray" variant="outline" onClick={() => handleAddEvent}>
            Save
          </Button>
        </Group>
        <EventForm onAddEvent={handleAddEvent} />
      </Modal>

      {activeDateIndex !== null && (
        <div>
          {itinerary[activeDateIndex]?.events.map((event, idx) => (
            <Card key={idx} shadow="sm" padding="lg" style={{ marginTop: '10px' }}>
              <Text fw={500}>{event.title}</Text>
              <Text size="sm">{event.time}</Text>
              <Text size="sm">{event.address}</Text>
              <Text size="sm">{event.estimatedCost}</Text>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItineraryForm;
