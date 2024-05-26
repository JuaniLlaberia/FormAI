import CreateForm from './CreateForm';

const CreateFormPage = () => {
  return (
    <div className='flex flex-col items-center justify-center flex-1'>
      <div className='flex flex-col w-full max-w-[400px] gap-8'>
        <h1 className='text-center text-2xl lg:3xl font-medium tracking-tight'>
          Create Your Form
        </h1>
        <CreateForm />
      </div>
    </div>
  );
};

export default CreateFormPage;
