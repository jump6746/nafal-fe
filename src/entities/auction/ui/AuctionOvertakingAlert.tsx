const AuctionOvertakingAlert = () => {
  return (
    <div className='flex w-full items-center gap-3'>
      <div className='h-[1px] flex-1 bg-gradient-to-r from-white to-black' />
      <span className='text-sub-a-400 text-sm font-semibold whitespace-nowrap'>
        순식간에 추월당했어요. 조금만 더 힘내볼까요?
      </span>
      <div className='h-[1px] flex-1 bg-gradient-to-r from-black to-white' />
    </div>
  );
};

export default AuctionOvertakingAlert;
