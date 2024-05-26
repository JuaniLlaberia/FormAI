import { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex-1 flex flex-col p-4 lg:p-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 h-full'>
      {children}
    </div>
  );
};

export default DashboardLayout;
