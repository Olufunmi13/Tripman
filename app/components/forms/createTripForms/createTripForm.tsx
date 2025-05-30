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
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FileWithPath } from '@mantine/dropzone';

const steps = ['Step 1: Trip Details', 'Step 2: Itinerary Information'];

export default function CreateTripForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [tripId, setTripId] = useState<number | undefined>(undefined);
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [pendingFiles, setPendingFiles] = useState<FileWithPath[]>([]);

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
      dropZone: () => validateDropzone(pendingFiles),
      trip: validateTrip,
      startDate: validateStartDate,
      endDate: (value) => validateEndDate(value, form.values.startDate),
      budget: validateBudget,
    },
  });

  const handleEditPrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNext = async () => {
    const errors = form.validate();

    if (!errors.hasErrors) {
      if (currentStep === 0) {
        setFormData(form.values);
        const requestData = {
          tripName: form.values.trip,
          startDate: form.values.startDate,
          endDate: form.values.endDate,
          budget: form.values.budget,
          currency: form.values.currency,
        };

        try {
          const response = await axios.post('/api/trips', requestData);
          setTripId(response.data.tripId);
          await uploadFiles(response.data.tripId); 
          // If the request is successful, proceed to the next step
          setCurrentStep(1);
        } catch (error) {
          console.error('Error saving trip data:', error);
          // Handle error (e.g., show a notification)
        }
      } else {
        router.push('/');
      }
    }
  };

  // Function to upload files from DropZone component
  const uploadFiles = async (tripId: number ) => {
    const uploadedFiles = [];

    for (const file of pendingFiles) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tripId', tripId.toString());

      try {
        const response = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.data.success) {
          uploadedFiles.push({
            id: response.data.fileId,
            path: file.path,
            originalName: file.name,
            mimeType: file.type,
            tripId,
          });
        } else {
          console.error('File upload unsuccessful:', response.data.message);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
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
          {currentStep === 0 && <TripForm form={form} setPendingFiles={setPendingFiles} />}

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
                {tripId && (
                  <ItineraryForm
                    tripId={tripId}
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
                )}
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
