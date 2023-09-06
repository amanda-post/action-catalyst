'use client';

import { SessionProvider } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';

const SessionProviderWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
