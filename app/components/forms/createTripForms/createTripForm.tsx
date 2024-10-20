'use client';
import React, { useState } from 'react';
import '@mantine/dates/styles.css';
import { Button, Group, Text, Flex, Avatar } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import {
  validateDropzone,
  validateTrip,
  validateStartDate,
  validateEndDate,
  validateBudget,
} from '@/app/utils/validation';
import Avatarr from '@/app/lib/Avatarr.jpg';
import { FormValues } from '@/app/interface';
import { formatDate } from '@/app/utils/utils';
import { currencyData } from '@/app/data/formData';
import ItineraryForm from '@/app/components/forms/createTripForms/itineraryform';
import TripForm from './tripForm';
import { BudgetCard } from './budgetCard';
import { CalendarEvent } from 'tabler-icons-react';

const steps = ['Step 1: Trip Details', 'Step 2: Itinerary Information'];

export default function CreateTripForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [totalCost, setTotalCost] = useState<number>(0);

  const handleTotalCostChange = (newTotalCost: number) => {
    setTotalCost(newTotalCost);
  };

  const form: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      dropZone: [],
      trip: '',
      startDate: null,
      endDate: null,
      budget: '',
      currency: currencyData[0].value,
      itinerary: {},
    },
    validate: {
      dropZone: validateDropzone,
      trip: validateTrip,
      startDate: validateStartDate,
      endDate: (value) => validateEndDate(value, form.values.startDate),
      budget: validateBudget,
    },
  });

  const handleEditPrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    const errors = form.validate();

    if (!errors.hasErrors) {
      console.log('Form Values:', form.values);
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
        className="bg-white p-8 rounded shadow-md w-full sm:w-6/12"
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >
        <div className="w-full sm:space-y-4">
          {currentStep === 0 && <TripForm form={form} />}

          {currentStep === 1 && (
            <>
              <div>
                {/* Display submitted data */}
                <Text fw={700} className="mb-2">
                  {formData?.trip}
                </Text>
                <div className="flex items-center justify-start mb-2">
                  <CalendarEvent size={22} strokeWidth={1} color={'black'} />
                  <Text className="mb-2">{`${formatDate(formData?.startDate)} - ${formatDate(
                    formData?.endDate
                  )}`}</Text>
                </div>
                <Avatar.Group>
                  <Avatar src={'Avatarr'} />
                  <Avatar src="image.png" />
                  <Avatar src="image.png" />
                  <Avatar>+5</Avatar>
                </Avatar.Group>
                <Text fw={500} className="mb-1">
                  Budget
                </Text>
                <BudgetCard
                  onEditPrevious={handleEditPrevious}
                  budget={
                    typeof formData?.budget === 'string'
                      ? parseFloat(formData.budget)
                      : formData?.budget || 0
                  } // Convert to number
                  currency={formData?.currency || ''}
                  totalCost={totalCost}
                />

                <ItineraryForm
                  startDate={formData?.startDate}
                  endDate={formData?.endDate}
                  currency={formData?.currency || ' '}
                  budget={
                    typeof formData?.budget === 'string'
                      ? parseFloat(formData.budget)
                      : formData?.budget || 0
                  }
                  onTotalCostChange={handleTotalCostChange}
                />
              </div>
            </>
          )}

          <Group mt="md">
            {currentStep > 0 && (
              <Button variant="outline" color="#7539d6" onClick={() => setCurrentStep(0)}>
                Back
              </Button>
            )}
            <Button type="submit" className="bg-[#7539d6] hover:bg-purple-500">
              {currentStep === 0 ? 'Create Itinerary' : 'Create Trip'}
            </Button>
          </Group>
        </div>
      </form>
    </div>
  );
}
