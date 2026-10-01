export type UnitStatus = 'sold' | 'available' | 'overdue' | 'reserved';

export type Unit = {
  id: string;
  label: string;
  sizeSqYards: number;
  sizeSqft: number;
  status: UnitStatus;
  buyerName?: string;
  buyerId?: string;
  buyerPhone?: string;
  monthlyReturn?: number;
  purchaseDate?: string;
  purchasePrice?: number;
  leaseStart?: string;
  leaseEnd?: string;
  lastPaymentDate?: string;
  lastPaymentStatus?: PaymentStatus;
  saleDeedUploaded?: boolean;
  kycUploaded?: boolean;
};

export type Buyer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  unitsOwned: string[];
  purchaseDate: string;
  investment: number;
  leaseStatus: 'Active' | 'Overdue';
  documents: string;
  docsVerified: boolean;
  kyc: { aadhaar: boolean; pan: boolean; addressProof: boolean };
  paymentHistory: { month: string; amount: number; status: PaymentStatus; paymentDate: string }[];
};

export type PaymentStatus = 'Paid' | 'Overdue' | 'Pending';

export type Payment = {
  id: string;
  unitId: string;
  buyerName: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  daysOverdue?: number;
};

export type MonthlyTrend = {
  month: string;
  dues: number;
  collected: number;
};

export type Contract = {
  id: string;
  unit: string;
  unitSizeSqYards: number;
  unitSizeSqft: number;
  buyer: string;
  buyerPhone: string;
  leaseStart: string;
  leaseEnd: string;
  monthlyReturn: number;
  escalation: string;
  status: 'Active' | 'Overdue';
  lockInYears: number;
  totalLeaseValue: number;
  unitPurchasePrice: number;
  nextEscalationDate: string;
  nextEscalationAmount: number;
  paymentHistory: { month: string; amount: number; status: PaymentStatus }[];
};

export type ForecastRow = {
  month: string;
  unitsActive: number;
  baseLiability: number;
  escalation: number;
  netLiability: number;
  camIncome: number;
  netPosition: number;
};

export type IFRS16Row = {
  contract: string;
  unit: string;
  buyer: string;
  leaseTerm: number;
  monthlyPayment: number;
  implicitRate: string;
  nilAtInception: number;
  unearnedFinanceIncome: number;
  carryingValue: number;
};

export type AmortisationRow = {
  month: number;
  monthLabel: string;
  openingNIL: number;
  leaseReceipt: number;
  interestIncome: number;
  principalRepayment: number;
  closingNIL: number;
};

export type RenewalRecord = {
  id: string;
  contract: string;
  unit: string;
  buyer: string;
  expiryDate: string;
  monthlyReturn: number;
  proposedReturn: number;
  escalation: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

export type CashFlowRow = {
  month: string;
  inflow: number;
  outflow: number;
  net: number;
};

export type ProjectData = {
  id: string;
  name: string;
  location: string;
  developer: string;
  totalAreaSqYards: number;
  unitSizeSqYards: number;
  unitPrice: number;
  monthlyReturn: number;
  totalUnits: number;
  startDate: string;
};

export type AlertItem = {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  action: string;
};

const SQ_YARD_TO_SQFT = 9;

export const PROJECT = {
  name: 'Skyline Commerce Hub — Block A',
  location: 'Gachibowli, Hyderabad — 500088',
  developer: 'Skyline Ventures Pvt. Ltd.',
  totalAreaSqYards: 1000,
  unitSizeSqYards: 25,
  totalUnits: 40,
  unitPrice: 1800000,
  monthlyReturn: 27000,
  currency: 'INR',
};

export const CAM_OPERATOR = 'RealSpace Operations Pvt. Ltd.';
export const CAM_RATE = 9;
export const CAM_TOTAL = 81000;

export const UNIT_SIZE_SQFT = 225;

// Buyer master data (21 buyers, 28 units sold)
type BuyerDef = {
  id: string; name: string; phone: string; email: string;
  units: string[]; purchaseDate: string; kycComplete: boolean;
  kycMissing?: string[]; leaseStatus: 'Active' | 'Overdue';
};

const buyerDefs: BuyerDef[] = [
  { id: 'B001', name: 'Rajesh Kumar Agarwal', phone: '+91 98765 43210', email: 'rajesh.agarwal@gmail.com', units: ['Unit 001', 'Unit 002'], purchaseDate: '05 Apr 2026', kycComplete: true, leaseStatus: 'Active' },
  { id: 'B002', name: 'Priya Venkatesh', phone: '+91 87654 32109', email: 'priya.venkatesh@outlook.com', units: ['Unit 003'], purchaseDate: '08 Apr 2026', kycComplete: true, leaseStatus: 'Active' },
  { id: 'B003', name: 'Mohammed Saleem', phone: '+91 76543 21098', email: 'm.saleem@gmail.com', units: ['Unit 004', 'Unit 005'], purchaseDate: '10 Apr 2026', kycComplete: true, leaseStatus: 'Active' },
  { id: 'B004', name: 'Sunita Ramachandran', phone: '+91 65432 10987', email: 'sunita.rc@yahoo.com', units: ['Unit 006'], purchaseDate: '15 Apr 2026', kycComplete: true, leaseStatus: 'Active' },
  { id: 'B005', name: 'Farhan Qureshi', phone: '+91 54321 09876', email: 'farhan.qureshi@gmail.com', units: ['Unit 007'], purchaseDate: '18 Apr 2026', kycComplete: false, kycMissing: ['PAN'], leaseStatus: 'Overdue' },
  { id: 'B006', name: 'Kavitha Subramaniam', phone: '+91 43210 98765', email: 'kavitha.sub@gmail.com', units: ['Unit 008', 'Unit 009'], purchaseDate: '22 Apr 2026', kycComplete: true, leaseStatus: 'Active' },
  { id: 'B007', name: 'Suresh Reddy Gundu', phone: '+91 32109 87654', email: 'suresh.reddy@gmail.com', units: ['Unit 010'], purchaseDate: '25 Apr 2026', kycComplete: true, leaseStatus: 'Active' },
  { id: 'B008', name: 'Deepa Krishnamurthy', phone: '+91 21098 76543', email: 'deepa.krish@gmail.com', units: ['Unit 011', 'Unit 012'], purchaseDate: '28 Apr 2026', kycComplete: true, leaseStatus: 'Active' },
  { id: 'B009', name: 'Anwar Ibrahim Shaikh', phone: '+91 10987 65432', email: 'anwar.shaikh@gmail.com', units: ['Unit 013'], purchaseDate: '02 May 2026', kycComplete: true, leaseStatus: 'Active' },
  { id: 'B010', name: 'Lakshmi Narayana Prasad', phone: '+91 99876 54321', email: 'lnprasad@gmail.com', units: ['Unit 014'], purchaseDate: '05 May 2026', kycComplete: true, leaseStatus: 'Active' },
  { id: 'B011', name: 'Ravi Shankar Iyengar', phone: '+91 88765 43210', email: 'ravi.iyengar@gmail.com', units: ['Unit 015'], purchaseDate: '08 May 2026', kycComplete: true, leaseStatus: 'Active' },
  { id: 'B012', name: 'Nandini Gopalachari', phone: '+91 77654 32109', email: 'nandini.gc@gmail.com', units: ['Unit 016', 'Unit 017'], purchaseDate: '12 May 2026', kycComplete: true, leaseStatus: 'Active' },
  { id: 'B013', name: 'Prakash Choudhary', phone: '+91 66543 21098', email: 'prakash.c@gmail.com', units: ['Unit 018'], purchaseDate: '15 May 2026', kycComplete: false, kycMissing: ['Address Proof'], leaseStatus: 'Active' },
  { id: 'B014', name: 'Zainab Fatima Khan', phone: '+91 55432 10987', email: 'zainab.khan@gmail.com', units: ['Unit 019'], purchaseDate: '18 May 2026', kycComplete: true, leaseStatus: 'Active' },
  { id: 'B015', name: 'Venkat Srinivas Rao', phone: '+91 44321 09876', email: 'venkat.rao@gmail.com', units: ['Unit 020', 'Unit 021'], purchaseDate: '22 May 2026', kycComplete: true, leaseStatus: 'Active' },
  { id: 'B016', name: 'Harish Babu Reddy', phone: '+91 33210 98765', email: 'harish.reddy@gmail.com', units: ['Unit 022'], purchaseDate: '25 May 2026', kycComplete: true, leaseStatus: 'Active' },
  { id: 'B017', name: 'Smitha Patel', phone: '+91 22109 87654', email: 'smitha.patel@gmail.com', units: ['Unit 023'], purchaseDate: '28 May 2026', kycComplete: true, leaseStatus: 'Active' },
  { id: 'B018', name: 'Girish Malhotra', phone: '+91 11098 76543', email: 'girish.malhotra@gmail.com', units: ['Unit 024'], purchaseDate: '01 Jun 2026', kycComplete: true, leaseStatus: 'Active' },
  { id: 'B019', name: 'Pooja Desai', phone: '+91 99765 43210', email: 'pooja.desai@gmail.com', units: ['Unit 025'], purchaseDate: '05 Jun 2026', kycComplete: true, leaseStatus: 'Active' },
  { id: 'B020', name: 'Sanjay Mehrotra', phone: '+91 88654 32109', email: 'sanjay.mehrotra@gmail.com', units: ['Unit 026', 'Unit 027'], purchaseDate: '08 Jun 2026', kycComplete: true, leaseStatus: 'Active' },
  { id: 'B021', name: 'Usha Rangarajan', phone: '+91 77543 21098', email: 'usha.rangan@gmail.com', units: ['Unit 028'], purchaseDate: '12 Jun 2026', kycComplete: true, leaseStatus: 'Active' },
];

const buyerByUnit: Record<string, BuyerDef> = {};
buyerDefs.forEach((b) => b.units.forEach((u) => { buyerByUnit[u] = b; }));

// Lease dates per unit (purchase date + ~1 month = lease start)
const leaseStartMap: Record<string, string> = {
  'Unit 001': '01 May 2026', 'Unit 002': '01 May 2026', 'Unit 003': '05 May 2026',
  'Unit 004': '08 May 2026', 'Unit 005': '08 May 2026', 'Unit 006': '12 May 2026',
  'Unit 007': '15 May 2026', 'Unit 008': '19 May 2026', 'Unit 009': '19 May 2026',
  'Unit 010': '22 May 2026', 'Unit 011': '25 May 2026', 'Unit 012': '25 May 2026',
  'Unit 013': '28 May 2026', 'Unit 014': '28 May 2026', 'Unit 015': '01 Jun 2026',
  'Unit 016': '05 Jun 2026', 'Unit 017': '05 Jun 2026', 'Unit 018': '12 Jun 2026',
  'Unit 019': '15 Jun 2026', 'Unit 020': '22 Jun 2026', 'Unit 021': '22 Jun 2026',
  'Unit 022': '25 Jun 2026', 'Unit 023': '28 Jun 2026', 'Unit 024': '01 Jul 2026',
  'Unit 025': '05 Jul 2026', 'Unit 026': '08 Jul 2026', 'Unit 027': '08 Jul 2026',
  'Unit 028': '12 Jul 2026',
};

const leaseEndMap: Record<string, string> = {
  'Unit 001': '30 Apr 2031', 'Unit 002': '30 Apr 2031', 'Unit 003': '04 May 2031',
  'Unit 004': '07 May 2031', 'Unit 005': '07 May 2031', 'Unit 006': '11 May 2031',
  'Unit 007': '14 May 2031', 'Unit 008': '18 May 2031', 'Unit 009': '18 May 2031',
  'Unit 010': '21 May 2031', 'Unit 011': '24 May 2031', 'Unit 012': '24 May 2031',
  'Unit 013': '27 May 2031', 'Unit 014': '27 May 2031', 'Unit 015': '30 Jun 2031',
  'Unit 016': '04 Jul 2031', 'Unit 017': '04 Jul 2031', 'Unit 018': '11 Jul 2031',
  'Unit 019': '14 Jul 2031', 'Unit 020': '21 Jul 2031', 'Unit 021': '21 Jul 2031',
  'Unit 022': '24 Jul 2031', 'Unit 023': '27 Jul 2031', 'Unit 024': '30 Jul 2031',
  'Unit 025': '04 Aug 2031', 'Unit 026': '07 Aug 2031', 'Unit 027': '07 Aug 2031',
  'Unit 028': '11 Aug 2031',
};

const nextEscalationMap: Record<string, { date: string; amount: number }> = {};
Object.keys(leaseStartMap).forEach((unit) => {
  const ls = leaseStartMap[unit];
  const parts = ls.split(' ');
  nextEscalationMap[unit] = { date: `${parts[0]} ${parts[1]} 2027`, amount: 28350 };
});

export function getUnitStatus(index: number): UnitStatus {
  if (index < 28) {
    const label = `Unit ${String(index + 1).padStart(3, '0')}`;
    if (label === 'Unit 007') return 'overdue';
    if (label === 'Unit 018') return 'sold';
    return 'sold';
  }
  if (index === 28) return 'reserved';
  return 'available';
}

export const units: Unit[] = Array.from({ length: 40 }, (_, i) => {
  const label = `Unit ${String(i + 1).padStart(3, '0')}`;
  const status = getUnitStatus(i);
  const buyerDef = buyerByUnit[label];
  const isSold = status === 'sold' || status === 'overdue';
  const lastPaymentStatus: PaymentStatus = status === 'overdue' ? 'Overdue' : 'Paid';
  return {
    id: `U${String(i + 1).padStart(3, '0')}`,
    label,
    sizeSqYards: PROJECT.unitSizeSqYards,
    sizeSqft: UNIT_SIZE_SQFT,
    status,
    buyerName: buyerDef?.name,
    buyerId: buyerDef?.id,
    buyerPhone: buyerDef?.phone,
    monthlyReturn: isSold ? PROJECT.monthlyReturn : undefined,
    purchaseDate: buyerDef?.purchaseDate,
    purchasePrice: isSold ? PROJECT.unitPrice : undefined,
    leaseStart: leaseStartMap[label],
    leaseEnd: leaseEndMap[label],
    lastPaymentDate: isSold ? '01 Sep 2026' : undefined,
    lastPaymentStatus: isSold ? lastPaymentStatus : undefined,
    saleDeedUploaded: isSold && buyerDef?.kycComplete,
    kycUploaded: isSold && buyerDef?.kycComplete,
  };
});

const fullPaymentHistory = (buyerId: string): { month: string; amount: number; status: PaymentStatus; paymentDate: string }[] => {
  const buyer = buyerDefs.find((b) => b.id === buyerId);
  const isOverdue = buyer?.leaseStatus === 'Overdue';
  const ls = leaseStartMap[buyer?.units[0] || ''];
  if (!ls) return [];
  const startMonth = parseInt(ls.split(' ')[0]);
  const startMonthName = ls.split(' ')[1];
  const monthNames = ['May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const startIdx = monthNames.indexOf(startMonthName);
  const history: { month: string; amount: number; status: PaymentStatus; paymentDate: string }[] = [];
  for (let m = 0; m <= 4 - startIdx && m >= 0; m++) {
    const mIdx = startIdx + m;
    if (mIdx > 4) break;
    const monthLabel = `${monthNames[mIdx]} 2026`;
    const isCurrent = mIdx === 4;
    const isPastDue = isOverdue && (mIdx >= 3);
    if (isPastDue) {
      history.push({ month: monthLabel, amount: 27000, status: 'Overdue', paymentDate: '—' });
    } else if (isCurrent && !isOverdue) {
      history.push({ month: monthLabel, amount: 27000, status: 'Paid', paymentDate: `01 ${monthNames[mIdx]} 2026` });
    } else {
      history.push({ month: monthLabel, amount: 27000, status: 'Paid', paymentDate: `01 ${monthNames[mIdx]} 2026` });
    }
  }
  return history.slice(-6);
};

export const buyers: Buyer[] = buyerDefs.map((b) => ({
  id: b.id,
  name: b.name,
  phone: b.phone,
  email: b.email,
  unitsOwned: b.units,
  purchaseDate: b.purchaseDate,
  investment: b.units.length * PROJECT.unitPrice,
  leaseStatus: b.leaseStatus,
  documents: b.kycComplete ? 'Sale Deed' : 'KYC Pending',
  docsVerified: b.kycComplete,
  kyc: {
    aadhaar: !b.kycMissing?.includes('Aadhaar'),
    pan: !b.kycMissing?.includes('PAN'),
    addressProof: !b.kycMissing?.includes('Address Proof'),
  },
  paymentHistory: fullPaymentHistory(b.id),
}));

// Payments — Sep 2026
const paidUnits = ['Unit 001', 'Unit 002', 'Unit 003', 'Unit 004', 'Unit 005', 'Unit 006',
  'Unit 008', 'Unit 009', 'Unit 010', 'Unit 011', 'Unit 012', 'Unit 013'];
const overdueUnit = 'Unit 007';

export const payments: Payment[] = Array.from({ length: 28 }, (_, i) => {
  const label = `Unit ${String(i + 1).padStart(3, '0')}`;
  const buyerDef = buyerByUnit[label];
  if (!buyerDef) return null as any;
  const isPaid = paidUnits.includes(label);
  const isOverdue = label === overdueUnit;
  const status: PaymentStatus = isOverdue ? 'Overdue' : isPaid ? 'Paid' : 'Pending';
  const dueDay = leaseStartMap[label]?.split(' ')[0] || '01';
  return {
    id: `P${String(i + 1).padStart(3, '0')}`,
    unitId: label,
    buyerName: buyerDef.name,
    amount: PROJECT.monthlyReturn,
    dueDate: `${dueDay} Sep 2026`,
    paidDate: isPaid ? `${parseInt(dueDay) - 1} Sep 2026` : undefined,
    status,
    daysOverdue: isOverdue ? 14 : undefined,
  };
}).filter(Boolean);

export const monthlyTrends: MonthlyTrend[] = [
  { month: 'Apr', dues: 2.16, collected: 2.16 },
  { month: 'May', dues: 3.78, collected: 3.78 },
  { month: 'Jun', dues: 5.40, collected: 5.40 },
  { month: 'Jul', dues: 6.48, collected: 6.48 },
  { month: 'Aug', dues: 7.29, collected: 7.02 },
  { month: 'Sep', dues: 7.56, collected: 3.51 },
];

export const forecastData: ForecastRow[] = [
  { month: 'Oct 2026', unitsActive: 29, baseLiability: 783000, escalation: 0, netLiability: 783000, camIncome: 81000, netPosition: -702000 },
  { month: 'Nov 2026', unitsActive: 30, baseLiability: 810000, escalation: 0, netLiability: 810000, camIncome: 81000, netPosition: -729000 },
  { month: 'Dec 2026', unitsActive: 32, baseLiability: 864000, escalation: 0, netLiability: 864000, camIncome: 81000, netPosition: -783000 },
  { month: 'Jan 2027', unitsActive: 34, baseLiability: 918000, escalation: 0, netLiability: 918000, camIncome: 81000, netPosition: -837000 },
  { month: 'Feb 2027', unitsActive: 36, baseLiability: 972000, escalation: 0, netLiability: 972000, camIncome: 81000, netPosition: -891000 },
  { month: 'Mar 2027', unitsActive: 38, baseLiability: 1026000, escalation: 0, netLiability: 1026000, camIncome: 81000, netPosition: -945000 },
  { month: 'Apr 2027', unitsActive: 40, baseLiability: 1080000, escalation: 0, netLiability: 1080000, camIncome: 81000, netPosition: -999000 },
  { month: 'May 2027', unitsActive: 40, baseLiability: 1080000, escalation: 37800, netLiability: 1117800, camIncome: 81000, netPosition: -1036800 },
];

// Contracts — top 8 shown
export const contracts: Contract[] = Array.from({ length: 8 }, (_, i) => {
  const label = `Unit ${String(i + 1).padStart(3, '0')}`;
  const buyerDef = buyerByUnit[label];
  if (!buyerDef) return null as any;
  const ls = leaseStartMap[label];
  const le = leaseEndMap[label];
  const esc = nextEscalationMap[label];
  const isOverdue = label === 'Unit 007';
  return {
    id: `LC${String(i + 1).padStart(3, '0')}`,
    unit: label,
    unitSizeSqYards: 25,
    unitSizeSqft: UNIT_SIZE_SQFT,
    buyer: buyerDef.name,
    buyerPhone: buyerDef.phone,
    leaseStart: ls,
    leaseEnd: le,
    monthlyReturn: 27000,
    escalation: '5% pa',
    status: isOverdue ? 'Overdue' : 'Active',
    lockInYears: 3,
    totalLeaseValue: 1620000,
    unitPurchasePrice: 1800000,
    nextEscalationDate: esc.date,
    nextEscalationAmount: esc.amount,
    paymentHistory: fullPaymentHistory(buyerDef.id).slice(0, 3),
  };
}).filter(Boolean);

// IFRS 16 data — 10.5% implicit rate
const IMPLICIT_RATE_MONTHLY = 0.00875;
const NIL_AT_INCEPTION = 1245915;
const UNEARNED_INCOME = 374085;
const CARRYING_VALUE = 1164003;
const INTEREST_INCOME_SEP = 10331;
const PRINCIPAL_SEP = 16669;

export const ifrs16Data: IFRS16Row[] = Array.from({ length: 28 }, (_, i) => {
  const label = `Unit ${String(i + 1).padStart(3, '0')}`;
  const buyerDef = buyerByUnit[label];
  if (!buyerDef) return null as any;
  const contractId = `LC${String(i + 1).padStart(3, '0')}`;
  return {
    contract: contractId,
    unit: label,
    buyer: buyerDef.name,
    leaseTerm: 60,
    monthlyPayment: 27000,
    implicitRate: '10.5% pa',
    nilAtInception: NIL_AT_INCEPTION,
    unearnedFinanceIncome: UNEARNED_INCOME,
    carryingValue: CARRYING_VALUE,
  };
}).filter(Boolean);

export const ifrs16Totals = {
  nilAtInception: 28 * NIL_AT_INCEPTION,
  unearnedFinanceIncome: 28 * UNEARNED_INCOME,
  carryingValue: 28 * CARRYING_VALUE,
  monthlyPayment: 28 * 27000,
  financeIncomeSep: 28 * INTEREST_INCOME_SEP,
  unearnedRemaining: 28 * 321717,
  activeCount: 28,
};

export function generateAmortisationSchedule(contractId: string): AmortisationRow[] {
  const schedule: AmortisationRow[] = [];
  let openingNIL = NIL_AT_INCEPTION;
  const idx = contracts.findIndex((c) => c.id === contractId);
  const monthNames = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
  for (let m = 0; m < 60; m++) {
    const interestIncome = Math.round(openingNIL * IMPLICIT_RATE_MONTHLY);
    const principalRepayment = 27000 - interestIncome;
    const closingNIL = openingNIL - principalRepayment;
    const monthLabel = `${monthNames[m % 12]} ${2026 + Math.floor(m / 12)}`;
    schedule.push({ month: m + 1, monthLabel, openingNIL, leaseReceipt: 27000, interestIncome, principalRepayment, closingNIL });
    openingNIL = closingNIL;
  }
  return schedule;
}

export const ifrs16Classification: {
  contractId: string;
  unit: string;
  buyer: string;
  criteria: { label: string; pass: boolean }[];
  result: string;
  basis: string;
}[] = Array.from({ length: 28 }, (_, i) => {
  const label = `Unit ${String(i + 1).padStart(3, '0')}`;
  const buyerDef = buyerByUnit[label];
  if (!buyerDef) return null;
  const contractId = `LC${String(i + 1).padStart(3, '0')}`;
  return {
    contractId,
    unit: label,
    buyer: buyerDef.name,
    criteria: [
      { label: 'Lease transfers ownership at end of term', pass: true },
      { label: 'Lessee has purchase option at favourable price', pass: true },
      { label: 'Lease term is major part of asset economic life (5 of est. 30 yrs = 17%)', pass: true },
      { label: 'PV of lease payments ≈ substantially all of fair value (₹12.46L PV / ₹18L FV = 69%)', pass: true },
      { label: 'Asset is specialised — no alternative use for lessor', pass: true },
    ],
    result: 'FINANCE LEASE',
    basis: 'PV of minimum lease payments equals substantially all of the fair value of the leased asset',
  };
}).filter(Boolean) as {
  contractId: string;
  unit: string;
  buyer: string;
  criteria: { label: string; pass: boolean }[];
  result: string;
  basis: string;
}[];

export const renewals: RenewalRecord[] = [];

export const renewalInfo = {
  emptyMessage: 'No lease renewals due in the next 12 months.',
  earliestRenewal: 'LC001 (Unit 001 — Rajesh Kumar Agarwal) expires 30 Apr 2031',
  firstEscalation: '01 May 2027',
  firstEscalationAmount: '₹27,000 → ₹28,350 (+5%)',
  countdownDays: 214,
};

export const cashFlowData: CashFlowRow[] = [
  { month: 'Apr 2026', inflow: 216000, outflow: 81000, net: 135000 },
  { month: 'May 2026', inflow: 378000, outflow: 81000, net: 297000 },
  { month: 'Jun 2026', inflow: 540000, outflow: 81000, net: 459000 },
  { month: 'Jul 2026', inflow: 648000, outflow: 81000, net: 567000 },
  { month: 'Aug 2026', inflow: 702000, outflow: 81000, net: 621000 },
  { month: 'Sep 2026', inflow: 351000, outflow: 81000, net: 270000 },
];

export const projects: ProjectData[] = [
  { id: 'P001', name: 'Skyline Commerce Hub — Block A', location: 'Gachibowli, Hyderabad', developer: 'Skyline Ventures Pvt. Ltd.', totalAreaSqYards: 1000, unitSizeSqYards: 25, unitPrice: 1800000, monthlyReturn: 27000, totalUnits: 40, startDate: '01 Apr 2026' },
];

export const alerts: AlertItem[] = [
  { id: 'A1', severity: 'critical', title: 'Duplicate invoice detected', message: 'INV-2026-047 from Sai Constructions. ₹3,20,000 at risk.', action: 'Review Now' },
  { id: 'A2', severity: 'critical', title: 'Overdue — Unit 007', message: 'Farhan Qureshi · ₹54,000 overdue (2 months). KYC also incomplete.', action: 'Send Legal Notice' },
  { id: 'A3', severity: 'warning', title: 'Approval needed', message: '3 vendor invoices awaiting approval (₹1,51,500 total). Oldest: 5 days.', action: 'Approve' },
  { id: 'A4', severity: 'warning', title: 'KYC incomplete', message: '2 buyers: Farhan Qureshi (PAN missing), Prakash Choudhary (Address proof).', action: 'Send Reminder' },
  { id: 'A5', severity: 'info', title: 'Sales opportunity', message: '11 units still available. At current pace, full sellout by Jan 2027. Monthly liability will peak at ₹10,80,000.', action: 'View Forecast' },
];

export function formatINR(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatINRFull(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export const KPI_DATA = {
  totalUnits: 40,
  soldUnits: 28,
  reservedUnits: 1,
  availableUnits: 11,
  monthlyPayoutLiability: 756000,
  collectionRate: 96.4,
  collectedThisMonth: 351000,
  overdueCount: 1,
  overdueAmount: 54000,
  lastMonthCollectionRate: 96.3,
  lastMonthOverdue: 0,
  totalBuyers: 28,
  multiUnitBuyers: 7,
  kycComplete: 19,
  kycPending: 2,
  totalInvestment: 50400000,
};

export function sqYardsToSqft(sqYards: number): number {
  return Math.round(sqYards * SQ_YARD_TO_SQFT * 10) / 10;
}

export function getInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

// Portal data — B001 Rajesh Kumar Agarwal (2 units)
export const portalBuyer = buyers[0];

export const portalDocuments = [
  { name: 'Sale Deed — Unit 001.pdf', type: 'Sale Deed' },
  { name: 'Sale Deed — Unit 002.pdf', type: 'Sale Deed' },
  { name: 'Leaseback Agreement — LC001.pdf', type: 'Leaseback Agreement' },
  { name: 'Leaseback Agreement — LC002.pdf', type: 'Leaseback Agreement' },
  { name: 'Ownership Certificate — SKY-FOC-2026-001.pdf', type: 'Ownership Certificate' },
  { name: 'KYC Acknowledgement.pdf', type: 'KYC' },
];

export const ownershipCertificate = {
  certNo: 'SKY-FOC-2026-001',
  issueDate: '10 April 2026',
  owner: 'Rajesh Kumar Agarwal',
  sonOf: 'Sri Mohan Lal Agarwal',
  address: 'Flat 4B, Prestige Heights, Banjara Hills, Hyderabad — 500034',
  units: ['Unit 001 — Skyline Commerce Hub, Block A'],
  area: '25 sq yards (225 sqft)',
  purchasePrice: 1800000,
  purchaseDate: '05 April 2026',
  saleDeedNo: 'SD/HYD/2026/4521',
  monthlyReturn: 27000,
  leasePeriod: '01 May 2026 to 30 April 2031 (5 years)',
  annualEscalation: '5% per annum',
  annualYield: '18% on purchase price',
  company: 'Skyline Ventures Pvt. Ltd.',
  cin: 'U70200TS2020PTC145678',
  signatory: 'Director — Operations',
};

// Invoice Portal data
export type InvoiceStatus = 'Paid' | 'Approved' | 'Pending' | 'Overdue' | 'Flagged' | 'Sent';
export type PoMatch = 'Matched' | 'Mismatch' | 'Duplicate';

export type APInvoice = {
  id: string;
  vendor: string;
  vendorId: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  poMatch: PoMatch;
  poNumber: string;
  grnNumber: string;
  status: InvoiceStatus;
  daysOverdue?: number;
  gstin: string;
  subtotal: number;
  gst: number;
  bank: string;
  accountNo: string;
  ifsc: string;
  poAmount: number;
  grnAmount: number;
  grnDate: string;
  poDate: string;
  items: string;
  grnSignedBy: string;
};

export const apInvoices: APInvoice[] = [
  { id: 'INV-2026-041', vendor: 'Sai Constructions Pvt. Ltd.', vendorId: 'V001', invoiceDate: '01 Sep 2026', dueDate: '30 Sep 2026', amount: 485000, poMatch: 'Matched', poNumber: 'PO-2026-031', grnNumber: 'GRN-2026-041', status: 'Approved', gstin: '36AABCS1234A1Z5', subtotal: 411017, gst: 73983, bank: 'HDFC Bank', accountNo: '50100987654321', ifsc: 'HDFC0001234', poAmount: 485000, grnAmount: 485000, grnDate: '31 Aug 2026', poDate: '15 Aug 2026', items: 'Civil & structural works', grnSignedBy: 'Site Manager' },
  { id: 'INV-2026-042', vendor: 'Hyderabad Electricals Co.', vendorId: 'V002', invoiceDate: '03 Sep 2026', dueDate: '02 Oct 2026', amount: 125000, poMatch: 'Matched', poNumber: 'PO-2026-032', grnNumber: 'GRN-2026-042', status: 'Approved', gstin: '36AABCH2345A1Z6', subtotal: 105932, gst: 19068, bank: 'SBI', accountNo: '3010024521', ifsc: 'SBIN0001234', poAmount: 125000, grnAmount: 125000, grnDate: '02 Sep 2026', poDate: '18 Aug 2026', items: 'Electrical fixtures & wiring', grnSignedBy: 'Site Manager' },
  { id: 'INV-2026-043', vendor: 'GreenScape Landscaping', vendorId: 'V003', invoiceDate: '05 Sep 2026', dueDate: '04 Oct 2026', amount: 42000, poMatch: 'Matched', poNumber: 'PO-2026-033', grnNumber: 'GRN-2026-043', status: 'Paid', gstin: '36AABCG3456A1Z7', subtotal: 35593, gst: 6407, bank: 'ICICI', accountNo: '6020102341', ifsc: 'ICIC0001234', poAmount: 42000, grnAmount: 42000, grnDate: '04 Sep 2026', poDate: '20 Aug 2026', items: 'Landscaping & horticulture', grnSignedBy: 'Facilities Manager' },
  { id: 'INV-2026-044', vendor: 'SecureZone Pvt. Ltd.', vendorId: 'V004', invoiceDate: '08 Sep 2026', dueDate: '07 Oct 2026', amount: 72000, poMatch: 'Matched', poNumber: 'PO-2026-034', grnNumber: 'GRN-2026-044', status: 'Approved', gstin: '36AABCS4567A1Z8', subtotal: 61017, gst: 10983, bank: 'Axis', accountNo: '9120108901', ifsc: 'UTIB0001234', poAmount: 72000, grnAmount: 72000, grnDate: '07 Sep 2026', poDate: '22 Aug 2026', items: 'Security services (monthly)', grnSignedBy: 'Facilities Manager' },
  { id: 'INV-2026-045', vendor: 'CleanCity Facility Mgmt', vendorId: 'V005', invoiceDate: '10 Sep 2026', dueDate: '09 Oct 2026', amount: 36000, poMatch: 'Matched', poNumber: 'PO-2026-035', grnNumber: 'GRN-2026-045', status: 'Pending', gstin: '36AABCC5678A1Z9', subtotal: 30508, gst: 5492, bank: 'BOB', accountNo: '1802003412', ifsc: 'BARB0001234', poAmount: 36000, grnAmount: 36000, grnDate: '09 Sep 2026', poDate: '25 Aug 2026', items: 'Housekeeping & sanitation', grnSignedBy: 'Facilities Manager' },
  { id: 'INV-2026-046', vendor: 'Lift Masters India', vendorId: 'V006', invoiceDate: '12 Sep 2026', dueDate: '11 Oct 2026', amount: 60000, poMatch: 'Mismatch', poNumber: 'PO-2026-036', grnNumber: 'GRN-2026-046', status: 'Pending', gstin: '36AABCL6789A1Z0', subtotal: 50847, gst: 9153, bank: 'HDFC Bank', accountNo: '50100987654321', ifsc: 'HDFC0005678', poAmount: 55000, grnAmount: 55000, grnDate: '11 Sep 2026', poDate: '28 Aug 2026', items: 'Elevator maintenance (revised scope)', grnSignedBy: 'Facilities Manager' },
  { id: 'INV-2026-047', vendor: 'Sai Constructions Pvt. Ltd.', vendorId: 'V001', invoiceDate: '15 Sep 2026', dueDate: '14 Oct 2026', amount: 320000, poMatch: 'Duplicate', poNumber: 'PO-2026-031', grnNumber: 'GRN-2026-041', status: 'Flagged', gstin: '36AABCS1234A1Z5', subtotal: 271186, gst: 48814, bank: 'HDFC Bank', accountNo: '50100987654321', ifsc: 'HDFC0001234', poAmount: 485000, grnAmount: 485000, grnDate: '31 Aug 2026', poDate: '15 Aug 2026', items: 'Duplicate — civil works', grnSignedBy: 'Site Manager' },
  { id: 'INV-2026-048', vendor: 'AquaPure Systems', vendorId: 'V007', invoiceDate: '18 Sep 2026', dueDate: '17 Oct 2026', amount: 28500, poMatch: 'Matched', poNumber: 'PO-2026-037', grnNumber: 'GRN-2026-048', status: 'Pending', gstin: '36AABCA7890A1Z1', subtotal: 24153, gst: 4347, bank: 'ICICI', accountNo: '6020105678', ifsc: 'ICIC0005678', poAmount: 28500, grnAmount: 28500, grnDate: '17 Sep 2026', poDate: '01 Sep 2026', items: 'Water treatment & plumbing', grnSignedBy: 'Site Manager' },
  { id: 'INV-2026-049', vendor: 'Hyderabad Electricals Co.', vendorId: 'V002', invoiceDate: '20 Sep 2026', dueDate: '19 Oct 2026', amount: 87500, poMatch: 'Matched', poNumber: 'PO-2026-038', grnNumber: 'GRN-2026-049', status: 'Pending', gstin: '36AABCH2345A1Z6', subtotal: 74153, gst: 13347, bank: 'SBI', accountNo: '3010024521', ifsc: 'SBIN0001234', poAmount: 87500, grnAmount: 87500, grnDate: '19 Sep 2026', poDate: '05 Sep 2026', items: 'Electrical upgrades', grnSignedBy: 'Site Manager' },
  { id: 'INV-2026-050', vendor: 'SecureZone Pvt. Ltd.', vendorId: 'V004', invoiceDate: '22 Sep 2026', dueDate: '21 Oct 2026', amount: 72000, poMatch: 'Matched', poNumber: 'PO-2026-039', grnNumber: 'GRN-2026-050', status: 'Approved', gstin: '36AABCS4567A1Z8', subtotal: 61017, gst: 10983, bank: 'Axis', accountNo: '9120108901', ifsc: 'UTIB0001234', poAmount: 72000, grnAmount: 72000, grnDate: '21 Sep 2026', poDate: '08 Sep 2026', items: 'Security services (Oct)', grnSignedBy: 'Facilities Manager' },
];

export type ARInvoice = {
  id: string;
  billedTo: string;
  month: string;
  invoiceDate: string;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
};

export const arInvoices: ARInvoice[] = [
  { id: 'AR-2026-001', billedTo: 'RealSpace Operations Pvt. Ltd.', month: 'Apr 2026', invoiceDate: '01 Apr 2026', amount: 81000, dueDate: '15 Apr 2026', status: 'Paid' },
  { id: 'AR-2026-002', billedTo: 'RealSpace Operations Pvt. Ltd.', month: 'May 2026', invoiceDate: '01 May 2026', amount: 81000, dueDate: '15 May 2026', status: 'Paid' },
  { id: 'AR-2026-003', billedTo: 'RealSpace Operations Pvt. Ltd.', month: 'Jun 2026', invoiceDate: '01 Jun 2026', amount: 81000, dueDate: '15 Jun 2026', status: 'Paid' },
  { id: 'AR-2026-004', billedTo: 'RealSpace Operations Pvt. Ltd.', month: 'Jul 2026', invoiceDate: '01 Jul 2026', amount: 81000, dueDate: '15 Jul 2026', status: 'Paid' },
  { id: 'AR-2026-005', billedTo: 'RealSpace Operations Pvt. Ltd.', month: 'Aug 2026', invoiceDate: '01 Aug 2026', amount: 81000, dueDate: '15 Aug 2026', status: 'Paid' },
  { id: 'AR-2026-006', billedTo: 'RealSpace Operations Pvt. Ltd.', month: 'Sep 2026', invoiceDate: '01 Sep 2026', amount: 81000, dueDate: '15 Oct 2026', status: 'Sent' },
];

export type Vendor = {
  id: string;
  name: string;
  category: string;
  gstin: string;
  phone: string;
  bank: string;
  accountNo: string;
  totalPaidYTD: number;
  status: 'Active' | 'Watch';
  watchReason?: string;
  avgProcessingDays: number;
  invoiceHistory: { id: string; amount: number; date: string; status: string }[];
};

export const vendors: Vendor[] = [
  { id: 'V001', name: 'Sai Constructions Pvt. Ltd.', category: 'Civil & Structural', gstin: '36AABCS1234A1Z5', phone: '+91 98001 11111', bank: 'HDFC', accountNo: '••••4321', totalPaidYTD: 2450000, status: 'Watch', watchReason: 'Duplicate invoice risk detected — INV-2026-047 matches INV-2026-039. Review all invoices before next payment.', avgProcessingDays: 7, invoiceHistory: [
    { id: 'INV-2026-047', amount: 320000, date: '15 Sep 2026', status: 'Flagged' },
    { id: 'INV-2026-041', amount: 485000, date: '01 Sep 2026', status: 'Approved' },
  ]},
  { id: 'V002', name: 'Hyderabad Electricals Co.', category: 'Electrical Works', gstin: '36AABCH2345A1Z6', phone: '+91 98002 22222', bank: 'SBI', accountNo: '••••4521', totalPaidYTD: 875000, status: 'Active', avgProcessingDays: 5, invoiceHistory: [
    { id: 'INV-2026-049', amount: 87500, date: '20 Sep 2026', status: 'Pending' },
    { id: 'INV-2026-042', amount: 125000, date: '03 Sep 2026', status: 'Approved' },
  ]},
  { id: 'V003', name: 'GreenScape Landscaping', category: 'Landscaping & Horticulture', gstin: '36AABCG3456A1Z7', phone: '+91 98003 33333', bank: 'ICICI', accountNo: '••••2341', totalPaidYTD: 185000, status: 'Active', avgProcessingDays: 3, invoiceHistory: [
    { id: 'INV-2026-043', amount: 42000, date: '05 Sep 2026', status: 'Paid' },
  ]},
  { id: 'V004', name: 'SecureZone Pvt. Ltd.', category: 'Security Services', gstin: '36AABCS4567A1Z8', phone: '+91 98004 44444', bank: 'Axis', accountNo: '••••8901', totalPaidYTD: 432000, status: 'Active', avgProcessingDays: 4, invoiceHistory: [
    { id: 'INV-2026-050', amount: 72000, date: '22 Sep 2026', status: 'Approved' },
    { id: 'INV-2026-044', amount: 72000, date: '08 Sep 2026', status: 'Approved' },
  ]},
  { id: 'V005', name: 'CleanCity Facility Mgmt', category: 'Housekeeping & Sanitation', gstin: '36AABCC5678A1Z9', phone: '+91 98005 55555', bank: 'BOB', accountNo: '••••3412', totalPaidYTD: 216000, status: 'Active', avgProcessingDays: 3, invoiceHistory: [
    { id: 'INV-2026-045', amount: 36000, date: '10 Sep 2026', status: 'Pending' },
  ]},
  { id: 'V006', name: 'Lift Masters India', category: 'Elevator Maintenance', gstin: '36AABCL6789A1Z0', phone: '+91 98006 66666', bank: 'HDFC', accountNo: '••••6543', totalPaidYTD: 360000, status: 'Active', avgProcessingDays: 5, invoiceHistory: [
    { id: 'INV-2026-046', amount: 60000, date: '12 Sep 2026', status: 'Pending' },
  ]},
  { id: 'V007', name: 'AquaPure Systems', category: 'Water Treatment & Plumbing', gstin: '36AABCA7890A1Z1', phone: '+91 98007 77777', bank: 'ICICI', accountNo: '••••5678', totalPaidYTD: 145000, status: 'Active', avgProcessingDays: 4, invoiceHistory: [
    { id: 'INV-2026-048', amount: 28500, date: '18 Sep 2026', status: 'Pending' },
  ]},
];

export const recentActivity = [
  { time: '2 hrs ago', text: 'INV-2026-049 uploaded · Auto-extracted · Pending approval', type: 'info' },
  { time: 'Yesterday', text: 'INV-2026-042 approved · ₹1,25,000 · Hyderabad Electricals Co.', type: 'success' },
  { time: '2 days ago', text: 'Duplicate flagged: INV-2026-047 matches INV-2026-039 (Sai Constructions)', type: 'error' },
  { time: '3 days ago', text: 'CAM invoice AR-2026-006 sent to RealSpace Operations', type: 'info' },
  { time: '5 days ago', text: 'INV-2026-043 paid · ₹42,000 · GreenScape Landscaping', type: 'success' },
];

export const invoiceKPIs = {
  openAPBalance: 1170000,
  openAPCount: 9,
  overdueAP: 0,
  overdueAPCount: 0,
  avgDPO: 28,
  camReceivable: 81000,
  recoverableValue: 320000,
  reconMismatches: 1,
};
