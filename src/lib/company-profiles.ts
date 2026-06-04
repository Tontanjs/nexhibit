import type { Employer } from "@/lib/mock-data";

export type CompanyProfile = {
  origin: string;
  salaryRange: string;
  openRoles: string[];
  idealCandidates: string[];
  benefits: string[];
  hiringProcess: string[];
  contactWindow: string;
};

export const companyProfiles: Record<Employer["id"], CompanyProfile> = {
  "emp-001": {
    origin: "Founded in Hangzhou, China. International teams support cloud, AI, data, and enterprise customers across Asia-Pacific markets.",
    salaryRange: "Internship: RMB 5,000-8,000/month. Graduate roles: RMB 18,000-28,000/month depending on role and city.",
    openRoles: ["Cloud solution intern", "AI product support analyst", "Data operations trainee", "Localization QA assistant"],
    idealCandidates: ["Python or data-analysis portfolio", "Clear English communication", "Mandarin HSK 4+ preferred", "Can explain technical work to non-technical users"],
    benefits: ["Cloud certification pathway", "Mentored enterprise project work", "International product exposure"],
    hiringProcess: ["Profile review", "Portfolio walkthrough", "Technical/product exercise", "Team interview"],
    contactWindow: "Usually replies within 1-2 business days after the fair.",
  },
  "emp-002": {
    origin: "Headquartered in Shenzhen, China. BYD International supports electric vehicle, battery, and new-energy expansion globally.",
    salaryRange: "Internship: RMB 4,500-7,000/month. Graduate roles: RMB 15,000-24,000/month plus project/location allowances.",
    openRoles: ["EV market research intern", "Technical documentation assistant", "Supply-chain analyst trainee", "Regional operations trainee"],
    idealCandidates: ["Engineering or business background", "Strong Excel and research skills", "Comfortable with technical vocabulary", "Interest in overseas mobility markets"],
    benefits: ["New-energy industry exposure", "Cross-border market projects", "Structured graduate rotation options"],
    hiringProcess: ["Profile review", "Business case discussion", "Language fit check", "Manager interview"],
    contactWindow: "Shortlist decisions are normally shared within one week.",
  },
  "emp-003": {
    origin: "Global fashion e-commerce group with major operations in Guangzhou, China and cross-border consumer markets.",
    salaryRange: "Internship: RMB 4,000-6,500/month. Graduate roles: RMB 12,000-20,000/month depending on operations or content track.",
    openRoles: ["E-commerce operations intern", "Content localization assistant", "Consumer research trainee", "Social commerce analyst"],
    idealCandidates: ["Business, language, or media background", "Understands regional customers", "Strong writing and spreadsheet habits", "Can work with fast-changing product content"],
    benefits: ["Fast product cycles", "International customer insight work", "Growth path into operations or localization"],
    hiringProcess: ["Profile review", "Writing/localization task", "Operations interview", "Final HR check"],
    contactWindow: "Recruiters usually follow up within 3-5 days.",
  },
  "emp-004": {
    origin: "Multinational engineering company with China teams across Suzhou, Shanghai, Wuxi, and other manufacturing hubs.",
    salaryRange: "Internship: RMB 5,000-8,500/month. Graduate roles: RMB 14,000-23,000/month depending on engineering function.",
    openRoles: ["Automation engineering intern", "Quality analysis trainee", "Process improvement assistant", "Supplier coordination intern"],
    idealCandidates: ["Mechatronics or automation foundation", "Strong technical English", "Careful documentation habits", "Comfortable with manufacturing context"],
    benefits: ["Industrial mentor support", "Hands-on process projects", "Clear multinational training standards"],
    hiringProcess: ["Profile review", "Technical documentation sample", "Engineer interview", "Team-fit interview"],
    contactWindow: "Technical teams usually respond within 2-4 business days.",
  },
  "emp-005": {
    origin: "Global industrial technology group with China operations in digital industries, infrastructure, and healthcare technology.",
    salaryRange: "Internship: RMB 5,000-8,000/month. Graduate roles: RMB 15,000-25,000/month depending on track.",
    openRoles: ["Industrial automation intern", "Smart infrastructure analyst", "Technical presentation assistant", "Healthcare technology support trainee"],
    idealCandidates: ["Structured problem solving", "Data or automation project evidence", "Confident presentation skills", "Able to coordinate across cultures"],
    benefits: ["Professional training system", "Cross-functional project work", "Exposure to smart infrastructure clients"],
    hiringProcess: ["Profile review", "Project presentation", "Technical conversation", "HR interview"],
    contactWindow: "Follow-ups are typically sent within one week.",
  },
  "emp-006": {
    origin: "Hangzhou startup building multilingual AI customer-support tools for exporters and cross-border sellers.",
    salaryRange: "Internship: RMB 3,500-6,000/month. Junior roles: RMB 10,000-18,000/month plus startup performance bonus.",
    openRoles: ["Prompt testing intern", "Localization QA assistant", "Customer research analyst", "Junior Python product tester"],
    idealCandidates: ["NLP or chatbot testing interest", "Multilingual communication", "Fast learner", "Comfortable giving precise product feedback"],
    benefits: ["Close founder access", "Fast feature ownership", "AI product portfolio evidence"],
    hiringProcess: ["Profile review", "Prompt QA task", "Founder interview", "Trial project"],
    contactWindow: "Often replies the same day during event week.",
  },
  "emp-007": {
    origin: "Ningbo robotics company serving warehouse automation projects across the Yangtze River Delta manufacturing network.",
    salaryRange: "Internship: RMB 4,500-7,500/month. Junior roles: RMB 12,000-20,000/month depending on field-testing ability.",
    openRoles: ["Robotics field-testing intern", "PLC documentation assistant", "Operations research trainee", "Technical support intern"],
    idealCandidates: ["Robotics or mechanical project evidence", "SolidWorks or PLC basics", "Careful field notes", "Willing to visit factories or warehouses"],
    benefits: ["Hands-on robotics exposure", "Field implementation experience", "Small-team responsibility"],
    hiringProcess: ["Profile review", "Project walkthrough", "Practical troubleshooting task", "Operations interview"],
    contactWindow: "Usually follows up within 48 hours for strong technical matches.",
  },
  "emp-008": {
    origin: "Shenzhen-based internet group with global products in cloud, games, social platforms, fintech, and digital entertainment.",
    salaryRange: "Internship: RMB 5,000-9,000/month. Graduate roles: RMB 18,000-32,000/month depending on product or engineering track.",
    openRoles: ["Product research intern", "Localization operations assistant", "TypeScript frontend trainee", "Community insights analyst"],
    idealCandidates: ["Product thinking with evidence", "TypeScript or data-analysis portfolio", "Understands international users", "Clear writing in English"],
    benefits: ["Large-scale product exposure", "International user research", "Strong technology mentorship"],
    hiringProcess: ["Profile review", "Portfolio/product case", "Team interview", "Final HR conversation"],
    contactWindow: "Shortlist updates usually arrive within 3 business days.",
  },
};
