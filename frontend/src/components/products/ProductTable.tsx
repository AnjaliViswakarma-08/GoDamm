import React from 'react';
import { Product } from '../../types/inventory';
import { Package, Edit2, Trash2, ShieldCheck, Box } from 'lucide-react';

interface ProductTableProps {
  products: (Product & { supplierName?: string })[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
  if (products.length === 0) {
    return (
      <div className="glass-card p-16 text-center border-[rgba(255,255,255,0.03)] group">
        <div className="relative inline-block mb-6">
           <div className="absolute -inset-4 bg-[#CDBDFF] opacity-10 blur-xl rounded-full group-hover:opacity-20 transition-opacity"></div>
           <Package className="w-16 h-16 text-[#CDBDFF] mx-auto relative z-10" />
        </div>
        <h3 className="text-xl font-black text-[#DFE2F3] mb-2 uppercase tracking-tight">No Products</h3>
        <p className="text-[#CBC3D9] opacity-60">No products found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto selection:bg-[#BDF4FF] selection:text-[#17004b]">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-[rgba(255,255,255,0.05)]">
            <th className="px-6 py-4 text-left text-[10px] font-bold text-[#CBC3D9] uppercase tracking-[0.2em]">Name</th>
            <th className="px-6 py-4 text-left text-[10px] font-bold text-[#CBC3D9] uppercase tracking-[0.2em]">Description</th>
            <th className="px-6 py-4 text-left text-[10px] font-bold text-[#CBC3D9] uppercase tracking-[0.2em]">Cost</th>
            <th className="px-6 py-4 text-left text-[10px] font-bold text-[#CBC3D9] uppercase tracking-[0.2em]">MRP</th>
            <th className="px-6 py-4 text-left text-[10px] font-bold text-[#CBC3D9] uppercase tracking-[0.2em]">Stock</th>
            <th className="px-6 py-4 text-left text-[10px] font-bold text-[#CBC3D9] uppercase tracking-[0.2em]">Supplier</th>
            <th className="px-6 py-4 text-right text-[10px] font-bold text-[#CBC3D9] uppercase tracking-[0.2em]">Edit</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[rgba(255,255,255,0.03)]">
          {products.map((product) => {
            const stock = typeof (product as any).stock !== 'undefined' ? (product as any).stock : product.quantity;
            const isLowStock = stock > 0 && stock < 10;
            const isOutOfStock = stock === 0;

            return (
              <tr key={product.id} className="group hover:bg-[rgba(205,189,255,0.02)] transition-all duration-300">
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] flex items-center justify-center group-hover:border-[#CDBDFF]/30 transition-colors">
                        <Box className="w-4 h-4 text-[#CBC3D9] group-hover:text-[#CDBDFF]" />
                     </div>
                     <div>
                        <div className="text-sm font-bold text-[#DFE2F3] group-hover:text-white transition-colors">{product.name}</div>
                        <div className="text-[10px] font-mono text-[#CBC3D9] opacity-40 uppercase tracking-widest">{product.sku}</div>
                     </div>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-[#CBC3D9] font-medium max-w-xs overflow-hidden text-ellipsis">{product.description}</td>
                <td className="px-6 py-5 whitespace-nowrap">
                   <span className="text-sm font-mono font-bold text-[#DFE2F3]">₹{product.price?.toLocaleString()}</span>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                   <span className="text-sm font-mono font-bold text-[#BDF4FF]">₹{product.sellingPrice?.toLocaleString()}</span>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                   <div className="flex items-center gap-2">
                      <span className={`text-sm font-black font-mono ${isOutOfStock ? 'text-[#FFABF3]' : isLowStock ? 'text-[#FDE047]' : 'text-emerald-400'}`}>
                        {stock.toString().padStart(2, '0')}
                      </span>
                      {isOutOfStock && (
                        <span className="px-2 py-0.5 rounded-full text-[8px] font-black bg-[rgba(255,171,243,0.1)] text-[#FFABF3] border border-[#FFABF3]/20 uppercase tracking-tighter shadow-[0_0_10px_rgba(255,171,243,0.2)]">Depleted</span>
                      )}
                      {isLowStock && (
                        <span className="px-2 py-0.5 rounded-full text-[8px] font-black bg-[rgba(253,224,71,0.1)] text-[#FDE047] border border-[#FDE047]/20 uppercase tracking-tighter">Critical</span>
                      )}
                   </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                     <ShieldCheck className="w-3 h-3 text-[#BDF4FF] opacity-50" />
                     <span className="text-xs font-bold text-[#CBC3D9] group-hover:text-[#DFE2F3] transition-colors">{product.supplierName || 'System Verified'}</span>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 rounded-lg bg-[rgba(205,189,255,0.05)] border border-[rgba(205,189,255,0.1)] text-[#CDBDFF] hover:bg-[#CDBDFF] hover:text-[#17004b] transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="p-2 rounded-lg bg-[rgba(255,171,243,0.05)] border border-[rgba(255,171,243,0.1)] text-[#FFABF3] hover:bg-[#FFABF3] hover:text-[#17004b] transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};