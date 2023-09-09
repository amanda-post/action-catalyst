'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoreHorizontalIcon } from 'lucide-react';
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Rewards,
  Tasks,
  addReward,
  addTask,
  completeTask,
  deleteReward,
  deleteTask,
  redeemReward,
  updateReward,
  updateTask,
} from '~/app/(loggedInRoutes)/dashboard/actions';
import SubmitPopover from '~/app/(loggedInRoutes)/dashboard/components/SubmitPopover';

import { Column } from '~/components/Flex';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
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

const formSchema = z.object({
  description: z
    .string()
    .nonempty({ message: 'Description is required' })
    .min(2)
    .max(50),
  points: z.number().min(1).max(1000),
});

type Dialog = 'add' | 'edit' | 'delete';
export type TableType = 'task' | 'reward';

export const tableConfig = {
  add: {
    task: addTask,
    reward: addReward,
  },
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
      tableType: 'task';
    }
  | {
      tableData: Rewards;
      tableType: 'reward';
    };

//popover with quantity for complete/redeem, reusable?
const ItemTable = ({ tableData, tableType }: TableProps) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const formInitialValues = {
    description: '',
    points: 1,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formInitialValues,
  });

  const generateOnAddOrEdit =
    ({ id, dialogType }: EditFormParams) =>
    async ({ description, points }: z.infer<typeof formSchema>) => {
      try {
        if (dialogType === 'add') {
          await tableConfig.add[tableType]({ description, points });
          toast({
            description: `${capitalize(tableType)} added successfully!`,
          });
        } else if (dialogType === 'edit' && id) {
          await tableConfig.edit[tableType]({ id, description, points });
          toast({
            description: `${capitalize(tableType)} updated successfully!`,
          });
        }
      } catch (err) {
        console.log(err);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: `There was a problem with adding your ${capitalize(
            tableType
          )}.`,
        });
      }
      onOpenChange({ dialogType, isOpen: false });
    };

  const onDelete = async ({ id }: { id: number }) => {
    try {
      await tableConfig.delete[tableType]({ id });
      toast({
        description: `${capitalize(tableType)} deleted successfully!`,
      });
    } catch (err) {
      console.log(err);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: `There was a problem with deleting your ${capitalize(
          tableType
        )}.`,
      });
    }
    onOpenChange({ dialogType: 'delete', isOpen: false });
  };

  const onOpenChange = ({
    dialogType,
    isOpen,
  }: {
    dialogType: Dialog;
    isOpen: boolean;
  }) => {
    switch (dialogType) {
      case 'add':
        setAddDialogOpen(isOpen);
        break;
      case 'edit':
        setEditDialogOpen(isOpen);
        break;
      case 'delete':
        setDeleteDialogOpen(isOpen);
        break;
    }
    if (!isOpen) form.reset(formInitialValues);
  };

  type EditFormParams = {
    id?: number;
    dialogType: 'add' | 'edit';
  };

  const EditForm = ({ id, dialogType }: EditFormParams) => (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(generateOnAddOrEdit({ id, dialogType }))}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder={tableConfig.placeholder[tableType]}
                  {...field}
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='points'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Point {tableType === 'task' ? 'Value' : 'Cost'}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='number'
                  {...form.register('points', {
                    valueAsNumber: true,
                  })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type='submit'>
            {dialogType === 'add' ? 'Add' : 'Update'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );

  return (
    <Column>
      <Dialog
        open={addDialogOpen}
        onOpenChange={(isOpen: boolean) => {
          onOpenChange({ dialogType: 'add', isOpen });
        }}
      >
        <DialogTrigger asChild>
          <Button>Add {capitalize(tableType)}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add {capitalize(tableType)} Type</DialogTitle>
          </DialogHeader>
          <EditForm dialogType='add' />
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Points</TableHead>
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
                  open={editDialogOpen}
                  onOpenChange={(isOpen: boolean) => {
                    onOpenChange({ dialogType: 'edit', isOpen });
                  }}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit {capitalize(tableType)}</DialogTitle>
                    </DialogHeader>
                    <EditForm id={id} dialogType='edit' />
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
                      <DialogTitle>Delete {capitalize(tableType)}</DialogTitle>
                      <DialogDescription>
                        Are you sure? This cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <Button
                      variant='destructive'
                      onClick={() => onDelete({ id: id })}
                    >
                      Delete
                    </Button>
                  </DialogContent>
                </Dialog>

                <TableCell>{description}</TableCell>

                <TableCell>{points}</TableCell>

                <TableCell className='px-0'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <MoreHorizontalIcon className='h-6 w-6 cursor-pointer' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          form.reset({ description, points });
                          onOpenChange({ dialogType: 'edit', isOpen: true });
                        }}
                      >
                        Edit {capitalize(tableType)}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() =>
                          onOpenChange({ dialogType: 'delete', isOpen: true })
                        }
                      >
                        Delete {capitalize(tableType)}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

                <TableCell className='px-0'>
                  <SubmitPopover item={item} tableType={tableType} />
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
