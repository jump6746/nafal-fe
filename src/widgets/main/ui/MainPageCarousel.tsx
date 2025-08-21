import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  type CarouselApi,
} from '@/shared/ui/Carousel/carousel';
import CountdownTimer from '../../../features/auction/CountdownTimer';

const Dummy = [
  {
    url: '/images/Dummy/MainPage/1.png',
    description: '성수동 그 팝업',
    productName: 'KANU 원두 에디션 텀블러',
    endAt: '2025-08-24T18:00:00',
    auctionId: 1,
  },
  {
    url: '/images/Dummy/MainPage/2.jpg',
    description: '한강 뷰 한정판',
    productName: '스타벅스 리저브 텀블러',
    endAt: '2025-08-25T12:00:00',
    auctionId: 2,
  },
  {
    url: '/images/Dummy/MainPage/3.jpg',
    description: '서울숲 특별 이벤트',
    productName: '루이비통 머그컵',
    endAt: '2025-08-26T09:00:00',
    auctionId: 3,
  },
];

const MainPageCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className='w-full'>
      <Carousel setApi={setApi} className='w-full' opts={{ loop: true }}>
        <CarouselContent>
          {Dummy.map((_, index) => (
            <CarouselItem key={index}>
              <div className='relative h-[294px] w-full'>
                <div className='rounded-smpx-2 absolute top-2 right-5 flex items-center gap-1 py-1 text-lg font-semibold text-gray-800'>
                  <span>남은 시간</span>
                  <CountdownTimer endDate={Dummy[index].endAt} />
                </div>
                <img
                  src={Dummy[index].url}
                  alt={Dummy[index].description}
                  className='h-full w-full object-cover'
                />
                <div className='absolute right-0 bottom-0 left-0 h-3/7 bg-gradient-to-t from-black/75 to-transparent' />
                <div className='absolute right-0 bottom-0 left-0 flex h-1/2 flex-col gap-1 px-5 pt-10 text-2xl font-semibold text-white'>
                  <span>{Dummy[index].description}</span>
                  <span>{Dummy[index].productName}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* 캐러샐 인덱스 도트 */}
      <div className='my-4 flex justify-center gap-2'>
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index + 1 === current ? 'w-6 bg-gray-800' : 'w-2 bg-gray-300 hover:bg-gray-500'
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MainPageCarousel;
