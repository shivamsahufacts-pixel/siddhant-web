'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  ChevronLeft,
  ChevronRight,
  User,
  X,
  Shield,
  Contact
} from 'lucide-react'

const menuItems = [
  { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
  { name: 'Projects', icon: <FolderKanban size={20} />, path: '/admin/projects' },
  { name: 'Services', icon: <Users size={20} />, path: '/admin/services' },
  { name: 'Contacts', icon: <Contact size={20} />, path: '/admin/contacts' }
]

export default function AdminSidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen
}) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          h-[100vh] w-64
          flex flex-col
          transition-all duration-300
          ${collapsed ? 'lg:w-20 -translate-x-full lg:translate-x-0' : 'translate-x-0'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-gradient-to-b from-gray-900 to-gray-800 text-white
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 shrink-0">
          {!collapsed ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Shield size={20} />
              </div>
              <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>
          ) : (
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mx-auto">
              <Shield size={20} />
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center w-8 h-8 bg-gray-700 rounded-lg hover:bg-gray-600"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-gray-700 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <User size={20} />
            </div>
            {!collapsed && (
              <div>
                <p className="font-semibold">Admin User</p>
                <p className="text-sm text-gray-400">Administrator</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation (SCROLL ONLY HERE) */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center space-x-3 px-3 py-3 rounded-lg transition-all
                    ${pathname === item.path
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'hover:bg-gray-700 text-gray-300'}
                  `}
                >
                  {item.icon}
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Close Button */}
        <div className="lg:hidden p-4 border-t border-gray-700 shrink-0">
          <button
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-full p-2 bg-gray-700 rounded-lg hover:bg-gray-600"
          >
            <X size={20} />
            <span className="ml-2">Close Menu</span>
          </button>
        </div>
      </aside>
    </>
  )
}
