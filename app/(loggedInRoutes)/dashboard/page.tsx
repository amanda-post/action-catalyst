import {
  getHistory,
  getRewards,
  getTasks,
  getUser,
} from '~/app/(loggedInRoutes)/dashboard/actions';
import HistoryLog from '~/app/(loggedInRoutes)/dashboard/components/HistoryLog';
import ItemTable from '~/app/(loggedInRoutes)/dashboard/components/Table';
import { Column, Row } from '~/components/Flex';

export default async function Home() {
  const [tasks, rewards, user, history] = await Promise.all([
    getTasks(),
    getRewards(),
    getUser(),
    getHistory(),
  ]);

  return (
    <div>
      <div className='pt-20 pl-20'>
        <div>Total Points Available: {user?.totalPointsAvailable}</div>
        <div>Points Earned All Time: {user?.totalPointsEarned}</div>
      </div>
      <Row className='justify-center gap-x-20 pt-20'>
        <Column className='w-2/5'>
          <h2 className='text-4xl font-bold text-center'>Tasks</h2>
          <ItemTable tableData={tasks} tableType='task' />
        </Column>
        <Column className='w-2/5'>
          <h2 className='text-4xl font-bold text-center'>Rewards</h2>
          <ItemTable tableData={rewards} tableType='reward' />
        </Column>
      </Row>

      <div className='pt-20 pl-20'>
        <h2 className='text-4xl font-bold '>History</h2>
        <HistoryLog history={history} />
      </div>
    </div>
  );
}
