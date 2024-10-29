import { Card, Image, Text, Group, Stack, Avatar } from '@mantine/core';
import { Trip } from '@/app/interface';
import { useRouter } from 'next/navigation';
import { IconTripCard } from '@/app/customIcons/svgIcons';
import { formatTripDates } from '@/app/utils/utils';

interface TripCardProps {
  trip: Trip;
}
export default function TripCard({ trip }: TripCardProps) {
  const router = useRouter();
  return (
    <Card
      shadow="sm"
      padding="xl"
      radius="md"
      withBorder
      onClick={() => router.push(`/itinerary/${trip.id}`)}
      className="cursor-pointer"
    >
      <Card.Section>
      {trip.image && (
          <Image src={trip.image} height={0} alt="Trip Image" />
        )}
      </Card.Section>
      <Group justify="space-between">
        <Stack gap="xs">
          <Group mt="md" mb="xs">
            <IconTripCard />
            <Text fw={500}>{trip.tripName}</Text>
          </Group>
          <Text size="sm" c="dimmed">
            {formatTripDates(trip.startDate, trip.endDate)}
          </Text>
        </Stack>
        <Avatar.Group>
          <Avatar src="image.png" />
          <Avatar src="image.png" />
          <Avatar src="image.png" />
          <Avatar>+5</Avatar>
        </Avatar.Group>
      </Group>
    </Card>
  );
}
