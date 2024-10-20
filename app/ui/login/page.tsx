'use client';
import { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { ArrowNarrowRight } from 'tabler-icons-react';
import Link from 'next/link';
import classes from '@/styles/login.module.css';
import { isNotEmpty, hasLength, useForm } from '@mantine/form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface LoginFormValues {
  username: string;
  password: string;
}

export default function Login() {
  const form = useForm<LoginFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: isNotEmpty('Name is required'),
      password: hasLength({ min: 6, max: 10 }, 'Password must be 6-12 characters long'),
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const result = 
      await signIn('credentials', {
        redirect: false,
        username: values.username,
        password: values.password,
        provider: 'credentials',
        action: 'login',
        callbackUrl: '/'
      });

      if (!result?.ok) {
        if (result?.error === 'user_not_found') {
          setError('User not found. Redirecting to signup page.');
          router.push('/ui/signup');
        } else if (result?.error === 'invalid_credentials') {
          setError('Invalid username or password.');
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      } else {
        // User exists, redirect to home page
        router.push('/');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={90} className="overflow-hidden">
      <Group justify="center" className="my-2">
        <span className="w-10 h-10 rounded-full bg-gradient-to-r from-[#B68AFF] to-[#3E16B6]"></span>
        <Text size="lg" fw={700}>
          TripHub
        </Text>
      </Group>
      <Text ta="center" fw={700} className="my-3">
        Welcome back!
      </Text>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(form.values);
        }}
      >
        <Paper shadow="md" p={30} mt={20} radius="md">
          <TextInput
            {...form.getInputProps('username')}
            label="Username"
            classNames={classes}
            mt="md"
            autoComplete="nope"
            className={`${classes.input} ${
              form.values.username.trim() || form.isTouched('username') ? classes.floating : ''
            }`}
          />
          <PasswordInput
            {...form.getInputProps('password')}
            label="Password"
            mt="md"
            classNames={classes}
            autoComplete="nope"
            className={`${classes.input} ${
              form.values.password.trim() || form.isTouched('password') ? classes.floating : ''
            } ${classes.purpleBorder}`}
          />
          {error && (
            <Text color="red" size="sm">
              {error}
            </Text>
          )}
          <Anchor component="button" size="sm" ta="right" c="#7539d6">
            Forgot password?
          </Anchor>
          <Button fullWidth mt="xl" color="#7539d6" type="submit" loading={loading}>
            Log in
          </Button>
          <Group justify="space-between">
            <Text c="dimmed" size="sm" ta="center" mt={5}>
              New to TripHub?{' '}
            </Text>
            <div className="flex justify-center items-center">
              <Anchor size="sm" component="button" c="#7539d6">
                <Link href="/ui/signup">Get Started</Link>
              </Anchor>
              <ArrowNarrowRight size={15} strokeWidth={1.5} color={'#7539d6'} />
            </div>
          </Group>
        </Paper>
      </form>
    </Container>
  );
}
