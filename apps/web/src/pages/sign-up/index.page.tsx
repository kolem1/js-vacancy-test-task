import { z } from 'zod';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { NextPage } from 'next';
import {
  Button,
  Stack,
  TextInput,
  PasswordInput,
  Group,
  Title,
  Checkbox,
  SimpleGrid,
} from '@mantine/core';

import { accountApi } from 'resources/account';

import { Link } from 'components';
import { handleError } from 'utils';
import { RoutePath } from 'routes';

import { EMAIL_REGEX, PASSWORD_REGEX } from 'app-constants';

const schema = z.object({
  email: z.string().regex(EMAIL_REGEX, 'Email format is incorrect.'),
  password: z.string().regex(PASSWORD_REGEX, 'The password must contain 6 or more characters with at least one letter (a-z) and one number (0-9).'),
});

type SignUpParams = z.infer<typeof schema>;

const passwordRules = [
  {
    title: 'Must be at least 8 characters',
    done: false,
  },
  {
    title: 'Must contain at least 1 number',
    done: false,
  },
  {
    title: 'Must contain lover case and capital letters',
    done: false,
  },
];

const SignUp: NextPage = () => {
  const [passwordRulesData, setPasswordRulesData] = useState(passwordRules);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignUpParams>({
    resolver: zodResolver(schema),
  });

  const passwordValue = watch('password', '');

  useEffect(() => {
    const updatedPasswordRulesData = [...passwordRules];

    updatedPasswordRulesData[0].done = passwordValue.length >= 8;
    updatedPasswordRulesData[1].done = /\d/.test(passwordValue);
    updatedPasswordRulesData[2].done = /(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d\W]+/.test(passwordValue);

    setPasswordRulesData(updatedPasswordRulesData);
  }, [passwordValue]);

  const { mutate: signUp, isLoading: isSignUpLoading } = accountApi.useSignUp<SignUpParams>();

  const onSubmit = (data: SignUpParams) => signUp(data, {
    onError: (e) => handleError(e, setError),
  });

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <Stack w={408} gap="xl">
        <Title order={1}>Sign Up</Title>

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

            <SimpleGrid
              cols={1}
              spacing="xs"
              p={4}
            >
              {passwordRulesData.map((ruleData) => (
                <Checkbox
                  key={ruleData.title}
                  checked={ruleData.done}
                  label={ruleData.title}
                  readOnly
                  variant="outline"
                  radius="xl"
                />
              ))}
            </SimpleGrid>

          </Stack>

          <Button
            type="submit"
            loading={isSignUpLoading}
            fullWidth
            mt="xl"
          >
            Create Account
          </Button>
        </form>

        <Group fz={16} justify="center">
          Have an account?
          <Link
            type="router"
            href={RoutePath.SignIn}
            inherit
            underline={false}
          >
            Sign In
          </Link>
        </Group>
      </Stack>
    </>
  );
};

export default SignUp;
