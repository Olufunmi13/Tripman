'use client';
import React, { useState } from 'react';
import '@mantine/dates/styles.css';
import { Button,Group } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import {
  validateTrip,
  validateStartDate,
  validateEndDate,
  validateBudget,
} from '@/app/utils/validation';
import { FormValues } from '@/app/interface';
import { formatDate } from '@/app/utils/utils';
import ItineraryForm from '@/app/components/forms/createTripForms/itineraryform';
import TripForm from './tripForm';

const steps = ['Step 1: Trip Details', 'Step 2: Itinerary Information'];

export default function CreateTripForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormValues | null>(null);

  const form: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      trip: '',
      startDate: null,
      endDate: null,
      budget: '',
      itinerary: {},
    },
    validate: {
      trip: validateTrip,
      startDate: validateStartDate,
      endDate: (value) => validateEndDate(value, form.values.startDate),
      budget: validateBudget,
    },
  });

  const handleNext = () => {
    const errors = form.validate();
    console.log('errors: ', errors);

    if (!errors.hasErrors) {
      if (currentStep === 0) {
        setFormData(form.values);
        setCurrentStep(1);
      } else {
        console.log('Final Submission:', { ...formData, ...form.values });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="bg-white p-8 rounded shadow-md w-4/12"
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >
        <h2 className="text-xl font-bold mb-4">{steps[currentStep]}</h2>
        <div className="space-y-4">
          {currentStep === 0 && <TripForm form={form} />}
          {currentStep === 1 && ( // Next step
            <>
              <div>
                {/* Try create another component that house all the info coming from first page */}
                <p>{formData?.trip}</p>
                <p>{formData?.budget}</p>
                <p>Start Date: {formatDate(formData?.startDate)}</p>
                <p>End Date: {formatDate(formData?.endDate)}</p>
                {/* The p-tags above is just a demo */}

                <ItineraryForm startDate={formData?.startDate} endDate={formData?.endDate} />
              </div>
            </>
          )}
          <Group mt="md">
            {currentStep > 0 && (
              <Button variant="outline" onClick={() => setCurrentStep(0)}>
                Back
              </Button>
            )}
            <Button type="submit" className="bg-purple-500">
              {currentStep === 0 ? 'Click to continue' : 'Create Trip'}
            </Button>
          </Group>
        </div>
      </form>
    </div>
  );
}
