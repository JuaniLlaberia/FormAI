import Theme from './Theme';

const Footer = () => {
  return (
    <footer className='h-14 bg-background-2 flex justify-between items-center p-3 border-t'>
      <p className='text-sm text-muted-foreground'>
        FormAI &copy; {new Date().getFullYear()} All rights reserved
      </p>
      <Theme />
    </footer>
  );
};

export default Footer;
