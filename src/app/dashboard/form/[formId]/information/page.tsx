import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Settings,
  Trash,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import Badge from '@/components/ui/badge';
import CopyBtn from '../published/(components)/CopyBtn';
import { getFormById } from '@/actions/forms';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getSubmissions } from '@/actions/submissions';
import {
  ElementsType,
  FormElementInstance,
} from '../edit/(components)/FormElements';
import { Checkbox } from '@/components/ui/checkbox';
import { formatDate } from '@/lib/formatters';

type Row = {
  [key: string]: string;
};

const FormInformationPage = async ({
  params,
}: {
  params: { formId: string };
}) => {
  const [form, submissions] = await Promise.all([
    getFormById(params.formId),
    getSubmissions({ formId: params.formId }),
  ]);

  if (!form || !submissions) return notFound();

  const { id, name, description } = form;
  const formElements = JSON.parse(form.content) as FormElementInstance[];

  const columns: {
    id: string;
    label: string;
    required: boolean;
    types: ElementsType;
  }[] = [];

  formElements.forEach(element => {
    switch (element.type) {
      case 'TextField':
      case 'NumberField':
      case 'CheckboxField':
      case 'DateField':
      case 'TextareaField':
      case 'OptionsField':
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          //@ts-ignore
          type: element.type,
        });
        break;

      default:
        break;
    }
  });

  const rows: Row[] = [];
  submissions.forEach(submission => {
    const content = JSON.parse(submission.content);
    rows.push(content);
  });

  return (
    <div>
      <div className='flex items-start gap-8 justify-between mb-6'>
        <div className='flex flex-col items-start justify-center'>
          <h1 className='text-lg font-medium tracking-tight'>{name}</h1>
          <p className='line-clamp-2 text-sm text-muted-foreground'>
            {description}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <Button
                size='icon'
                variant='outline'
                className='md:hidden'
              >
                <Settings className='size-5' />
              </Button>
              <Button
                size='sm'
                variant='outline'
                className='hidden md:flex'
              >
                <Settings className='size-4 mr-1.5' />
                Settings
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Copy className='size-4 mr-1.5' /> Copy link
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className='size-4 mr-1.5' /> Download data
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-red-400 hover:text-red-500 focus:text-red-500'>
              <Trash className='size-4 mr-1.5' /> Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CopyBtn formId={id} />

      <h2 className='text-sm font-medium px-1 mb-2'>Submissions</h2>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHead
                key={column.id}
                className='uppercase text-sm'
              >
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
      <div className='flex items-center justify-between px-2 mt-3'>
        <p className='text-sm text-muted-foreground'>Page 1 of 1</p>
        <div className='flex items-center gap-2'>
          <Button
            size='sm'
            variant='outline'
          >
            <ChevronLeft className='size-4 mr-1.5' />
            Previous
          </Button>
          <Button
            size='sm'
            variant='outline'
          >
            Next
            <ChevronRight className='size-4 ml-1.5' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormInformationPage;

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: ReactNode = value;

  switch (type) {
    case 'DateField':
      if (!value) break;
      const date = new Date(value);
      node = (
        <Badge
          color='gray'
          text={formatDate(date)}
        />
      );
      break;
    case 'CheckboxField':
      const checked = value === 'true';
      node = (
        <Checkbox
          checked={checked}
          disabled
        />
      );
      break;
  }

  return <TableCell className='min-w-[150px]'>{node}</TableCell>;
}
