import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FeaturesGrid } from './(components)/FeaturesGrid';

const Home = () => {
  return (
    <main className='overflow-hidden'>
      <section
        className="flex flex-col items-center justify-center px-6 pt-28 mb-6 lg:pt-52 lg:mb-20 w-full bg-[url('/grid.svg')] dark:bg-[url('/grid-dark.svg')]"
        id='hero'
      >
        <div className='mb-10'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl/[67.5px] lg:mb-1 tracking-tight font-medium text-center bg-gradient-to-b from-neutral-950 dark:from-zinc-100 from-40% to-stone-500 dark:to-slate-300 bg-clip-text text-transparent'>
            Create your AI Form
          </h1>

          <h2 className='text-4xl md:text-5xl lg:text-6xl tracking-tight font-light text-center bg-gradient-to-b from-blue-500 dark:from-blue-400 from-40% to-blue-700 dark:to-blue-600 bg-clip-text text-transparent'>
            In Seconds Not in Hours
          </h2>
        </div>
        <p className='text-center text-muted-foreground dark:text-muted-foreground/80 max-w-[600px]'>
          Use Google Gemini to create and customize forms to fit your needs in
          just seconds. Collect submissions and share.
        </p>
        <div className='flex justify-center items-center gap-4 mt-8'>
          <Link
            href='/dashboard'
            className={buttonVariants()}
          >
            <Sparkles className='size-4 mr-1.5 fill-secondary' /> Create AI Form
          </Link>
          <Link
            href='#'
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'hidden md:flex'
            )}
          >
            Lear More <ArrowRight className='size-3 ml-1.5' />
          </Link>
        </div>
        <div className='w-full bg-gradient-to-b from-transparent to-white dark:to-black h-24'></div>
      </section>
      <section>
        <h3 className='text-center font-semibold text-xl my-8 lg:my-12 lg:mb-16 lg:text-2xl bg-gradient-to-b from-blue-500 dark:from-blue-400 from-40% to-blue-700 dark:to-blue-600 bg-clip-text text-transparent'>
          How it works
        </h3>
        <ul className='relative flex flex-col lg:flex-row lg:justify-center items-center gap-12 pb-4'>
          <li className='w-60 h-60 lg:w-72 lg:h-72 rounded-md bg-background-2 border border-border hover:border-primary/30 relative flex items-center justify-center'>
            <img
              src='/arrow.svg'
              className='hidden lg:block absolute w-44 right-[-7.5rem] z-[50] top-[-0.51rem] transform -translate-y-1/2'
            />
            <Image
              draggable={false}
              alt='showcase image with form to create ai form'
              src='/assets/works-1-dark.png'
              fill
              className='hidden dark:block'
            />
            <Image
              draggable={false}
              alt='showcase image with form to create ai form'
              src='/assets/works-1-light.png'
              fill
              className='block dark:hidden'
            />
          </li>
          <li className='w-60 h-60 lg:w-72 lg:h-72 rounded-md bg-background-2 border border-border hover:border-primary/30 relative flex items-center justify-center'>
            <img
              src='/arrow.svg'
              className='hidden lg:block absolute w-44 left-[14rem] z-[50] top-[18.5rem] transform -translate-y-1/2 scale-y-[-1]'
            />
            <img
              src='/arrow.svg'
              className='block lg:hidden w-44 rotate-90 absolute top-[-7.5rem] left-[15.25rem] transform -translate-x-1/2'
            />
            <img
              src='/arrow.svg'
              className='block lg:hidden w-44 rotate-90 absolute z-[50] bottom-[-7.5rem] left-[-0.5rem] transform -translate-x-1/2 scale-y-[-1]'
            />
            <Image
              draggable={false}
              alt='showcase image with your generated form'
              src='/assets/works-4-dark.png'
              fill
              className='hidden dark:block'
            />
            <Image
              draggable={false}
              alt='showcase image with your generated form'
              src='/assets/works-2-light.png'
              fill
              className='block dark:hidden'
            />
          </li>
          <li className='w-60 h-60 lg:w-72 lg:h-72 rounded-md bg-background-2 border border-border hover:border-primary/30 relative flex items-center justify-center'>
            <Image
              draggable={false}
              alt='showcase image with table with submission results'
              src='/assets/works-3-dark.png'
              fill
              className='hidden dark:block'
            />
            <Image
              draggable={false}
              alt='showcase image with table with submission results'
              src='/assets/works-3-light.png'
              fill
              className='block dark:hidden'
            />
          </li>
        </ul>
      </section>
      <section className='px-4 md:px-8 lg:px-16 xl:px-32 pt-4 lg:pt-20 pb-12'>
        <h3 className='text-center font-semibold text-xl my-8 lg:text-2xl lg:my-12 bg-gradient-to-b from-blue-500 dark:from-blue-400 from-40% to-blue-700 dark:to-blue-600 bg-clip-text text-transparent'>
          Features
        </h3>
        <FeaturesGrid />
      </section>
      <section className='py-16 lg:py-40 flex items-center justify-center flex-col gap-5'>
        <h3 className='text-2xl lg:text-3xl tracking-tight font-medium text-center bg-gradient-to-b from-neutral-950 dark:from-zinc-100 from-40% to-stone-400 dark:to-slate-300 bg-clip-text text-transparent'>
          Create your{' '}
          <span className='bg-gradient-to-b from-blue-500 dark:from-blue-400 from-40% to-blue-700 dark:to-blue-600 bg-clip-text text-transparent'>
            AI Form
          </span>
        </h3>
        <Link
          href='/dashboard'
          className={buttonVariants()}
        >
          Get started now <ArrowRight className='size-4 ml-1.5' />{' '}
        </Link>
      </section>
    </main>
  );
};

export default Home;
