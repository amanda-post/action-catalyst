'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FormEvent } from 'react';
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
        <Logo className='h-16 w-auto mr-3 text-violet-700' />
        <Text className='h-12 w-auto text-violet-900' />
      </div>
      <div className='flex flex-col min-h-screen items-center p-24 pt-0 gap-y-3'>
        <form
          onSubmit={handleSubmitCredentials}
          className='w-[100%] flex flex-col items-center gap-y-6'
        >
          <Input placeholder='Username' type='text' className='w-4/12 mt-8' />

          <Input placeholder='Password' type='password' className='w-4/12' />
          <Button
            variant='outline'
            className='w-4/12 outline outline-2 outline-violet-300 bg-violet-200 hover:bg-violet-400'
            type='submit'
          >
            Log In
          </Button>
        </form>
        <Button
          variant='outline'
          className='mb-1 w-4/12 outline outline-2 outline-violet-400 bg-violet-300 hover:bg-violet-500'
          onClick={() => signIn('github')}
        >
          Log In with GitHub
          <GitHubLogo className='w-6 ml-8' />
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
