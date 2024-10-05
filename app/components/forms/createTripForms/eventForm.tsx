import React, { useState } from 'react';
import { Button, TextInput } from '@mantine/core';
import { EventFormProps } from '@/app/interface';

const EventForm: React.FC<EventFormProps> = ({ onAddEvent }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventAddress, setEventAddress] = useState('');
  const [eventCost, setEventCost] = useState('');

  const handleSubmit = () => {
    onAddEvent({
      title: eventTitle,
      time: eventTime,
      address: eventAddress,
      estimatedCost: eventCost,
    });
    // clear input fields after submission
    setEventTitle('');
    setEventTime('');
    setEventAddress('');
    setEventCost('');
  };

  return (
      <div>
        <TextInput
          placeholder="Event Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.currentTarget.value)}
        />
        <TextInput
          placeholder="Time"
          value={eventTime}
          onChange={(e) => setEventTime(e.currentTarget.value)}
        />
        <TextInput
          placeholder="Address"
          value={eventAddress}
          onChange={(e) => setEventAddress(e.currentTarget.value)}
        />
        <TextInput
          placeholder="Estimated Cost"
          value={eventCost}
          onChange={(e) => setEventCost(e.currentTarget.value)}
        />
        <Button onClick={handleSubmit} color="#7539d6">
          Add Event
        </Button>
      </div>
  );
};

export default EventForm;
