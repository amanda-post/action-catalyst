import { PropsWithChildren } from 'react';

export const Row: React.FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return <div className={`flex ${className ? className : ''}`}>{children}</div>;
};

export const Column: React.FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <div className={`flex-col ${className ? className : ''}`}>{children}</div>
  );
};
