import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  DrawerPortal,
  DrawerTitle,
  DrawerDescription,
} from '@/shared/ui/Drawer/Drawer';
import type { EventItem } from '@/entities/auction/type/types';

interface EventFilterProps {
  eventList: EventItem[];
  event: string[];
  addEvent: (newEvent: string) => void;
  removeEvent: (eventToRemove: string) => void;
}

const EventFilter = ({
  eventList,
  event: selectedEvents,
  addEvent,
  removeEvent,
}: EventFilterProps) => {
  const handleEventClick = (eventName: string) => {
    if (selectedEvents.includes(eventName)) {
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
        <DrawerContent className='!fixed !right-0 !bottom-0 !left-0 !mx-auto !w-full !max-w-[450px] !min-w-[320px] data-[vaul-drawer-direction=bottom]:!h-[45vh] [&>div:first-child]:!hidden'>
          <DrawerHeader>
            <DrawerTitle>
              <span className='font-semibold text-gray-800'>행사명</span>
            </DrawerTitle>
            <DrawerDescription>관심있는 행사를 골라보세요.</DrawerDescription>
          </DrawerHeader>
          <div className='flex h-full max-h-[calc(40vh-60px)] flex-col gap-4 p-4'>
            <div className='flex flex-col gap-2 overflow-y-auto px-1'>
              {eventList.map(event => (
                <button
                  key={event.id}
                  onClick={() => handleEventClick(event.name)}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    selectedEvents.includes(event.name)
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {event.name}
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
