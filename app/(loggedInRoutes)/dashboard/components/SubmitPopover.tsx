import { useState } from 'react';
import {
  TableType,
  tableConfig,
} from '~/app/(loggedInRoutes)/dashboard/components/Table';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { toast } from '~/components/ui/use-toast';
import { capitalize } from '~/lib/utils/helpers';

const SubmitPopover = ({
  tableType,
  item,
}: {
  tableType: TableType;
  item: any; //TODO: Fix me
}) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async () => {
    try {
      await tableConfig.redeem[tableType].fn({ id: item.id, quantity });
      toast({
        description:
          tableType === 'task'
            ? `Sucessfully awarded points for ${quantity}x "${item.description}"`
            : `Sucessfully redeemed ${quantity}x "${item.description}"`,
      });
      setOpen(false);
    } catch (error: any) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error?.message,
      });
    }
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' className='text-xs text'>
          {tableConfig.redeem[tableType].text}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <p className='text-sm text-muted-foreground'>
              Select the quantity you want to complete / redeem.
            </p>
          </div>
          <div className='grid gap-2'>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='width'>{capitalize(tableType)}</Label>
              <div className='w-max'>{item.description}</div>
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='maxWidth'>Quantity</Label>
              <Input
                id='quantity'
                value={quantity}
                onChange={(e) => setQuantity(e.target.valueAsNumber)}
                type='number'
                className='col-span-2 h-8'
              />
            </div>

            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SubmitPopover;
