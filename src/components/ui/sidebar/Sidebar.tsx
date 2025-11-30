export const Sidebar = () => {
  return (
    <div className='h-full bg-gray-900 text-white p-4'>
      <div className='mb-8'>
        <h2 className='text-xl font-bold'>Mi App</h2>
      </div>
      <nav>
        <ul className='space-y-2'>
          <li className='hover:bg-gray-800 p-2 rounded cursor-pointer'>Dashboard</li>
          <li className='hover:bg-gray-800 p-2 rounded cursor-pointer'>Productos</li>
          <li className='hover:bg-gray-800 p-2 rounded cursor-pointer'>Inventario</li>
          <li className='hover:bg-gray-800 p-2 rounded cursor-pointer'>Reportes</li>
        </ul>
      </nav>
    </div>
  );
};