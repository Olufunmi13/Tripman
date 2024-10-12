import React from 'react';
import { TextInput } from '@mantine/core';
import { EventFormProps } from '@/app/interface';
import { TimeInput } from '@mantine/dates';
import classes from '@/styles/Form.module.css';
import { IconLocation, IconCost, IconTime } from '@/app/customIcons/svgIcons';

const EventForm: React.FC<EventFormProps> = ({
  eventActivity,
  setEventActivity,
  eventStartTime,
  setEventStartTime,
  eventLocation,
  setEventLocation,
  eventEstimatedCost,
  setEventEstimatedCost,
  form,
}) => {
  

  return (
    <div>
      <TextInput
        className="mb-3"
        classNames={{ input: classes.input }}
        label="Activity"
        placeholder="e.g Time Square"
        {...form.getInputProps('activity')}
        value={eventActivity}
        onChange={(e) => setEventActivity(e.currentTarget.value)}
      />
      <TimeInput
        className="mb-3"
        classNames={{ input: classes.input }}
        label="Start Time"
        leftSection={<IconTime />}
        {...form.getInputProps('startTime')}
        value={eventStartTime}
        onChange={(e) => setEventStartTime(e.currentTarget.value)}
      />
      <TextInput
        className="mb-3"
        classNames={{ input: classes.input }}
        label="Location"
        placeholder="Add Location"
        leftSection={<IconLocation />}
        {...form.getInputProps('location')}
        value={eventLocation}
        onChange={(e) => setEventLocation(e.currentTarget.value)}
      />
      <TextInput
        className="mb-3"
        classNames={{ input: classes.input }}
        label="Estimated Cost"
        placeholder="Enter estimated cost"
        leftSection={<IconCost />}
        {...form.getInputProps('estimatedCost')}
        value={eventEstimatedCost}
        onChange={(e) => setEventEstimatedCost(e.currentTarget.value)}
      />
    </div>
  );
};

export default EventForm;
