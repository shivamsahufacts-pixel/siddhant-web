/* =========================
   FILE: app/admin/services/components/ExportButtons.jsx
========================= */

import { useRef } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ExportButtons({ data }) {
  const downloadRef = useRef();

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((item) => ({
        Title: item.title,
        "Short Description": item.description,
        "Full Description": item.fullDescription,
        Features: item.features?.join(", "),
        Icon: item.icon,
        Gradient: item.gradient,
        "Created At": new Date(item.createdAt).toLocaleDateString(),
        "Updated At": new Date(item.updatedAt).toLocaleDateString(),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Services");
    XLSX.writeFile(workbook, `services_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.setTextColor(30, 64, 175);
    doc.text("Services Report", 105, 20, { align: 'center' });

    // Subtitle
    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 30, { align: 'center' });

    // Stats
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text(`Total Services: ${data.length}`, 14, 45);

    // Table
    const tableData = data.map((item) => [
      item.title,
      item.description?.substring(0, 50) + (item.description?.length > 50 ? '...' : ''),
      item.features?.slice(0, 3).join(", "),
      item.gradient ? "✓" : "✗",
    ]);

    doc.autoTable({
      head: [['Service Name', 'Description', 'Features', 'Gradient']],
      body: tableData,
      startY: 55,
      theme: 'grid',
      headStyles: {
        fillColor: [30, 64, 175],
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold'
      },
      bodyStyles: { fontSize: 9 },
      alternateRowStyles: { fillColor: [249, 250, 251] },
      margin: { top: 55 },
    });

    doc.save(`services_report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const exportToCSV = () => {
    const headers = ["Title", "Description", "Full Description", "Features", "Icon", "Gradient"];

    const csvData = [
      headers,
      ...data.map(item => [
        `"${item.title}"`,
        `"${item.description}"`,
        `"${item.fullDescription}"`,
        `"${item.features?.join('; ')}"`,
        `"${item.icon}"`,
        `"${item.gradient}"`
      ])
    ];

    const csvContent = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = downloadRef.current;
    link.href = url;
    link.download = `services_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={exportToExcel}
        className="px-4 py-2.5 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 text-sm font-medium flex items-center gap-2 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export Excel
      </button>
      <button
        onClick={exportToPDF}
        className="px-4 py-2.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium flex items-center gap-2 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export PDF
      </button>
      <button
        onClick={exportToCSV}
        className="px-4 py-2.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 text-sm font-medium flex items-center gap-2 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export CSV
      </button>
      <a ref={downloadRef} className="hidden" download />
    </div>
  );
}