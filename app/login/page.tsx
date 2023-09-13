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

export default function Login() {
  const [credentialsLoading, setCredentialsLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  const handleSubmitCredentials = async (e: FormEvent) => {
    if (credentialsLoading) return;
    setCredentialsLoading(true);
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    await signIn('credentials', {
      username: form.get('username'),
      password: form.get('password'),
      callbackUrl: '/dashboard',
    });
  };

  const handleGithubLogin = () => {
    if (githubLoading) return;
    setGithubLoading(true);
    signIn('github');
  };

  return (
    <>
      <LogoHeader className='pt-24' size='lg' />
      <div className='flex min-h-screen flex-col items-center gap-y-2 bg-gradient-to-b from-white to-violet-300 p-24 pt-0'>
        <form
          onSubmit={handleSubmitCredentials}
          className='flex w-[100%] flex-col items-center gap-y-4'
        >
          <Input
            placeholder='Username'
            type='text'
            name='username'
            className='mt-8 w-4/12'
          />

          <Input
            placeholder='Password'
            type='password'
            name='password'
            className='w-4/12'
          />
          <Button
            variant='ghost'
            className='w-4/12 bg-violet-200 hover:bg-violet-400'
            type='submit'
          >
            {credentialsLoading ? <Spinner /> : 'Log In'}
          </Button>
        </form>

        <OrSeparator />

        <Button
          variant='ghost'
          className='mb-1	w-4/12 bg-violet-300 hover:bg-violet-500 hover:text-white'
          onClick={handleGithubLogin}
        >
          {githubLoading ? <Spinner /> : 'Log In with GitHub'}
          <GitHubLogo className='ml-8 w-6' />
        </Button>
        <p className='text-sm'>
          Haven&apos;t signed up yet?
          <Button variant='link'>
            <Link href='/register'>Register here</Link>
          </Button>
        </p>
      </div>
    </>
  );
}
