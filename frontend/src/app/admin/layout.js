import AdminLayout from './components/AdminLayout'

export const metadata = {
  title: 'Admin Panel | Your Website',
  description: 'Website administration panel',
}

export default function Layout({ children }) {
  return <AdminLayout>{children}</AdminLayout>
}