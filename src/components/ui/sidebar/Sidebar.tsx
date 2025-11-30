'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import CompanyLogo from '@/assets/images/gs_logo.jpeg'

export const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <div className='h-full bg-gray-900 text-white flex flex-col'>
      {/* Logo y nombre de empresa */}
      <div className='p-6 border-b border-gray-700'>
        <div className='flex flex-col items-center gap-3'>
          <div className='w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden'>
            <Image 
              src={CompanyLogo} 
              alt="Logo empresa" 
              width={80} 
              height={80}
              className="object-contain"
            />
          </div>
          <h2 className='text-xl font-bold text-center'>Wcv Company</h2>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800'>
        <ul className='space-y-2'>
          {/* Dashboard - Simple link */}
          <li>
            <Link 
              href="/dashboard"
              className='block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors'
            >
              Dashboard
            </Link>
          </li>

          {/* Usuarios - Simple link */}
          <li>
            <Link 
              href="/users"
              className='block px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors'
            >
              Usuarios
            </Link>
          </li>

          {/* Productos - Con dropdown */}
          <li>
            <button
              onClick={() => toggleDropdown('productos')}
              className='w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors'
            >
              <span>Productos</span>
              <svg 
                className={`w-4 h-4 transition-transform ${openDropdown === 'productos' ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown === 'productos' && (
              <ul className='mt-2 ml-4 space-y-1'>
                <li>
                  <Link 
                    href="/products"
                    className='block px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors'
                  >
                    Lista de Productos
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/products/categories"
                    className='block px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors'
                  >
                    Categorías
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/products/brands"
                    className='block px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors'
                  >
                    Marcas
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Inventario - Con dropdown */}
          <li>
            <button
              onClick={() => toggleDropdown('inventario')}
              className='w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors'
            >
              <span>Inventario</span>
              <svg 
                className={`w-4 h-4 transition-transform ${openDropdown === 'inventario' ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openDropdown === 'inventario' && (
              <ul className='mt-2 ml-4 space-y-1'>
                <li>
                  <Link 
                    href="/inventory"
                    className='block px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors'
                  >
                    Stock Actual
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/inventory/movements"
                    className='block px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors'
                  >
                    Movimientos
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/inventory/adjustments"
                    className='block px-4 py-2 text-sm rounded-lg hover:bg-gray-800 transition-colors'
                  >
                    Ajustes
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};