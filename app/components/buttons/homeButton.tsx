import React from 'react';
import { Plus } from 'tabler-icons-react';
import { Button, Flex, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function HomeButton() {
  const router = useRouter();
  return (
    <Button
      variant="transparent"
      color="#7539d6"
      size="lg"
      onClick={() => router.push('/ui/createtrip')}
      className="text-center h-20"
    >
      <Flex gap="sm" justify="center" align="center" direction="column">
        <Plus size={30} strokeWidth={2} color={'#7539d6'} className="text-center" />
        <Text c="black">Create Your First Trip</Text>
      </Flex>
    </Button>
  );
}
