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
      // console.log(result);

      if (result?.error) {
        console.error('Error received from signIn:', result.error);

        switch (
          result?.error.toLowerCase() // Convert to lowercase
        ) {
          case 'email_already_exist':
            setError('This email is already in use. Please try logging in.');
            break;
          case 'user_not_found':
            setError('No account found with this username.');
            break;
          case 'invalid_password':
            setError('Incorrect password. Please try again.');
            break;
          default:
            setError('An unexpected error occurred. Please try again later.');
        }
      } else if (result?.ok && result?.error == null) {
        setError(null); // Clear error if signup is successful
        router.push('/ui/login'); // Redirect to login
      } else {
        setError('An unknown error occurred.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('An error occurred while creating the account. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} className="overflow-hidden mt-9">
      <Group justify="center" className="my-2">
        <span className="w-11 h-11 rounded-full bg-gradient-to-r from-[#B68AFF] to-[#3E16B6]"></span>
      </Group>
      <Text ta="center" fw={600} className="mt-2 text-2xl text-[#1A1A1A]">
        Welcome to TripHub
      </Text>
      <Text ta="center" fw={400} className="text-[#1A1A1A66] mb-9">
        Begin by creating a new account
      </Text>
      {error && (
        <Text c="red" size="sm" ta="center">
          {error}
        </Text>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Paper radius="md">
          <TextInput
            {...form.getInputProps('email')}
            label="Email"
            classNames={classes}
            mt="md"
            autoComplete="nope"
            variant="filled"
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
            variant="filled"
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
            variant="filled"
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
            variant="filled"
            className={`${classes.input} ${
              form.values.confirmPassword.trim() || form.isTouched('confirmPassword')
                ? classes.floating
                : ''
            } ${classes.purpleBorder}`}
          />
          <Button
            className="w-full sm:w-[357px] h-14 rounded-lg sm:ml-6 mt-8"
            color="#7539d6"
            type="submit"
            loading={loading}
          >
            Create new account
          </Button>
          <Group justify="space-between" className='mt-8 mb-1'>
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
