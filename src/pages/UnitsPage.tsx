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
          <h1 className="text-2xl font-bold text-heading">Units</h1>
          <p className="mt-1 text-sm text-muted">Skyline Commerce Hub, Block A — Hyderabad</p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-[6px] bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
          <Plus size={18} /> Add Unit
        </button>
      </div>

      {/* Converter Widget */}
      <div className="rounded-[6px] border border-border bg-white p-4">
        <div className="flex items-center gap-3">
          <Calculator size={18} className="text-primary" />
          <span className="text-sm font-medium text-heading">Area Converter</span>
        </div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Enter sq yards"
              value={converterInput}
              onChange={(e) => setConverterInput(e.target.value)}
              className="w-40 rounded-[6px] border border-border bg-surface px-3 py-2 text-sm text-heading placeholder-textgray focus:border-primary focus:outline-none"
            />
            <span className="text-sm text-muted">sq yards</span>
          </div>
          {converterResult !== null && (
            <div className="flex items-center gap-2">
              <ArrowRight size={16} className="text-primary" />
              <span className="text-sm font-semibold text-primary">{converterResult} sqft</span>
              <span className="text-xs text-muted">(1 sq yard = 9 sqft)</span>
            </div>
          )}
        </div>
      </div>

      {/* Search & Filter Tabs */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search by unit ID or buyer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-[6px] border border-border bg-white py-2.5 pl-10 pr-4 text-sm text-heading placeholder-textgray focus:border-primary focus:outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-primary text-white'
                  : 'border border-border bg-white text-muted hover:text-heading'
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
            className="cursor-pointer rounded-[6px] border border-border bg-white p-5 transition-colors hover:border-primary/40"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-bold text-heading">{unit.label}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                  <MapPin size={12} /> Block A
                </p>
              </div>
              <StatusBadge status={unit.status} />
            </div>

            <div className="mt-4 space-y-2 border-t border-border pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Size</span>
                <span className="text-heading">{unit.sizeSqYards} sq yards</span>
              </div>
              <p className="text-xs text-muted">({unit.sizeSqft} sqft)</p>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Price</span>
                <span className="text-heading">₹18,00,000</span>
              </div>
            </div>

            {unit.status === 'sold' || unit.status === 'overdue' ? (
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-xs text-muted">Buyer</p>
                <p className="text-sm font-medium text-heading">{unit.buyerName}</p>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-muted">Monthly Return</span>
                  <span className="font-semibold text-primary">{formatINRFull(unit.monthlyReturn || 0)}</span>
                </div>
              </div>
            ) : (
              <div className="mt-4 border-t border-border pt-4">
                <button className="w-full rounded-[6px] border border-primary/40 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary-light" onClick={(e) => e.stopPropagation()}>
                  Mark as Sold
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredUnits.length === 0 && (
        <div className="rounded-[6px] border border-border bg-white p-12 text-center">
          <p className="text-muted">No units found matching your filters.</p>
        </div>
      )}

      <p className="text-center text-xs text-muted">
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
        <div className="flex h-12 w-12 items-center justify-center rounded-[6px] bg-primary-light">
          <MapPin size={24} className="text-primary" />
        </div>
        <div>
          <p className="text-lg font-bold text-heading">{unit.label}</p>
          <p className="text-xs text-muted">{unit.sizeSqYards} sq yards = {unit.sizeSqft} sqft</p>
        </div>
        <div className="ml-auto"><StatusBadge status={unit.status} /></div>
      </div>

      {unit.status !== 'available' ? (
        <>
          <div className="rounded-[6px] border border-border bg-surface p-4">
            <h3 className="mb-3 text-sm font-semibold text-heading">Buyer & Purchase</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted">Buyer</span><span className="text-heading">{unit.buyerName}</span></div>
              <div className="flex justify-between"><span className="text-muted">Contact</span><span className="text-heading">{unit.buyerPhone}</span></div>
              <div className="flex justify-between"><span className="text-muted">Purchase Price</span><span className="text-heading">{formatINRFull(unit.purchasePrice || 0)}</span></div>
              <div className="flex justify-between"><span className="text-muted">Purchase Date</span><span className="text-heading">{unit.purchaseDate}</span></div>
            </div>
          </div>

          <div className="rounded-[6px] border border-border bg-surface p-4">
            <h3 className="mb-3 text-sm font-semibold text-heading">Lease Terms</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted">Lease Start</span><span className="text-heading">{unit.leaseStart}</span></div>
              <div className="flex justify-between"><span className="text-muted">Lease End</span><span className="text-heading">{unit.leaseEnd}</span></div>
              <div className="flex justify-between"><span className="text-muted">Monthly Return</span><span className="font-semibold text-primary">{formatINRFull(unit.monthlyReturn || 0)}</span></div>
            </div>
          </div>

          <div className="rounded-[6px] border border-border bg-surface p-4">
            <h3 className="mb-3 text-sm font-semibold text-heading">Last Payment</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-heading">{unit.lastPaymentDate}</p>
              {unit.lastPaymentStatus && <StatusBadge status={unit.lastPaymentStatus} />}
            </div>
          </div>

          <div className="rounded-[6px] border border-border bg-surface p-4">
            <h3 className="mb-3 text-sm font-semibold text-heading">Documents</h3>
            <div className="flex flex-wrap gap-2">
              <DocBadge label="Sale Deed" uploaded={unit.saleDeedUploaded} />
              <DocBadge label="KYC" uploaded={unit.kycUploaded} />
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-[6px] border border-border bg-surface p-4">
          <h3 className="mb-3 text-sm font-semibold text-heading">Available for Sale</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted">Estimated revenue</span><span className="text-heading">{formatINRFull(1800000)}</span></div>
            <div className="flex justify-between"><span className="text-muted">Monthly payout if leased</span><span className="text-heading">{formatINRFull(27000)}</span></div>
          </div>
          <button className="mt-4 w-full rounded-[6px] bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">Mark as Sold</button>
        </div>
      )}
    </div>
  );
}

function DocBadge({ label, uploaded }: { label: string; uploaded?: boolean }) {
  return (
    <span className={`flex items-center gap-1.5 rounded-[6px] px-3 py-1.5 text-xs ${uploaded ? 'bg-[#CCFBF1] text-[#0F766E]' : 'bg-[#FEF3C7] text-[#B45309]'}`}>
      {label} {uploaded ? '✓' : 'Pending'}
    </span>
  );
}
