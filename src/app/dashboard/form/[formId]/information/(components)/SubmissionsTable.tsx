import type { ReactNode } from 'react';

import Badge from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ElementsType } from '../../edit/(components)/FormElements';
import { formatDate } from '@/lib/formatters';
import { Checkbox } from '@/components/ui/checkbox';
import { Column, Row } from '../page';

const SubmissionsTable = ({
  columns,
  rows,
}: {
  columns: Column[];
  rows: Row[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableHead key={column.id} className='uppercase text-sm'>
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length > 0 ? (
          rows.map((row, i) => (
            <TableRow key={i}>
              {columns.map(column => (
                <RowCell
                  key={column.id}
                  type={column.types}
                  value={row[column.id]}
                />
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={100}
              className='text-center py-8 text-muted-foreground'
            >
              No results
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default SubmissionsTable;

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: ReactNode = value;

  switch (type) {
    case 'DateField':
      if (!value) break;
      const date = new Date(value);
      node = <Badge color='gray' text={formatDate(date)} />;
      break;
    case 'CheckboxField':
      const checked = value === 'true';
      node = <Checkbox checked={checked} disabled />;
      break;
  }

  return <TableCell className='min-w-[150px]'>{node}</TableCell>;
}
