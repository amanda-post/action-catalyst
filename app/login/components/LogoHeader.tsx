import { useRouter } from 'next/navigation';
import { Logo, Text } from '~/components/ui/icons';

const sizes = {
  sm: {
    logo: 'h-7',
    text: 'h-4',
  },
  md: {
    logo: 'h-10',
    text: 'h-6',
  },
  lg: {
    logo: 'h-16',
    text: 'h-10',
  },
  xl: {
    logo: 'h-20',
    text: 'h-16',
  },
};

export const LogoHeader = ({
  className,
  size = 'md',
  color = 'violet-600',
  hoverColor = 'violet-400',
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  hoverColor?: string;
}) => {
  const router = useRouter();

  return (
    <div
      className={`group flex cursor-pointer items-center justify-center ${className}`}
      onClick={() => router.push('/')}
    >
      <Logo
        className={`mr-3 ${sizes[size].logo} group-hover:animate-spin-slow w-auto text-${color}`}
      />
      <Text
        className={`${sizes[size].text} w-auto text-${color} hover:text-${hoverColor}`}
      />
    </div>
  );
};
