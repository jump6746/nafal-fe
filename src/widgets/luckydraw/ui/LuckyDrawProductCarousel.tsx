import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/shared/ui';
import { useEffect, useState } from 'react';

const LuckDrawProductCarousel = ({
  setLuckyDrawindex,
}: {
  setLuckyDrawindex: (index: number) => void;
}) => {
  const images = [
    '/images/mockup/image_kanu.png',
    '/images/mockup/image_kanu.png',
    '/images/mockup/image_kanu.png',
  ];

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    setLuckyDrawindex(api.selectedScrollSnap());
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
      setLuckyDrawindex(api.selectedScrollSnap());
    });
  }, [api, setLuckyDrawindex]);

  return (
    <div className='w-full'>
      <div className='relative'>
        <Carousel setApi={setApi}>
          <CarouselContent className='mr-5 ml-1'>
            {images.map((src, index) => (
              <CarouselItem key={index} className='basis-auto'>
                <div
                  className={`aspect-[3/2] w-70 overflow-hidden rounded-xl bg-gray-200 ${index > 0 && 'gradient-border'}`}
                >
                  <img
                    src={index < 1 ? src : '/images/BackGround/UnknownLuckydraw.jpg'}
                    alt={`${index + 1}번째 상품`}
                    className='h-full w-full object-cover'
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className='mt-4.5 flex justify-center gap-1'>
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 cursor-pointer rounded-full transition-all duration-300 ease-out ${
              index === current ? 'w-6 bg-gray-800' : 'w-2 bg-gray-300'
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default LuckDrawProductCarousel;
