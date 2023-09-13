import { PropsWithChildren } from 'react';
import {
  getHistory,
  getRewards,
  getTasks,
  getUser,
} from '~/app/(loggedInRoutes)/dashboard/actions';
import HistoryLog from '~/app/(loggedInRoutes)/dashboard/components/HistoryLog';
import Rewards from '~/app/(loggedInRoutes)/dashboard/components/Rewards';
import Tasks from '~/app/(loggedInRoutes)/dashboard/components/Tasks';
import { Column, Row } from '~/components/Flex';
import { Separator } from '~/components/ui/separator';

const Container = ({ children }: PropsWithChildren) => (
  <div className='m-9 rounded-xl bg-white'>
    <div className='px-12 py-5'>{children}</div>
  </div>
);

export default async function Home() {
  const [tasks, rewards, user, history] = await Promise.all([
    getTasks(),
    getRewards(),
    getUser(),
    getHistory(),
  ]);

  return (
    <>
      <Container>
        <div className='text-lg'>
          You have{' '}
          <span className='font-bold'>{user?.totalPointsAvailable}</span> points
          available
        </div>
        <Row className='flex-wrap justify-center gap-x-5 pt-8'>
          <Column className='flex-grow'>
            <Tasks tableData={tasks} />
          </Column>
          <Separator
            orientation='vertical'
            className='hidden h-auto bg-slate-200 lg:block'
          />
          <Column className='flex-grow pt-10 lg:p-0'>
            <Rewards tableData={rewards} />
          </Column>
        </Row>
      </Container>

      <Container>
        <h2 className='mt-5 text-4xl font-bold'>History</h2>
        <HistoryLog history={history} />
      </Container>
    </>
  );
}
