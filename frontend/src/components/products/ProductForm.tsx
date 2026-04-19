import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Product } from '../../types/inventory';
import { useInventory } from '../../context/InventoryContext';

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const { suppliers } = useInventory();
  const initialFormData = {
    name: '',
    price: '',
    sellingPrice: '',
    quantity: '',
    supplierId: '',
    description: ''
  };
  const [formData, setFormData] = useState({
    ...initialFormData
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name ?? '',
        price: (product.price ?? '').toString(),
        sellingPrice: (product.sellingPrice ?? '').toString(),
        quantity: (product.quantity ?? (product as any).stock ?? '').toString(),
        supplierId: product.supplierId ?? (product as any).supplier_id ?? '',
        description: product.description ?? ''
      });
    } else {
      setFormData(initialFormData);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const price = Number(formData.price);
    const sellingPrice = Number(formData.sellingPrice);
    const quantity = Number(formData.quantity);

    onSubmit({
      name: formData.name,
      sku: '',
      category: '',
      price,
      sellingPrice,
      cost: 0,
      quantity,
      minStock: 0,
      supplierId: formData.supplierId,
      description: formData.description
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[var(--on-surface)]">
          {product ? 'Edit Product' : 'Add New Product'}
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
          <label className="block text-sm font-medium text-[var(--on-surface-low)] mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-main)] text-[var(--on-surface)] rounded-lg focus:ring-2 focus:ring-[#BDF4FF] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--on-surface-low)] mb-2">Supplier</label>
          <select
            name="supplierId"
            value={formData.supplierId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-main)] text-[var(--on-surface)] rounded-lg focus:ring-2 focus:ring-[#BDF4FF] focus:border-transparent"
          >
            <option value="">Select a supplier</option>
            {suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--on-surface-low)] mb-2">Cost Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            step="0.01"
            className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-main)] text-[var(--on-surface)] rounded-lg focus:ring-2 focus:ring-[#BDF4FF] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--on-surface-low)] mb-2">Selling Price (₹)</label>
          <input
            type="number"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
            required
            step="0.01"
            className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-main)] text-[var(--on-surface)] rounded-lg focus:ring-2 focus:ring-[#BDF4FF] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--on-surface-low)] mb-2">Stock</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-main)] text-[var(--on-surface)] rounded-lg focus:ring-2 focus:ring-[#BDF4FF] focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[var(--on-surface-low)] mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--bg-main)] text-[var(--on-surface)] rounded-lg focus:ring-2 focus:ring-[#BDF4FF] focus:border-transparent"
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
            className="px-4 py-2 bg-[#BDF4FF] text-[#17004b] rounded-lg hover:bg-[#9BE8FF] transition-colors duration-200 shadow-sm"
          >
            {product ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};