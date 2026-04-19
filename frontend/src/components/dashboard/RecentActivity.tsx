import React from 'react';
import { Clock, Package } from 'lucide-react';
import { Product } from '../../types/inventory';

interface RecentActivityProps {
  products: Product[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ products }) => {
  const recentProducts = [...products]
    .filter(p => p.updatedAt && p.updatedAt.getTime() !== 0)
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Clock className="w-5 h-5 text-gray-500 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      </div>
      
      <div className="space-y-3">
        {recentProducts.map((product) => (
          <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Package className="w-4 h-4 text-gray-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                <p className="text-xs text-gray-500">Stock: {product.quantity}</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">
              {product.updatedAt && product.updatedAt.getTime() !== 0
                ? product.updatedAt.toLocaleString()
                : 'N/A'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};