export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 px-6'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-gray-600 dark:text-gray-400'>
        <p>
          © {currentYear} Wcv Company. Todos los derechos reservados.
        </p>
        <p className='hidden md:block text-right'>
          Este sistema es de uso exclusivo para personal autorizado.
        </p>
      </div>
    </footer>
  );
};