import Link from 'next/link';
import {
  ArrowRight,
  Ellipsis,
  FileText,
  Pencil,
  Plus,
  Trash,
} from 'lucide-react';

import Badge from '@/components/ui/badge';
import Searchbar from './(components)/Searchbar';
import { getForms } from '@/actions/forms';
import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDate } from '@/lib/formatters';
import { cn } from '@/lib/utils';

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: { search: string };
}) => {
  const forms = await getForms({ search: searchParams.search });

  return (
    <div className='flex-1'>
      <header className='mb-4'>
        <div className='flex gap-3'>
          <Searchbar search={searchParams.search} />
          <Link
            href='/dashboard/form/new'
            className={cn(buttonVariants({}), 'hidden md:flex')}
          >
            New form <Plus className='size-4 ml-1.5' />
          </Link>
          <Link
            href='/dashboard/form/new'
            className={cn(
              buttonVariants({ size: 'icon' }),
              'md:hidden flex px-3'
            )}
          >
            <Plus className='size-4' />
          </Link>
        </div>
      </header>
      <h1 className='mb-2 text-base lg:text-lg font-medium'>Your forms</h1>
      <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5'>
        {forms.length > 0 ? (
          forms.map(form => (
            <Link
              key={form.id}
              href={`/dashboard/form/${form.id}/${
                form.isPublished ? 'information' : 'edit'
              }`}
              className='bg-background-2 hover:bg-muted/45 hover:border-primary/50 p-4 px-5 border border-border relative rounded-md shadow-sm transition-colors'
            >
              <li>
                <h2 className='text-base font-semibold tracking-tight'>
                  {form.name}
                </h2>
                <p className='text-sm text-muted-foreground line-clamp-2'>
                  {form.description}
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger className='absolute top-4 right-3.5 p-1.5 text-muted-foreground rounded-md hover:bg-muted hover:text-primary transition-all'>
                    <Ellipsis className='size-4' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {form.isPublished && (
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/form/${form.id}/information`}>
                          <FileText className='size-3.5 mr-1.5' /> Information
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {!form.isPublished && (
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/form/${form.id}/edit`}>
                          <Pencil className='size-3.5 mr-1.5' /> Edit
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className='text-red-400 hover:text-red-500 focus:text-red-500'>
                      <Trash className='size-3.5 mr-1.5' /> Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className='flex mx-1 my-3'>
                  {form.isPublished ? (
                    <Badge decorated color='green' text='Published' />
                  ) : (
                    <Badge decorated color='blue' text='Draft' />
                  )}
                </div>
                <div className='flex items-center justify-end'>
                  <p className='text-sm text-muted-foreground'>
                    Last updated {formatDate(form.updatedAt)}
                  </p>
                </div>
              </li>
            </Link>
          ))
        ) : (
          <div className='text-center py-8 text-sm md:text-base'>
            <h3 className='text-muted-foreground mb-2.5'>
              You have no forms yet
            </h3>
            {searchParams.search.length === 0 && (
              <Link
                href=''
                className={buttonVariants({ variant: 'ghost', size: 'sm' })}
              >
                Start now
                <ArrowRight className='size-4 ml-1.5' />
              </Link>
            )}
          </div>
        )}
      </ul>
    </div>
  );
};

export default DashboardPage;
