import React from 'react';
import { Button, TextInput, rem, NativeSelect, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';
import { currencyData } from '@/app/data/formData';
import { CalendarEvent } from 'tabler-icons-react';
import { DropZone } from './dropzone';
// import { validateBudget } from '@/app/utils/validation';
import { FormValues } from '@/app/interface';
import classes from '@/styles/Form.module.css';

interface TripDetailsFormProps {
  form: UseFormReturnType<FormValues>;
}

const TripForm: React.FC<TripDetailsFormProps> = ({ form }) => {
  const icon = <CalendarEvent size={22} strokeWidth={1} color={'black'} />;

  const handleCurrencyChange = (value: string) => {
    console.log('Selected Currency:', value);
    form.setFieldValue('currency', value);
  };

  return (
    <>
      <DropZone
        currentFiles={form.values.dropZone}
        onChange={(files) => form.setFieldValue('dropZone', files)}
      />

      {/* Display error message for dropzone */}
      {form.errors.dropZone && (
        <Text c="red" ta="center" mt="md">
          {form.errors.dropZone}
        </Text>
      )}
      <TextInput
        className="w-full"
        classNames={{ input: classes.input }}
        label="Trip Name"
        placeholder="Your Location"
        {...form.getInputProps('trip')}
      />

      <div className="flex flex-row w-full justify-center items-center gap-4">
        <DatePickerInput
          label="Start date"
          placeholder="Start date"
          leftSection={icon}
          value={form.values.startDate}
          onChange={(date) => form.setFieldValue('startDate', date)}
          className="w-1/2"
          classNames={{ input: classes.input }}
          error={form.errors.startDate}
          dropdownType="modal"
        />

        <DatePickerInput
          label="End date"
          placeholder="End date"
          leftSection={icon}
          value={form.values.endDate}
          onChange={(date) => form.setFieldValue('endDate', date)}
          className="w-1/2"
          classNames={{ input: classes.input }}
          error={form.errors.endDate}
          dropdownType="modal"
        />
      </div>

      <TextInput
        type="number"
        placeholder="1000"
        label="Budget"
        leftSection={
          <NativeSelect
            data={currencyData.map((currency) => ({
              value: currency.value,
              label: `${currency.value}${currency.label} `,
            }))}
            onChange={(event) => handleCurrencyChange(event.currentTarget.value)}
            styles={{
              input: {
                fontWeight: 400,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                width: rem(92),
                marginLeft: rem(-1),
              },
            }}
            className='mr-2'
            classNames={{ input: classes.input }}
          />
        }
        leftSectionWidth={92}
        {...form.getInputProps('budget')}
        className="w-full"
        classNames={{ input: classes.input }}
      />
    </>
  );
};

export default TripForm;
