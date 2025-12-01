export const MainLoader = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50'>
      <div className='flex flex-row gap-2'>
        <div className='w-4 h-4 rounded-full bg-red-500 animate-bounce'></div>
        <div className='w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]'></div>
        <div className='w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]'></div>
      </div>
    </div>
  );
};
