import React, { useState } from 'react';
import { TextInput } from '@mantine/core';
import { EventFormProps } from '@/app/interface';
import { TimeInput } from '@mantine/dates';
import classes from '@/styles/Form.module.css';
import { useForm } from '@mantine/form';

const EventForm: React.FC<EventFormProps> = ({
  eventActivity,
  setEventActivity,
  eventStartTime,
  setEventStartTime,
  eventLocation,
  setEventLocation,
  eventEstimatedCost,
  setEventEstimatedCost,
}) => {
  const form = useForm({
    initialValues: {
      activity: eventActivity || '',
      startTime: eventStartTime || '',
      location: eventLocation || '',
      estimatedCost: eventEstimatedCost || '',
    },
    validate: {
      activity: (value) => {
        if (value.length < 3) {
          return 'Activity must be at least 3 characters long';
        }
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          return 'Activity should only contain letters and spaces';
        }
        return null;
      },
      startTime: (value) => (value.trim() === '' ? 'Time cannot be empty' : null),
      location: (value) => {
        if (value.length === 0) {
          return 'Location is required';
        }
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          return 'Location should only contain letters and spaces';
        }
        return null;
      },
      estimatedCost: (value) => {
        if (/^[a-zA-Z]/.test(value)) {
          return 'Estimated cost should not contain letters';
        }
        if (!/^\d+(\.\d{1,2})?$/.test(value)) {
          return 'Invalid cost format. Use number with optional decimal places';
        }
        return null;
      },
    },
  });
  const iconLocation = (
    <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.62 6.95C16.57 2.33 12.54 0.25 8.99997 0.25C8.99997 0.25 8.99997 0.25 8.98997 0.25C5.45997 0.25 1.41997 2.32 0.369973 6.94C-0.800027 12.1 2.35997 16.47 5.21997 19.22C6.27997 20.24 7.63997 20.75 8.99997 20.75C10.36 20.75 11.72 20.24 12.77 19.22C15.63 16.47 18.79 12.11 17.62 6.95ZM8.99997 11.96C7.25997 11.96 5.84997 10.55 5.84997 8.81C5.84997 7.07 7.25997 5.66 8.99997 5.66C10.74 5.66 12.15 7.07 12.15 8.81C12.15 10.55 10.74 11.96 8.99997 11.96Z"
        fill="url(#paint0_linear_1502_148)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1502_148"
          x1="8.99497"
          y1="0.25"
          x2="8.99497"
          y2="20.75"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E70000" />
          <stop offset="1" stop-color="#C40C0C" />
        </linearGradient>
      </defs>
    </svg>
  );
  const iconCost = (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.96994 0.900011C4.44994 0.920011 -0.0200552 5.41001 -5.52171e-05 10.93C0.0199448 16.45 4.50994 20.92 10.0299 20.9C15.5499 20.88 20.0199 16.39 19.9999 10.87C19.9799 5.35001 15.4899 0.890011 9.96994 0.900011ZM12.2599 11C13.0399 11.27 14.0899 11.85 14.0899 13.64C14.0899 15.18 12.8799 16.42 11.3999 16.42H10.7499V17C10.7499 17.41 10.4099 17.75 9.99994 17.75C9.58994 17.75 9.24994 17.41 9.24994 17V16.42H8.88995C7.24995 16.42 5.91994 15.04 5.91994 13.34C5.91994 12.93 6.25994 12.59 6.66994 12.59C7.07994 12.59 7.41994 12.93 7.41994 13.34C7.41994 14.21 8.07994 14.92 8.88995 14.92H9.24994V11.54L7.73994 11C6.95994 10.73 5.90994 10.15 5.90994 8.36001C5.90994 6.82001 7.11995 5.58001 8.59995 5.58001H9.24994V5.00001C9.24994 4.59001 9.58994 4.25001 9.99994 4.25001C10.4099 4.25001 10.7499 4.59001 10.7499 5.00001V5.58001H11.1099C12.7499 5.58001 14.0799 6.96001 14.0799 8.66001C14.0799 9.07001 13.7399 9.41001 13.3299 9.41001C12.9199 9.41001 12.5799 9.07001 12.5799 8.66001C12.5799 7.79001 11.9199 7.08001 11.1099 7.08001H10.7499V10.46L12.2599 11Z"
        fill="url(#paint0_linear_1502_139)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1502_139"
          x1="9.99994"
          y1="0.899994"
          x2="9.99994"
          y2="20.9001"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E39300" />
          <stop offset="1" stop-color="#BF871F" />
        </linearGradient>
      </defs>
    </svg>
  );
  const iconTime = (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.99996 0.149994C4.21996 0.149994 0.329956 4.03999 0.329956 8.81999C0.329956 13.6 4.21996 17.5 8.99996 17.5C13.78 17.5 17.67 13.61 17.67 8.82999C17.67 4.04999 13.78 0.149994 8.99996 0.149994ZM9.74996 8.49999C9.74996 8.90999 9.40996 9.24999 8.99996 9.24999C8.58996 9.24999 8.24996 8.90999 8.24996 8.49999V3.49999C8.24996 3.08999 8.58996 2.74999 8.99996 2.74999C9.40996 2.74999 9.74996 3.08999 9.74996 3.49999V8.49999Z"
          fill="url(#paint0_linear_1502_202)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1502_202"
            x1="9"
            y1="2.5"
            x2="8.99191"
            y2="17"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#AE7DFF" />
            <stop offset="1" stop-color="#3E16B6" />
          </linearGradient>
        </defs>
      </svg>
  );

  return (
    <div>
      <TextInput
        className="mb-3"
        classNames={{ input: classes.input }}
        label="Activity"
        placeholder="e.g Time Square"
        {...form.getInputProps('activity')}
        // value={eventActivity}
        // onChange={(e) => setEventActivity(e.currentTarget.value)}
      />
      <TimeInput
        className="mb-3"
        classNames={{ input: classes.input }}
        label="Start Time"
        leftSection={iconTime}
        {...form.getInputProps('startTime')}
        // value={eventStartTime}
        // onChange={(e) => setEventStartTime(e.currentTarget.value)}
      />
      <TextInput
        className="mb-3"
        classNames={{ input: classes.input }}
        label="Location"
        placeholder="Add Location"
        leftSection={iconLocation}
        {...form.getInputProps('location')}
        // value={eventLocation}
        // onChange={(e) => setEventLocation(e.currentTarget.value)}
      />
      <TextInput
        className="mb-3"
        classNames={{ input: classes.input }}
        label="Estimated Cost"
        placeholder="Enter estimated cost"
        leftSection={iconCost}
        {...form.getInputProps('estimatedCost')}
        // value={eventEstimatedCost}
        // onChange={(e) => setEventEstimatedCost(e.currentTarget.value)}
      />
    </div>
  );
};

export default EventForm;
