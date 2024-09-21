'use client';

import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import Form from './form';
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
  return (
     <Form />
  );
}
