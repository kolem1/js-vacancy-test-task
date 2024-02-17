import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { NextPage } from 'next';
import { TextInput, PasswordInput, Button, Group, Stack, Title, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

import { accountApi } from 'resources/account';

import { handleError } from 'utils';
import { RoutePath } from 'routes';
import { Link } from 'components';

import { EMAIL_REGEX } from 'app-constants';

const schema = z.object({
  email: z.string().regex(EMAIL_REGEX, 'Email format is incorrect.'),
  password: z.string().min(1, 'Please enter password'),
});

type SignInParams = z.infer<typeof schema> & { credentials?: string };

const SignIn: NextPage = () => {
  const {
    register, handleSubmit, formState: { errors }, setError,
  } = useForm<SignInParams>({ resolver: zodResolver(schema) });

  const { mutate: signIn, isLoading: isSignInLoading } = accountApi.useSignIn<SignInParams>();

  const onSubmit = (data: SignInParams) => signIn(data, {
    onError: (e) => handleError(e, setError),
  });

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <Stack w={408} gap="xl">
        <Title order={1}>Sign In</Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={20}>
            <TextInput
              {...register('email')}
              label="Email Address"
              placeholder="Email Address"
              error={errors.email?.message}
            />

            <PasswordInput
              {...register('password')}
              label="Password"
              placeholder="Enter password"
              error={errors.password?.message}
            />

            {errors!.credentials && (
              <Alert icon={<IconAlertCircle size={16} />} color="red">
                {errors.credentials.message}
              </Alert>
            )}
          </Stack>

          <Button
            loading={isSignInLoading}
            type="submit"
            fullWidth
            mt={34}
          >
            Sign in
          </Button>
        </form>
        <Group justify="center" gap={12}>
          Don’t have an account?
          <Link
            type="router"
            href={RoutePath.SignUp}
            underline={false}
            inherit
          >
            Sign up
          </Link>
        </Group>
      </Stack>
    </>
  );
};

export default SignIn;
