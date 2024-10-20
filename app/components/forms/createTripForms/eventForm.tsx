import React, { useRef } from 'react';
import { TextInput, ActionIcon, rem } from '@mantine/core';
import { Event } from '@/app/interface';
import { UseFormReturnType } from '@mantine/form';
import { TimeInput } from '@mantine/dates';
import classes from '@/styles/Form.module.css';
import { IconLocation, IconCost, IconTime } from '@/app/customIcons/svgIcons';
import { ClockHour10 } from 'tabler-icons-react';

interface EventFormProps {
  form: UseFormReturnType<Event>;
}
const EventForm: React.FC<EventFormProps> = ({ form }) => {
  const ref = useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <ClockHour10 size={18} strokeWidth={1} color={'#7539d6'} />{' '}
    </ActionIcon>
  );
  return (
    <div>
      <TextInput
        {...form.getInputProps('activity')}
        className="mb-3"
        classNames={{ input: classes.input }}
        label="Activity"
        placeholder="e.g Time Square"
      />
      <TimeInput
        className="mb-3"
        classNames={{ input: classes.input }}
        label="Start Time"
        leftSection={<IconTime />}
        {...form.getInputProps('startTime')}
        ref={ref}
        rightSection={pickerControl}
      />
      <TextInput
        className="mb-3"
        classNames={{ input: classes.input }}
        label="Location"
        placeholder="Add Location"
        leftSection={<IconLocation />}
        {...form.getInputProps('location')}
      />
      <TextInput
        className="mb-3"
        classNames={{ input: classes.input }}
        label="Estimated Cost"
        placeholder="Enter estimated cost"
        leftSection={<IconCost />}
        {...form.getInputProps('estimatedCost')}
      />
    </div>
  );
};

export default EventForm;
