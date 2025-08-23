const AuctionListSkeleton = () => {
  return (
    <div className='grid grid-cols-2 gap-x-[16px] gap-y-[28px]'>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className='flex h-fit w-full flex-col gap-[6px] bg-white'>
          {/* 스켈레톤 이미지 */}
          <div className='relative aspect-square w-full animate-pulse rounded-2xl bg-gray-400'>
            <div className='absolute top-[10px] left-2 h-6 w-16 animate-pulse rounded-full bg-gray-300' />
          </div>

          {/* 스켈레톤 텍스트 정보 */}
          <div className='flex flex-col gap-1 pl-[2px]'>
            <div className='flex flex-col gap-1'>
              <div className='h-4 w-24 animate-pulse rounded bg-gray-400' />
              <div className='h-3 w-32 animate-pulse rounded bg-gray-400' />
            </div>
            <div className='flex flex-col gap-1'>
              <div className='flex flex-row items-center gap-[6px]'>
                <div className='h-3 w-8 animate-pulse rounded bg-gray-400' />
                <div className='h-4 w-20 animate-pulse rounded bg-gray-400' />
              </div>
              <div className='flex flex-row items-center gap-[6px]'>
                <div className='h-3 w-12 animate-pulse rounded bg-gray-400' />
                <div className='h-4 w-24 animate-pulse rounded bg-gray-400' />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuctionListSkeleton;
