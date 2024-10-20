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

  const handleSubmit = async (values: SignUpValues) => {
    setLoading(true);
    try {
      const response = await fetch('app/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username, 
          email: values.email,
          password: values.password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Account created successfully. Please log in.');
        router.push('/ui/login'); // Redirect to login page after signup
      } else {
        alert(data.message || 'An unexpected error occurred. Please try again.');
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
