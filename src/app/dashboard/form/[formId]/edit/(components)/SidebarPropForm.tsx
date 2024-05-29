import { Button } from '@/components/ui/button';
import { useFormContext } from './FormContext';
import { FormElements } from './FormElements';
import { X } from 'lucide-react';

const SidebarPropForm = () => {
  const { selectedElement, setSelectedElement } = useFormContext();
  if (!selectedElement) return null;

  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className='p-3'>
      <div className='flex justify-between items-center mb-1'>
        <p className='text-sm text-muted-foreground'>Element propierties</p>
        <Button
          size='icon'
          variant='ghost'
          onClick={() => setSelectedElement(null)}
        >
          <X className='size-4' />
        </Button>
      </div>
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
};

export default SidebarPropForm;
