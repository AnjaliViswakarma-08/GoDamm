export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  sellingPrice: number;
  cost: number;
  quantity: number;
  minStock: number;
  supplierId: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryStats {
  totalProducts: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
}