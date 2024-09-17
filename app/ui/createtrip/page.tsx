'use client';

import {
  Group,
  Text,
  rem,
  NativeSelect,
  Center,
  CloseButton,
  Button,
  TextInput,
  Flex,
} from '@mantine/core';
import React from 'react';
import { Calendar } from 'tabler-icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
// import { DatePickerInput } from '@mantine/dates';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormEventHandler, useState } from 'react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useItinerary } from '@/app/ItineraryContext';

interface FormValues {
  // files: File[];
  trip: string;
  startDate: Date;
  endDate: Date;
  //budget: number;
}

const data = [
  { value: 'eur', label: '🇪🇺 EUR' },
  { value: 'usd', label: '🇺🇸 USD' },
  { value: 'cad', label: '🇨🇦 CAD' },
  { value: 'gbp', label: '🇬🇧 GBP' },
  { value: 'aud', label: '🇦🇺 AUD' },
  { value: 'ngn', label: 'NG NGN' },
];
export default function CreateTrip(props: Partial<DropzoneProps>) {
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date| null>(null);
  const [endDate, setEndDate] = useState<Date| null>(null);
  // const [startValue, setStartValue] =useState<Date | null>(null);
  // const [endValue, setEndValue] = useState<Date | null>(null);
  const [getstartDateValue, setStartDateValue] = useState<Date | null>(null);
  const [getendDateValue, setEndDateValue] = useState<Date | null>(null);
  const icon = <Calendar style={{ width: rem(18), height: rem(18) }} strokeWidth={1.5} />;
  const { setItinerary } = useItinerary();

  const select = (
    <NativeSelect
      data={data}
      rightSectionWidth={28}
      styles={{
        input: {
          fontWeight: 500,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          width: rem(92),
          marginRight: rem(-2),
        },
      }}
    />
  );

  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      // files: [],
      trip: '',
      startDate: new Date(),
      endDate: new Date(),
      // budget: 0,
    },

    //validate form values
    validate: {
      trip: (value) => (value.length < 3 ? 'Invalid country' : null),
      // startDate: (value: any) => {
      //   if (!value) return 'Date is required';
      //   const date = new Date(value);
      //   if (isNaN(date.getTime())) return 'Invalid date format';
      // },
      // endDate: (value: any) => {
      //   if (!value) return 'Date is required';
      //   const date = new Date(value);
      //   if (isNaN(date.getTime())) return 'Invalid date format';
      // },
      // endDate: (value, values) => 
      //   value < values.startDate ? 'End date must be after start date' : null,
      // budget: (value) => (value < 1000 ? 'Please set a realistic budget' : null),
    },
  });

  // const selectedFiles = form.getValues().files.map((file, index) => (
  //   <Text key={file.name}>
  //     <b>{file.name}</b> ({(file.size / 1024).toFixed(2)} kb)
  //     <CloseButton
  //       size="xs"
  //       onClick={() =>
  //         form.setFieldValue(
  //           'files',
  //           form.values.files.filter((_, i) => i !== index)
  //         )
  //       }
  //     />
  //   </Text>
  // ));

  const handleSubmit = (values: FormValues) => {
    console.log('form submitted');
    console.log('values:', values);
  };
  // const handleSubmit = async (values: FormValues) => {
  //   console.log('Form submitted');
  //   console.log('Files:', values.files);
  //   console.log('Form Values:', values);

  //   // Prepare data to pass to itinerary page
  //   const itineraryData = {
  //     trip: values.trip,
  //     startDate: values.startDate?.toString(),
  //     endDate: values.endDate?.toString(),
  //     budget: values.budget,
  //   };

  //   // Set the itinerary data in context
  //   setItinerary(itineraryData);

  //   // Navigate to the itinerary page
  //   router.push('/ui/itinerary');

  //   // // Navigate to itinerary page with props
  //   // router.push('/ui/itinerary');

  //   form.reset();

  //   // Here you would typically send this data to your server
  //   // For now, we're just logging it

  //   // If you need to send the image to the server, you'd do something like this:
  //   if (values.files.length > 0) {
  //     const formData = new FormData();
  //     formData.append('image', values.files[0]);
  //     // Then send formData to your server API
  //   }
  // };

  const handleDateChange = (field: 'startDate' | 'endDate') => (date: Date | null) => {
    if (date) {
      form.setFieldValue(field, date);
      console.log(form.values.startDate);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center max-h-screen mt-16 max-w-xl w-4/5 sm:w-[40%] my-0 mx-auto shadow shadow-slate-300">
      <form className="mb-2 w-4/5" onSubmit={form.onSubmit((values) => console.log(values))}>
        {/* <Dropzone
          onDrop={(files) => form.setFieldValue('files', files)}
          onReject={() => form.setFieldError('files', 'Select images only')}
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          multiple={false}
          maxFiles={1}
          h={250}
          {...props}
          className="border-2 mb-2"
        >
          <Center h={250}>
            <Dropzone.Idle>Drag or Drop your image</Dropzone.Idle>
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Files are invalid</Dropzone.Reject>
          </Center>
        </Dropzone>

        {form.errors.files && (
          <Text c="red" mt={5}>
            {form.errors.files}
          </Text>
        )}

        {selectedFiles.length > 0 && (
          <>
            <Text mb={2} mt="md">
              Selected files:
            </Text>
            {selectedFiles}
          </>
        )} */}

        {/* <form className="mb-2 w-4/5" onSubmit={form.onSubmit((values) => console.log(values))}> */}
        <TextInput
          label="Trip"
          placeholder="Your Location"
          key={form.key('trip')}
          {...form.getInputProps('trip')}
        />
        {/* {/* <div className=" w-full flex flex-row justify-center items-center gap-4"> */}
        <Flex
        gap="md"
        justify="center"
        align="flex-start"
        direction="row"
        >
          <DatePicker 
            selected={form.values.startDate}  
            showIcon 
            icon=<Calendar/> 
            showPopperArrow={false} 
            // key={form.key('startDate')} 
            // {...form.getInputProps('startDate') }
            onChange={handleDateChange('startDate')}/>
          <DatePicker 
            selected={form.values.endDate} 
            showIcon icon=<Calendar/> 
            showPopperArrow={false} 
            // key={form.key('endDate')} 
            // {...form.getInputProps('endDate')}
            onChange={handleDateChange('endDate')}/>
        </Flex>
        {/* <DatePickerInput
            clearable
            leftSection={icon}
            leftSectionPointerEvents="none"
             // error="please pick a date"
            // error={
            //   startDateValue === null || startDateValue === undefined ? 'Please pick a date' : ''
            // }
            label="Start date"
            placeholder="Pick date"
            value={getstartDateValue}
            //onChange={(val) => setStartDateValue(val)}
            key={form.key('startDate')}
            {...form.getInputProps('setStartDateValue')}
            //  {...form.getInputProps('startDate')}
            className="w-full"
          /> 
         <DatePickerInput
            clearable
            leftSection={icon}
            leftSectionPointerEvents="none"
            label="End date"
            // error="please pick a date"
            // error={endDateValue === null || endDateValue === undefined ? 'Please pick a date' : ''}
            placeholder="Pick date"
            value={getendDateValue}
            //onChange={(val) => setEndDateValue(val)}
            key={form.key('endDate')}
            {...form.getInputProps('setEndDateValue', {
              onChange: (val: string) => {
                const date = new Date(val);
                setEndDateValue(date instanceof Date ? date : null);
              },
            })}
            className="w-full"
          />
        </div> */}
        {/* <TextInput
          type="number"
          placeholder="1000"
          label="Transfer amount"
          rightSection={select}
          rightSectionWidth={92}
          key={form.key('budget')}
          {...form.getInputProps('budget')}
          className="w-full"
        /> */}
        <Button type="submit" mt="md" className="w-full bg-[#7159EA]">
          Create Itinerary
        </Button>
      </form>
    </main>
  );
}
