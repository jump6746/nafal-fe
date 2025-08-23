import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

interface Props {
  pos?: string;
  setPos: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const StatusDropDown = ({ pos, setPos }: Props) => {
  if (pos) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type='button'
          className='flex w-fit cursor-pointer gap-0.5 rounded-full bg-gray-100 px-3 py-1.5'
        >
          <img src='/images/Icons/add.svg' alt='추가' />
          <span>상태</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-20 pt-1'>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={pos} onValueChange={setPos} className=''>
          <DropdownMenuRadioItem
            value='top'
            className='flex cursor-pointer justify-center rounded-t-sm bg-gray-100 py-1.5'
          >
            최상
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value='bottom'
            className='flex cursor-pointer justify-center bg-gray-100 py-1.5'
          >
            중
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value='right'
            className='flex cursor-pointer justify-center rounded-b-sm bg-gray-100 py-1.5'
          >
            하
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropDown;
