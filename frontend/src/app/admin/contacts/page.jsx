
'use client'

import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchContacts } from '../../../../store/slice/contactSlice'

import {
  Search,
  Filter,
  Mail,
  Phone,
  User,
  Calendar,
  Eye,
  Star,
  CheckCircle,
  Archive,
  Clock,
  Loader2
} from 'lucide-react'

import DataTable from '../components/DataTable' // ✅ YOUR EXISTING COMPONENT
import ToastNotification from '../components/ToastNotification'

/* =====================================================
   STATUS BADGE
===================================================== */
function StatusBadge({ status = 'new' }) {
  const config = {
    new: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Star, label: 'New' },
    read: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Read' },
    archived: { bg: 'bg-gray-100', text: 'text-gray-800', icon: Archive, label: 'Archived' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'Pending' }
  }

  const { bg, text, icon: Icon, label } = config[status] || config.new

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
      <Icon size={12} />
      {label}
    </span>
  )
}

/* =====================================================
   MAIN PAGE
===================================================== */
export default function ContactsPage() {
  const dispatch = useDispatch()

  const {
    contacts = [],
    pagination,
    adminLoading,
    adminError
  } = useSelector((s) => s.contact)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' })
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const itemsPerPage = 10

  /* ================= FETCH CONTACTS ================= */
  useEffect(() => {
    dispatch(
      fetchContacts({
        page,
        limit: itemsPerPage,
        search,
        status: statusFilter
      })
    )
  }, [dispatch, page, search, statusFilter])

  useEffect(() => {
    if (adminError) {
      setToast({ show: true, message: adminError, type: 'error' })
    }
  }, [adminError])

  /* ================= MAP BACKEND DATA ================= */
  const mappedContacts = useMemo(() => {
    return contacts.map((c) => ({
      ...c,
      name: c.fullName // 🔥 backend → UI mapping
    }))
  }, [contacts])

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      key: 'name',
      label: 'Contact Person',
      render: (c) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <User className="text-blue-600" size={18} />
          </div>
          <div>
            <p className="font-medium">{c.name}</p>
            <p className="text-sm text-gray-500">{c.email}</p>
          </div>
        </div>
      )
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (c) => (
        <div className="flex items-center gap-1 text-sm">
          <Phone className="w-4 h-4 text-gray-400" />
          {c.phone || '—'}
        </div>
      )
    },
    {
      key: 'message',
      label: 'Message',
      render: (c) => (
        <p className="max-w-xs truncate text-sm text-gray-600">
          {c.message}
        </p>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (c) => <StatusBadge status={c.status} />
    },
    {
      key: 'createdAt',
      label: 'Received',
      render: (c) => (
        <div className="text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-gray-400" />
            {new Date(c.createdAt).toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-500">
            {new Date(c.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'View',
      sortable: false,
      render: (c) => (
        <button className="text-blue-600 hover:underline flex items-center gap-1">
          <Eye size={16} /> View
        </button>
      )
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Contact Enquiries</h1>

      {/* SEARCH & FILTER */}
      <div className="flex gap-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="border px-4 py-2 rounded w-full"
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value)
            setPage(1)
          }}
          className="border px-4 py-2 rounded"
        >
          <option value="">All</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* DATATABLE (REUSABLE COMPONENT) */}
      <DataTable
        columns={columns}
        data={mappedContacts}
        loading={adminLoading}
        sortConfig={sortConfig}
        onSort={(key) =>
          setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
          }))
        }
        currentPage={pagination?.page || 1}
        totalPages={pagination?.totalPages || 1}
        onPageChange={setPage}
        totalItems={pagination?.total || 0}
        itemsPerPage={itemsPerPage}
      />

      {/* TOAST */}
      <ToastNotification
        isVisible={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((p) => ({ ...p, show: false }))}
      />
    </div>
  )
}
