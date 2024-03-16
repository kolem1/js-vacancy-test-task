import { Badge } from '@mantine/core';

interface StatusBadgeProps {
  isSold: boolean,
  className?: string,
}

const StatusBadge = ({ isSold, className }: StatusBadgeProps) => (
  <Badge
    className={className}
    color={isSold ? 'green' : 'orange'}
    size="lg"
    radius="md"
    tt="none"
  >
    {isSold ? 'Sold' : 'On sale'}
  </Badge>
);

export default StatusBadge;
