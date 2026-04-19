import React from 'react';
import { Package, TrendingUp, AlertTriangle, IndianRupee, Activity, Zap } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { StatCard } from '../components/common/StatCard';
import { LowStockAlert } from '../components/dashboard/LowStockAlert';
import { ProfitDisplay } from '../components/dashboard/ProfitDisplay';

export const Dashboard: React.FC = () => {
  const { getInventoryStats, products, lowStockRiskLimit, setLowStockRiskLimit } = useInventory();
  const stats = getInventoryStats();

  const handleLowStockRiskLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedLimit = Number(event.target.value);
    if (!Number.isFinite(parsedLimit)) {
      return;
    }

    setLowStockRiskLimit(parsedLimit);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Section */}
      <div className="relative">
        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#CDBDFF] to-transparent rounded-full opacity-50"></div>
        <div className="flex items-center gap-2 text-[#CDBDFF] mb-2">
          <Activity className="w-4 h-4 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">System Monitoring Active</span>
        </div>
        <h2 className="text-5xl font-black tracking-tighter text-[#DFE2F3] mb-2 uppercase">
          Inventory <span className="text-[#CDBDFF] neon-text-primary">Overview</span>
        </h2>
        <p className="text-[#CBC3D9] opacity-60 max-w-2xl font-medium">
          Real-time analytics and stock status from your entire inventory system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Units"
          value={stats.totalProducts.toString()}
          icon={Package}
          color="blue"
        />
        <StatCard
          title="Net Capital"
          value={`₹${stats.totalValue.toLocaleString('en-IN')}`}
          icon={IndianRupee}
          color="green"
        />
        <StatCard
          title={`Low Stock Risk (<= ${lowStockRiskLimit})`}
          value={stats.lowStockItems.toString()}
          icon={AlertTriangle}
          color="amber"
        />
        <StatCard
          title="Out of Stock"
          value={stats.outOfStockItems.toString()}
          icon={TrendingUp}
          color="red"
        />
      </div>

      {/* Analytics and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
           <div className="glass-card p-1 border-[rgba(255,255,255,0.03)] overflow-hidden">
              <div className="bg-[rgba(255,255,255,0.02)] p-6 border-b border-[rgba(255,255,255,0.05)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded-lg bg-[rgba(205,189,255,0.1)] text-[#CDBDFF]">
                      <Zap className="w-5 h-5" />
                   </div>
                   <h3 className="font-bold text-lg text-[#DFE2F3]">Network Profitability</h3>
                </div>
                <div className="flex gap-2">
                   <div className="px-3 py-1 rounded-full bg-[rgba(16,185,129,0.1)] text-emerald-400 text-[10px] font-bold border border-[rgba(16,185,129,0.2)]">LIVE</div>
                </div>
              </div>
              <div className="p-6">
                 <ProfitDisplay />
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#CDBDFF] to-[#5D21DF] rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative">
                <LowStockAlert products={products} riskLimit={lowStockRiskLimit} />
              </div>
           </div>

            <div className="glass-card p-5 border-[rgba(253,224,71,0.15)] bg-[rgba(253,224,71,0.04)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FDE047]">Set Low Stock Limit</p>
                  <p className="text-xs text-[#CBC3D9] opacity-80 mt-1">Low stock is counted from 1 to this limit.</p>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="low-stock-limit" className="text-xs font-bold text-[#DFE2F3]">Limit</label>
                  <input
                   id="low-stock-limit"
                   type="number"
                   min={1}
                   max={999}
                   step={1}
                   value={lowStockRiskLimit}
                   onChange={handleLowStockRiskLimitChange}
                   className="w-24 px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(253,224,71,0.25)] text-[#DFE2F3] font-bold focus:outline-none focus:ring-1 focus:ring-[#FDE047]"
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};