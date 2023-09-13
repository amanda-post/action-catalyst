'use client';
import { signOut } from 'next-auth/react';
import { LogoHeader } from '~/app/login/components/LogoHeader';
import { Button } from '~/components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='bg-gradient-to-b from-violet-800 to-violet-900'>
      <div className='flex justify-between border-b border-black bg-gradient-to-b from-violet-500 to-violet-700 p-4'>
        <LogoHeader color='white' />
        <Button variant='link' className='text-white' onClick={() => signOut()}>
          Log Out
        </Button>
      </div>
      {children}
    </section>
  );
}
