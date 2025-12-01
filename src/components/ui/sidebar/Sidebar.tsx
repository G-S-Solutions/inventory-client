'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import CompanyLogo from '@/assets/images/gs_logo.jpeg'
import { ContextMenu } from "@/types/user";

interface IProps {
  menus: ContextMenu[];
  companyName: string;
}

export const Sidebar = ({ menus, companyName }: IProps) => {
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const toggleDropdown = (menuId: string) => {
    setOpenDropdowns(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const renderMenuItem = (menu: ContextMenu, level: number = 0) => {
    const hasSubMenu = menu.subMenu && menu.subMenu.length > 0;
    const isOpen = openDropdowns.includes(menu.id);
    const paddingLeft = level > 0 ? `${(level + 1) * 1}rem` : '1rem';

    if (menu.type === 'link') {
      return (
        <li key={menu.id}>
          <Link 
            href={menu.path}
            className='block px-4 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-gray-100 dark:text-gray-200'
            style={{ paddingLeft }}
          >
            {menu.name}
          </Link>
          
          {/* Renderizar submenús recursivamente */}
          {hasSubMenu && (
            <ul className='mt-1 space-y-1'>
              {menu.subMenu!.map(subMenu => renderMenuItem(subMenu, level + 1))}
            </ul>
          )}
        </li>
      );
    }

    if (menu.type === 'dropdown') {
      return (
        <li key={menu.id}>
          <button
            onClick={() => toggleDropdown(menu.id)}
            className='w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-gray-100 dark:text-gray-200'
            style={{ paddingLeft }}
          >
            <span>{menu.name}</span>
            <svg 
              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Renderizar submenús cuando está abierto */}
          {isOpen && hasSubMenu && (
            <ul className='mt-2 space-y-1'>
              {menu.subMenu!.map(subMenu => renderMenuItem(subMenu, level + 1))}
            </ul>
          )}
        </li>
      );
    }

    return null;
  };

  // Separar menús por posición
  const sortedMenus = menus.sort((a, b) => a.order - b.order);
  return (
    <div className='h-full bg-gray-900 dark:bg-gray-800 text-white flex flex-col'>
      {/* Logo y nombre de empresa */}
      <div className='p-6 border-b border-gray-700 dark:border-gray-600'>
        <div className='flex flex-col items-center gap-3'>
          <div className='w-20 h-20 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden'>
            <Image 
              src={CompanyLogo} 
              alt="Logo empresa" 
              width={80} 
              height={80}
              className="object-contain"
            />
          </div>
          <h2 className='text-xl font-bold text-center text-gray-100 dark:text-gray-200'>{companyName}</h2>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800'>
        {/* Menús superiores */}
        <ul className='space-y-2'>
          {sortedMenus.map(menu => renderMenuItem(menu))}
        </ul>

      </nav>
    </div>
  );
};