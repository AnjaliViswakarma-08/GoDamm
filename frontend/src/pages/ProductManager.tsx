import React, { useState } from 'react';
import { Plus, Box } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { ProductTable } from '../components/products/ProductTable';
import { ProductForm } from '../components/products/ProductForm';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { Product } from '../types/inventory';

export const ProductManager: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useInventory();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormError(null);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setFormError(null);
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormSubmit = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    setFormError(null);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await addProduct(productData);
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Failed to save product:', error);
      setFormError('Could not save product. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormError(null);
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleDeleteClick = (id: string) => {
    const selectedProduct = products.find((product) => product.id === id) || null;
    setDeletingProduct(selectedProduct);
  };

  const handleConfirmDelete = async () => {
    if (!deletingProduct) {
      return;
    }

    try {
      await deleteProduct(deletingProduct.id);
    } catch (error) {
      console.error('Failed to delete product:', error);
      setFormError('Could not delete product. Please try again.');
    } finally {
      setDeletingProduct(null);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#BDF4FF] to-transparent rounded-full opacity-50"></div>
          <div className="flex items-center gap-2 text-[#BDF4FF] mb-2">
            <Box className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Module: Products</span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-[#DFE2F3] uppercase">
            Product <span className="text-[#BDF4FF] neon-text-secondary">Management</span>
          </h2>
        </div>

        <button
          onClick={handleAddProduct}
          className="btn-primary flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-5 h-5" />
          <span>ADD NEW PRODUCT</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="relative">
        {showForm ? (
          <div className="glass-card p-8 border-[rgba(205,189,255,0.1)] relative z-20">
            {formError && (
              <div className="mb-4 rounded-lg border border-[rgba(255,68,68,0.2)] bg-[rgba(255,68,68,0.08)] px-4 py-3 text-sm font-medium text-red-300">
                {formError}
              </div>
            )}
            <ProductForm
              product={editingProduct}
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
            />
          </div>
        ) : (
          <div className="glass-card border-[rgba(255,255,255,0.03)] overflow-hidden">
            <div className="bg-[rgba(255,255,255,0.02)] px-6 py-4 border-b border-[rgba(255,255,255,0.05)] flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#CBC3D9] uppercase tracking-[0.2em]">Product List</span>
              <span className="text-[10px] font-bold text-[#BDF4FF] bg-[rgba(189,244,255,0.1)] px-2 py-0.5 rounded-full ring-1 ring-[#BDF4FF]/20">{products.length} PRODUCTS</span>
            </div>
            <ProductTable
              products={products}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={Boolean(deletingProduct)}
        title="Are you sure?"
        message={deletingProduct ? `Delete product \"${deletingProduct.name}\"?` : 'Are you sure?'}
        onCancel={() => setDeletingProduct(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};