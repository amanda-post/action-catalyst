import { History } from '~/app/(loggedInRoutes)/dashboard/actions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { cn } from '~/lib/utils';
import { isNegative } from '~/lib/utils/helpers';

const HistoryLog = async ({ history }: { history: History }) => (
  <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Change</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map((event) => (
          <TableRow key={event.id}>
            <TableCell>{event.timestamp.toDateString()}</TableCell>
            <TableCell>{event.description}</TableCell>
            <TableCell>{event.quantity}</TableCell>
            <TableCell>{event.pointValue}</TableCell>
            <TableCell
              className={cn(
                isNegative(event.pointValueChange) && 'text-red-500',
                !isNegative(event.pointValueChange) && 'text-green-500'
              )}
            >
              {event.pointValueChange}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
);

export default HistoryLog;
