'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { LogoHeader } from '~/app/login/components/LogoHeader';
import { OrSeparator } from '~/app/login/components/OrSeparator';
import { Button } from '~/components/ui/button';
import { GitHubLogo } from '~/components/ui/icons';
import { Input } from '~/components/ui/input';
import Spinner from '~/components/ui/spinner';

export default function Register() {
  const [credentialsLoading, setCredentialsLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  async function handleCredentialsSubmit(e: FormEvent) {
    if (credentialsLoading) return;
    setCredentialsLoading(true);
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

  const handleGithubLogin = () => {
    if (githubLoading) return;
    setGithubLoading(true);
    signIn('github');
  };

  return (
    <div className='bg-gradient-to-b from-violet-300'>
      <LogoHeader className='pt-24' size='lg' />
      <div className='flex min-h-screen flex-col items-center gap-y-2  p-24 pt-0'>
        <form
          onSubmit={handleCredentialsSubmit}
          className='flex w-[100%] flex-col items-center gap-y-4'
        >
          <Input
            placeholder='Username'
            type='text'
            className='mt-8  w-full md:w-1/2 lg:w-4/12'
            name='username'
          />

          <div className=' w-full md:w-1/2 lg:w-4/12'>
            <Input placeholder='Password' type='password' name='password' />
            <p className='pl-2 pt-1 text-xs text-red-600'>
              Must contain one uppercase letter, one lowercase, one number, and
              one special character.
            </p>
          </div>

          <Button
            variant='secondary'
            className=' w-full bg-violet-400 text-white hover:bg-violet-500 md:w-1/2 lg:w-4/12'
            type='submit'
          >
            {credentialsLoading ? <Spinner /> : 'Sign Up'}
          </Button>
        </form>

        <OrSeparator />

        <Button
          className='mb-1  w-full bg-violet-600 text-white outline hover:bg-violet-600 md:w-1/2 lg:w-4/12'
          onClick={handleGithubLogin}
        >
          {githubLoading ? <Spinner /> : 'Sign Up with GitHub'}
          <GitHubLogo className='ml-8 w-6' />
        </Button>

        <p className='text-sm'>
          Already signed up?
          <Button variant='link'>
            <Link href='/login'>Log in here</Link>
          </Button>
        </p>
      </div>
    </div>
  );
}
