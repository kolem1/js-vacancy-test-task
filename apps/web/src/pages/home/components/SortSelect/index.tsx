import { ComboboxItem, Select } from '@mantine/core';
import { IconArrowsUpDown, IconChevronDown } from '@tabler/icons-react';

interface SortSelectProps {
  sortBy: string;
  options: ComboboxItem[]
  handleSortByChange: (value: string | null) => void
}

const SortSelect = ({ sortBy, options, handleSortByChange }: SortSelectProps) => (
  <Select
    w={150}
    size="sm"
    variant="unstyled"
    withCheckIcon={false}
    data={options}
    value={sortBy}
    onChange={handleSortByChange}
    leftSection={<IconArrowsUpDown size={16} />}
    leftSectionWidth={26}
    rightSection={<IconChevronDown size={16} />}
    rightSectionWidth={20}
    comboboxProps={{
      dropdownPadding: 0,
      transitionProps: {
        transition: 'pop-bottom-right',
        duration: 210,
        timingFunction: 'ease-out',
      },
    }}
  />
);

export default SortSelect;
