/* =========================
   FILE: app/admin/services/page.jsx
========================= */

"use client";

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
  clearError
} from "../../../../store/slice/serviceSlice";
import DataTable from "../components/DataTable";
import ServiceFormModal from "../components/ServiceFormModal";
import ExportButtons from "../components/ExportButtons";
import DashboardHeader from "../components/DashboardHeader";
import StatsCards from "../components/StatsCards";
import ConfirmationModal from "../components/ConfirmationModal";
import ToastNotification from "../components/ToastNotification";

export default function AdminServicesPage() {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.service);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setToastMessage(error);
      setToastType("error");
      setShowToast(true);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Filter services based on search
  const filteredServices = useMemo(() => {
    if (!search) return services;

    return services.filter(service =>
      service.title?.toLowerCase().includes(search.toLowerCase()) ||
      service.description?.toLowerCase().includes(search.toLowerCase()) ||
      service.features?.some(feature =>
        feature.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [services, search]);

  // Sort services
  const sortedServices = useMemo(() => {
    let sortableItems = [...filteredServices];

    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableItems;
  }, [filteredServices, sortConfig]);

  // Paginate services
  const paginatedServices = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedServices.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedServices, currentPage]);

  const totalPages = Math.ceil(sortedServices.length / itemsPerPage);

  // Handle sort
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Handle delete
  const handleDelete = () => {
    if (deleteConfirm) {
      dispatch(deleteService(deleteConfirm._id));
      setDeleteConfirm(null);
      setToastMessage("Service deleted successfully!");
      setToastType("success");
      setShowToast(true);
    }
  };

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    if (editingService) {
      await dispatch(updateService({
        id: editingService._id,
        updatedData: formData
      }));
      setToastMessage("Service updated successfully!");
    } else {
      await dispatch(createService(formData));
      setToastMessage("Service created successfully!");
    }
    setToastType("success");
    setShowToast(true);
    setIsModalOpen(false);
    setEditingService(null);
  };

  const columns = [
    {
      key: 'title',
      label: 'Service',
      sortable: true,
      render: (service) => (
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg shadow-sm"
            style={{
              background: service.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            {service.icon || '🔧'}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{service.title}</h3>
            <p className="text-sm text-gray-500 truncate max-w-xs">
              {service.description}
            </p>
          </div>
        </div>
      )
    },
    {
      key: 'features',
      label: 'Features',
      render: (service) => (
        <div className="flex flex-wrap gap-1">
          {service.features?.slice(0, 3).map((feature, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {feature}
            </span>
          ))}
          {service.features?.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{service.features.length - 3} more
            </span>
          )}
        </div>
      )
    },
    {
      key: 'fullDescription',
      label: 'Description',
      render: (service) => (
        <div className="max-w-xs">
          <p className="text-sm text-gray-600 line-clamp-2">
            {service.fullDescription}
          </p>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (service) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setEditingService(service);
              setIsModalOpen(true);
            }}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button
            onClick={() => setDeleteConfirm(service)}
            className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm font-medium transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        title="Services Management"
        onAddClick={() => {
          setEditingService(null);
          setIsModalOpen(true);
        }}
      />

      <div className="p-6 max-w-7xl mx-auto">
        <StatsCards
          totalServices={services.length}
          activeServices={services.length}
          featuredServices={services.filter(s => s.featured).length}
        />

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search services by title, description, or features..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <ExportButtons data={services} />
          </div>

          <DataTable
            columns={columns}
            data={paginatedServices}
            loading={loading}
            sortConfig={sortConfig}
            onSort={requestSort}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={sortedServices.length}
          />
        </div>
      </div>

      <ServiceFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingService(null);
        }}
        service={editingService}
        onSubmit={handleFormSubmit}
        loading={loading}
      />

      <ConfirmationModal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleDelete}
        title="Delete Service"
        message={`Are you sure you want to delete "${deleteConfirm?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmColor="red"
        loading={loading}
      />

      <ToastNotification
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}