import Link from 'next/link';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { ArrowRight, LayoutDashboard, LogOut, Settings } from 'lucide-react';
import { Cabin } from 'next/font/google';

import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Image from 'next/image';

const cabin = Cabin({ subsets: ['latin'] });

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-border bg-background backdrop-blur-lg transition-all px-4 md:px-8 lg:px-16 xl:px-32'>
      <div className='flex h-full items-center justify-between'>
        <Link
          href='/'
          className={cn(
            cabin.className,
            'flex items-center gap-1 font-semibold tracking-wide text-lg'
          )}
        >
          <div className='relative size-14'>
            <Image src='/logo-dark.png' alt='logo' fill draggable={false} />
          </div>
          FormAI
        </Link>
        <div className='flex gap-3'>
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarFallback>
                      {user.given_name?.at(0)?.toLocaleUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href='/dashboard'>
                      <LayoutDashboard className='size-4 mr-3' /> My dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href='/settings'>
                      <Settings className='size-4 mr-3' /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    asChild
                    className='text-red-400 hover:text-red-500 focus:text-red-500'
                  >
                    <Link href='/api/auth/logout'>
                      <LogOut className='size-4 mr-3' /> Log out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link
                href='/api/auth/login'
                className={buttonVariants({ size: 'sm', variant: 'ghost' })}
              >
                Sign up
              </Link>
              <Link
                href='/dashboard'
                className={cn(buttonVariants({ size: 'sm' }), 'hidden md:flex')}
              >
                Start now
                <ArrowRight className='size-4 ml-1.5' />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
