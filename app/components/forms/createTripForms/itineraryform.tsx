import React, { useState, useEffect } from 'react';
import { Text, Group, Card, Modal, Button, Timeline, UnstyledButton, Flex } from '@mantine/core';
import { getDatesBetween } from '@/app/utils/utils';
import EventForm from './eventForm';
import { useDisclosure } from '@mantine/hooks';
import { DaySelectorProps, DayData, Event } from '@/app/interface';
import DateButton from '@/app/components/buttons/daySelectorButton';
import { Dots, MessageDots, Plus, ThumbDown, ThumbUp } from 'tabler-icons-react';
import { IconLocationItin, IconCostItin } from '@/app/customIcons/svgIcons';
import { formatTime } from '@/app/utils/utils';
import { useForm } from '@mantine/form';
import {
  validateActivity,
  validateStartTime,
  validateLocation,
  validateEstimatedCost,
} from '@/app/utils/validation';

interface ItineraryFormProps extends DaySelectorProps {
  budget: number;
  onTotalCostChange: (totalCost: number) => void;
}
const ItineraryForm: React.FC<ItineraryFormProps> = ({ startDate, endDate, currency, budget, onTotalCostChange }) => {
  const [activeDateIndex, setActiveDateIndex] = useState<number | null>(null);
  const [itinerary, setItinerary] = useState<DayData[]>([]);
  const [modalOpened, modalHandlers] = useDisclosure(false);
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [countup, setCountup] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    calculateTotalCost();
  }, [itinerary]);

  const calculateTotalCost = () => {
    const sum = itinerary.reduce((acc, day) => {
      return acc + day.events.reduce((dayAcc, event) => {
        const numericValue = parseFloat(event.estimatedCost.replace(/[^\d.-]/g, '')) || 0;
        return dayAcc + numericValue;
      }, 0);
    }, 0);
    setTotalCost(sum);
    onTotalCostChange(sum);
  }
  const handleCountup = () => {
    setCountup((prevCount) => prevCount + 1);
  };
  const handleCountdown = () => {
    setCountdown((prevCount) => prevCount + 1);
  };

  const handleEditEvent = (dayIndex: number, eventIndex: number) => {
    setActiveDateIndex(dayIndex);
    setSelectedDayIndex(dayIndex);
    setSelectedEventIndex(eventIndex);

    const eventToEdit = itinerary[dayIndex].events[eventIndex];
    form.setValues({
      activity: eventToEdit.activity,
      startTime: eventToEdit.startTime,
      location: eventToEdit.location,
      estimatedCost: eventToEdit.estimatedCost,
    });

    modalHandlers.open();
  };

  if (!startDate || !endDate) {
    return <div>Please provide valid start and end dates.</div>;
  }
  const dateList = getDatesBetween(startDate, endDate);

  const form = useForm({
    initialValues: {
      activity: '',
      startTime: '',
      location: '',
      estimatedCost: '',
    },
    validate: {
      activity: validateActivity,
      startTime: validateStartTime,
      location: validateLocation,
      estimatedCost: (value) => validateEstimatedCost(value, budget),
    },
  });

  const handleAddEvent = () => {
    console.log('Form values before validation:', form.values);
    const isValid = form.validate();
    console.log('Validation result:', isValid);
    
    if (!isValid.hasErrors && activeDateIndex !== null) {
      console.log('No errors found');
      const updatedEvent: Event = {
        activity: form.values.activity,
        startTime: form.values.startTime,
        estimatedCost: form.values.estimatedCost,
        location: form.values.location,
      };
      console.log('Updated event object:', updatedEvent);
  
      setItinerary((prev) => {
        const newItinerary = [...prev];
        
        if (!newItinerary[activeDateIndex]) {
          newItinerary[activeDateIndex] = { day: `Day ${activeDateIndex + 1}`, events: [] };
        }
  
        // Check if we're editing an existing event
        if (selectedEventIndex !== null && selectedDayIndex !== null) {
          newItinerary[selectedDayIndex].events[selectedEventIndex] = updatedEvent;
        } else {
          // Add a new event only if it doesn't already exist
          const existingEvent = newItinerary[activeDateIndex].events.find(e => 
            e.activity === updatedEvent.activity &&
            e.startTime === updatedEvent.startTime &&
            e.location === updatedEvent.location &&
            e.estimatedCost === updatedEvent.estimatedCost
          );
          
          if (!existingEvent) {
            newItinerary[activeDateIndex].events.push(updatedEvent);
          }
        }
  
        return newItinerary;
      });
  
      setSelectedEventIndex(null);
      setSelectedDayIndex(null);
  
      form.reset();
      modalHandlers.close();
    } else {
      console.log('Errors found:', isValid.errors);
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
        <EventForm form={form} />
      </Modal>

      {activeDateIndex !== null && (
        <div>
          {itinerary[activeDateIndex]?.events.map((event, idx) => (
            <Timeline color="grape" active={-1} lineWidth={2} bulletSize={12}>
              <Timeline.Item lineVariant="dotted">
                <Card key={idx} shadow="sm" padding="lg" style={{ marginTop: '10px' }}>
                  <Group justify="space-between">
                    <Text size="sm" c="#7539d6">
                      {formatTime(event.startTime)}
                    </Text>
                    <Dots
                      size={34}
                      strokeWidth={1.5}
                      color={'#7539d6'}
                      fill="white"
                      onClick={() => handleEditEvent(activeDateIndex!, idx)}
                    />
                  </Group>
                  <Text fw={700} className="my-2">
                    {event.activity}
                  </Text>
                  <Group className="mb-2">
                    <IconLocationItin />
                    <Text size="sm">Address: {event.location}</Text>
                  </Group>
                  <Group className="mb-3">
                    <IconCostItin />
                    <Text size="sm">
                      Estimated cost: {currency}
                      {event.estimatedCost}
                    </Text>
                  </Group>
                  <Text size="sm" className="mb-1">
                    Visible to everyone
                  </Text>
                  <Group justify="space-between">
                    <Flex gap="xs">
                      <Button
                        className="p-1"
                        variant="outline"
                        color="#7539d6"
                        radius="md"
                        size="xs"
                        leftSection={
                          <ThumbUp size={24} strokeWidth={1} color={'black'} fill="#7539d6" />
                        }
                        onClick={handleCountup}
                      >
                        {countup}
                      </Button>
                      <Button
                        className="p-1"
                        variant="outline"
                        color="#7539d6"
                        radius="md"
                        size="xs"
                        leftSection={<ThumbDown size={24} strokeWidth={1} color={'#7539d6'} />}
                        onClick={handleCountdown}
                      >
                        {countdown}
                      </Button>
                    </Flex>
                    <Flex>
                      <MessageDots size={18} strokeWidth={1} color={'#7539d6'} />
                      <Text size="sm">Add a comment</Text>
                    </Flex>
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
