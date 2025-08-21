interface MainPageNavProps {
  section: string;
  setSection: (section: string) => void;
}

const MainPageNav = ({ section, setSection }: MainPageNavProps) => {
  const sections = ['진행중', '예정', '종료'];

  return (
    <nav
      className='bg-point-300 flex h-[62px] items-end gap-2 px-4 text-lg font-semibold'
      role='tablist'
      aria-label='경매 상태'
    >
      {sections.map(sectionName => (
        <button
          key={sectionName}
          role='tab'
          aria-selected={section === sectionName}
          className={`h-10 flex-1 border-b-2 ${
            section === sectionName
              ? 'border-b-gray-900 text-gray-900'
              : 'border-b-transparent text-gray-400'
          }`}
          onClick={() => setSection(sectionName)}
        >
          {sectionName}
        </button>
      ))}
    </nav>
  );
};

export default MainPageNav;
