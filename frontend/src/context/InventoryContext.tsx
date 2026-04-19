import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import * as api from './api';
import { Product, Supplier, InventoryStats } from '../types/inventory';

const LOW_STOCK_RISK_LIMIT_STORAGE_KEY = 'inventory.lowStockRiskLimit';
const DEFAULT_LOW_STOCK_RISK_LIMIT = 10;

const sanitizeLowStockRiskLimit = (value: number): number => {
  if (!Number.isFinite(value)) {
    return DEFAULT_LOW_STOCK_RISK_LIMIT;
  }

  return Math.min(999, Math.max(1, Math.trunc(value)));
};

const readStoredLowStockRiskLimit = (): number => {
  if (typeof window === 'undefined') {
    return DEFAULT_LOW_STOCK_RISK_LIMIT;
  }

  const storedValue = window.localStorage.getItem(LOW_STOCK_RISK_LIMIT_STORAGE_KEY);
  if (!storedValue) {
    return DEFAULT_LOW_STOCK_RISK_LIMIT;
  }

  return sanitizeLowStockRiskLimit(Number(storedValue));
};

interface InventoryContextType {
  products: Product[];
  suppliers: Supplier[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  updateProductsStock: (updates: Array<{ id: string; stock: number }>) => void;
  deleteProduct: (id: string) => Promise<void>;
  addSupplier: (supplier: Omit<Supplier, 'id'>) => Promise<void>;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => Promise<void>;
  deleteSupplier: (id: string) => Promise<boolean>;
  getInventoryStats: () => InventoryStats;
  supplierDeleteError: { message: string; supplierId?: string } | null;
  clearSupplierDeleteError: () => void;
  filterBySupplierId: string | null;
  setFilterBySupplierId: (id: string | null) => void;
  lowStockRiskLimit: number;
  setLowStockRiskLimit: (limit: number) => void;
  refreshData: () => Promise<void>;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [supplierDeleteError, setSupplierDeleteError] = useState<{ message: string; supplierId?: string } | null>(null);
  const [filterBySupplierId, setFilterBySupplierId] = useState<string | null>(null);
  const [lowStockRiskLimit, setLowStockRiskLimitState] = useState<number>(readStoredLowStockRiskLimit);
  const clearSupplierDeleteError = () => setSupplierDeleteError(null);

  const setLowStockRiskLimit = useCallback((limit: number) => {
    setLowStockRiskLimitState(sanitizeLowStockRiskLimit(limit));
  }, []);

  const normalizeProduct = (p: any): Product => ({
    ...p,
    id: String(p.id),
    quantity: p.stock ?? p.quantity ?? 0,
    stock: p.stock ?? p.quantity ?? 0, // Keep both synced
    supplierId: p.supplier?.id ? String(p.supplier.id) : (p.supplierId ? String(p.supplierId) : ''),
    supplierName: p.supplier?.name ?? p.supplierName ?? 'Unknown Supplier',
    createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
    updatedAt: p.updatedAt ? new Date(p.updatedAt) : new Date(),
  });

  const loadData = useCallback(async () => {
    try {
      const [productsData, suppliersData] = await Promise.all([
        api.fetchProducts(),
        api.fetchSuppliers()
      ]);
      setProducts(productsData.map(normalizeProduct));
      setSuppliers(suppliersData);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LOW_STOCK_RISK_LIMIT_STORAGE_KEY, String(lowStockRiskLimit));
    }
  }, [lowStockRiskLimit]);

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const stockValue = Number((productData as any).stock ?? productData.quantity ?? 0);
    const normalizedRequest: any = {
      ...productData,
      stock: Number.isFinite(stockValue) ? Math.max(0, Math.trunc(stockValue)) : 0,
      supplierId: productData.supplierId ? Number(productData.supplierId) : null,
    };
    const newProduct = await api.addProduct(normalizedRequest);
    setProducts(prev => [...prev, normalizeProduct(newProduct)]);
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    const stockValue = Number((productData as any).stock ?? productData.quantity ?? 0);
    const normalizedRequest: any = {
      ...productData,
      stock: Number.isFinite(stockValue) ? Math.max(0, Math.trunc(stockValue)) : 0,
      supplierId: productData.supplierId ? Number(productData.supplierId) : null,
    };
    await api.updateProduct(id, normalizedRequest);
    // Optimistic update + fetch latest to be sure
    await loadData();
  };

  const updateProductsStock = (updates: Array<{ id: string; stock: number }>) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        const update = updates.find(u => String(u.id) === String(product.id));
        if (update) {
          return { ...product, quantity: update.stock, stock: update.stock };
        }
        return product;
      })
    );
  };

  const deleteProduct = async (id: string) => {
    await api.deleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addSupplier = async (supplierData: Omit<Supplier, 'id'>) => {
    const newSupplier = await api.addSupplier(supplierData);
    setSuppliers(prev => [...prev, newSupplier]);
  };

  const updateSupplier = async (id: string, supplierData: Partial<Supplier>) => {
    const updated = await api.updateSupplier(id, supplierData);
    setSuppliers(prev => prev.map(s => s.id === id ? updated : s));
  };

  const deleteSupplier = async (id: string): Promise<boolean> => {
    const result = await api.deleteSupplier(id);
    if (result.success) {
      setSuppliers(prev => prev.filter(s => s.id !== id));
      setSupplierDeleteError(null);
      return true;
    } else {
      setSupplierDeleteError({ message: result.message || 'Deletion failed', supplierId: id });
      return false;
    }
  };

  const getInventoryStats = (): InventoryStats => {
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const lowStockItems = products.filter(p => {
      const stock = (p as any).stock ?? p.quantity;
      return stock > 0 && stock <= lowStockRiskLimit;
    }).length;
    const outOfStockItems = products.filter(p => {
      const stock = (p as any).stock ?? p.quantity;
      return stock === 0;
    }).length;

    return { totalProducts, totalValue, lowStockItems, outOfStockItems };
  };

  return (
    <InventoryContext.Provider value={{
      products,
      suppliers,
      addProduct,
      updateProduct,
      updateProductsStock,
      deleteProduct,
      addSupplier,
      updateSupplier,
      deleteSupplier,
      getInventoryStats,
      supplierDeleteError,
      clearSupplierDeleteError,
      filterBySupplierId,
      setFilterBySupplierId,
      lowStockRiskLimit,
      setLowStockRiskLimit,
      refreshData: loadData
    }}>
      {children}
    </InventoryContext.Provider>
  );
};