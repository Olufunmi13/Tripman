import React from 'react';
import { Button, Text } from '@mantine/core';
import { DateButtonProps } from '@/app/interface';

const DateButton: React.FC<DateButtonProps> = ({ day, date, isActive, onClick }) => (
    <Button
      variant={isActive ? 'filled' : 'outline'}
      styles={() => ({
        root: {
          display: 'flex',
          height: 'auto',
          minWidth: 70,
        },
        label: {
          flexDirection: 'column',
        },
      })}
      onClick={onClick}
    >
      <Text fw={600} size="md">
        {day}
      </Text>
      <Text size="sm">{date}</Text>
    </Button>
);

export default DateButton