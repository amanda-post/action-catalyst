'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FormEvent } from 'react';
import { Button } from '~/components/ui/button';
import { GitHubLogo, Logo, Text } from '~/components/ui/icons';
import { Input } from '~/components/ui/input';

export default function Register() {
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: form.get('username'),
        password: form.get('password'),
      }),
    });
    const data = await res.json();
    if (!data.user) return null;
    await signIn('credentials', {
      username: data.user.username,
      password: form.get('password'),
      callbackUrl: '/dashboard',
    });
  }

  return (
    <>
      <div className='flex items-center justify-center pt-24'>
        <Logo className='h-16 w-auto mr-3 text-violet-700' />
        <Text className='h-12 w-auto text-violet-900' />
      </div>
      <div className='flex flex-col min-h-screen items-center p-24 pt-0 gap-y-3'>
        <form
          onSubmit={handleSubmit}
          className='w-[100%] flex flex-col items-center gap-y-6'
        >
          <Input
            placeholder='Username'
            type='text'
            className='w-4/12 mt-8'
            name='username'
          />

          <div className='w-4/12'>
            <Input placeholder='Password' type='password' name='password' />
            <p className='text-xs pt-1 pl-2 text-red-500'>
              Do not use existing passwords!
            </p>
          </div>

          <Button
            variant='secondary'
            className='w-4/12 bg-violet-400 hover:bg-violet-500 text-white'
            type='submit'
          >
            Sign Up
          </Button>
        </form>
        <Button
          className='mb-1 w-4/12 bg-violet-600 outline text-white hover:bg-violet-800'
          onClick={() => signIn('github')}
        >
          Sign Up with GitHub
          <GitHubLogo className='w-6 ml-8' />
        </Button>

        <p className='text-sm'>
          Already signed up?
          <Button variant='link'>
            <Link href='/login'>Log in here</Link>
          </Button>
        </p>
      </div>
    </>
  );
}
