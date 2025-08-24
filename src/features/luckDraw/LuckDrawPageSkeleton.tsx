const LuckDrawPageSkeleton = () => {
  return (
    <div className='animate-pulse' role='status'>
      {/* 상단 타이틀 스켈레톤 */}
      <div className='flex items-end justify-between px-5 pb-6'>
        <div className='flex flex-col gap-2'>
          <div className='h-8 w-40 rounded-md bg-gray-400'></div>
          <div className='h-8 w-32 rounded-md bg-gray-400'></div>
        </div>
        <div className='h-5 w-24 rounded-md bg-gray-400'></div>
      </div>

      {/* 상품 캐러셀 스켈레톤 */}
      <div>
        {/* Carousel Image Placeholders */}
        <div className='ml-5 flex space-x-4 overflow-hidden'>
          {/* 스켈레톤에서는 2~3개 정도의 아이템만 고정으로 보여주는 것이 일반적입니다. */}
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className='aspect-[3/2] w-70 flex-shrink-0 rounded-xl bg-gray-400'
            ></div>
          ))}
        </div>

        {/* Carousel Indicator Dots Placeholder */}
        <div className='mt-4.5 flex justify-center gap-1'>
          <div className='h-2 w-6 rounded-full bg-gray-400'></div>
          <div className='h-2 w-2 rounded-full bg-gray-300'></div>
          <div className='h-2 w-2 rounded-full bg-gray-300'></div>
          <div className='h-2 w-2 rounded-full bg-gray-300'></div>
        </div>
      </div>

      {/* 상품 정보 스켈레톤 */}
      <div className='flex flex-col gap-4.5 px-5 pt-7.5'>
        {/* 상품 이름 */}
        <div className='h-7 w-3/4 rounded-md bg-gray-400'></div>

        {/* 총 증정 개수 */}
        <div className='flex flex-col gap-1'>
          <div className='h-4 w-20 rounded-md bg-gray-400'></div>
          <div className='h-5 w-12 rounded-md bg-gray-400'></div>
        </div>

        {/* 현황 */}
        <div className='flex flex-col gap-1 pt-1.5'>
          <div className='h-4 w-10 rounded-md bg-gray-400'></div>
          <div className='h-5 w-16 rounded-md bg-gray-400'></div>
        </div>
      </div>
    </div>
  );
};

export default LuckDrawPageSkeleton;
