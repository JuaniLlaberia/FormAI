'use client';

import React from 'react';

import SidebarElements from './SidebarElements';
import SidebarPropForm from './SidebarPropForm';
import { useFormContext } from './FormContext';

const Sidebar = () => {
  const { selectedElement } = useFormContext();

  return (
    <aside className='flex flex-col h-full max-w-[275px] bg-background-2 rounded-md border border-border'>
      {selectedElement === null ? <SidebarElements /> : <SidebarPropForm />}
    </aside>
  );
};

export default Sidebar;
