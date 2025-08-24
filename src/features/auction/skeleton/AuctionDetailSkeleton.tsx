const AuctionDetailSkeleton = () => {
  return (
    <div className='relative h-full w-full animate-pulse' role='status'>
      {/* 사진 공간 스켈레톤 */}
      <div className='relative'>
        <div className='aspect-[3/2] w-full bg-gray-400'></div>
      </div>

      {/* 경매 정보 공간 스켈레톤 */}
      <div className='flex flex-col gap-3.5 px-5 pt-11 pb-4.5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            {/* 브랜드 짧은 로고 스켈레톤 */}
            <div className='h-12 w-12 rounded-xl bg-gray-400'></div>
            {/* 브랜드 긴 로고 스켈레톤 */}
            <div className='h-6 w-20 rounded bg-gray-400'></div>
          </div>
          <div className='flex items-center gap-1.5'>
            {/* 티켓 아이콘 스켈레톤 */}
            <div className='h-6 w-6 rounded bg-gray-400'></div>
            {/* 티켓 개수 스켈레톤 */}
            <div className='h-5 w-8 rounded bg-gray-400'></div>
          </div>
        </div>
        <div className='flex flex-col gap-1.5'>
          {/* 상품 이름 및 상태 스켈레톤 */}
          <div className='flex w-full justify-between'>
            <div className='h-7 w-4/5 rounded bg-gray-400'></div>
            <div className='h-7 w-1/6 rounded-full bg-gray-400'></div>
          </div>
          <div className='flex gap-1.5'>
            <div className='h-6 w-16 rounded-lg bg-gray-400'></div>
            <div className='h-6 w-20 rounded-lg bg-gray-400'></div>
          </div>
        </div>
        <div className='flex flex-col gap-2 pt-1'>
          {/* 현재가, 입찰 단위 스켈레톤 */}
          <div className='flex gap-4.5'>
            <div className='flex flex-col gap-2'>
              <div className='h-5 w-12 rounded bg-gray-400'></div>
              <div className='h-9 w-28 rounded bg-gray-400'></div>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='h-5 w-14 rounded bg-gray-400'></div>
              <div className='h-9 w-28 rounded bg-gray-400'></div>
            </div>
          </div>
          {/* 남은 시간, 참여 인원 스켈레톤 */}
          <div className='mt-1 flex flex-col gap-1.5'>
            <div className='h-5 w-32 rounded bg-gray-400'></div>
            <div className='flex items-center gap-1'>
              <div className='h-4.5 w-4.5 rounded-full bg-gray-400'></div>
              <div className='h-5 w-24 rounded bg-gray-400'></div>
            </div>
          </div>
        </div>
      </div>

      {/* 구분선 스켈레톤 */}
      <div className='h-4 w-full bg-gray-300'></div>

      {/* 상품 상세 정보 스켈레톤 */}
      <div className='mt-1.5 flex flex-col gap-4.5 bg-gray-50 px-5 pt-6'>
        {/* 등록일, 시작일, 종료일 스켈레톤 */}
        <div className='flex flex-col gap-2 text-sm font-medium'>
          <div className='h-4 w-48 rounded bg-gray-400'></div>
          <div className='h-4 w-48 rounded bg-gray-400'></div>
          <div className='h-4 w-48 rounded bg-gray-400'></div>
        </div>

        {/* 정보 카드 스켈레톤 (행사, 상품, 배송) */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className='gradient-border flex flex-col gap-3 rounded-[12px] border border-gray-200 p-4'
          >
            <div className='h-6 w-16 rounded bg-gray-400'></div>
            <div className='flex flex-col gap-2'>
              <div className='h-4 w-1/4 rounded bg-gray-400'></div>
              <div className='h-4 w-3/4 rounded bg-gray-400'></div>
              <div className='mt-1 h-4 w-1/2 rounded bg-gray-400'></div>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='h-4 w-1/5 rounded bg-gray-400'></div>
              <div className='h-4 w-full rounded bg-gray-400'></div>
              <div className='h-4 w-5/6 rounded bg-gray-400'></div>
            </div>
          </div>
        ))}

        {/* 하단 버튼 영역 스켈레톤 */}
        <div className='sticky right-0 bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-white py-9'>
          <div className='h-14 w-full rounded-lg bg-gray-400'></div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetailSkeleton;
