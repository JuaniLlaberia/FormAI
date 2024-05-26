'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const Theme = () => {
  const { setTheme, theme } = useTheme();

  return (
    <ul className='flex items-center gap-1.5 bg-background-2 p-1 rounded-full border border-border'>
      <li className='cursor-pointer' onClick={() => setTheme('light')}>
        <div
          className={cn(
            'p-1 rounded-full hover:bg-background transition-colors',
            {
              'bg-background border border-border hover:bg-background':
                theme === 'light',
            }
          )}
        >
          <Sun
            className={cn('size-4 text-muted-foreground', {
              'text-primary': theme === 'light',
            })}
          />
        </div>
      </li>
      <li className='cursor-pointer' onClick={() => setTheme('dark')}>
        <div
          className={cn(
            'p-1 rounded-full hover:bg-background transition-colors',
            {
              'bg-background border border-border hover:bg-background':
                theme === 'dark',
            }
          )}
        >
          <Moon
            className={cn('size-4 text-muted-foreground', {
              'text-primary': theme === 'dark',
            })}
          />
        </div>
      </li>
      <li className='cursor-pointer' onClick={() => setTheme('system')}>
        <div
          className={cn(
            'p-1 rounded-full hover:bg-background transition-colors',
            {
              'bg-background border border-border hover:bg-background':
                theme === 'system',
            }
          )}
        >
          <Monitor
            className={cn('size-4 text-muted-foreground', {
              'text-primary': theme === 'system',
            })}
          />
        </div>
      </li>
    </ul>
  );
};

export default Theme;
