import MainLayout from '@/components/Layout/MainLayout'
import React from 'react'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <MainLayout>{children}</MainLayout>
  )
}

export default Layout