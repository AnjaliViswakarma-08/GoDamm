import React from 'react';
import { AlertTriangle, Package } from 'lucide-react';
import { Product } from '../../types/inventory';

interface LowStockAlertProps {
  products: Product[];
  riskLimit: number;
}

export const LowStockAlert: React.FC<LowStockAlertProps> = ({ products, riskLimit }) => {
  const lowStockProducts = products.filter(product => {
    const stock = (product as any).stock ?? product.quantity;
    return stock > 0 && stock <= riskLimit;
  });

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-500">
      <div className="flex items-center mb-4">
        <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
        <h3 className="text-lg font-medium text-[var(--on-surface)]">Low Stock Alerts</h3>
        <span className="ml-4 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-semibold">
          {lowStockProducts.length} item{lowStockProducts.length === 1 ? '' : 's'}
        </span>
        <span className="ml-2 px-2 py-1 rounded-full bg-[rgba(255,255,255,0.05)] text-[var(--on-surface-low)] text-[10px] font-bold uppercase tracking-[0.15em]">
          limit {riskLimit}
        </span>
      </div>

      {lowStockProducts.length === 0 ? (
        <div className="text-center py-4">
          <Package className="w-8 h-8 text-[var(--on-surface-low)] opacity-40 mx-auto mb-2" />
          <p className="text-sm text-[var(--on-surface-low)]">No items are below the current low-stock limit.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {lowStockProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <div>
                <p className="text-sm font-medium text-[var(--on-surface)]">{product.name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-amber-400">{(product as any).stock ?? product.quantity} left</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};