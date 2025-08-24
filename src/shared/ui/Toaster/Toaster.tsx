import { Toaster as Sonner } from 'sonner';
import type { ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  return <Sonner className='toaster group' position='top-center' duration={3000} {...props} />;
};

export default Toaster;
