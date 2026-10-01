import { useState, useMemo } from 'react';
import { Plus, Search, MapPin, Calculator, ArrowRight } from 'lucide-react';
import {
  units,
  UNIT_SIZE_SQFT,
  formatINRFull,
  sqYardsToSqft,
  type Unit,
  type UnitStatus,
} from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import SlideOver from '@/components/SlideOver';

type FilterType = 'All' | 'Sold' | 'Available' | 'Overdue';

const filterCounts: Record<FilterType, number> = {
  All: 40,
  Sold: 28,
  Available: 12,
  Overdue: 3,
};

export default function UnitsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('All');
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [converterInput, setConverterInput] = useState('');

  const converterResult = converterInput
    ? sqYardsToSqft(parseFloat(converterInput) || 0)
    : null;

  const filteredUnits = useMemo(() => {
    return units.filter((unit) => {
      const matchesSearch =
        unit.label.toLowerCase().includes(search.toLowerCase()) ||
        (unit.buyerName?.toLowerCase().includes(search.toLowerCase()) ?? false);
      const matchesFilter =
        filter === 'All' ||
        (filter === 'Sold' && unit.status === 'sold') ||
        (filter === 'Available' && unit.status === 'available') ||
        (filter === 'Overdue' && unit.status === 'overdue');
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const filters: FilterType[] = ['All', 'Sold', 'Available', 'Overdue'];

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Units</h1>
          <p className="mt-1 text-sm text-textgray">Skyline Commerce Hub, Block A — Hyderabad</p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-[6px] bg-gold-500 px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400">
          <Plus size={18} /> Add Unit
        </button>
      </div>

      {/* Converter Widget */}
      <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-4">
        <div className="flex items-center gap-3">
          <Calculator size={18} className="text-gold-500" />
          <span className="text-sm font-medium text-white">Area Converter</span>
        </div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Enter sq yards"
              value={converterInput}
              onChange={(e) => setConverterInput(e.target.value)}
              className="w-40 rounded-[6px] border border-navy-600 bg-navy-900 px-3 py-2 text-sm text-white placeholder-textgray focus:border-gold-500 focus:outline-none"
            />
            <span className="text-sm text-textgray">sq yards</span>
          </div>
          {converterResult !== null && (
            <div className="flex items-center gap-2">
              <ArrowRight size={16} className="text-gold-500" />
              <span className="text-sm font-semibold text-gold-500">{converterResult} sqft</span>
              <span className="text-xs text-textgray">(1 sq yard = 9 sqft)</span>
            </div>
          )}
        </div>
      </div>

      {/* Search & Filter Tabs */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-textgray" />
          <input
            type="text"
            placeholder="Search by unit ID or buyer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-[6px] border border-navy-600 bg-navy-800 py-2.5 pl-10 pr-4 text-sm text-white placeholder-textgray focus:border-gold-500 focus:outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-gold-500 text-navy-900'
                  : 'border border-navy-600 bg-navy-800 text-textgray hover:text-white'
              }`}
            >
              {f} ({filterCounts[f]})
            </button>
          ))}
        </div>
      </div>

      {/* Unit Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredUnits.map((unit) => (
          <div
            key={unit.id}
            onClick={() => setSelectedUnit(unit)}
            className="cursor-pointer rounded-[6px] border border-navy-600 bg-navy-800 p-5 transition-colors hover:border-gold-500/40"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-bold text-white">{unit.label}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-textgray">
                  <MapPin size={12} /> Block A
                </p>
              </div>
              <StatusBadge status={unit.status} />
            </div>

            <div className="mt-4 space-y-2 border-t border-navy-600 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-textgray">Size</span>
                <span className="text-white">{unit.sizeSqYards} sq yards</span>
              </div>
              <p className="text-xs text-textgray">({unit.sizeSqft} sqft)</p>
              <div className="flex justify-between text-sm">
                <span className="text-textgray">Price</span>
                <span className="text-white">₹18,00,000</span>
              </div>
            </div>

            {unit.status === 'sold' || unit.status === 'overdue' ? (
              <div className="mt-4 border-t border-navy-600 pt-4">
                <p className="text-xs text-textgray">Buyer</p>
                <p className="text-sm font-medium text-white">{unit.buyerName}</p>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-textgray">Monthly Return</span>
                  <span className="font-semibold text-gold-500">{formatINRFull(unit.monthlyReturn || 0)}</span>
                </div>
              </div>
            ) : (
              <div className="mt-4 border-t border-navy-600 pt-4">
                <button className="w-full rounded-[6px] border border-gold-500/40 py-2 text-sm font-medium text-gold-500 transition-colors hover:bg-gold-500/10" onClick={(e) => e.stopPropagation()}>
                  Mark as Sold
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredUnits.length === 0 && (
        <div className="rounded-[6px] border border-navy-600 bg-navy-800 p-12 text-center">
          <p className="text-textgray">No units found matching your filters.</p>
        </div>
      )}

      <p className="text-center text-xs text-textgray">
        Showing {filteredUnits.length} of {units.length} units · Unit size: 25 sq yards / {UNIT_SIZE_SQFT} sqft
      </p>

      {/* Unit Detail SlideOver */}
      <SlideOver open={!!selectedUnit} onClose={() => setSelectedUnit(null)} title={selectedUnit?.label}>
        {selectedUnit && <UnitDetailPanel unit={selectedUnit} />}
      </SlideOver>
    </div>
  );
}

function UnitDetailPanel({ unit }: { unit: Unit }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-[6px] bg-gold-500/15">
          <MapPin size={24} className="text-gold-500" />
        </div>
        <div>
          <p className="text-lg font-bold text-white">{unit.label}</p>
          <p className="text-xs text-textgray">{unit.sizeSqYards} sq yards = {unit.sizeSqft} sqft</p>
        </div>
        <div className="ml-auto"><StatusBadge status={unit.status} /></div>
      </div>

      {unit.status !== 'available' ? (
        <>
          <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
            <h3 className="mb-3 text-sm font-semibold text-white">Buyer & Purchase</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-textgray">Buyer</span><span className="text-white">{unit.buyerName}</span></div>
              <div className="flex justify-between"><span className="text-textgray">Contact</span><span className="text-white">{unit.buyerPhone}</span></div>
              <div className="flex justify-between"><span className="text-textgray">Purchase Price</span><span className="text-white">{formatINRFull(unit.purchasePrice || 0)}</span></div>
              <div className="flex justify-between"><span className="text-textgray">Purchase Date</span><span className="text-white">{unit.purchaseDate}</span></div>
            </div>
          </div>

          <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
            <h3 className="mb-3 text-sm font-semibold text-white">Lease Terms</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-textgray">Lease Start</span><span className="text-white">{unit.leaseStart}</span></div>
              <div className="flex justify-between"><span className="text-textgray">Lease End</span><span className="text-white">{unit.leaseEnd}</span></div>
              <div className="flex justify-between"><span className="text-textgray">Monthly Return</span><span className="font-semibold text-gold-500">{formatINRFull(unit.monthlyReturn || 0)}</span></div>
            </div>
          </div>

          <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
            <h3 className="mb-3 text-sm font-semibold text-white">Last Payment</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-white">{unit.lastPaymentDate}</p>
              {unit.lastPaymentStatus && <StatusBadge status={unit.lastPaymentStatus} />}
            </div>
          </div>

          <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
            <h3 className="mb-3 text-sm font-semibold text-white">Documents</h3>
            <div className="flex flex-wrap gap-2">
              <DocBadge label="Sale Deed" uploaded={unit.saleDeedUploaded} />
              <DocBadge label="KYC" uploaded={unit.kycUploaded} />
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-[6px] border border-navy-600 bg-navy-900 p-4">
          <h3 className="mb-3 text-sm font-semibold text-white">Available for Sale</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-textgray">Estimated revenue</span><span className="text-white">{formatINRFull(1800000)}</span></div>
            <div className="flex justify-between"><span className="text-textgray">Monthly payout if leased</span><span className="text-white">{formatINRFull(27000)}</span></div>
          </div>
          <button className="mt-4 w-full rounded-[6px] bg-gold-500 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400">Mark as Sold</button>
        </div>
      )}
    </div>
  );
}

function DocBadge({ label, uploaded }: { label: string; uploaded?: boolean }) {
  return (
    <span className={`flex items-center gap-1.5 rounded-[6px] px-3 py-1.5 text-xs ${uploaded ? 'bg-teal-500/15 text-teal-500' : 'bg-status-warning/15 text-status-warning'}`}>
      {label} {uploaded ? '✓' : 'Pending'}
    </span>
  );
}
