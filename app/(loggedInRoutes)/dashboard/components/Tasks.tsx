import { Tasks } from '~/app/(loggedInRoutes)/dashboard/actions';
import AddModal from '~/app/(loggedInRoutes)/dashboard/components/AddModal';
import ItemTable from '~/app/(loggedInRoutes)/dashboard/components/Table';

interface TasksProps {
  tableData: Tasks;
}

const Tasks = ({ tableData }: TasksProps) => {
  return (
    <>
      <div className='flex pb-5'>
        <h2 className='text-4xl font-bold'>Tasks</h2>
        <AddModal itemType='task' />
      </div>
      <ItemTable tableData={tableData} itemType='task' />
    </>
  );
};

export default Tasks;
