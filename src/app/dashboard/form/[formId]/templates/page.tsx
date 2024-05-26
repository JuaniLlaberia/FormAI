import TemplatesForm from './TemplatesForm';

const FormTemplatesPage = ({ params }: { params: { formId: string } }) => {
  return (
    <div className='flex flex-col flex-1 items-center justify-center'>
      <div className='flex flex-col w-full max-w-[500px] gap-6'>
        <div>
          <h1 className='mb-2 text-center text-2xl lg:3xl font-medium tracking-tight'>
            Our Templates
          </h1>
          <p className='text-sm text-muted-foreground tracking-tight'>
            Select one of our templates and get started. All templates can be
            modified and are full customizable after creation.
          </p>
        </div>
        <TemplatesForm formId={params.formId} />
      </div>
    </div>
  );
};

export default FormTemplatesPage;
