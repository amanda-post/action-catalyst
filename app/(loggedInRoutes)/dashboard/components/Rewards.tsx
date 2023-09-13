import { Rewards } from '~/app/(loggedInRoutes)/dashboard/actions';
import AddModal from '~/app/(loggedInRoutes)/dashboard/components/AddModal';
import ItemTable from '~/app/(loggedInRoutes)/dashboard/components/Table';

interface RewardsProps {
  tableData: Rewards;
}

const Rewards = ({ tableData }: RewardsProps) => {
  return (
    <>
      <div className='flex pb-5'>
        <h2 className='text-4xl font-bold'>Rewards</h2>
        <AddModal itemType='reward' />
      </div>
      <ItemTable tableData={tableData} itemType='reward' />
    </>
  );
};

export default Rewards;
