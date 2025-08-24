import { toast } from 'sonner';

const customToast = {
  confirm: (message: string) => {
    toast.custom(() => (
      <div className='flex w-[356px] justify-center'>
        <div className='bg-point-300 flex items-center rounded-full px-2.5 py-1.5'>
          <span className='font-semibold text-gray-800'>{message}</span>
        </div>
      </div>
    ));
  },
  alarm: (message: string) => {
    toast.custom(() => (
      <div className='flex w-[356px] justify-center'>
        <div className='flex items-center rounded-full border bg-white px-2.5 py-1.5'>
          <span className='font-semibold text-gray-800'>{message}</span>
        </div>
      </div>
    ));
  },
  warning: (message: string) => {
    toast.custom(() => (
      <div className='flex w-[356px] justify-center'>
        <div className='bg-sub-a-100 flex items-center rounded-full px-2.5 py-1.5'>
          <span className='text-sub-a-600 font-semibold'>{message}</span>
        </div>
      </div>
    ));
  },
};

export default customToast;
