import React, { useState } from 'react';
import { Text, Group, Card, Modal, Button, Timeline, UnstyledButton } from '@mantine/core';
import { getDatesBetween } from '@/app/utils/utils';
import EventForm from './eventForm';
import { useDisclosure } from '@mantine/hooks';
import { DaySelectorProps, DayData, Event } from '@/app/interface';
import DateButton from '@/app/components/buttons/daySelectorButton';
import { Plus } from 'tabler-icons-react';

const ItineraryForm: React.FC<DaySelectorProps> = ({ startDate, endDate }) => {
  const [activeDateIndex, setActiveDateIndex] = useState<number | null>(null);
  const [itinerary, setItinerary] = useState<DayData[]>([]);
  const [modalOpened, modalHandlers] = useDisclosure(false);
  const [eventActivity, setEventActivity] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventEstimatedCost, setEventEstimatedCost] = useState('');

  if (!startDate || !endDate) {
    return <div>Please provide valid start and end dates.</div>;
  }
  const dateList = getDatesBetween(startDate, endDate);
  // const validateEventData = (): boolean => {
  //   let isValid = true;

  //   if (eventActivity.trim().length < 3) {
  //     alert('Activity must be at least 3 characters long');
  //     isValid = false;
  //   }

  //   if (eventStartTime.trim() === '') {
  //     alert('Start time is required');
  //     isValid = false;
  //   }

  //   if (eventLocation.trim().length === 0) {
  //     alert('Location is required');
  //     isValid = false;
  //   }

  //   if (/^[a-zA-Z]/.test(eventEstimatedCost)) {
  //     alert('Estimated cost should not contain letters');
  //     isValid = false;
  //   } else if (!/^\d+(\.\d{1,2})?$/.test(eventEstimatedCost)) {
  //     alert('Invalid cost format. Use number with optional decimal places');
  //     isValid = false;
  //   }

  //   return isValid;
  // };
  const handleAddEvent = () => {
    if (activeDateIndex !== null) {
      // const isValid = validateEventData();

      // if (isValid) {
        const newEvent: Event = {
          activity: eventActivity,
          starttime: eventStartTime,
          estimatedCost: eventEstimatedCost,
          location: eventLocation,
        };
        setItinerary((prev) => {
          const newItinerary = [...prev];
          if (!newItinerary[activeDateIndex]) {
            newItinerary[activeDateIndex] = { day: `Day ${activeDateIndex + 1}`, events: [] };
          }
          newItinerary[activeDateIndex].events.push(newEvent);
          return newItinerary;
        });
        setEventActivity('');
        setEventStartTime('');
        setEventLocation('');
        setEventEstimatedCost('');
        modalHandlers.close();
      // }
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
          <Button color="gray" variant="subtle" onClick={() => modalHandlers.close()}>
            Cancel
          </Button>
          <Button color="#7539d6" variant="subtle" onClick={handleAddEvent}>
            Save
          </Button>
        </Group>
        <EventForm
          eventActivity={eventActivity}
          setEventActivity={setEventActivity}
          eventStartTime={eventStartTime}
          setEventStartTime={setEventStartTime}
          eventLocation={eventLocation}
          setEventLocation={setEventLocation}
          eventEstimatedCost={eventEstimatedCost}
          setEventEstimatedCost={setEventEstimatedCost}
        />
      </Modal>

      {activeDateIndex !== null && (
        <div>
          {itinerary[activeDateIndex]?.events.map((event, idx) => (
            <Timeline color="grape" active={-1} lineWidth={2} bulletSize={12}>
              <Timeline.Item lineVariant="dotted">
                <Card key={idx} shadow="sm" padding="lg" style={{ marginTop: '10px' }}>
                  <Text size="sm" c="#7539d6">
                    {event.starttime}
                  </Text>
                  <Text fw={700} className="my-2">
                    {event.activity}
                  </Text>
                  <Group className='mb-2'>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 8.95334C9.14875 8.95334 10.08 8.02209 10.08 6.87334C10.08 5.72458 9.14875 4.79333 8 4.79333C6.85125 4.79333 5.92 5.72458 5.92 6.87334C5.92 8.02209 6.85125 8.95334 8 8.95334Z"
                        stroke="#5D5D5D"
                        stroke-width="1.5"
                      />
                      <path
                        d="M2.41333 5.66C3.72667 -0.113337 12.28 -0.10667 13.5867 5.66666C14.3533 9.05333 12.2467 11.92 10.4 13.6933C9.06 14.9867 6.94 14.9867 5.59333 13.6933C3.75333 11.92 1.64667 9.04666 2.41333 5.66Z"
                        stroke="#5D5D5D"
                        stroke-width="1.5"
                      />
                    </svg>

                    <Text size="sm">{event.location}</Text>
                  </Group>
                  <Group className='mb-2'>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.3333 8.43333V10.9C12.3333 12.98 10.3933 14.6667 8 14.6667C5.60667 14.6667 3.66667 12.98 3.66667 10.9V8.43333C3.66667 10.5133 5.60667 12 8 12C10.3933 12 12.3333 10.5133 12.3333 8.43333Z"
                        stroke="#5D5D5D"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.3333 5.1C12.3333 5.70666 12.1667 6.26666 11.8733 6.74666C11.16 7.91999 9.69334 8.66666 8 8.66666C6.30667 8.66666 4.84001 7.91999 4.12667 6.74666C3.83334 6.26666 3.66667 5.70666 3.66667 5.1C3.66667 4.06 4.15333 3.11999 4.93333 2.43999C5.72 1.75333 6.8 1.33333 8 1.33333C9.2 1.33333 10.28 1.75333 11.0667 2.43333C11.8467 3.12 12.3333 4.06 12.3333 5.1Z"
                        stroke="#5D5D5D"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.3333 5.1V8.43333C12.3333 10.5133 10.3933 12 8 12C5.60667 12 3.66667 10.5133 3.66667 8.43333V5.1C3.66667 3.02 5.60667 1.33333 8 1.33333C9.2 1.33333 10.28 1.75333 11.0667 2.43333C11.8467 3.12 12.3333 4.06 12.3333 5.1Z"
                        stroke="#5D5D5D"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <Text size="sm">{event.estimatedCost}</Text>
                  </Group>
                </Card>
              </Timeline.Item>
            </Timeline>
          ))}
        </div>
      )}
      <UnstyledButton
        className="absolute right-20 bottom-15 m-4 p-2 rounded-full bg-[#7539d6] hover:bg-[#7539d6]"
        color="white"
        variant="white"
        onClick={() => {
          modalHandlers.open();
        }}
      >
        <Plus />
      </UnstyledButton>
    </div>
  );
};

export default ItineraryForm;
