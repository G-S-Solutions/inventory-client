interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className='bg-white border-b border-gray-200 p-4 flex items-center gap-4'>
      {/* Botón hamburguesa solo en mobile */}
      <button 
        onClick={onMenuClick}
        className='lg:hidden p-2 hover:bg-gray-100 rounded'
      >
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
        </svg>
      </button>
      <h1 className='text-xl font-semibold'>Header</h1>
    </header>
  );
};