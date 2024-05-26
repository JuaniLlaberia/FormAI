import ScratchForm from './ScratchForm';

const FormScratchPage = async ({ params }: { params: { formId: string } }) => {
  return (
    <div className='flex flex-col flex-1 justify-center items-center'>
      <ScratchForm formId={params.formId} />
    </div>
  );
};

export default FormScratchPage;
