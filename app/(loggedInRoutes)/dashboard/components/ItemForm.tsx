import { FormEvent, useRef } from 'react';
import { Button } from '~/components/ui/button';
import { DialogFooter } from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import Spinner from '~/components/ui/spinner';

interface ItemFormProps {
  onSubmit: (e: FormEvent, id: number | undefined) => Promise<void>;
  dialogType: 'add' | 'edit';
  id?: number;
  initialValues?: { description: string; points: number };
  formRef?: React.RefObject<HTMLFormElement>;
  loading: boolean;
  itemType: 'task' | 'reward';
}

const ItemForm = ({
  dialogType,
  id,
  initialValues,
  onSubmit,
  formRef,
  loading,
  itemType,
}: ItemFormProps) => {
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const pointsInputRef = useRef<HTMLInputElement>(null);
  const descriptionValue = descriptionInputRef.current?.value;
  const pointsValue = pointsInputRef.current?.value;

  const handleSubmit = (e: FormEvent) => onSubmit(e, id);
  return (
    <form onSubmit={handleSubmit} className='space-y-6' ref={formRef}>
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
        <Label>Point {itemType === 'task' ? 'Value' : 'Cost'}</Label>
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
          {loading ? <Spinner /> : dialogType === 'add' ? 'Add' : 'Update'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ItemForm;
