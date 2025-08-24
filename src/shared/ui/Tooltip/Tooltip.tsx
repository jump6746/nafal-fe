interface TooltipProps {
  Tooltip: string;
}

const Tooltip = ({ Tooltip }: TooltipProps) => {
  return (
    <div className='relative w-max'>
      <div className='rounded-xs bg-gray-700 px-2 py-1 text-xs text-white'> {Tooltip} </div>
      <div className='absolute top-[calc(100%-1px)] left-6/7 -translate-x-1/2'>
        <div className='h-0 w-0 border-x-7 border-t-8 border-x-transparent border-t-gray-700' />
      </div>
    </div>
  );
};

export default Tooltip;
