import { cn } from '@/shared/lib';
import { cva } from 'class-variance-authority';

interface TextFieldsProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  variant?: 'default' | 'error';
  errorMessage?: string;
}

const textFieldsVariants = cva(
  'h-12 border border-transparent px-6 py-[14px] bg-gray-50 rounded-lg text-gray-800 transition-colors',
  {
    variants: {
      variant: {
        default: 'focus:ring-1 focus:ring-point-500 focus:outline-none',
        error:
          'border-sub-a-500 focus:border-sub-a-500 focus:ring-1 focus:ring-sub-a-500 focus:outline-none',
      },
    },
  }
);

const TextField = ({
  className,
  placeholder,
  variant = 'default',
  errorMessage,
  ...props
}: TextFieldsProps) => {
  return (
    <div className='flex flex-col gap-[1px]'>
      <input
        type='text'
        placeholder={placeholder}
        className={cn(textFieldsVariants({ variant }), className)}
        {...props}
      />
      {errorMessage && (
        <span className='text-sub-a-500 text-body-14 mx-3 font-medium'>{errorMessage}</span>
      )}
    </div>
  );
};

export default TextField;
