import Theme from './Theme';

const Footer = () => {
  return (
    <footer className='h-14 bg-background-2 flex justify-between items-center p-3 border-t px-4 md:px-8 lg:px-16 xl:px-32'>
      <p className='text-sm text-muted-foreground'>
        FormAI &copy; {new Date().getFullYear()} All rights reserved
      </p>
      <Theme />
    </footer>
  );
};

export default Footer;
