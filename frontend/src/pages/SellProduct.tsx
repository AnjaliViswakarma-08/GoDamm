import React, { useState, useEffect } from 'react';
import { Search, Plus, Minus, X, IndianRupee, CheckCircle, AlertCircle, ShoppingCart, Zap, Activity } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { authFetch } from '../context/api';
import { motion, AnimatePresence } from 'framer-motion';

interface SaleProduct {
  id: number;
  name: string;
  sellingPrice: number;
  price: number;
  quantity: number;
}

interface SelectedSaleProduct {
  id: number;
  name: string;
  sellingPrice: number;
  price: number;
  quantity: number; // quantity to sell
  available: number; // current stock
}

const SellProduct: React.FC = () => {
  const { products: contextProducts, updateProductsStock } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<SelectedSaleProduct[]>([]);
  const [totalBill, setTotalBill] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showProfitModal, setShowProfitModal] = useState(false);
  const [profitAmount, setProfitAmount] = useState<number | null>(null);

  // Map context products to SaleProduct format
  const products: SaleProduct[] = contextProducts.map(p => ({
    id: parseInt(p.id) || 0,
    name: p.name,
    sellingPrice: (p as any).sellingPrice || p.price,
    price: p.price,
    quantity: p.quantity
  }));

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const newTotalBill = selectedProducts.reduce((sum, item) => sum + (item.sellingPrice * item.quantity), 0);
    setTotalBill(newTotalBill);
  }, [selectedProducts]);

  const handleAddProduct = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const existingProduct = selectedProducts.find(item => item.id === productId);
      if (existingProduct) {
        setSelectedProducts(selectedProducts.map(item =>
          item.id === productId ? { ...item, quantity: Math.min(item.quantity + 1, item.available) } : item
        ));
      } else {
        setSelectedProducts([
          ...selectedProducts,
          {
            id: product.id,
            name: product.name,
            sellingPrice: product.sellingPrice,
            price: product.price,
            quantity: 1,
            available: product.quantity
          }
        ]);
      }
      setSearchTerm('');
    }
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setSelectedProducts(selectedProducts.map(item =>
      item.id === productId ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.available)) } : item
    ).filter(item => item.quantity > 0));
  };

  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts(selectedProducts.filter(item => item.id !== productId));
  };

  const handleSell = async () => {
    setMessage(null);
    if (selectedProducts.length === 0) {
      setMessage({ type: 'error', text: 'Please add products to sell.' });
      return;
    }

    try {
      const payload = selectedProducts.map(item => ({
        id: item.id,
        quantity: item.quantity
      }));

      const response = await authFetch('/sales/sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        const { profit, updatedProducts } = data;
        setProfitAmount(profit);
        setShowProfitModal(true);

        const stockUpdates = updatedProducts.map((p: any) => ({
          id: String(p.id),
          stock: p.stock
        }));
        updateProductsStock(stockUpdates);

        setSelectedProducts([]);
        setTotalBill(0);

        if (window.dispatchEvent) {
          window.dispatchEvent(new Event('profit-updated'));
        }
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to record sale.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="relative">
        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#BDF4FF] to-transparent rounded-full opacity-50"></div>
        <div className="flex items-center gap-2 text-[#BDF4FF] mb-2">
          <Zap className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Transaction Portal</span>
        </div>
        <h2 className="text-4xl font-black tracking-tighter text-[#DFE2F3] uppercase">
          Finalize <span className="text-[#BDF4FF] drop-shadow-[0_0_8px_rgba(189,244,255,0.5)]">Sale</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Selection Area */}
        <div className="glass-card p-8 border-[rgba(189,244,255,0.1)] space-y-6">
          <h3 className="text-sm font-bold text-[#CBC3D9] uppercase tracking-widest flex items-center gap-2">
            <Search className="w-4 h-4 text-[#BDF4FF]" />
            Search Assets
          </h3>
          <div className="relative group">
            <input
              type="text"
              placeholder="IDENTITY SCAN..."
              className="w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-4 pl-6 text-sm font-bold tracking-widest text-[var(--on-surface)] placeholder:text-[var(--on-surface-low)] placeholder:opacity-70 focus:ring-1 focus:ring-[#BDF4FF] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <AnimatePresence>
              {searchTerm && filteredProducts.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-30 w-full mt-2 glass-card border-[rgba(189,244,255,0.2)] overflow-hidden max-h-60 overflow-y-auto"
                >
                  {filteredProducts.map(product => (
                    <li
                      key={product.id}
                      onClick={() => product.quantity > 0 && handleAddProduct(product.id)}
                      className={`px-6 py-4 flex justify-between items-center cursor-pointer transition-colors ${product.quantity > 0
                          ? 'hover:bg-[rgba(189,244,255,0.1)]'
                          : 'opacity-40 cursor-not-allowed'
                        }`}
                    >
                      <div>
                        <div className="text-sm font-bold text-[#DFE2F3]">{product.name}</div>
                        <div className="text-[10px] font-mono text-[#CBC3D9] opacity-40">STOCK: {product.quantity}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-mono font-bold text-[#BDF4FF]">₹{product.sellingPrice}</span>
                        {product.quantity > 0 ? (
                          <div className="p-1 px-2 rounded-lg bg-[rgba(189,244,255,0.1)] text-[#BDF4FF] text-[8px] font-black uppercase tracking-widest">Available</div>
                        ) : (
                          <div className="p-1 px-2 rounded-lg bg-[rgba(255,171,243,0.1)] text-[#FFABF3] text-[8px] font-black uppercase tracking-widest">Depleted</div>
                        )}
                      </div>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-[var(--on-surface-low)] uppercase tracking-[0.2em] mt-8">Selected for Outbound</h3>
            <div className="space-y-3">
              <AnimatePresence>
                {selectedProducts.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center justify-between p-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl hover:border-[#BDF4FF]/30 transition-all"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#DFE2F3]">{item.name}</p>
                      <p className="text-[10px] font-mono text-[#BDF4FF] font-bold">₹{item.sellingPrice.toLocaleString()} / UNIT</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-black/20 p-1 rounded-xl border border-white/5">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-1.5 rounded-lg hover:bg-white/5 text-[#FFABF3] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-mono font-black text-[#DFE2F3]">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-1.5 rounded-lg hover:bg-white/5 text-[#BDF4FF] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveProduct(item.id)}
                        className="p-2 rounded-xl text-[#CBC3D9]/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {selectedProducts.length === 0 && (
                <div className="py-12 text-center border-2 border-dashed border-[var(--border)] rounded-2xl font-bold text-[var(--on-surface-low)] uppercase tracking-widest text-xs opacity-70">
                  Empty Manifest
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Total & Action */}
        <div className="glass-card p-8 border-[rgba(189,244,255,0.1)] space-y-8 sticky top-32">
          <div className="space-y-2">
            <h3 className="text-[10px] font-bold text-[#CBC3D9] uppercase tracking-[0.2em] opacity-40">Transaction Sum</h3>
            <div className="flex items-baseline justify-between gap-4">
              <div className="text-6xl font-black text-[#DFE2F3] tracking-tighter">
                ₹{totalBill.toLocaleString()}
              </div>
              <div className="flex-1 border-b-2 border-dashed border-[rgba(255,255,255,0.05)] mb-2"></div>
              <div className="text-sm font-mono text-[#BDF4FF] font-bold uppercase">INR</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[rgba(189,244,255,0.05)] border border-[rgba(189,244,255,0.1)] text-[#BDF4FF]">
            <div className="flex items-center gap-3 text-sm font-bold mb-1">
              <Activity className="w-4 h-4" />
              Processing Protocol Active
            </div>
            <p className="text-[10px] opacity-60 font-medium">Atomic stock decrement and profit logging will be executed upon finalization.</p>
          </div>

          <button
            onClick={handleSell}
            disabled={selectedProducts.length === 0}
            className="w-full btn-primary !from-emerald-500 !to-green-500 !text-white py-6 text-lg tracking-[0.2em] shadow-[0_0_30px_rgba(16,185,129,0.35)] disabled:opacity-20 disabled:grayscale disabled:pointer-events-none"
          >
            <ShoppingCart className="w-6 h-6 mr-2" />
            COMPLETE TRANSACTION
          </button>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl flex items-center gap-3 text-sm font-bold ${message.type === 'success'
                  ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                  : 'bg-red-400/10 text-red-400 border border-red-400/20'
                }`}
            >
              {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              {message.text}
            </motion.div>
          )}
        </div>
      </div>

      {/* Profit Modal */}
      <AnimatePresence>
        {showProfitModal && profitAmount !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0F131F]/90 backdrop-blur-sm"
              onClick={() => setShowProfitModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative glass-card p-10 max-w-sm w-full text-center border-[#BDF4FF]/30"
            >
              <div className="w-20 h-20 bg-[rgba(189,244,255,0.1)] rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-[#BDF4FF] opacity-20 blur-xl rounded-full"></div>
                <IndianRupee className="w-10 h-10 text-[#BDF4FF] relative z-10" />
              </div>

              <h2 className="text-3xl font-black text-[#DFE2F3] uppercase tracking-tighter mb-2">Protocol Success</h2>
              <p className="text-[#CBC3D9] opacity-60 text-sm mb-6 uppercase tracking-widest font-bold">Yield Extracted</p>

              <div className="text-4xl font-black text-emerald-400 mb-8 font-mono">
                +₹{profitAmount.toLocaleString()}
              </div>

              <button
                className="w-full py-4 bg-[#BDF4FF] text-[#17004b] rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(189,244,255,0.3)]"
                onClick={() => { setShowProfitModal(false); setProfitAmount(null); }}
              >
                Continue Operations
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { SellProduct };
