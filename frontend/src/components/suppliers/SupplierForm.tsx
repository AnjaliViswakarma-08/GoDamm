import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Supplier } from '../../types/inventory';

interface SupplierFormProps {
  supplier?: Supplier | null;
  onSubmit: (supplier: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const SupplierForm: React.FC<SupplierFormProps> = ({ supplier, onSubmit, onCancel }) => {
  const initialFormData = {
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: ''
  };
  const [formData, setFormData] = useState({
    ...initialFormData
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name,
        contactPerson: supplier.contactPerson,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address
      });
    } else {
      setFormData(initialFormData);
    }
  }, [supplier]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[var(--on-surface)]">
          {supplier ? 'Edit Supplier' : 'Add New Supplier'}
        </h3>
        <button
          onClick={onCancel}
          className="text-[var(--on-surface-low)] hover:text-[var(--on-surface)] transition-colors duration-150"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[var(--on-surface-low)] mb-2">Company Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-main)] text-[var(--on-surface)] rounded-lg focus:ring-2 focus:ring-[#FFABF3] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--on-surface-low)] mb-2">Contact Person</label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-main)] text-[var(--on-surface)] rounded-lg focus:ring-2 focus:ring-[#FFABF3] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--on-surface-low)] mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-main)] text-[var(--on-surface)] rounded-lg focus:ring-2 focus:ring-[#FFABF3] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--on-surface-low)] mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-main)] text-[var(--on-surface)] rounded-lg focus:ring-2 focus:ring-[#FFABF3] focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[var(--on-surface-low)] mb-2">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-main)] text-[var(--on-surface)] rounded-lg focus:ring-2 focus:ring-[#FFABF3] focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2 flex justify-end space-x-3 pt-4 border-t border-[var(--border)]">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-[var(--on-surface)] border border-[var(--border)] rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#FFABF3] text-[#380038] rounded-lg hover:bg-[#FF8AE8] transition-colors duration-200 shadow-sm"
          >
            {supplier ? 'Update Supplier' : 'Add Supplier'}
          </button>
        </div>
      </form>
    </div>
  );
};