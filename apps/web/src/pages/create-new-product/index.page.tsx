import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Center, Stack, TextInput, Title, rem, Text, Group } from '@mantine/core';
import { NextPage } from 'next';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { productApi } from 'resources/product';
import { useState } from 'react';
import { handleError } from 'utils';
import NextLink from 'next/link';
import { RoutePath } from 'routes';
import ImageUpload from './components/ImageUpload';

const schema = z.object({
  title: z.string().min(1, 'Please enter the title').max(100),
  image: z.custom<File>().refine((data) => data != null && data instanceof File, 'Please upload the image'),
  price: z.string().min(1, 'Please enter the price').refine((value) => !Number.isNaN(Number(value)), 'Price should be a number'),
  availableAmount: z.string().min(1, 'Please enter the available amount').refine((value) => !Number.isNaN(Number(value)), 'Available amount should be a number'),
});

type CreateProductParams = z.infer<typeof schema>;

const CreateNewProduct: NextPage = () => {
  const [created, setCreated] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<CreateProductParams>(
    { resolver: zodResolver(schema) },
  );

  const { mutate: createProduct, isLoading: isProductLoading } = productApi.useCreate();

  const onSubmit = (data: CreateProductParams) => {
    const body = new FormData();

    body.append('image', data.image, data.image.name);
    body.append('title', data.title);
    body.append('price', data.price);
    body.append('availableCount', data.availableAmount);

    createProduct(body, {
      onSuccess: () => {
        setCreated(true);
      },
      onError: (e) => handleError(e, setError),
    });
  };

  const createAnother = () => {
    reset();
    setCreated(false);
  };

  if (created) {
    return (
      <>
        <Head><title>Create New Product</title></Head>
        <Stack gap="lg">
          <Title order={1} fz="xl" fw={700}>Create New Product</Title>
          <Stack maw={rem(rem(694))} mih={rem(366)} justify="center">
            <Center>
              <Text size="xl" fw={700}>Product has been successfully created!</Text>
            </Center>
          </Stack>
          <Group justify="center">
            <Button onClick={createAnother}>Create another one</Button>
            <Button variant="secondary" component={NextLink} href={RoutePath.MyProducts}>
              Go to your products
            </Button>
          </Group>
        </Stack>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Create New Product</title>
      </Head>

      <Stack gap="lg">
        <Title order={1} fz="xl" fw={700}>Create New Product</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="xl">
            <Stack gap="lg" maw={rem(694)}>
              <ImageUpload name="image" control={control} />
              <TextInput
                label="Title of the product"
                {...register('title')}
                error={errors.title?.message}
                placeholder="Enter title of the product..."
              />
              <TextInput
                label="Price"
                {...register('price')}
                error={errors.price?.message}
                placeholder="Enter price of the product"
              />
              <TextInput
                label="Available Amount"
                {...register('availableAmount')}
                error={errors.availableAmount?.message}
                placeholder="Enter available amount of product"
              />
            </Stack>
            <Center><Button loading={isProductLoading} type="submit">Upload Product</Button></Center>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default CreateNewProduct;
