import { Toaster as Sonner } from 'sonner';
import type { ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className='toaster group'
      position='top-center'
      duration={3000}
      closeButton
      style={
        {
          '--normal-bg': 'hsl(0 0% 100%)',
          '--normal-text': 'hsl(240 10% 3.9%)',
          '--normal-border': 'hsl(214.3 31.8% 91.4%)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export default Toaster;
