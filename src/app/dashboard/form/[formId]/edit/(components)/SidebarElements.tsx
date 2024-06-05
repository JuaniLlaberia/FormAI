import SidebarBtnElement from './SidebarBtnElement';
import { FormElements } from './FormElements';

const SidebarElements = () => {
  return (
    <div className='h-full overflow-y-auto p-2'>
      <h2 className='font-medium text-muted-foreground mb-1 pb-2'>
        Drag and drop elements
      </h2>
      <h3 className='text-muted-foreground text-sm mb-1.5'>Form elements</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center'>
        <SidebarBtnElement formElement={FormElements.TextField} />
        <SidebarBtnElement formElement={FormElements.TextareaField} />
        <SidebarBtnElement formElement={FormElements.NumberField} />
        <SidebarBtnElement formElement={FormElements.OptionsField} />
        <SidebarBtnElement formElement={FormElements.CheckboxField} />
        <SidebarBtnElement formElement={FormElements.DateField} />
      </div>
      <h3 className='text-muted-foreground text-sm mb-1.5 mt-4'>
        Layout elements
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center'>
        <SidebarBtnElement formElement={FormElements.TitleField} />
        <SidebarBtnElement formElement={FormElements.SubTitleField} />
        <SidebarBtnElement formElement={FormElements.ParagraphField} />
        <SidebarBtnElement formElement={FormElements.SeparatorField} />
      </div>
    </div>
  );
};

export default SidebarElements;
