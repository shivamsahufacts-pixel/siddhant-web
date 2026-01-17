'use client'

import { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

export default function AdminLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      {/* Right Content */}
      <div
        className={`
          flex flex-col flex-1 h-full transition-all duration-300
          ${sidebarCollapsed ? 'lg:ml-4' : 'lg:ml-6'}
        `}
      >
        {/* Header (FIXED HEIGHT) */}
        <AdminHeader setMobileMenuOpen={setMobileMenuOpen} />

        {/* Scrollable Content ONLY */}
        <main className="flex-1 overflow-y-auto ">
          {children}
        </main>
      </div>
    </div>
  )
}
