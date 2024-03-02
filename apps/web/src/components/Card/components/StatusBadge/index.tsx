import { Badge } from '@mantine/core';

interface StatusBadgeProps {
  isSold: boolean,
  className?: string,
}

const StatusBadge = ({ isSold, className }: StatusBadgeProps) => (
  <Badge
    className={className}
    color={isSold ? 'orange' : 'green'}
    size="lg"
    radius="md"
  >
    {isSold ? 'Sold' : 'On sale'}
  </Badge>
);

export default StatusBadge;
