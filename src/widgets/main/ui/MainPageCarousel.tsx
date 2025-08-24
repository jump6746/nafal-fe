import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/shared/ui/Carousel/carousel';
import CountdownTimer from '../../../features/auction/CountdownTimer';
import { useNavigate } from 'react-router-dom';

const Dummy = [
  {
    url: '/images/Dummy/MainPage/1.webp',
    description: '손에서 느껴지는 향기',
    productName: '핸드 오브제 월 인센스 버너',
    endAt: '2025-08-30T03:00:00',
    auctionId: 1,
    link: 'auction/15/41',
  },
  {
    url: '/images/Dummy/MainPage/2.webp',
    description: '의자에 앉아 느끼는 품격',
    productName: '스케이트보드 데크 업사이클링 체어',
    endAt: '2025-08-31T06:00:00',
    auctionId: 2,
    link: 'auction/17/43',
  },
  {
    url: '/images/Dummy/MainPage/3.webp',
    description: '박스가 아니에요',
    productName: '인더스트리얼 패키지 이동형 스툴',
    endAt: '2025-08-28T09:00:00',
    auctionId: 3,
    link: 'auction/13/39',
  },
];

const MainPageCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const navigate = useNavigate();
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
            <CarouselItem key={index} onClick={() => navigate(Dummy[index].link)}>
              <div className='relative h-[294px] w-full'>
                <div className='rounded-smpx-2 absolute top-3 right-4 flex items-center gap-1 rounded-md bg-white/50 px-3 py-[2px] text-lg font-semibold text-black'>
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
