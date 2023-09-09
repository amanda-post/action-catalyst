'use client';
import { MoreHorizontalIcon } from 'lucide-react';
import { FormEvent, useRef, useState } from 'react';

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
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
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

type FormValues = {
  description: string;
  points: number;
};

type EditFormParams = {
  dialogType: 'add' | 'edit';
  id?: number;
  initialValues?: FormValues;
};

const ItemTable = ({ tableData, tableType }: TableProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState<{
    isOpen: boolean;
    id: number;
  }>({ isOpen: false, id: 0 });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const pointsInputRef = useRef<HTMLInputElement>(null);

  const generateOnAddOrEdit =
    ({ id, dialogType }: EditFormParams) =>
    async (e: FormEvent) => {
      e.preventDefault();
      const form = new FormData(e.target as HTMLFormElement);
      const description = form.get('description') as string;
      const points = Number(form.get('points')) as number;
      if (isLoading || !description || !points) return;

      setIsLoading(true);

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
      setIsLoading(false);
      onOpenChange({ dialogType, isOpen: false });
    };

  const onDelete = async ({ id }: { id: number }) => {
    if (isLoading) return;
    setIsLoading(true);
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
      case 'add':
        setAddDialogOpen(isOpen);
        break;
      case 'edit':
        setEditDialogOpen({ isOpen, id: id! });
        break;
      case 'delete':
        setDeleteDialogOpen(isOpen);
        break;
    }
    if (!isOpen) clearForm();
  };

  const EditForm = ({ dialogType, id, initialValues }: EditFormParams) => {
    const descriptionValue = descriptionInputRef.current?.value;
    const pointsValue = pointsInputRef.current?.value;
    return (
      <form
        onSubmit={generateOnAddOrEdit({ id, dialogType })}
        className='space-y-6'
        ref={formRef}
      >
        <div>
          <Label>Description</Label>
          <Input
            name='description'
            type='text'
            minLength={1}
            className='mt-4'
            ref={descriptionInputRef}
            defaultValue={
              descriptionValue
                ? descriptionValue
                : initialValues?.description
                ? initialValues.description
                : ''
            }
          />
        </div>

        <div>
          <Label>Point {tableType === 'task' ? 'Value' : 'Cost'}</Label>
          <Input
            name='points'
            type='number'
            min={1}
            className='mt-4'
            ref={pointsInputRef}
            defaultValue={
              pointsValue !== undefined && pointsValue !== null
                ? pointsValue
                : initialValues?.points
                ? initialValues.points.toString()
                : '1'
            }
          />
        </div>

        <DialogFooter>
          <Button type='submit'>
            {isLoading ? <Spinner /> : dialogType === 'add' ? 'Add' : 'Update'}
          </Button>
        </DialogFooter>
      </form>
    );
  };

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
                      <DialogTitle>Edit {capitalize(tableType)}</DialogTitle>
                    </DialogHeader>
                    <EditForm
                      id={id}
                      dialogType='edit'
                      initialValues={{ description, points }}
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
                      <DialogTitle>Delete {capitalize(tableType)}</DialogTitle>
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

                <TableCell>{points}</TableCell>

                <TableCell className='px-0'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <MoreHorizontalIcon className='h-6 w-6 cursor-pointer' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() =>
                          onOpenChange({ dialogType: 'edit', isOpen: true, id })
                        }
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
