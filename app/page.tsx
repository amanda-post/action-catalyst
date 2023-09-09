'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <button onClick={() => router.push('/login')}>Go to Login</button>
    </main>
  );
}
