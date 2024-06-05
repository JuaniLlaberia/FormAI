'use client';

import { parse } from 'json2csv';
import { saveAs } from 'file-saver';
import { Download, Settings, Trash } from 'lucide-react';

import DeleteFormModal from '@/app/dashboard/(components)/DeleteFormModal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Column, Row } from '../page';

const InfoSettings = ({
  formId,
  formName,
  columns,
  data,
}: {
  formId: string;
  formName: string;
  columns: Column[];
  data: Row[];
}) => {
  const exportToCSV = (columns: Column[], data: Row[]) => {
    const labels = columns.map(col => col.label);
    const csvData = data.map(row => Object.values(row));

    const csvArray = [labels, ...csvData];

    const csv = parse(csvArray);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });

    saveAs(blob, 'data.csv');
  };

  return (
    <>
      <Dialog>
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
            <DropdownMenuItem onClick={() => exportToCSV(columns, data)}>
              <Download className='size-4 mr-1.5' /> Download data
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='text-red-400 hover:text-red-500 focus:text-red-500 w-full'
              asChild
            >
              <DialogTrigger>
                <Trash className='size-4 mr-1.5' /> Remove
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DeleteFormModal
            formId={formId}
            formName={formName}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InfoSettings;
