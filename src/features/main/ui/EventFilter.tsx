import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  DrawerPortal,
} from '@/shared/ui/Drawer/Drawer';

interface EventFilterProps {
  event: string[];
  addEvent: (newEvent: string) => void;
  removeEvent: (eventToRemove: string) => void;
}

const EVENTS = [
  '라이프집 두 번째 오프라인 팝업 집들2',
  "카누 팝업스토어 'KANU House'",
  '성균관대 디자인과제전',
  '서울대 미술대 동문전',
  '한예종 조형예술전',
  '홍익대 예술대 졸업작품전',
  '이화여대 패션과제전',
];

const EventFilter = ({ event, addEvent, removeEvent }: EventFilterProps) => {
  const handleEventClick = (eventName: string) => {
    if (event.includes(eventName)) {
      removeEvent(eventName);
    } else {
      addEvent(eventName);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className='flex w-fit shrink-0 items-center gap-[2px] rounded-full bg-gray-100 px-3 py-[6px] whitespace-nowrap'>
          이벤트 <img src='images/Icons/caret_down_sm.svg' alt='caret_down' className='h-6 w-6' />
        </button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerContent className='!fixed !right-0 !bottom-0 !left-0 !mx-auto !w-full !max-w-[450px] !min-w-[320px] data-[vaul-drawer-direction=bottom]:!h-[40vh] [&>div:first-child]:!hidden'>
          <DrawerHeader>
            <span className='font-semibold text-gray-800'>행사명</span>
          </DrawerHeader>
          <div className='flex h-full max-h-[calc(40vh-60px)] flex-col gap-4 p-4'>
            <div className='flex flex-col gap-2 overflow-y-auto px-1'>
              {EVENTS.map(eventName => (
                <button
                  key={eventName}
                  onClick={() => handleEventClick(eventName)}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    event.includes(eventName)
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {eventName}
                </button>
              ))}
            </div>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default EventFilter;
