import { useState } from 'react';
import { Button } from '@/shared/ui';
import { Command, CommandGroup, CommandItem, CommandList } from '@/shared/ui/command/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover/popover';

interface SortCategoryProps {
  updateSort: (sort: string) => void;
  sort: string;
  sortOptions: string[];
}

const SortCategory = ({ sort, updateSort, sortOptions }: SortCategoryProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className='p-0'>
        <Button
          variant='default'
          role='combobox'
          aria-expanded={open}
          className='w-fit justify-end bg-white text-base font-semibold text-gray-800 hover:bg-gray-50'
        >
          {sort}
          <img src='images/Icons/caret_down_sm.svg' alt='caret_down' className='h-6 w-6' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='mx-5 mt-2 w-[145px] border-gray-200 p-0 shadow-none'>
        <Command>
          <CommandList>
            <CommandGroup>
              {sortOptions.map(Sort => (
                <CommandItem
                  key={Sort}
                  value={Sort}
                  onSelect={currentValue => {
                    updateSort(currentValue);
                    setOpen(false);
                  }}
                  className={`py-3 text-left text-base font-normal data-[selected=true]:bg-transparent ${
                    sort === Sort
                      ? 'text-point-500 data-[selected=true]:text-point-500 font-medium'
                      : 'font-normal text-gray-900 data-[selected=true]:text-gray-900'
                  } `}
                >
                  {Sort}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SortCategory;
