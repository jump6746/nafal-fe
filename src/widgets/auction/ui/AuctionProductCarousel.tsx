import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/shared/ui';
import { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

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
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleImageClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOverlay(true);
  };

  return (
    <div className='w-full'>
      <div className='relative'>
        <Carousel setApi={setApi}>
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div
                  className='group relative aspect-[3/2] cursor-pointer bg-gray-200'
                  onClick={e => handleImageClick(e, index)}
                >
                  <img
                    src={src}
                    alt={`${index + 1}번째 상품`}
                    className='h-full w-full object-cover'
                  />
                  {/* 호버 시 확대 표시 */}
                  <div className='absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                    <div className='rounded-full bg-white/90 p-2'>
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M13.5 10.5H7.5M10.5 7.5V13.5'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* 정보 버튼 */}
        <button
          onClick={handleInfoClick}
          className='absolute top-3 right-3 rounded-full p-2 text-black transition-colors duration-200 hover:bg-black/70'
        >
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
            <line x1='12' y1='16' x2='12' y2='12' stroke='currentColor' strokeWidth='2' />
            <circle cx='12' cy='8' r='1' fill='currentColor' />
          </svg>
        </button>
        <span className='absolute bottom-2 left-5 rounded bg-black/50 px-2 py-1 text-xs font-medium text-white'>
          이미지를 터치해서 원본을 볼 수 있어요.
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

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={images.map(src => ({ src }))}
        carousel={{ finite: true }}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
        render={{
          buttonPrev: images.length <= 1 ? () => null : undefined,
          buttonNext: images.length <= 1 ? () => null : undefined,
        }}
      />
    </div>
  );
};

export default AuctionProductCarousel;
