'use client';

import { FormEvent, useState } from 'react';
import { addReward, addTask } from '~/app/(loggedInRoutes)/dashboard/actions';
import ItemForm from '~/app/(loggedInRoutes)/dashboard/components/ItemForm';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { toast } from '~/components/ui/use-toast';
import { capitalize } from '~/lib/utils/helpers';

interface AddModalProps {
  itemType: 'task' | 'reward';
}

const AddModal = ({ itemType }: AddModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const description = form.get('description') as string;
    const points = Number(form.get('points')) as number;
    if (isLoading || !description || !points) return;

    setIsLoading(true);

    try {
      if (itemType === 'task') {
        addTask({ description, points });
        toast({
          description: `${capitalize(itemType)} added successfully!`,
        });
      } else {
        addReward({ description, points });
        toast({
          description: `${capitalize(itemType)} updated successfully!`,
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: `There was a problem with adding your ${capitalize(
          itemType,
        )}.`,
      });
    }
    setIsLoading(false);
    setDialogOpen(false);
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size='sm' variant='outline' className='ml-5 mt-1'>
          Add {capitalize(itemType)}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add {capitalize(itemType)} Type</DialogTitle>
        </DialogHeader>
        <ItemForm
          dialogType='add'
          onSubmit={handleAdd}
          itemType={itemType}
          loading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddModal;
