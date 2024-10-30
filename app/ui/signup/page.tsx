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
import { isEmail, isNotEmpty, hasLength, useForm } from '@mantine/form';
import classes from '@/styles/login.module.css';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface SignUpValues {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export default function Signup() {
  const router = useRouter();
  const form = useForm<SignUpValues>({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      username: isNotEmpty('Name is required'),
      email: isEmail('Please enter a valid email'),
      password: hasLength({ min: 6, max: 10 }, 'Password must be 6-12 characters long'),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: SignUpValues) => {
    setLoading(true);
    console.log('Values before submission:', values);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        username: values.username,
        password: values.password,
        email: values.email,
        action: 'signup',
      });

      if (result?.error) {
        console.error('Error received from signIn:', result.error);
        setError(`An unknown error occurred: ${result.error}`);
        switch (result?.error) {
          case 'Configuration':
            setError('Email already exists');
            break;
          case 'CredentialsSignin':
            setError('Username has already been taken by someone');
            break;
          default:
            setError('An unexpected error occurred. Please try again later.');
        }
      } else {
        setError(null); // Clear error if login is successful
        // Redirect or perform other actions on successful login
        router.push('/ui/login');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred while creating the account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={90} className="overflow-hidden">
      <Group justify="center" className="my-2">
        <span className="w-10 h-10 rounded-full bg-gradient-to-r from-[#B68AFF] to-[#3E16B6]"></span>
      </Group>
      <Text ta="center" fw={700} className="mt-1">
        Welcome to TripHub
      </Text>
      <Text ta="center" c="dimmed">
        Begin by creating a new account
      </Text>
      {error && (
        <Text c="red" size="sm" ta="center">
          {error}
        </Text>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Paper shadow="md" p={30} mt={20} radius="md">
          <TextInput
            {...form.getInputProps('email')}
            label="Email"
            classNames={classes}
            mt="md"
            autoComplete="nope"
            className={`${classes.input} ${
              form.values.email.trim() || form.isTouched('email') ? classes.floating : ''
            }`}
          />
          <TextInput
            {...form.getInputProps('username')}
            label="User Name"
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
          <PasswordInput
            {...form.getInputProps('confirmPassword')}
            label="Confirm password"
            mt="sm"
            classNames={classes}
            autoComplete="nope"
            className={`${classes.input} ${
              form.values.confirmPassword.trim() || form.isTouched('confirmPassword')
                ? classes.floating
                : ''
            } ${classes.purpleBorder}`}
          />
          <Button fullWidth mt="xl" color="#7539d6" type="submit">
            Create new account
          </Button>
          <Group justify="space-between">
            <Text c="dimmed" size="sm" ta="center" mt={5}>
              Already have an account?{' '}
            </Text>
            <div className="flex justify-center items-center">
              <Anchor size="sm" component="button" c="#7539d6">
                <Link href="/ui/login">Sign in here</Link>
              </Anchor>
              <ArrowNarrowRight size={15} strokeWidth={1.5} color={'#7539d6'} />
            </div>
          </Group>
        </Paper>
      </form>
    </Container>
  );
}
