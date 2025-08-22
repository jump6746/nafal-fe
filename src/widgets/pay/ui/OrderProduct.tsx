interface OrderProductProps {
  imageUrl: string;
  productName: string;
  sellerName: string;
  amount: number;
}

const OrderProduct = ({ imageUrl, productName, sellerName, amount }: OrderProductProps) => {
  return (
    <div className='flex flex-col gap-5'>
      <h2 className='text-2xl font-bold text-gray-800'>주문상품</h2>
      <div className='flex flex-col gap-4'>
        <img
          src={imageUrl}
          alt={productName}
          className='aspect-[100/53] w-full rounded-xl object-cover'
        />
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col'>
            <span className='text-base font-semibold text-gray-900'>{sellerName}</span>
            <span className='text-sm font-medium text-gray-900'>{productName}</span>{' '}
          </div>
          <div className='flex flex-row items-center gap-[10px]'>
            <span className='text-xs font-medium text-gray-600'>낙찰가</span>
            <span className='text-base font-semibold text-gray-900'>
              {amount.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProduct;
