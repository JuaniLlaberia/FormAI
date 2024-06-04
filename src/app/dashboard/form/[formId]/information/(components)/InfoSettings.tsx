import { Copy, Download, Settings, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const InfoSettings = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <Button size='icon' variant='outline' className='md:hidden'>
            <Settings className='size-5' />
          </Button>
          <Button size='sm' variant='outline' className='hidden md:flex'>
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
  );
};

export default InfoSettings;
