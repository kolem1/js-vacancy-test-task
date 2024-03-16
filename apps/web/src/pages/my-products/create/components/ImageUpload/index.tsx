import {
  UseControllerProps,
  useController,
  FieldValues,
} from 'react-hook-form';
import {
  Box,
  Button,
  Center,
  FileButton,
  Group,
  Image,
  Stack,
  Text,
} from '@mantine/core';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

import classes from './index.module.css';

const ImageUpload = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
}: UseControllerProps<T>) => {
  const {
    field: { value, ...field },
    fieldState,
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  const [image, setImage] = useState('/images/placeholder.png');

  useEffect(() => {
    if (value) {
      setImage(URL.createObjectURL(value));
    }
  }, [value]);

  return (
    <Group>
      <Box className={classes.image}>
        <Image src={image} radius="20" fill component={NextImage} alt="Product Image" />
      </Box>
      <Stack>
        <FileButton
          accept="image/png,image/jpeg,image/jpg"
          {...field}
        >
          {(buttonProps) => <Button variant="secondary" type="button" {...buttonProps}>Upload image</Button>}
        </FileButton>
        {value && <Center><Text span>{value.name}</Text></Center>}
        {fieldState.error && <Text className={classes.error} span>{fieldState.error.message}</Text>}
      </Stack>
    </Group>
  );
};

export default ImageUpload;
