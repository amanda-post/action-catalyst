'use client';
import { signOut } from 'next-auth/react';
import { Button } from '~/components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Button onClick={() => signOut()}>Log Out</Button>
      {children}
    </section>
  );
}
