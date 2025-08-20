import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/shared/ui';
import { useEffect, useState } from 'react';

interface Props {
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuctionProductCarousel = ({ setShowOverlay }: Props) => {
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

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className='w-full'>
      <div
        className='relative'
        onClick={() => {
          setShowOverlay(true);
        }}
      >
        <Carousel setApi={setApi}>
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className='aspect-[3/2] bg-gray-200'>
                  <img
                    src={src}
                    alt={`${index + 1}번째 상품`}
                    className='h-full w-full object-cover'
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <span className='absolute right-5 bottom-2 text-xs font-medium text-gray-800'>
          이미지를 터치해서 다시 스토리를 볼 수 있어요.
        </span>
      </div>
      <div className='mt-2 flex justify-center gap-1'>
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

export default AuctionProductCarousel;
