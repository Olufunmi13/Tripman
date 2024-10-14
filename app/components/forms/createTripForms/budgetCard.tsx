import { Text, Progress, Card, Button, Group } from '@mantine/core';
import { Edit } from 'tabler-icons-react';

interface BudgetCardProps {
  onEditPrevious?: () => void;
  budget: number;
  currency: string;
  totalCost: number;
}
export function BudgetCard({ onEditPrevious, budget, currency, totalCost }: BudgetCardProps) {
  const icon = <Edit size={20} strokeWidth={1.5} color={'gray'} />;
  const progressPercentage = Math.min((totalCost / budget) * 100, 100);
  const roundedPercentage = Math.round(progressPercentage * 100) / 100;

  return (
    <Card withBorder radius="md" bg="#ffffff"
        styles={{
            root: {
                backgroundColor: 'white',
                maxHeight: '180px',
                marginBottom: '10px',
            }
        }}
    >
      <Group justify="space-between" className="mb-3">
        <Text fz="xs" size="sm" c="dimmed">
          Planned Activities
        </Text>
        <Button
          variant="transparent"
          justify="center"
          leftSection={icon}
          onClick={onEditPrevious}
        >
          <Text fz="xs" size="sm" c="dimmed">
            Edit
          </Text>
        </Button>
      </Group>
      <Text fz="lg" fw={700}>
        {currency}{totalCost}
      </Text>
      <Progress value={progressPercentage} mt="md" size="lg" radius="xl" color="#7539d6"/>
      <Group justify="space-between" className="mt-1">
        <Text fz="xs" size="sm" c="dimmed">
          {roundedPercentage}%
        </Text>
        <Text fz="xs" size="sm" c="dimmed">
          {currency}{budget}
        </Text>
      </Group>
    </Card>
  );
}
