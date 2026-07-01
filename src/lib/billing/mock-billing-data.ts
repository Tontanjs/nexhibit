import { currentEmployer } from "@/lib/current-employer";
import { currentStudent } from "@/lib/current-user";
import type {
  Invoice,
  PaymentMethodType,
  SavedPaymentMethod,
  Subscription,
  Transaction,
  TransactionStatus,
  UserType,
} from "@/lib/billing/types";

export const mockCurrentStudentSubscription: Subscription = {
  id: "sub_student_001",
  customerId: currentStudent.id,
  planId: "student_pro",
  status: "active",
  billingPeriod: "yearly",
  currentPeriodStart: "2026-03-30T00:00:00.000Z",
  currentPeriodEnd: "2027-03-30T00:00:00.000Z",
  cancelAtPeriodEnd: false,
  paymentMethodId: "pm_student_alipay",
  createdAt: "2026-03-30T00:00:00.000Z",
};

export const mockStudentPaymentMethods: SavedPaymentMethod[] = [
  {
    id: "pm_student_alipay",
    type: "alipay",
    label: "Alipay ending 8888",
    last4: "8888",
    brand: "Alipay",
    isDefault: true,
    addedAt: "2026-01-10T00:00:00.000Z",
  },
  {
    id: "pm_student_visa",
    type: "credit_card",
    label: "Visa ending 4242",
    last4: "4242",
    brand: "Visa",
    isDefault: false,
    expiresAt: "2029-04",
    addedAt: "2026-02-18T00:00:00.000Z",
  },
];

export const mockStudentTransactions: Transaction[] = [
  {
    id: "txn_stu_0005",
    customerId: currentStudent.id,
    subscriptionId: "sub_student_001",
    amountCny: 599,
    status: "succeeded",
    paymentMethod: "alipay",
    description: "Student Pro yearly renewal",
    createdAt: "2026-03-30T10:11:00.000Z",
    invoiceId: "inv_stu_0005",
  },
  {
    id: "txn_stu_0004",
    customerId: currentStudent.id,
    subscriptionId: "sub_student_001",
    amountCny: 199,
    status: "succeeded",
    paymentMethod: "alipay",
    description: "Student Pro semester trial",
    createdAt: "2026-02-12T09:34:00.000Z",
    invoiceId: "inv_stu_0004",
  },
  {
    id: "txn_stu_0003",
    customerId: currentStudent.id,
    subscriptionId: "sub_student_001",
    amountCny: 69,
    status: "succeeded",
    paymentMethod: "credit_card",
    description: "Upgrade to Student Pro monthly",
    createdAt: "2026-01-10T13:20:00.000Z",
    invoiceId: "inv_stu_0003",
  },
  {
    id: "txn_stu_0002",
    customerId: currentStudent.id,
    amountCny: 29,
    status: "succeeded",
    paymentMethod: "wechat_pay",
    description: "Student Plus monthly",
    createdAt: "2025-12-10T13:20:00.000Z",
    invoiceId: "inv_stu_0002",
  },
  {
    id: "txn_stu_0001",
    customerId: currentStudent.id,
    amountCny: 29,
    status: "succeeded",
    paymentMethod: "wechat_pay",
    description: "First Student Plus upgrade",
    createdAt: "2025-11-10T13:20:00.000Z",
    invoiceId: "inv_stu_0001",
  },
];

export const mockStudentInvoices: Invoice[] = mockStudentTransactions.map((transaction, index) => ({
  id: transaction.invoiceId ?? `inv_stu_${index + 1}`,
  invoiceNumber: `INV-2026-${String(index + 1).padStart(4, "0")}`,
  customerId: currentStudent.id,
  transactionId: transaction.id,
  amountCny: transaction.amountCny,
  taxCny: Math.round(transaction.amountCny * 0.06),
  type: "receipt",
  status: "paid",
  issuedAt: transaction.createdAt,
}));

export const mockStudentUsage = {
  applicationsThisMonth: 23,
  messagesThisMonth: 47,
  profileViewsThisMonth: 142,
  profileBoostsUsed: 8,
};

export const mockCurrentEmployerSubscription: Subscription = {
  id: "sub_employer_001",
  customerId: currentEmployer.id,
  planId: "employer_growth",
  status: "active",
  billingPeriod: "yearly",
  currentPeriodStart: "2025-10-30T00:00:00.000Z",
  currentPeriodEnd: "2026-10-30T00:00:00.000Z",
  cancelAtPeriodEnd: false,
  paymentMethodId: "pm_employer_bank",
  createdAt: "2025-10-30T00:00:00.000Z",
};

export const mockEmployerPaymentMethods: SavedPaymentMethod[] = [
  {
    id: "pm_employer_bank",
    type: "bank_transfer",
    label: "Bank Transfer default",
    brand: "China Merchants Bank",
    isDefault: true,
    addedAt: "2025-10-20T00:00:00.000Z",
  },
  {
    id: "pm_employer_unionpay",
    type: "unionpay",
    label: "UnionPay ending 2046",
    last4: "2046",
    brand: "UnionPay",
    isDefault: false,
    expiresAt: "2028-09",
    addedAt: "2026-01-05T00:00:00.000Z",
  },
  {
    id: "pm_employer_mastercard",
    type: "credit_card",
    label: "Mastercard ending 5555",
    last4: "5555",
    brand: "Mastercard",
    isDefault: false,
    expiresAt: "2030-01",
    addedAt: "2026-04-01T00:00:00.000Z",
  },
];

export const mockEmployerTransactions: Transaction[] = [
  {
    id: "txn_emp_0004",
    customerId: currentEmployer.id,
    subscriptionId: "sub_employer_001",
    amountCny: 12999,
    status: "succeeded",
    paymentMethod: "bank_transfer",
    description: "Employer Growth annual subscription",
    createdAt: "2025-10-30T11:00:00.000Z",
    invoiceId: "inv_emp_0004",
  },
  {
    id: "txn_emp_0003",
    customerId: currentEmployer.id,
    amountCny: 3999,
    status: "succeeded",
    paymentMethod: "unionpay",
    description: "Employer Starter annual subscription",
    createdAt: "2025-05-18T10:12:00.000Z",
    invoiceId: "inv_emp_0003",
  },
  {
    id: "txn_emp_0002",
    customerId: currentEmployer.id,
    amountCny: 999,
    status: "succeeded",
    paymentMethod: "credit_card",
    description: "Event analytics add-on",
    createdAt: "2025-03-11T07:42:00.000Z",
    invoiceId: "inv_emp_0002",
  },
  {
    id: "txn_emp_0001",
    customerId: currentEmployer.id,
    amountCny: 299,
    status: "succeeded",
    paymentMethod: "wechat_pay",
    description: "Starter evaluation pack",
    createdAt: "2025-01-21T15:08:00.000Z",
    invoiceId: "inv_emp_0001",
  },
];

export const mockEmployerInvoices: Invoice[] = mockEmployerTransactions.map((transaction, index) => ({
  id: transaction.invoiceId ?? `inv_emp_${index + 1}`,
  invoiceNumber: `FAP-2026-${String(index + 21).padStart(4, "0")}`,
  customerId: currentEmployer.id,
  transactionId: transaction.id,
  amountCny: transaction.amountCny,
  taxCny: Math.round(transaction.amountCny * 0.06),
  type: "fapiao",
  status: "paid",
  issuedAt: transaction.createdAt,
  companyName: currentEmployer.name,
  taxId: "91330100MA2NXHB001",
}));

export const mockEmployerUsage = {
  messagesSent: 134,
  profilesViewed: 1247,
  shortlistedStudents: 42,
  eventsAttended: 1,
};

export const mockMonthlyRevenue = [
  { month: "Jul", students: 3000, employers: 12000, university: 3000, total: 18000 },
  { month: "Aug", students: 4200, employers: 13500, university: 5000, total: 22700 },
  { month: "Sep", students: 5800, employers: 16000, university: 8000, total: 29800 },
  { month: "Oct", students: 7200, employers: 21000, university: 12000, total: 40200 },
  { month: "Nov", students: 9100, employers: 24500, university: 13000, total: 46600 },
  { month: "Dec", students: 10800, employers: 28000, university: 14000, total: 52800 },
  { month: "Jan", students: 12300, employers: 31500, university: 16000, total: 59800 },
  { month: "Feb", students: 14000, employers: 35000, university: 17000, total: 66000 },
  { month: "Mar", students: 16200, employers: 38500, university: 19000, total: 73700 },
  { month: "Apr", students: 17600, employers: 41000, university: 20500, total: 79100 },
  { month: "May", students: 18800, employers: 43000, university: 21600, total: 83400 },
  { month: "Jun", students: 19500, employers: 44200, university: 20800, total: 84500 },
];

type RecentTransaction = Transaction & {
  customerName: string;
  userType: UserType;
};

const statusCycle: TransactionStatus[] = ["succeeded", "succeeded", "succeeded", "pending", "failed", "refunded"];
const methodCycle: PaymentMethodType[] = ["alipay", "wechat_pay", "unionpay", "credit_card", "bank_transfer", "apple_pay"];
const customerNames = [
  currentStudent.name,
  "Nguyen Thi Minh Linh",
  "Ayesha Khan",
  currentEmployer.name,
  "BYD International",
  "Bosch China",
  "ZJUT International College",
  "SenseTime",
  "Geek+ Robotics",
  "Tencent Global",
];

export const mockRecentTransactions: RecentTransaction[] = Array.from({ length: 50 }, (_, index) => {
  const customerName = customerNames[index % customerNames.length];
  const userType: UserType = index % 7 === 0 ? "university" : index % 3 === 0 ? "employer" : "student";
  const amountCny = userType === "student" ? [29, 69, 199, 599][index % 4] : userType === "employer" ? [3999, 12999, 35999][index % 3] : [150000, 300000][index % 2];
  return {
    id: `txn_live_${String(index + 1).padStart(4, "0")}`,
    customerId: `cus_${index + 1}`,
    amountCny,
    status: statusCycle[index % statusCycle.length],
    paymentMethod: methodCycle[index % methodCycle.length],
    description: `${userType === "student" ? "Student plan" : userType === "employer" ? "Employer subscription" : "University license"} payment`,
    createdAt: `2026-${String((index % 6) + 1).padStart(2, "0")}-${String((index % 26) + 1).padStart(2, "0")}T09:00:00.000Z`,
    invoiceId: `inv_live_${String(index + 1).padStart(4, "0")}`,
    customerName,
    userType,
  };
});

export const mockTopCustomers = [
  { name: "ZJUT International College", plan: "University Standard", totalSpent: 300000, joinedDate: "2025-09-01" },
  { name: "Alibaba Cloud", plan: "Employer Scale", totalSpent: 35999, joinedDate: "2025-10-30" },
  { name: "BYD International", plan: "Employer Growth", totalSpent: 12999, joinedDate: "2025-11-12" },
  { name: "Bosch China", plan: "Employer Growth", totalSpent: 12999, joinedDate: "2025-12-08" },
  { name: "Tencent Global", plan: "Employer Growth", totalSpent: 12999, joinedDate: "2026-01-20" },
  { name: "Siemens China", plan: "Employer Starter", totalSpent: 3999, joinedDate: "2026-02-01" },
  { name: "SenseTime", plan: "Employer Starter", totalSpent: 3999, joinedDate: "2026-03-16" },
  { name: "Nattapong Saetang", plan: "Student Pro", totalSpent: 925, joinedDate: "2025-11-10" },
  { name: "Nguyen Thi Minh Linh", plan: "Student Max", totalSpent: 899, joinedDate: "2026-01-02" },
  { name: "Ayesha Khan", plan: "Student Pro", totalSpent: 599, joinedDate: "2026-02-14" },
];

export const mockKpis = {
  mrr: 84500,
  arr: 1014000,
  totalCustomers: 287,
  churnRate: 4.2,
  arpu: 295,
  paidConversion: 18.4,
};

export const mockPendingRefunds = [
  { id: "ref_001", customer: "SHEIN Global", amountCny: 999, reason: "Duplicate add-on order", requestedAt: "2026-06-25" },
  { id: "ref_002", customer: "Khalid Rahman", amountCny: 69, reason: "Changed to semester bundle", requestedAt: "2026-06-24" },
  { id: "ref_003", customer: "Geek+ Robotics", amountCny: 3999, reason: "Contract invoiced twice", requestedAt: "2026-06-22" },
  { id: "ref_004", customer: "Priya Mehta", amountCny: 199, reason: "University sponsor covered plan", requestedAt: "2026-06-20" },
  { id: "ref_005", customer: "ZJUT Design Lab", amountCny: 150000, reason: "Pilot moved to standard contract", requestedAt: "2026-06-18" },
  { id: "ref_006", customer: "SenseTime", amountCny: 299, reason: "Starter evaluation pack canceled", requestedAt: "2026-06-15" },
];
