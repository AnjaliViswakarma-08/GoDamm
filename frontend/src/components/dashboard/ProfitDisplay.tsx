import React, { useState, useEffect } from 'react';
import { IndianRupee, RefreshCw } from 'lucide-react';
import { authFetch } from '../../context/api';

function parseApiTimestamp(value: unknown): Date | null {
  if (value == null) {
    return null;
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === 'number') {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  // Supports LocalDateTime array style: [year, month, day, hour, minute, second, nanos]
  if (Array.isArray(value) && value.length >= 6) {
    const [year, month, day, hour, minute, second, nanos] = value as number[];
    const milliseconds = Math.floor((Number(nanos) || 0) / 1_000_000);
    const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second, milliseconds));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  if (typeof value === 'string') {
    const raw = value.trim();
    if (!raw) {
      return null;
    }

    // Backend LocalDateTime values can be zone-less; assume UTC for stable client-side rendering.
    const hasTimezone = /(?:Z|[+\-]\d{2}:\d{2})$/.test(raw);
    const normalized = hasTimezone ? raw : `${raw}Z`;

    const firstTry = new Date(normalized);
    if (!Number.isNaN(firstTry.getTime())) {
      return firstTry;
    }

    const secondTry = new Date(raw);
    return Number.isNaN(secondTry.getTime()) ? null : secondTry;
  }

  return null;
}

function formatTimestamp(value: unknown): string | null {
  const date = parseApiTimestamp(value);
  if (!date) {
    return null;
  }

  return date.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

export const ProfitDisplay: React.FC = () => {
  const [profit, setProfit] = useState<number>(0);
  const [lastReset, setLastReset] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  const fetchProfit = async () => {
    try {
      const response = await authFetch('/sales/profit/latest');
      if (response.ok) {
        const data = await response.json();
        setProfit(data.profit);
        const formattedTimestamp = formatTimestamp(data.timestamp);
        setLastReset(formattedTimestamp);
      }
    } catch (error) {
      console.error('Error fetching profit:', error);
    }
  };

  const handleReset = async () => {
    setIsResetting(true);
    try {
      const response = await authFetch('/sales/reset', { method: 'DELETE' });
      if (response.ok) {
        const data = await response.json();
        setProfit(0);
        // Handle different possible timestamp formats from backend
        const timestamp = data.reset_timestamp || data.resetTimestamp || new Date().toISOString();
        const formattedTimestamp = formatTimestamp(timestamp);
        setLastReset(formattedTimestamp);
      }
    } catch (error) {
      console.error('Error resetting sales:', error);
    } finally {
      setIsResetting(false);
    }
  };

  useEffect(() => {
    fetchProfit();
    // Listen for profit-updated event to refresh profit
    const handler = () => fetchProfit();
    window.addEventListener('profit-updated', handler);
    return () => window.removeEventListener('profit-updated', handler);
  }, []);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-500">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[var(--on-surface)]">Profit Earned</h3>
        <button 
          onClick={handleReset}
          disabled={isResetting}
          className="flex items-center text-sm text-[var(--on-surface-low)] hover:text-[var(--on-surface)] transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isResetting ? 'animate-spin' : ''}`} />
          {isResetting ? 'Resetting...' : 'Reset'}
        </button>
      </div>
      <div className="flex items-center mb-2">
        <IndianRupee className="w-8 h-8 text-green-500 mr-4" />
        <p className="text-3xl font-bold text-[var(--on-surface)]">{profit.toLocaleString('en-IN')}</p>
      </div>
      {lastReset && (
        <p className="text-xs text-[var(--on-surface-low)]">Last reset: {lastReset}</p>
      )}
    </div>
  );
};


