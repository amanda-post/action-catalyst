'use client';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data, status } = useSession();
  console.log({ data, status });

  return (
    <div>
      {status === 'authenticated' && data !== null && (
        <>
          <h2>Welcome {data?.user?.username}</h2>
          <p>User ID: {data?.user?.id}</p>
          {JSON.stringify(data.user)}
          <h2 className='text-4xl font-bold text-center'>Actions</h2>
          <h2 className='text-4xl font-bold text-center'>Rewards</h2>
          <h2 className='text-4xl font-bold text-center'>Balance</h2>
          <h2 className='text-4xl font-bold text-center'>History</h2>
        </>
      )}
    </div>
  );
}
