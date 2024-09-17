'use client'
import React, { useState } from "react";
import { Button, TextInput, rem, NativeSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePickerInput } from '@mantine/dates';
import { Calendar } from "tabler-icons-react";

const data = [
    { value: 'eur', label: '🇪🇺 EUR' },
    { value: 'usd', label: '🇺🇸 USD' },
    { value: 'cad', label: '🇨🇦 CAD' },
    { value: 'gbp', label: '🇬🇧 GBP' },
    { value: 'aud', label: '🇦🇺 AUD' },
    { value: 'ngn', label: 'NG NGN' },
  ];

export default function Form() {
  const [value] = useState<Date | null>(null);
  const icon = (
    <Calendar style={{ width: rem(18), height: rem(18) }} strokeWidth={1.5} />
  );
  
  const select = (
    <NativeSelect
      data={data}
      leftSectionWidth={24}
      styles={{
        input: {
          fontWeight: 400,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          width: rem(92),
          marginleft: rem(-3),
        },
      }}
    />
  );

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      trip: "",
      startDate: "",
      endDate: "",
      budget: "",
    },

    validate: {
      trip: (value) => (value.length < 3 ? "Invalid country" : null),
      startDate: (value) => {
        if (!value) return "Date is required";
        const date = new Date(value);
        if (isNaN(date.getTime())) return "Invalid date format";
      },
      endDate: (value) => {
        if (!value) return "Date is required";
        const date = new Date(value);
        if (isNaN(date.getTime())) return "Invalid date format";
      },
      budget: (value) => (value.length < 4 ? 'Set a realistic budget' : '')
    },
  });

  return (
    <form
      className="mb-2 w-4/5"
      onSubmit={form.onSubmit((values) => console.log(values))}
    >
      <TextInput
        label="Trip"
        placeholder="Your Location"
        key={form.key("trip")}
        {...form.getInputProps("trip")}
      />
      <div className="flex flex-row w-full justify-center items-center gap-4">
        <DatePickerInput
          leftSection={icon}
          leftSectionPointerEvents="none"
          label="Start date"
          placeholder="Pick date"
          value={value}
          // onChange={setValue}
          key={form.key("startDate")}
          {...form.getInputProps("startDate")}
          className="w-1/2"
        />
        <DatePickerInput
          leftSection={icon}
          leftSectionPointerEvents="none"
          label="End date"
          placeholder="Pick date"
          value={value}
          // onChange={setValue}
          key={form.key("endDate")}
          {...form.getInputProps("endDate")}
          className="w-1/2"
        />
      </div>
      <TextInput
      type="number"
      placeholder="1000"
      label="Transfer amount"
      leftSection={select}
      leftSectionWidth={92}
      key={form.key("budget")}
      {...form.getInputProps("budget")}
      className="w-full"
    />
      <Button type="submit" mt="md" className="w-full bg-[#7159EA]">
        Create Itinerary
      </Button>
    </form>
  );
}


// Thank you for clarifying that you're using the Next.js App Router. In that case, we need to adjust our approach slightly. Here's how we can implement the functionality using the App Router:

// 1. First, let's create a context for sharing trip data:

// Create a new file `app/context/trip-context.tsx`:

// ```typescript
// import React, { createContext, useContext } from 'react';

// interface TripData {
//   trip: string;
//   startDate: Date | null;
//   endDate: Date | null;
//   budget: number;
// }

// interface TripContextType {
//   tripData: TripData;
//   setTripData: React.Dispatch<React.SetStateAction<TripData>>;
// }

// const TripContext = createContext<TripContextType | undefined>(undefined);

// export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [tripData, setTripData] = React.useReducer(
//     (state: TripData, newState: Partial<TripData>) => ({ ...state, ...newState }),
//     { trip: '', startDate: null, endDate: null, budget: 0 }
//   );

//   return (
//     <TripContext.Provider value={{ tripData, setTripData }}>
//       {children}
//     </TripContext.Provider>
//   );
// };

// export const useTripContext = () => {
//   const context = useContext(TripContext);
//   if (!context) throw new Error('useTripContext must be used within a TripProvider');
//   return context;
// };
// ```

// 2. Create a layout file `app/layout.tsx` to wrap your entire app with the TripProvider:

// ```typescript
// import { TripProvider } from './context/trip-context';

// export function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <TripProvider>{children}</TripProvider>
//       </body>
//     </html>
//   );
// }

// export default RootLayout;
// ```

// 3. Modify your Form component in `app/ui/createtrip/form.tsx` to update the trip data when submitted:

// ```typescript
// 'use client'

// import { useForm } from "@mantine/form";
// import { useTripContext } from '../../context/trip-context';
// import { useRouter } from 'next/navigation';

// export default function Form() {
//   const form = useForm({
//     initialValues: {
//       trip: "",
//       startDate: null,
//       endDate: null,
//       budget: "",
//     },
//     validate: {
//       // ... existing validation logic
//     },
//   });

//   const { setTripData } = useTripContext();
//   const router = useRouter();

//   const handleSubmit = (values: typeof form.values) => {
//     setTripData(values);
//     router.push('/'); // Navigate back to home after submission
//   };

//   // ... rest of your component
// }
// ```

// 4. Update your Home component (`app/page.tsx`) to display the trip data:

// ```typescript
// 'use client'

// import { Text, Card, Group, Button } from '@mantine/core'
// import { useTripContext } from '../context/trip-context'

// export default function Home() {
//   const { tripData } = useTripContext()

//   return (
//     <Card shadow="sm" p="lg" radius="md" withBorder>
//       <Text size="xl" weight={500}>
//         Welcome to Next Mantine Tailwind Example!
//       </Text>
//       <Group mt="xs">
//         <Button variant="outline">Learn more</Button>
//       </Group>
      
//       {tripData.trip && (
//         <Card.Section mt="md">
//           <Text weight={700}>Your Trip Details:</Text>
//           <Text>Trip: {tripData.trip}</Text>
//           <Text>Start Date: {tripData.startDate?.toLocaleDateString()}</Text>
//           <Text>End Date: {tripData.endDate?.toLocaleDateString()}</Text>
//           <Text>Budget: ${Number(tripData.budget).toFixed(2)}</Text>
//         </Card.Section>
//       )}
//     </Card>
//   )
// }
// ```

// This setup will allow you to share the trip data between components across different routes using the App Router structure. When the form is submitted, it updates the shared state, which can then be accessed and displayed on the home screen.

// Remember to handle cases where tripData might be undefined or empty, and consider adding error handling and loading states for a smoother user experience. Also, you might want to persist this data (e.g., in localStorage) if you want it to survive page reloads.

// Note that we're using `useRouter` from 'next/navigation' to navigate back to the home page after form submission. This is the recommended way to handle navigation in the App Router.