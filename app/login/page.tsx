'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FormEvent } from 'react';
import { OrSeparator } from '~/app/login/components/OrSeparator';
import { Button } from '~/components/ui/button';
import { GitHubLogo, Logo, Text } from '~/components/ui/icons';
import { Input } from '~/components/ui/input';

export default function Login() {
  const handleSubmitCredentials = async (e: FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    await signIn('credentials', {
      username: form.get('username'),
      password: form.get('password'),
      callbackUrl: '/dashboard',
    });
  };
  return (
    <>
      <div className='flex items-center justify-center pt-24'>
        <Logo className='mr-3 h-16 w-auto text-violet-700' />
        <Text className='h-12 w-auto text-violet-900' />
      </div>
      <div className='flex min-h-screen flex-col items-center gap-y-3 p-24 pt-0'>
        <form
          onSubmit={handleSubmitCredentials}
          className='flex w-[100%] flex-col items-center gap-y-6'
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
            Log In
          </Button>
        </form>

        <OrSeparator />

        <Button
          variant='ghost'
          className='mb-1	w-4/12 bg-violet-300 hover:bg-violet-500 hover:text-white'
          onClick={() => signIn('github')}
        >
          Log In with GitHub
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
