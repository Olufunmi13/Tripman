import React, { useState } from 'react';
import { Text, Group, Card, Modal, Button, Timeline, UnstyledButton } from '@mantine/core';
import { getDatesBetween } from '@/app/utils/utils';
import EventForm from './eventForm';
import { useDisclosure } from '@mantine/hooks';
import { DaySelectorProps, DayData, Event } from '@/app/interface';
import DateButton from '@/app/components/buttons/daySelectorButton';
import { Plus } from 'tabler-icons-react';
import { IconLocationItin, IconCostItin } from '@/app/customIcons/svgIcons';
import { useForm } from '@mantine/form';
import { eventFormValidation } from '@/app/utils/validation';

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
  
  const form = useForm({
    initialValues: {
      activity: eventActivity || '',
      startTime: eventStartTime || '',
      location: eventLocation || '',
      estimatedCost: eventEstimatedCost || '',
    },
    validate: eventFormValidation,
  });

  const handleAddEvent = () => {
    const isValid = form.validate();
    if (!isValid.hasErrors && activeDateIndex !== null) {
      const newEvent: Event = {
        activity: form.values.activity,
        starttime: form.values.startTime,
        estimatedCost: form.values.estimatedCost,
        location: form.values.location,
      };
      setItinerary((prev) => {
        const newItinerary = [...prev];
        if (!newItinerary[activeDateIndex]) {
          newItinerary[activeDateIndex] = { day: `Day ${activeDateIndex + 1}`, events: [] };
        }
        newItinerary[activeDateIndex].events.push(newEvent);
        return newItinerary;
      });
      form.reset();
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
          <Button color="gray" variant="subtle" onClick={() => modalHandlers.close()}>
            Cancel
          </Button>
          <Button color="#7539d6" variant="subtle" onClick={handleAddEvent}>
            Save
          </Button>
        </Group>
        <EventForm
          form={form}
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
                  <Group className="mb-2">
                    <IconLocationItin />
                    <Text size="sm">{event.location}</Text>
                  </Group>
                  <Group className="mb-2">
                    <IconCostItin />
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
