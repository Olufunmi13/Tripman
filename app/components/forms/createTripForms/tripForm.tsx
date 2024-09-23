// TripDetailsForm.tsx
import React from 'react';
import { Button, TextInput, rem, NativeSelect } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';
import { currencyData } from '@/app/data/formData';
import { validateBudget } from '@/app/utils/validation';
import { FormValues } from '@/app/interface';

interface TripDetailsFormProps {
  form: UseFormReturnType<FormValues>;
}

const TripForm: React.FC<TripDetailsFormProps> = ({ form }) => {
  return (
    <>
      <TextInput
        className="w-full"
        label="Trip"
        placeholder="Your Location"
        {...form.getInputProps('trip')}
      />
      <div className="flex flex-row w-full justify-center items-center gap-4">
        <DatePickerInput
          label="Start date"
          placeholder="Start date"
          value={form.values.startDate}
          onChange={(date) => form.setFieldValue('startDate', date)}
          className="w-1/2"
          error={form.errors.startDate}
          dropdownType="modal"
        />
        <DatePickerInput
          label="End date"
          placeholder="End date"
          value={form.values.endDate}
          onChange={(date) => form.setFieldValue('endDate', date)}
          className="w-1/2"
          error={form.errors.endDate}
          dropdownType="modal"
        />
      </div>
      <TextInput
        type="number"
        placeholder="1000"
        label="Transfer amount"
        leftSection={
          <NativeSelect
            data={currencyData}
            leftSectionWidth={24}
            styles={{
              input: {
                fontWeight: 400,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                width: rem(92),
                marginLeft: rem(-3),
              },
            }}
          />
        }
        leftSectionWidth={92}
        {...form.getInputProps('budget')}
        className="w-full"
      />
    </>
  );
};

export default TripForm;