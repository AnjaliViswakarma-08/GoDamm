import React from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';
import { Product } from '../../types/inventory';

interface InventoryChartProps {
  products: Product[];
}

export const InventoryChart: React.FC<InventoryChartProps> = ({ products }) => {
  const categoryData = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = { count: 0, value: 0 };
    }
    acc[product.category].count += 1;
    acc[product.category].value += product.price * product.quantity;
    return acc;
  }, {} as Record<string, { count: number; value: number }>);

  const maxValue = Math.max(...Object.values(categoryData).map(data => data.value));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <IndianRupee className="w-5 h-5 text-gray-500 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Inventory by Category</h3>
      </div>
      
      <div className="space-y-4">
        {Object.entries(categoryData).map(([category, data]) => (
          <div key={category} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{category}</span>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-900">₹{data.value.toLocaleString()}</span>
                <span className="text-xs text-gray-500 ml-2">({data.count} items)</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(data.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
        
        {Object.keys(categoryData).length === 0 && (
          <div className="text-center py-8">
            <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No data available yet</p>
          </div>
        )}
      </div>
    </div>
  );
};