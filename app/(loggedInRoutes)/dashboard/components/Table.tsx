'use client';
import { MoreHorizontalIcon } from 'lucide-react';
import { FormEvent, useRef, useState } from 'react';

import {
  Rewards,
  Tasks,
  completeTask,
  deleteReward,
  deleteTask,
  redeemReward,
  updateReward,
  updateTask,
} from '~/app/(loggedInRoutes)/dashboard/actions';
import ItemForm from '~/app/(loggedInRoutes)/dashboard/components/ItemForm';
import SubmitPopover from '~/app/(loggedInRoutes)/dashboard/components/SubmitPopover';

import { Column } from '~/components/Flex';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import Spinner from '~/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { useToast } from '~/components/ui/use-toast';
import { capitalize } from '~/lib/utils/helpers';

type Dialog = 'add' | 'edit' | 'delete';
export type TableType = 'task' | 'reward';

export const tableConfig = {
  edit: {
    task: updateTask,
    reward: updateReward,
  },
  delete: {
    task: deleteTask,
    reward: deleteReward,
  },
  placeholder: {
    task: 'Do the dishes',
    reward: 'Buy a new book',
  },
  redeem: {
    task: { fn: completeTask, text: 'Mark As Completed' },
    reward: { fn: redeemReward, text: 'Redeem Reward' },
  },
};

type TableProps =
  | {
      tableData: Tasks;
      itemType: 'task';
    }
  | {
      tableData: Rewards;
      itemType: 'reward';
    };

type FormValues = {
  description: string;
  points: number;
};

const ItemTable = ({ tableData, itemType }: TableProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState<{
    isOpen: boolean;
    id: number;
  }>({ isOpen: false, id: 0 });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmitEdit = async (e: FormEvent, id: number | undefined) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const description = form.get('description') as string;
    const points = Number(form.get('points')) as number;
    if (isLoading || !description || !points) return;

    setIsLoading(true);

    try {
      id && (await tableConfig.edit[itemType]({ id, description, points }));
      toast({
        description: `${capitalize(itemType)} updated successfully!`,
      });
    } catch (err) {
      console.log(err);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: `There was a problem with editing your ${capitalize(
          itemType,
        )}.`,
      });
    }
    setIsLoading(false);
    onOpenChange({ dialogType: 'edit', isOpen: false });
  };

  const onDelete = async ({ id }: { id: number }) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await tableConfig.delete[itemType]({ id });
      toast({
        description: `${capitalize(itemType)} deleted successfully!`,
      });
    } catch (err) {
      console.log(err);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: `There was a problem with deleting your ${capitalize(
          itemType,
        )}.`,
      });
    }
    setIsLoading(false);
    onOpenChange({ dialogType: 'delete', isOpen: false });
  };

  const clearForm = () => {
    formRef.current?.reset();
  };

  const onOpenChange = ({
    dialogType,
    isOpen,
    id,
  }: {
    dialogType: Dialog;
    isOpen: boolean;
    id?: number;
  }) => {
    switch (dialogType) {
      case 'edit':
        setEditDialogOpen({ isOpen, id: id! });
        break;
      case 'delete':
        setDeleteDialogOpen(isOpen);
        break;
    }
    if (!isOpen) clearForm();
  };

  return (
    <Column>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className='text-right'>Points</TableHead>
            <TableHead />
            <TableHead className='w-[100px] p-0' />
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((item) => {
            const { description, id, ...rest } = item;
            const points =
              'pointValue' in rest ? rest.pointValue : rest.pointCost;
            return (
              <TableRow key={item.id}>
                <Dialog
                  open={editDialogOpen.isOpen && editDialogOpen.id === id}
                  onOpenChange={(isOpen: boolean) => {
                    onOpenChange({
                      dialogType: 'edit',
                      isOpen,
                      id,
                    });
                  }}
                  key={id}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit {capitalize(itemType)}</DialogTitle>
                    </DialogHeader>

                    <ItemForm
                      id={id}
                      dialogType='edit'
                      initialValues={{ description, points }}
                      onSubmit={handleSubmitEdit}
                      formRef={formRef}
                      loading={isLoading}
                      itemType={itemType}
                    />
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={deleteDialogOpen}
                  onOpenChange={(isOpen: boolean) =>
                    onOpenChange({ dialogType: 'delete', isOpen })
                  }
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete {capitalize(itemType)}</DialogTitle>
                      <DialogDescription>
                        Are you sure? This cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <Button
                      variant='destructive'
                      onClick={() => onDelete({ id })}
                    >
                      {isLoading ? <Spinner /> : 'Delete'}
                    </Button>
                  </DialogContent>
                </Dialog>

                <TableCell>{description}</TableCell>

                <TableCell className='text-right'>{points}</TableCell>

                <TableCell className='flex justify-end px-0'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <MoreHorizontalIcon className='mt-2 h-6 w-6 cursor-pointer' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() =>
                          onOpenChange({ dialogType: 'edit', isOpen: true, id })
                        }
                      >
                        Edit {capitalize(itemType)}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() =>
                          onOpenChange({ dialogType: 'delete', isOpen: true })
                        }
                      >
                        Delete {capitalize(itemType)}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

                <TableCell className='px-0'>
                  <SubmitPopover item={item} itemType={itemType} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Column>
  );
};

export default ItemTable;
