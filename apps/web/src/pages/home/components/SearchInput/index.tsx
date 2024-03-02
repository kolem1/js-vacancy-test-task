import { Flex, TextInput, UnstyledButton } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { ChangeEvent, useCallback } from 'react';

interface SearchInputProps {
  searchValue: string;
  setSearchValue: (value: string | ChangeEvent) => void;
}

const SearchInput = ({ searchValue, setSearchValue }: SearchInputProps) => {
  const resetSearch = useCallback(() => {
    setSearchValue('');
  }, [setSearchValue]);

  return (
    <TextInput
      size="md"
      value={searchValue}
      onChange={setSearchValue}
      placeholder="Type to search..."
      leftSection={<IconSearch size={16} />}
      rightSection={searchValue ? (
        <UnstyledButton
          onClick={resetSearch}
        >
          <Flex align="center">
            <IconX color="gray" />
          </Flex>
        </UnstyledButton>
      ) : null}
    />
  );
};

export default SearchInput;
