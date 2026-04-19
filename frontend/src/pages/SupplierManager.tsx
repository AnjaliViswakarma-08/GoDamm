import React, { useState } from 'react';
import { Plus, Search, Users } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { SupplierTable } from '../components/suppliers/SupplierTable';
import { SupplierForm } from '../components/suppliers/SupplierForm';
import { ErrorDialog } from '../components/common/ErrorDialog';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { Supplier } from '../types/inventory';

interface SupplierManagerProps {
  onNavigateToProducts?: () => void;
}

export const SupplierManager: React.FC<SupplierManagerProps> = ({ onNavigateToProducts }) => {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier, supplierDeleteError, clearSupplierDeleteError, products, setFilterBySupplierId } = useInventory();
  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [deletingSupplier, setDeletingSupplier] = useState<Supplier | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setShowForm(true);
  };

  const handleFormSubmit = (supplierData: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingSupplier) {
      updateSupplier(editingSupplier.id, supplierData);
    } else {
      addSupplier(supplierData);
    }
    setShowForm(false);
    setEditingSupplier(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSupplier(null);
  };

  const handleDeleteClick = (id: string) => {
    const selectedSupplier = suppliers.find((supplier) => supplier.id === id) || null;
    setDeletingSupplier(selectedSupplier);
  };

  const handleConfirmDelete = async () => {
    if (!deletingSupplier) {
      return;
    }

    try {
      await deleteSupplier(deletingSupplier.id);
    } finally {
      setDeletingSupplier(null);
    }
  };

  const handleViewProducts = () => {
    if (supplierDeleteError?.supplierId) {
      setFilterBySupplierId(supplierDeleteError.supplierId);
      onNavigateToProducts?.();
    }
  };

  const getLinkedProducts = (): string[] => {
    if (!supplierDeleteError?.supplierId) return [];
    const linkedProducts = products.filter(
      product => product.supplierId === supplierDeleteError.supplierId
    );
    return linkedProducts.map(product => product.name);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#FFABF3] to-transparent rounded-full opacity-50"></div>
          <div className="flex items-center gap-2 text-[#FFABF3] mb-2">
            <Users className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Module: Suppliers</span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-[#DFE2F3] uppercase">
            Supplier <span className="text-[#FFABF3] drop-shadow-[0_0_8px_rgba(255,171,243,0.5)]">Management</span>
          </h2>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2 self-start md:self-auto !from-[#FFABF3] !to-[#8B5CF6] !text-[#380038]"
          style={{ boxShadow: '0 0 20px rgba(255, 171, 243, 0.4)' }}
        >
          <Plus className="w-5 h-5" />
          <span>ADD NEW SUPPLIER</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative group max-w-xl">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#CBC3D9] opacity-40 group-focus-within:opacity-100 group-focus-within:text-[#FFABF3] transition-all w-4 h-4" />
        <input
          type="text"
          placeholder="SEARCH SUPPLIERS BY NAME..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl focus:ring-1 focus:ring-[#FFABF3] focus:border-transparent outline-none text-sm font-bold tracking-wider placeholder:text-[#CBC3D9] placeholder:opacity-20 transition-all uppercase"
        />
      </div>

      {/* Main Content Area */}
      <div className="relative">
        {showForm ? (
          <div className="glass-card p-8 border-[rgba(255,171,243,0.1)] relative z-20">
            <SupplierForm
              supplier={editingSupplier}
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
            />
          </div>
        ) : (
          <div className="glass-card border-[rgba(255,255,255,0.03)] overflow-hidden">
             <div className="bg-[rgba(255,255,255,0.02)] px-6 py-4 border-b border-[rgba(255,255,255,0.05)] flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#CBC3D9] uppercase tracking-[0.2em]">Registered Suppliers</span>
                <span className="text-[10px] font-bold text-[#FFABF3] bg-[rgba(255,171,243,0.1)] px-2 py-0.5 rounded-full ring-1 ring-[#FFABF3]/20">{filteredSuppliers.length} SUPPLIERS</span>
             </div>
             <SupplierTable
               suppliers={filteredSuppliers}
               onEdit={handleEdit}
               onDelete={handleDeleteClick}
             />
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={Boolean(deletingSupplier)}
        title="Are you sure?"
        message={deletingSupplier ? `Delete supplier \"${deletingSupplier.name}\"?` : 'Are you sure?'}
        onCancel={() => setDeletingSupplier(null)}
        onConfirm={handleConfirmDelete}
      />

      <ErrorDialog
        isOpen={!!supplierDeleteError}
        onClose={clearSupplierDeleteError}
        title="Supplier Deletion Denied"
        message={supplierDeleteError?.message || ''}
        linkedProducts={getLinkedProducts()}
        onViewProducts={getLinkedProducts().length > 0 ? handleViewProducts : undefined}
      />
    </div>
  );
};