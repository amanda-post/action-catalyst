import { Separator } from '~/components/ui/separator';

export const OrSeparator = () => {
  return (
    <div className='flex w-4/12 items-center justify-center'>
      <Separator className='mr-2 w-4/12 flex-grow bg-slate-500' />
      <span className='text-xs'>Or</span>
      <Separator className='ml-2 w-4/12 flex-grow bg-slate-500' />
    </div>
  );
};
