import React from 'react';
import { Edit2, Trash2, Mail, Phone, Users, MapPin, ExternalLink } from 'lucide-react';
import { Supplier } from '../../types/inventory';

interface SupplierTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: string) => void;
}

export const SupplierTable: React.FC<SupplierTableProps> = ({ suppliers, onEdit, onDelete }) => {
  if (suppliers.length === 0) {
    return (
      <div className="glass-card p-16 text-center border-[rgba(255,255,255,0.03)] group">
        <div className="relative inline-block mb-6">
           <div className="absolute -inset-4 bg-[#FFABF3] opacity-10 blur-xl rounded-full group-hover:opacity-20 transition-opacity"></div>
           <Users className="w-16 h-16 text-[#FFABF3] mx-auto relative z-10" />
        </div>
        <h3 className="text-xl font-black text-[#DFE2F3] mb-2 uppercase tracking-tight">No Suppliers</h3>
        <p className="text-[#CBC3D9] opacity-60">No suppliers found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto selection:bg-[#FFABF3] selection:text-[#380038]">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-[rgba(255,255,255,0.05)]">
            <th className="px-6 py-4 text-left text-[10px] font-bold text-[#CBC3D9] uppercase tracking-[0.2em]">Supplier</th>
            <th className="px-6 py-4 text-left text-[10px] font-bold text-[#CBC3D9] uppercase tracking-[0.2em]">Contact Person</th>
            <th className="px-6 py-4 text-left text-[10px] font-bold text-[#CBC3D9] uppercase tracking-[0.2em]">Email</th>
            <th className="px-6 py-4 text-left text-[10px] font-bold text-[#CBC3D9] uppercase tracking-[0.2em]">Phone Number</th>
            <th className="px-6 py-4 text-left text-[10px] font-bold text-[#CBC3D9] uppercase tracking-[0.2em]">Address</th>
            <th className="px-6 py-4 text-right text-[10px] font-bold text-[#CBC3D9] uppercase tracking-[0.2em]">Edit</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[rgba(255,255,255,0.03)]">
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className="group hover:bg-[rgba(255,171,243,0.02)] transition-all duration-300">
              <td className="px-6 py-5 whitespace-nowrap">
                <div className="text-sm font-bold text-[#DFE2F3] group-hover:text-white transition-colors uppercase tracking-tight">{supplier.name}</div>
              </td>
              <td className="px-6 py-5 whitespace-nowrap">
                <div className="text-xs font-semibold text-[#CBC3D9] group-hover:text-[#FFABF3] transition-colors">{supplier.contactPerson}</div>
              </td>
              <td className="px-6 py-5 whitespace-nowrap">
                <div className="flex items-center group/link">
                  <Mail className="w-3.5 h-3.5 text-[#CBC3D9] opacity-40 group-hover:opacity-100 transition-opacity mr-2" />
                  <a href={`mailto:${supplier.email}`} className="text-xs font-mono font-bold text-[#CBC3D9] hover:text-[#BDF4FF] transition-colors inline-flex items-center gap-1">
                    {supplier.email.toLowerCase()}
                    <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </a>
                </div>
              </td>
              <td className="px-6 py-5 whitespace-nowrap">
                <div className="flex items-center">
                  <Phone className="w-3.5 h-3.5 text-[#CBC3D9] opacity-40 group-hover:opacity-100 transition-opacity mr-2" />
                  <span className="text-xs font-mono font-bold text-[#DFE2F3]">{supplier.phone}</span>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2 max-w-xs">
                   <MapPin className="w-3 h-3 text-[#FFABF3] shrink-0 opacity-40" />
                   <span className="text-xs text-[#CBC3D9] truncate opacity-80 group-hover:opacity-100 transition-opacity">{supplier.address}</span>
                </div>
              </td>
              <td className="px-6 py-5 whitespace-nowrap text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => onEdit(supplier)}
                    className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] text-[#CBC3D9] hover:border-[#FFABF3] hover:text-[#FFABF3] transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(supplier.id)}
                    className="p-2 rounded-lg bg-[rgba(255,68,68,0.05)] border border-[rgba(255,68,68,0.1)] text-red-400 hover:bg-red-400 hover:text-[#380038] transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};