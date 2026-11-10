/* Demo data for the TDV ERP clickable prototype. All names and figures are sample values. */
window.SEED = {
  users: {
    admin: { id: 'U-001', name: 'Afzalur Rahman', initials: 'AR', title: 'Country Director, Bangladesh Coordination Office', role: 'admin', email: 'admin@tdv.top5way.com', office: 'Bangladesh Coordination Office' },
    moderator: { id: 'U-014', name: 'Rafiqul Islam', initials: 'RI', title: 'Program Coordinator, Cox\'s Bazar', role: 'moderator', email: 'coordinator@tdv.top5way.com', office: 'Cox\'s Bazar Field Office' }
  },

  programs: [
    { id: 'PRG-01', dept: 'WFD', name: 'Ramadan & Qurban', lead: 'Shahadat Hossain', projects: 2, budget: 32500000, spent: 27800000 },
    { id: 'PRG-02', dept: 'CND', name: 'Construction & Water Wells', lead: 'Engr. Tariqul Alam', projects: 2, budget: 18600000, spent: 9100000 },
    { id: 'PRG-03', dept: 'EDU', name: 'Education & Scholarship', lead: 'Nusrat Jahan', projects: 2, budget: 12400000, spent: 7650000 },
    { id: 'PRG-04', dept: 'WFD', name: 'Emergency & Welfare', lead: 'Shahadat Hossain', projects: 2, budget: 19800000, spent: 8900000 },
    { id: 'PRG-05', dept: 'RAD', name: 'Religious Affairs', lead: 'Mawlana Abdul Karim', projects: 2, budget: 9080000, spent: 4300000 },
    { id: 'PRG-06', dept: 'MPC', name: 'Multipurpose Center & Skills', lead: 'Rokeya Begum', projects: 1, budget: 3600000, spent: 1450000 }
  ],

  projects: [
    { id: 'PRJ-2026-014', name: 'Ramadan Food Basket Distribution', program: 'PRG-01', donor: 'Ramadan Appeal 2026', camps: ['Camp 4', 'Camp 8E', 'Camp 13'], budget: 18500000, spent: 15900000, status: 'Ongoing', progress: 82, start: '2026-02-15', end: '2026-12-31', manager: 'Rafiqul Islam', beneficiaries: 12400, target: 15000, risk: 'Low' },
    { id: 'PRJ-2026-021', name: 'Tube-well & Latrine Rehabilitation', program: 'PRG-02', donor: 'TDV HQ Türkiye', camps: ['Camp 15', 'Camp 26'], budget: 11200000, spent: 5200000, status: 'Ongoing', progress: 46, start: '2026-04-01', end: '2027-03-31', manager: 'Kamal Hossain', beneficiaries: 6800, target: 9000, risk: 'Medium' },
    { id: 'PRJ-2026-027', name: 'Qurbani Meat Distribution', program: 'PRG-01', donor: 'Qurbani Fund 2026', camps: ['Camp 1W', 'Camp 4', 'Camp 15'], budget: 14000000, spent: 11900000, status: 'Completed', progress: 100, start: '2026-05-20', end: '2026-07-15', manager: 'Rafiqul Islam', beneficiaries: 21000, target: 20000, risk: 'Low' },
    { id: 'PRJ-2026-033', name: 'Learning Centre Support', program: 'PRG-03', donor: 'Education Endowment', camps: ['Camp 8E'], budget: 7400000, spent: 4900000, status: 'Ongoing', progress: 64, start: '2026-01-10', end: '2026-12-20', manager: 'Nusrat Jahan', beneficiaries: 1850, target: 2000, risk: 'Low' },
    { id: 'PRJ-2026-038', name: 'Winter Blanket & Kit Distribution', program: 'PRG-04', donor: 'Winter Appeal 2026', camps: ['Camp 13', 'Camp 26'], budget: 9800000, spent: 8900000, status: 'Ongoing', progress: 71, start: '2026-10-01', end: '2027-01-31', manager: 'Emre Kaya', beneficiaries: 5300, target: 8000, risk: 'High' },
    { id: 'PRJ-2026-041', name: 'Child-Friendly Space Expansion', program: 'PRG-03', donor: 'TDV HQ Türkiye', camps: ['Camp 1W'], budget: 5000000, spent: 2750000, status: 'Pending approval', progress: 0, start: '2026-12-01', end: '2027-11-30', manager: 'Nusrat Jahan', beneficiaries: 0, target: 1200, risk: 'Low' },
    { id: 'PRJ-2026-044', name: 'Nutrition Screening for Under-5', program: 'PRG-04', donor: 'Zakat Fund 2026', camps: ['Camp 4', 'Camp 15'], budget: 10000000, spent: 0, status: 'Draft', progress: 0, start: '2027-01-01', end: '2027-12-31', manager: 'Rafiqul Islam', beneficiaries: 0, target: 4500, risk: 'Medium' },
    { id: 'PRJ-2026-019', name: 'Water Network Extension', program: 'PRG-02', donor: 'TDV HQ Türkiye', camps: ['Camp 13'], budget: 7400000, spent: 3900000, status: 'On hold', progress: 38, start: '2026-03-01', end: '2026-12-31', manager: 'Kamal Hossain', beneficiaries: 2100, target: 6000, risk: 'High' },
    { id: 'PRJ-2026-047', name: 'Mosque & Madrasah Repair (Camp 15, Teknaf)', program: 'PRG-05', donor: 'TDV HQ Türkiye', camps: ['Camp 15', 'Teknaf'], budget: 6200000, spent: 2100000, status: 'Ongoing', progress: 35, start: '2026-09-01', end: '2027-02-28', manager: 'Mawlana Abdul Karim', beneficiaries: 3400, target: 9000, risk: 'Medium', partner: 'PTN-014' },
    { id: 'PRJ-2026-052', name: 'Imam & Muezzin Honorarium 2026', program: 'PRG-05', donor: 'Diyanet Fund 2026', camps: ['All camps'], budget: 2880000, spent: 2200000, status: 'Ongoing', progress: 83, start: '2026-01-01', end: '2026-12-31', manager: 'Mawlana Abdul Karim', beneficiaries: 12, target: 12, risk: 'Low' },
    { id: 'PRJ-2026-049', name: 'Soap Training Center', program: 'PRG-06', donor: 'TDV HQ Türkiye', camps: ['Ukhiya'], budget: 3600000, spent: 1450000, status: 'Ongoing', progress: 40, start: '2026-07-01', end: '2027-06-30', manager: 'Rokeya Begum', beneficiaries: 64, target: 120, risk: 'Low' }
  ],

  activities: [
    { project: 'PRJ-2026-014', name: 'Beneficiary list verification with CIC', due: '2026-10-20', status: 'Done', owner: 'Sabina Akter' },
    { project: 'PRJ-2026-014', name: 'Procure 3,000 food baskets (lot 3)', due: '2026-11-05', status: 'Delayed', owner: 'Tanvir Ahmed' },
    { project: 'PRJ-2026-014', name: 'Distribution round 3 - Camp 13', due: '2026-11-18', status: 'Planned', owner: 'Rafiqul Islam' },
    { project: 'PRJ-2026-014', name: 'Post-distribution monitoring survey', due: '2026-12-10', status: 'Planned', owner: 'Nadia Rahman' },
    { project: 'PRJ-2026-038', name: 'Blanket quality inspection', due: '2026-11-02', status: 'Delayed', owner: 'Emre Kaya' },
    { project: 'PRJ-2026-038', name: 'Distribution - Camp 26', due: '2026-11-25', status: 'Planned', owner: 'Emre Kaya' },
    { project: 'PRJ-2026-021', name: 'Site survey for 12 tube-wells', due: '2026-09-30', status: 'Done', owner: 'Kamal Hossain' },
    { project: 'PRJ-2026-021', name: 'Latrine rehabilitation batch 2', due: '2026-11-30', status: 'In progress', owner: 'Kamal Hossain' }
  ],

  distributions: [
    { id: 'DST-0311', project: 'PRJ-2026-014', camp: 'Camp 4', date: '2026-10-12', item: 'Food basket (25 kg)', qty: 2400, households: 2400, status: 'Completed' },
    { id: 'DST-0318', project: 'PRJ-2026-014', camp: 'Camp 8E', date: '2026-10-26', item: 'Food basket (25 kg)', qty: 2100, households: 2100, status: 'Completed' },
    { id: 'DST-0324', project: 'PRJ-2026-014', camp: 'Camp 13', date: '2026-11-18', item: 'Food basket (25 kg)', qty: 3000, households: 3000, status: 'Scheduled' },
    { id: 'DST-0326', project: 'PRJ-2026-038', camp: 'Camp 13', date: '2026-11-04', item: 'Winter kit + 2 blankets', qty: 1800, households: 1800, status: 'Completed' },
    { id: 'DST-0331', project: 'PRJ-2026-038', camp: 'Camp 26', date: '2026-11-25', item: 'Winter kit + 2 blankets', qty: 2700, households: 2700, status: 'Scheduled' }
  ],

  approvals: [
    { id: 'APR-1190', type: 'Requisition', req: 'REQ-2026-0041', title: 'REQ-2026-0041: Teaching materials for Learning Centre 3', project: 'PRJ-2026-033', requester: 'Abdul Hamid', amount: 0, date: '2026-11-06', chain: ['Coordinator / Asst. Coordinator', 'Program Coordinator', 'Country Director'], step: 1, status: 'Pending', budgetLine: 'Education materials', docs: [], priority: 'Normal', log: [['Coordinator / Asst. Coordinator', 'Nusrat Jahan', '2026-11-07']] },
    { id: 'APR-1189', type: 'Requisition', req: 'REQ-2026-0040', title: 'REQ-2026-0040: Repair materials for Camp 15 mosque roof', project: 'PRJ-2026-047', requester: 'Engr. Tariqul Alam', amount: 0, date: '2026-11-04', chain: ['Operation Coordinator', 'Country Director'], step: 1, status: 'Pending', budgetLine: 'Building materials', docs: ['RRRC-permission.pdf'], priority: 'High', log: [['Operation Coordinator', 'Hasan Mahmud', '2026-11-05']] },
    { id: 'APR-1188', type: 'Proposal', ppf: 'PPF-2026-019', title: 'PPF-2026-019: Winter Support for Host Community Elders', project: '-', requester: 'Cox\'s Bazar Islamic Welfare Society', amount: 3346960, date: '2026-11-03', chain: ['Program Coordinator', 'Country Director', 'HQ Approval'], step: 0, status: 'Pending', budgetLine: 'USD 27,322 (partner proposal)', docs: ['PPF-2026-019.pdf', 'Quotation-1.pdf', 'Quotation-2.pdf', 'Quotation-3.pdf'], priority: 'High' },
    { id: 'APR-1186', type: 'Requisition', req: 'REQ-2026-0038', title: 'REQ-2026-0038: Holy Qur\'an and prayer mats for 12 mosques', project: 'PRJ-2026-047', requester: 'Mawlana Abdul Karim', amount: 0, date: '2026-10-28', chain: ['Program Coordinator', 'Country Director'], step: 2, status: 'Approved', budgetLine: 'Religious materials', docs: [], priority: 'Normal', log: [['Program Coordinator', 'Rafiqul Islam', '2026-10-29'], ['Country Director', 'Afzalur Rahman', '2026-10-30']] },
    { id: 'APR-1185', type: 'Requisition', req: 'REQ-2026-0036', title: 'REQ-2026-0036: Blankets for widows and elders', project: 'PRJ-2026-038', requester: 'Shahadat Hossain', amount: 0, date: '2026-10-25', chain: ['Operation Coordinator', 'Country Director'], step: 0, status: 'Pending', budgetLine: 'NFI', docs: ['UP-list.xlsx'], priority: 'Normal' },
    { id: 'APR-1184', type: 'Requisition', req: 'REQ-2026-0033', title: 'REQ-2026-0033: Raw materials for Soap Training Center', project: 'PRJ-2026-049', requester: 'Jesmin Ara', amount: 0, date: '2026-10-20', chain: ['Multipurpose Center Coordinator', 'Program Coordinator', 'Country Director'], step: 1, status: 'Returned', budgetLine: 'Training materials', docs: [], priority: 'Normal', remark: 'Please split coconut oil by supplier and add the trainee list.' },
    { id: 'APR-1172', type: 'Proposal', ppf: 'PPF-2026-017', title: 'PPF-2026-017: Mosque & Madrasah Repair, Camp 15 and Teknaf', project: 'PRJ-2026-047', requester: 'Teknaf Rural Development Organisation', amount: 6260000, date: '2026-07-22', chain: ['Program Coordinator', 'Country Director', 'HQ Approval'], step: 3, status: 'Approved', budgetLine: 'USD 50,600', docs: ['PPF-2026-017.pdf', 'BOQ.xlsx', 'Architect-design.pdf'], priority: 'Normal' },
    { id: 'APR-1166', type: 'Proposal', ppf: 'PPF-2026-015', title: 'PPF-2026-015: Scholarship for CBIU / IIUC students', project: '-', requester: 'Ukhiya Education Trust', amount: 2660000, date: '2026-10-12', chain: ['Program Coordinator', 'Country Director', 'HQ Approval'], step: 2, status: 'Deferred', budgetLine: 'USD 21,720', docs: ['PPF-2026-015.pdf'], priority: 'Normal', remark: 'Defer to the 2027 budget cycle. Re-submit in January with the trustee list.' },
    { id: 'APR-1182', type: 'Purchase', title: 'PR-0457: 3,000 food baskets (lot 3)', project: 'PRJ-2026-014', requester: 'Tanvir Ahmed', amount: 4650000, date: '2026-11-06', chain: ['Program Coordinator', 'Finance Manager', 'Country Director', 'HQ Approval'], step: 0, status: 'Pending', budgetLine: 'Food items - 4,850,000 available', docs: ['PR-0457.pdf', 'Quotation-comparison.xlsx'], priority: 'High' },
    { id: 'APR-1179', type: 'Leave', title: 'Annual leave, 5 days (12-16 Nov)', project: '-', requester: 'Sabina Akter', amount: 0, date: '2026-11-05', chain: ['Program Coordinator', 'HR Manager'], step: 0, status: 'Pending', budgetLine: 'Leave balance: 11 days', docs: [], priority: 'Normal' },
    { id: 'APR-1176', type: 'Activity', title: 'Distribution round 3 plan - Camp 13', project: 'PRJ-2026-014', requester: 'Nadia Rahman', amount: 0, date: '2026-11-05', chain: ['Program Coordinator', 'RRRC / CiC'], step: 0, status: 'Pending', budgetLine: '-', docs: ['Distribution-plan-R3.pdf', 'Beneficiary-list-C13.xlsx'], priority: 'High' },
    { id: 'APR-1171', type: 'Payment', title: 'Payment to Karnaphuli Traders (INV-2231)', project: 'PRJ-2026-038', requester: 'Farhana Yasmin', amount: 2180000, date: '2026-11-04', chain: ['Program Coordinator', 'Finance Manager', 'Country Director'], step: 1, status: 'Pending', budgetLine: 'NFI - 2,600,000 available', docs: ['INV-2231.pdf', 'GRN-0912.pdf'], priority: 'Normal' },
    { id: 'APR-1168', type: 'Project', title: 'New project: Child-Friendly Space Expansion', project: 'PRJ-2026-041', requester: 'Nusrat Jahan', amount: 5000000, date: '2026-11-02', chain: ['Program Manager', 'Country Director', 'HQ Approval', 'RRRC / CiC'], step: 2, status: 'Pending', budgetLine: 'Program PRG-03 envelope', docs: ['Concept-note.pdf', 'Budget-CFS.xlsx', 'Logframe.pdf'], priority: 'Normal' },
    { id: 'APR-1163', type: 'Budget', title: 'Budget revision: Water Network Extension', project: 'PRJ-2026-019', requester: 'Kamal Hossain', amount: 850000, date: '2026-10-30', chain: ['Finance Manager', 'Country Director', 'HQ Approval'], step: 1, status: 'Pending', budgetLine: 'Reallocation from Construction to Materials', docs: ['Budget-revision-v2.xlsx'], priority: 'Normal' },
    { id: 'APR-1159', type: 'Recruitment', title: 'Hire 2 Field Facilitators (CFS)', project: 'PRJ-2026-041', requester: 'Nusrat Jahan', amount: 720000, date: '2026-10-28', chain: ['HR Manager', 'Country Director'], step: 1, status: 'Pending', budgetLine: 'Staff cost - 12 months', docs: ['JD-Field-Facilitator.pdf'], priority: 'Normal' },
    { id: 'APR-1150', type: 'Purchase', title: 'PR-0449: Hygiene kits 1,500 pcs', project: 'PRJ-2026-021', requester: 'Kamal Hossain', amount: 1950000, date: '2026-10-22', chain: ['Program Coordinator', 'Finance Manager', 'Country Director'], step: 3, status: 'Approved', budgetLine: 'Hygiene items', docs: ['PR-0449.pdf'], priority: 'Normal' },
    { id: 'APR-1144', type: 'Leave', title: 'Sick leave, 2 days', project: '-', requester: 'Tanvir Ahmed', amount: 0, date: '2026-10-19', chain: ['Program Coordinator', 'HR Manager'], step: 2, status: 'Approved', budgetLine: '-', docs: [], priority: 'Normal' },
    { id: 'APR-1139', type: 'Payment', title: 'Advance for Camp 26 logistics', project: 'PRJ-2026-038', requester: 'Emre Kaya', amount: 350000, date: '2026-10-15', chain: ['Program Coordinator', 'Finance Manager'], step: 1, status: 'Returned', budgetLine: 'Logistics', docs: [], priority: 'Normal', remark: 'Please attach the vehicle requisition.' },
    { id: 'APR-1131', type: 'Purchase', title: 'PR-0438: Office furniture', project: '-', requester: 'Farhana Yasmin', amount: 640000, date: '2026-10-08', chain: ['Finance Manager', 'Country Director'], step: 1, status: 'Rejected', budgetLine: 'Admin overhead', docs: [], priority: 'Normal', remark: 'Not in this year\'s plan.' }
  ],

  tasks: [
    { id: 'T-301', title: 'Finalize Camp 13 beneficiary list', project: 'PRJ-2026-014', owner: 'Sabina Akter', due: '2026-11-12', col: 'In progress', pri: 'High' },
    { id: 'T-302', title: 'Collect 3 quotations for food baskets', project: 'PRJ-2026-014', owner: 'Tanvir Ahmed', due: '2026-11-08', col: 'Review', pri: 'High' },
    { id: 'T-303', title: 'Prepare October donor report', project: 'PRJ-2026-014', owner: 'Nadia Rahman', due: '2026-11-15', col: 'To do', pri: 'Normal' },
    { id: 'T-304', title: 'Inspect blanket samples from supplier', project: 'PRJ-2026-038', owner: 'Emre Kaya', due: '2026-11-02', col: 'In progress', pri: 'High' },
    { id: 'T-305', title: 'Book trucks for Camp 26 distribution', project: 'PRJ-2026-038', owner: 'Rafiqul Islam', due: '2026-11-20', col: 'To do', pri: 'Normal' },
    { id: 'T-306', title: 'Tube-well water quality test (batch 1)', project: 'PRJ-2026-021', owner: 'Kamal Hossain', due: '2026-10-28', col: 'Done', pri: 'Normal' },
    { id: 'T-307', title: 'Teacher attendance review', project: 'PRJ-2026-033', owner: 'Nusrat Jahan', due: '2026-11-10', col: 'To do', pri: 'Low' },
    { id: 'T-308', title: 'Upload distribution photos (Camp 8E)', project: 'PRJ-2026-014', owner: 'Sabina Akter', due: '2026-10-30', col: 'Done', pri: 'Low' }
  ],

  staff: [
    { id: 'EMP-001', name: 'Afzalur Rahman', dept: 'BCO', title: 'Country Director', location: 'Cox\'s Bazar', type: 'National', status: 'Active', joined: '2023-03-01', salary: 0 },
    { id: 'EMP-007', name: 'Ayşe Demir', dept: 'Programs', title: 'Program Manager', location: 'Dhaka', type: 'Expat', status: 'Active', joined: '2024-01-15', salary: 0 },
    { id: 'EMP-012', name: 'Rafiqul Islam', dept: 'BCO', title: 'Program Coordinator', location: 'Cox\'s Bazar', type: 'National', status: 'Active', joined: '2022-07-01', salary: 145000 },
    { id: 'EMP-015', name: 'Kamal Hossain', dept: 'CND', title: 'Site Engineer', location: 'Cox\'s Bazar', type: 'National', status: 'Active', joined: '2023-02-10', salary: 120000 },
    { id: 'EMP-018', name: 'Nusrat Jahan', dept: 'EDU', title: 'Education Coordinator', location: 'Cox\'s Bazar', type: 'National', status: 'Active', joined: '2023-09-01', salary: 95000 },
    { id: 'EMP-021', name: 'Farhana Yasmin', dept: 'BCO', title: 'Finance Manager', location: 'Dhaka', type: 'National', status: 'Active', joined: '2021-05-20', salary: 160000 },
    { id: 'EMP-024', name: 'Tanvir Ahmed', dept: 'BCO', title: 'Purchase & Procurement Officer', location: 'Cox\'s Bazar', type: 'National', status: 'Active', joined: '2024-03-01', salary: 78000 },
    { id: 'EMP-027', name: 'Sabina Akter', dept: 'Programs', title: 'Field Facilitator', location: 'Camp 13', type: 'National', status: 'On leave', joined: '2024-06-15', salary: 42000 },
    { id: 'EMP-030', name: 'Nadia Rahman', dept: 'M&E', title: 'M&E Officer', location: 'Cox\'s Bazar', type: 'National', status: 'Active', joined: '2025-01-05', salary: 72000 },
    { id: 'EMP-033', name: 'Emre Kaya', dept: 'Shelter', title: 'Shelter Coordinator', location: 'Cox\'s Bazar', type: 'Expat', status: 'Active', joined: '2025-08-01', salary: 0 },
    { id: 'EMP-036', name: 'Jahid Hasan', dept: 'Logistics', title: 'Store Keeper', location: 'Ukhiya Warehouse', type: 'National', status: 'Active', joined: '2023-11-12', salary: 38000 },
    { id: 'EMP-002', name: 'Hasan Mahmud', dept: 'BCO', title: 'Operation Coordinator', location: 'Cox\'s Bazar', type: 'National', status: 'Active', joined: '2022-02-01', salary: 150000 },
    { id: 'EMP-003', name: 'Sharmin Akter', dept: 'BCO', title: 'Information Management Coordinator', location: 'Cox\'s Bazar', type: 'National', status: 'Active', joined: '2023-04-10', salary: 110000 },
    { id: 'EMP-004', name: 'Engr. Tariqul Alam', dept: 'CND', title: 'Civil Engineer', location: 'Cox\'s Bazar', type: 'National', status: 'Active', joined: '2023-06-01', salary: 125000 },
    { id: 'EMP-005', name: 'Shahadat Hossain', dept: 'WFD', title: 'Welfare Coordinator', location: 'Cox\'s Bazar', type: 'National', status: 'Active', joined: '2022-09-15', salary: 115000 },
    { id: 'EMP-006', name: 'Mawlana Abdul Karim', dept: 'RAD', title: 'Religious Affairs Coordinator', location: 'Teknaf', type: 'National', status: 'Active', joined: '2021-11-01', salary: 98000 },
    { id: 'EMP-008', name: 'Rokeya Begum', dept: 'MPC', title: 'Multipurpose Center Coordinator', location: 'Ukhiya', type: 'National', status: 'Active', joined: '2024-02-01', salary: 88000 },
    { id: 'EMP-039', name: 'Mostafa Kamal', dept: 'Security', title: 'Security Supervisor', location: 'Camp 4', type: 'National', status: 'Active', joined: '2022-12-01', salary: 32000 }
  ],

  attendance: [
    { name: 'Rafiqul Islam', in: '08:52', out: '17:40', status: 'Present', site: 'CXB Office' },
    { name: 'Kamal Hossain', in: '08:31', out: '-', status: 'Present', site: 'Camp 15' },
    { name: 'Nusrat Jahan', in: '09:24', out: '-', status: 'Late', site: 'Camp 8E' },
    { name: 'Tanvir Ahmed', in: '08:58', out: '-', status: 'Present', site: 'CXB Office' },
    { name: 'Sabina Akter', in: '-', out: '-', status: 'On leave', site: '-' },
    { name: 'Nadia Rahman', in: '08:47', out: '-', status: 'Present', site: 'Camp 13' },
    { name: 'Jahid Hasan', in: '08:05', out: '-', status: 'Present', site: 'Ukhiya Warehouse' },
    { name: 'Mostafa Kamal', in: '-', out: '-', status: 'Absent', site: '-' }
  ],

  payroll: [
    { id: 'EMP-012', name: 'Rafiqul Islam', basic: 87000, allow: 58000, ot: 0, deduct: 9500, project: 'PRJ-2026-014' },
    { id: 'EMP-015', name: 'Kamal Hossain', basic: 72000, allow: 48000, ot: 6500, deduct: 7800, project: 'PRJ-2026-021' },
    { id: 'EMP-018', name: 'Nusrat Jahan', basic: 57000, allow: 38000, ot: 0, deduct: 6100, project: 'PRJ-2026-033' },
    { id: 'EMP-021', name: 'Farhana Yasmin', basic: 96000, allow: 64000, ot: 0, deduct: 11200, project: 'Admin' },
    { id: 'EMP-024', name: 'Tanvir Ahmed', basic: 46800, allow: 31200, ot: 4200, deduct: 4900, project: 'PRJ-2026-014' },
    { id: 'EMP-027', name: 'Sabina Akter', basic: 25200, allow: 16800, ot: 1800, deduct: 2400, project: 'PRJ-2026-014' },
    { id: 'EMP-030', name: 'Nadia Rahman', basic: 43200, allow: 28800, ot: 0, deduct: 4500, project: 'PRJ-2026-014' },
    { id: 'EMP-036', name: 'Jahid Hasan', basic: 22800, allow: 15200, ot: 3600, deduct: 2100, project: 'Logistics' },
    { id: 'EMP-039', name: 'Mostafa Kamal', basic: 19200, allow: 12800, ot: 5200, deduct: 1700, project: 'Security' }
  ],

  procurement: [
    { id: 'PR-0457', item: 'Food basket (25 kg) x 3,000', project: 'PRJ-2026-014', amount: 4650000, stage: 'PR', supplier: '-', date: '2026-11-06' },
    { id: 'PR-0455', item: 'Solar lamps x 800', project: 'PRJ-2026-038', amount: 960000, stage: 'RFQ', supplier: '3 invited', date: '2026-11-03' },
    { id: 'PR-0452', item: 'School kits x 1,850', project: 'PRJ-2026-033', amount: 1110000, stage: 'Quotation', supplier: '4 received', date: '2026-10-29' },
    { id: 'PR-0449', item: 'Hygiene kits x 1,500', project: 'PRJ-2026-021', amount: 1950000, stage: 'PO', supplier: 'Coastal Supply House', date: '2026-10-22' },
    { id: 'PR-0446', item: 'Blankets x 5,400', project: 'PRJ-2026-038', amount: 3780000, stage: 'GRN', supplier: 'Karnaphuli Traders', date: '2026-10-14' },
    { id: 'PR-0441', item: 'Winter kits x 2,700', project: 'PRJ-2026-038', amount: 2180000, stage: 'Invoice', supplier: 'Karnaphuli Traders', date: '2026-10-10' },
    { id: 'PR-0436', item: 'PVC pipes & fittings', project: 'PRJ-2026-021', amount: 870000, stage: 'Payment', supplier: 'Teknaf Hardware', date: '2026-09-28' },
    { id: 'PR-0430', item: 'Food basket (25 kg) x 2,100', project: 'PRJ-2026-014', amount: 3255000, stage: 'Paid', supplier: 'Bay Agro Foods', date: '2026-09-20' }
  ],

  suppliers: [
    { id: 'SUP-011', name: 'Bay Agro Foods', category: 'Food', city: 'Chattogram', rating: 4.6, orders: 14, onTime: 96, status: 'Approved' },
    { id: 'SUP-014', name: 'Karnaphuli Traders', category: 'NFI / Shelter', city: 'Chattogram', rating: 4.1, orders: 9, onTime: 88, status: 'Approved' },
    { id: 'SUP-019', name: 'Coastal Supply House', category: 'Hygiene', city: 'Cox\'s Bazar', rating: 4.3, orders: 7, onTime: 92, status: 'Approved' },
    { id: 'SUP-022', name: 'Teknaf Hardware', category: 'WASH materials', city: 'Teknaf', rating: 3.7, orders: 5, onTime: 74, status: 'Under review' },
    { id: 'SUP-027', name: 'Green Light Solar', category: 'Energy', city: 'Dhaka', rating: 4.0, orders: 2, onTime: 100, status: 'Approved' },
    { id: 'SUP-030', name: 'Hill Tracts Transport', category: 'Logistics', city: 'Cox\'s Bazar', rating: 3.2, orders: 11, onTime: 69, status: 'Blacklisted' }
  ],

  stock: [
    { sku: 'FD-025', item: 'Food basket (25 kg)', wh: 'Ukhiya Warehouse', qty: 420, unit: 'pcs', min: 500, expiry: '2027-02-28', project: 'PRJ-2026-014' },
    { sku: 'FD-031', item: 'Rice (50 kg bag)', wh: 'Ukhiya Warehouse', qty: 1260, unit: 'bags', min: 400, expiry: '2027-06-30', project: 'PRJ-2026-014' },
    { sku: 'FD-044', item: 'Dates (1 kg)', wh: 'Camp 4 Store', qty: 180, unit: 'packs', min: 300, expiry: '2026-12-05', project: 'PRJ-2026-014' },
    { sku: 'NF-102', item: 'Blanket (double)', wh: 'Ukhiya Warehouse', qty: 3600, unit: 'pcs', min: 1000, expiry: '-', project: 'PRJ-2026-038' },
    { sku: 'NF-118', item: 'Winter kit', wh: 'Camp 13 Store', qty: 900, unit: 'kits', min: 500, expiry: '-', project: 'PRJ-2026-038' },
    { sku: 'HY-201', item: 'Hygiene kit', wh: 'Camp 15 Store', qty: 240, unit: 'kits', min: 300, expiry: '2027-09-30', project: 'PRJ-2026-021' },
    { sku: 'ED-305', item: 'School kit', wh: 'Camp 8E Store', qty: 650, unit: 'kits', min: 200, expiry: '-', project: 'PRJ-2026-033' },
    { sku: 'MD-410', item: 'ORS sachet', wh: 'Camp 4 Store', qty: 5200, unit: 'sachets', min: 2000, expiry: '2026-11-30', project: 'PRJ-2026-044' }
  ],

  vouchers: [
    { id: 'PV-2026-1184', date: '2026-11-05', desc: 'Bay Agro Foods - INV-2198', project: 'PRJ-2026-014', donor: 'Ramadan Appeal 2026', account: '5110 Food items', debit: 3255000, credit: 0 },
    { id: 'RV-2026-0211', date: '2026-11-03', desc: 'Fund transfer from TDV HQ', project: '-', donor: 'TDV HQ Türkiye', account: '1120 Bank - EBL', debit: 0, credit: 15000000 },
    { id: 'PV-2026-1179', date: '2026-11-02', desc: 'October salaries (CXB)', project: 'Multiple', donor: 'Multiple', account: '6100 Staff cost', debit: 2860000, credit: 0 },
    { id: 'PV-2026-1172', date: '2026-10-30', desc: 'Teknaf Hardware - pipes', project: 'PRJ-2026-021', donor: 'TDV HQ Türkiye', account: '5310 WASH materials', debit: 870000, credit: 0 },
    { id: 'JV-2026-0098', date: '2026-10-29', desc: 'Budget reallocation - Water network', project: 'PRJ-2026-019', donor: 'TDV HQ Türkiye', account: '5320 Construction', debit: 0, credit: 450000 },
    { id: 'PV-2026-1166', date: '2026-10-27', desc: 'Truck rent - Camp 8E distribution', project: 'PRJ-2026-014', donor: 'Ramadan Appeal 2026', account: '5510 Transport', debit: 148000, credit: 0 }
  ],

  accounts: [
    { name: 'EBL - Main (USD)', type: 'Bank', balance: 38450000 },
    { name: 'DBBL - Project (BDT)', type: 'Bank', balance: 12780000 },
    { name: 'Cox\'s Bazar petty cash', type: 'Cash', balance: 185000 },
    { name: 'Dhaka petty cash', type: 'Cash', balance: 92000 }
  ],

  documents: [
    { id: 'DOC-551', name: 'FD-7 approval - Ramadan 2026', type: 'NGOAB permission', project: 'PRJ-2026-014', version: 'v2', owner: 'Farhana Yasmin', expiry: '2026-12-31', access: 'Management' },
    { id: 'DOC-548', name: 'RRRC project approval letter', type: 'Government', project: 'PRJ-2026-014', version: 'v1', owner: 'Rafiqul Islam', expiry: '2026-12-31', access: 'Project team' },
    { id: 'DOC-540', name: 'Framework agreement - Bay Agro Foods', type: 'Contract', project: '-', version: 'v3', owner: 'Tanvir Ahmed', expiry: '2026-11-30', access: 'Procurement' },
    { id: 'DOC-536', name: 'Vehicle fitness - CXB-GA-1123', type: 'Vehicle', project: '-', version: 'v1', owner: 'Jahid Hasan', expiry: '2026-11-15', access: 'Logistics' },
    { id: 'DOC-529', name: 'Warehouse lease - Ukhiya', type: 'Lease', project: '-', version: 'v2', owner: 'Farhana Yasmin', expiry: '2027-06-30', access: 'Management' },
    { id: 'DOC-522', name: 'Learning centre MoU', type: 'Agreement', project: 'PRJ-2026-033', version: 'v1', owner: 'Nusrat Jahan', expiry: '2027-01-09', access: 'Project team' }
  ],

  facilities: [
    { id: 'FAC-04-01', name: 'Distribution Point A', camp: 'Camp 4', type: 'Distribution point', manager: 'Rafiqul Islam', security: 2, volunteers: 14, lastVisit: '2026-11-06', status: 'Operational' },
    { id: 'FAC-08-03', name: 'Learning Centre 3', camp: 'Camp 8E', type: 'Learning centre', manager: 'Nusrat Jahan', security: 1, volunteers: 6, lastVisit: '2026-11-04', status: 'Operational' },
    { id: 'FAC-13-02', name: 'Camp 13 Store', camp: 'Camp 13', type: 'Store', manager: 'Jahid Hasan', security: 2, volunteers: 3, lastVisit: '2026-10-29', status: 'Operational' },
    { id: 'FAC-15-01', name: 'Tube-well cluster 15-B', camp: 'Camp 15', type: 'WASH point', manager: 'Kamal Hossain', security: 0, volunteers: 4, lastVisit: '2026-10-21', status: 'Needs repair' },
    { id: 'FAC-01-04', name: 'Child-Friendly Space', camp: 'Camp 1W', type: 'CFS', manager: 'Nusrat Jahan', security: 1, volunteers: 5, lastVisit: '2026-10-12', status: 'Planned' }
  ],

  visits: [
    { date: '2026-11-08', facility: 'Distribution Point A', by: 'Nadia Rahman', purpose: 'Pre-distribution check', status: 'Assigned' },
    { date: '2026-11-06', facility: 'Distribution Point A', by: 'Rafiqul Islam', purpose: 'Crowd management review', status: 'Completed' },
    { date: '2026-11-04', facility: 'Learning Centre 3', by: 'Nusrat Jahan', purpose: 'Monthly monitoring', status: 'Completed' },
    { date: '2026-11-10', facility: 'Tube-well cluster 15-B', by: 'Kamal Hossain', purpose: 'Repair verification', status: 'Assigned' }
  ],

  indicators: [
    { name: 'Households receiving food baskets', project: 'PRJ-2026-014', target: 15000, actual: 12400, unit: 'HH' },
    { name: 'People with access to safe water', project: 'PRJ-2026-021', target: 9000, actual: 6800, unit: 'people' },
    { name: 'Children attending learning centres', project: 'PRJ-2026-033', target: 2000, actual: 1850, unit: 'children' },
    { name: 'Households with winter kits', project: 'PRJ-2026-038', target: 8000, actual: 5300, unit: 'HH' },
    { name: 'Post-distribution satisfaction', project: 'PRJ-2026-014', target: 90, actual: 93, unit: '%' }
  ],

  reports: [
    { name: 'Monthly Donor Report - October 2026', type: 'Monthly', project: 'PRJ-2026-014', status: 'Draft', updated: '2026-11-06' },
    { name: 'Quarterly Progress Report Q3 2026', type: 'Quarterly', project: 'All projects', status: 'Submitted', updated: '2026-10-15' },
    { name: 'Budget vs Actual - October 2026', type: 'Finance', project: 'All projects', status: 'Final', updated: '2026-11-03' },
    { name: 'Site Visit Summary - Week 44', type: 'Site visit', project: 'Field operations', status: 'Final', updated: '2026-11-02' },
    { name: 'HR Department Report - October', type: 'Department', project: 'HR', status: 'Final', updated: '2026-11-01' }
  ],

  announcements: [
    { title: 'Cyclone preparedness: signal 3 expected on Monday', type: 'Emergency', audience: 'All field staff', date: '2026-11-07', channel: 'SMS + In-app' },
    { title: 'October donor reports due 15 November', type: 'Deadline', audience: 'Project coordinators', date: '2026-11-05', channel: 'Email + In-app' },
    { title: 'New leave policy effective 1 December', type: 'Notice', audience: 'All staff', date: '2026-11-01', channel: 'In-app' },
    { title: 'Camp 13 distribution moved to 18 Nov', type: 'Announcement', audience: 'Camp 13 team', date: '2026-10-31', channel: 'SMS' }
  ],

  vehicles: [
    { id: 'CXB-GA-1123', type: 'Pickup (4x4)', driver: 'Abdur Rahim', status: 'In field', km: 84210, nextService: '2026-11-20', fitness: '2026-11-15' },
    { id: 'CXB-GA-1187', type: 'Micro-bus', driver: 'Selim Uddin', status: 'Available', km: 61440, nextService: '2026-12-10', fitness: '2027-04-02' },
    { id: 'DHA-GHA-2201', type: 'SUV', driver: 'Mizanur Rahman', status: 'Available', km: 38900, nextService: '2027-01-05', fitness: '2027-02-18' },
    { id: 'CXB-TA-0412', type: 'Truck (5 t)', driver: 'Kalam Mia', status: 'Maintenance', km: 122300, nextService: '2026-11-09', fitness: '2026-12-30' }
  ],

  assets: [
    { tag: 'AST-0221', name: 'Generator 20 kVA', location: 'Ukhiya Warehouse', custodian: 'Jahid Hasan', value: 640000, status: 'In use' },
    { tag: 'AST-0234', name: 'Laptop (Dell Latitude)', location: 'CXB Office', custodian: 'Nadia Rahman', value: 112000, status: 'In use' },
    { tag: 'AST-0240', name: 'Satellite phone', location: 'CXB Office', custodian: 'Rafiqul Islam', value: 95000, status: 'In use' },
    { tag: 'AST-0251', name: 'Water quality test kit', location: 'Camp 15', custodian: 'Kamal Hossain', value: 58000, status: 'Under repair' }
  ],

  sysUsers: [
    { name: 'Afzalur Rahman', email: 'admin@tdv.top5way.com', role: 'Admin', office: 'Dhaka', last: 'Today 08:40', status: 'Active', twofa: true },
    { name: 'Farhana Yasmin', email: 'finance@tdv.top5way.com', role: 'Finance Manager', office: 'Dhaka', last: 'Today 09:12', status: 'Active', twofa: true },
    { name: 'Rafiqul Islam', email: 'coordinator@tdv.top5way.com', role: 'Moderator (Coordinator)', office: 'Cox\'s Bazar', last: 'Today 08:55', status: 'Active', twofa: false },
    { name: 'Kamal Hossain', email: 'wash@tdv.top5way.com', role: 'Moderator (Coordinator)', office: 'Cox\'s Bazar', last: 'Yesterday', status: 'Active', twofa: false },
    { name: 'Jahid Hasan', email: 'store@tdv.top5way.com', role: 'Store Keeper', office: 'Ukhiya', last: 'Today 08:10', status: 'Active', twofa: false },
    { name: 'Nadia Rahman', email: 'me@tdv.top5way.com', role: 'M&E Officer', office: 'Cox\'s Bazar', last: '3 days ago', status: 'Active', twofa: false },
    { name: 'Old Field Account', email: 'field02@tdv.top5way.com', role: 'Field Staff', office: 'Camp 13', last: '4 months ago', status: 'Disabled', twofa: false }
  ],

  audit: [
    { time: '2026-11-08 09:14', user: 'Farhana Yasmin', action: 'Approved', target: 'APR-1171 (step 1)', ip: '103.112.4.21' },
    { time: '2026-11-08 08:55', user: 'Rafiqul Islam', action: 'Signed in', target: '-', ip: '45.251.231.9' },
    { time: '2026-11-07 17:32', user: 'Afzalur Rahman', action: 'Changed approval chain', target: 'Purchase > 1,000,000 BDT', ip: '103.112.4.20' },
    { time: '2026-11-07 16:05', user: 'Jahid Hasan', action: 'Posted GRN', target: 'GRN-0912 (Blankets)', ip: '45.251.229.77' },
    { time: '2026-11-07 11:48', user: 'Tanvir Ahmed', action: 'Created', target: 'PR-0457', ip: '45.251.231.12' },
    { time: '2026-11-06 15:20', user: 'Afzalur Rahman', action: 'Disabled user', target: 'field02@tdv.top5way.com', ip: '103.112.4.20' }
  ],

  notifications: [
    { text: 'PR-0457 is waiting for your approval', time: '10 min ago', link: '#/approvals' },
    { text: 'Stock of Food basket (25 kg) is below minimum', time: '1 h ago', link: '#/inventory' },
    { text: 'Vehicle fitness CXB-GA-1123 expires in 7 days', time: '3 h ago', link: '#/documents' },
    { text: 'Cyclone preparedness alert sent to 64 staff', time: 'Yesterday', link: '#/communication' }
  ],

  chains: [
    { name: 'Requisition - Construction', steps: ['Operation Coordinator', 'Country Director'], form: 'Requested by Civil Engineer' },
    { name: 'Requisition - Welfare', steps: ['Operation Coordinator', 'Country Director'], form: 'Requested by Welfare Coordinator' },
    { name: 'Requisition - Religious', steps: ['Program Coordinator', 'Country Director'], form: 'Requested by Religious Affairs Coordinator' },
    { name: 'Requisition - Education', steps: ['Coordinator / Asst. Coordinator', 'Program Coordinator', 'Country Director'], form: 'Requested by Headteacher' },
    { name: 'Requisition - Multipurpose', steps: ['Multipurpose Center Coordinator', 'Program Coordinator', 'Country Director'], form: 'Requested by Supervisor' },
    { name: 'Purchase request (up to 1,000,000 BDT)', steps: ['Program Coordinator', 'Finance Manager', 'Country Director'] },
    { name: 'Purchase request (above 1,000,000 BDT)', steps: ['Program Coordinator', 'Finance Manager', 'Country Director', 'HQ Approval'] },
    { name: 'Partner proposal (PPF)', steps: ['Program Coordinator', 'Country Director', 'HQ Approval'] },
    { name: 'New project', steps: ['Program Coordinator', 'Country Director', 'HQ Approval', 'RRRC / CiC'] },
    { name: 'Advance request (monthly expenses)', steps: ['Finance Manager', 'Country Director', 'HQ Approval'] },
    { name: 'Leave', steps: ['Program Coordinator', 'HR Manager'] },
    { name: 'Payment request', steps: ['Program Coordinator', 'Finance Manager', 'Country Director'] },
    { name: 'Distribution / activity plan', steps: ['Program Coordinator', 'RRRC / CiC'] },
    { name: 'Budget revision', steps: ['Finance Manager', 'Country Director', 'HQ Approval'] },
    { name: 'Recruitment', steps: ['HR Manager', 'Country Director'] }
  ],

  roles: ['Admin (Country Director)', 'Moderator (Coordinator)', 'Finance Manager', 'Department Coordinator', 'Civil Engineer', 'Headteacher / Supervisor', 'Store Keeper', 'M&E Officer'],
  permModules: ['Projects', 'Partner proposals', 'Approvals', 'Requisitions', 'Tasks', 'HR & Staff', 'Payroll', 'Procurement', 'Inventory', 'Payment receipts (Form 250)', 'Finance', 'Document register', 'Documents', 'Field', 'Reports', 'Users & Roles', 'Settings'],
  perms: {
    'Admin (Country Director)': [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    'Moderator (Coordinator)':  [1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,0,0],
    'Finance Manager':          [1,0,1,0,1,0,1,1,0,1,1,1,1,0,1,0,0],
    'Department Coordinator':   [1,0,1,1,1,0,0,0,1,1,0,1,1,1,1,0,0],
    'Civil Engineer':           [1,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0],
    'Headteacher / Supervisor': [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    'Store Keeper':             [0,0,0,1,1,0,0,1,1,0,0,0,1,0,0,0,0],
    'M&E Officer':              [1,0,0,0,1,0,0,0,0,0,0,0,1,1,1,0,0]
  },

  departments: [
    { code: 'BCO', name: 'Bangladesh Coordination Office', head: 'Afzalur Rahman', title: 'Country Director', line: '-' },
    { code: 'CND', name: 'Construction Department', head: 'Engr. Tariqul Alam', title: 'Civil Engineer', line: 'Operation Coordinator' },
    { code: 'WFD', name: 'Welfare Department', head: 'Shahadat Hossain', title: 'Welfare Coordinator', line: 'Operation Coordinator' },
    { code: 'EDU', name: 'Education Department', head: 'Nusrat Jahan', title: 'Education Coordinator', line: 'Program Coordinator' },
    { code: 'RAD', name: 'Religious Affairs Department', head: 'Mawlana Abdul Karim', title: 'Religious Affairs Coordinator', line: 'Program Coordinator' },
    { code: 'MPC', name: 'Multipurpose Center', head: 'Rokeya Begum', title: 'Multipurpose Center Coordinator', line: 'Program Coordinator' }
  ],

  // Who holds each approval role (printed on forms and shown in the org chart)
  people: {
    'Country Director': 'Afzalur Rahman', 'Operation Coordinator': 'Hasan Mahmud', 'Program Coordinator': 'Rafiqul Islam',
    'Information Management Coordinator': 'Sharmin Akter', 'Coordinator / Asst. Coordinator': 'Nusrat Jahan', 'Multipurpose Center Coordinator': 'Rokeya Begum',
    'Finance Manager': 'Farhana Yasmin', 'HR Manager': 'Farhana Yasmin', 'HQ Approval': 'TDV Headquarter, Ankara', 'RRRC / CiC': 'RRRC / Camp-in-Charge office'
  },

  org: {
    top: 'Country Director',
    middle: 'Information Management Coordinator',
    branches: [
      { title: 'Operation Coordinator', units: ['Welfare Coordinator', 'Civil Engineer', 'Purchase & Procurement', 'Ramadan & Qurban', 'Human Resource', 'Emergency (flood, cyclone)', 'Office administrative work'] },
      { title: 'Program Coordinator', units: ['Education Coordinator', 'Multipurpose Center', 'Religious Affairs Coordinator', 'Interview', 'CBIU / IIUC Scholarship', 'Yetim (orphan) Program', 'Soap Training Center'] }
    ]
  },

  // Requisition forms: one template per department, chains copied from the client's Word forms
  reqTemplates: {
    Construction: { dept: 'CND', requester: 'Civil Engineer', steps: [['Controlled by', 'Operation Coordinator'], ['Approved by', 'Country Director']] },
    Welfare: { dept: 'WFD', requester: 'Welfare Coordinator', steps: [['Controlled by', 'Operation Coordinator'], ['Approved by', 'Country Director']] },
    Religious: { dept: 'RAD', requester: 'Religious Affairs Coordinator', steps: [['Controlled by', 'Program Coordinator'], ['Approved by', 'Country Director']] },
    Education: { dept: 'EDU', requester: 'Headteacher', steps: [['Checked by', 'Coordinator / Asst. Coordinator'], ['Controlled by', 'Program Coordinator'], ['Approved by', 'Country Director']] },
    Multipurpose: { dept: 'MPC', requester: 'Supervisor', steps: [['Checked by', 'Multipurpose Center Coordinator'], ['Controlled by', 'Program Coordinator'], ['Approved by', 'Country Director']] }
  },

  requisitions: [
    { id: 'REQ-2026-0041', cat: 'Education', date: '2026-11-06', subject: 'Teaching materials for Learning Centre 3', reason: 'The new term starts on 1 December. Students of Learning Centre 3 have no exercise books or pencils left after the annual exam.', requester: 'Abdul Hamid', reqTitle: 'Headteacher', school: 'TDV Learning Centre 3, Camp 8E', project: 'PRJ-2026-033', apr: 'APR-1190', items: [{ p: 'Exercise book (100 pages)', q: '1,850 pcs', r: 'One per student' }, { p: 'Pencil box set', q: '1,850 sets', r: '' }, { p: 'Whiteboard marker', q: '120 pcs', r: 'Assorted colours' }] },
    { id: 'REQ-2026-0040', cat: 'Construction', date: '2026-11-04', subject: 'Repair materials for Camp 15 mosque roof', reason: 'The roof was damaged in the October storm. RRRC permission is already received (TDF-RAD-20241124-001).', requester: 'Engr. Tariqul Alam', reqTitle: 'Civil Engineer', project: 'PRJ-2026-047', apr: 'APR-1189', items: [{ p: 'CI sheet (0.36 mm)', q: '180 pcs', r: '' }, { p: 'Cement (50 kg bag)', q: '60 bags', r: 'Portland' }, { p: 'MS rod 12 mm', q: '0.8 ton', r: '' }] },
    { id: 'REQ-2026-0038', cat: 'Religious', date: '2026-10-28', subject: 'Holy Qur\'an and prayer mats for 12 mosques', reason: 'Replacement for worn copies in camp mosques supported by TDV.', requester: 'Mawlana Abdul Karim', reqTitle: 'Religious Affairs Coordinator', project: 'PRJ-2026-047', apr: 'APR-1186', items: [{ p: 'Holy Qur\'an (Arabic, large print)', q: '240 pcs', r: '20 per mosque' }, { p: 'Prayer mat', q: '360 pcs', r: '30 per mosque' }] },
    { id: 'REQ-2026-0036', cat: 'Welfare', date: '2026-10-25', subject: 'Blankets for widows and elders (host community)', reason: 'Winter support list prepared with the Union Parishad; 400 households are not covered by the camp distribution.', requester: 'Shahadat Hossain', reqTitle: 'Welfare Coordinator', project: 'PRJ-2026-038', apr: 'APR-1185', items: [{ p: 'Blanket (double)', q: '400 pcs', r: 'From Ukhiya warehouse stock' }] },
    { id: 'REQ-2026-0033', cat: 'Multipurpose', date: '2026-10-20', subject: 'Raw materials for Soap Training Center batch 4', reason: 'Batch 4 has 24 trainees from 6 November.', requester: 'Jesmin Ara', reqTitle: 'Supervisor, Soap Training Center', project: 'PRJ-2026-049', apr: 'APR-1184', items: [{ p: 'Caustic soda', q: '50 kg', r: '' }, { p: 'Coconut oil', q: '120 litre', r: '' }, { p: 'Soap moulds', q: '24 pcs', r: 'One per trainee' }] }
  ],

  partners: [
    { id: 'PTN-007', name: 'Cox\'s Bazar Islamic Welfare Society', legal: 'NGO registered with NGO Affairs Bureau', reg: 'NGOAB-2871', contact: 'Md. Harun', phone: '+880 1700-000111', email: 'info@cbiws.example', address: 'Jhautala, Cox\'s Bazar', first: false },
    { id: 'PTN-011', name: 'Ukhiya Education Trust', legal: 'Trust registered with the Sub-Registrar', reg: 'TR-UKH-0442', contact: 'Rashida Begum', phone: '+880 1800-000222', email: 'contact@uet.example', address: 'Kutupalong, Ukhiya', first: true },
    { id: 'PTN-014', name: 'Teknaf Rural Development Organisation', legal: 'NGO registered with the Department of Social Services', reg: 'DSS-CXB-1190', contact: 'Abu Taher', phone: '+880 1900-000333', email: 'trdo@trdo.example', address: 'Teknaf Sadar', first: false }
  ],

  proposals: [
    { id: 'PPF-2026-019', partner: 'PTN-007', country: 'Bangladesh', region: 'Cox\'s Bazar', name: 'Winter Support for Host Community Elders', type: 'Emergency / Relief', apr: 'APR-1188',
      need: 'Night temperature in Ukhiya and Teknaf drops to 9°C in January. Elderly people and widows in host communities next to the camps have no warm bedding.',
      pressing: 'Blankets and warm clothes for people over 60, widows and people with disabilities.', aid: '2,000 double blankets and 2,000 shawls, one each per household, distributed with Union Parishad lists.', improve: 'Fewer cold-related illnesses among the elderly during the coldest 8 weeks.',
      cats: ['Local Community', 'Disabled'], bens: [{ t: 'Elders', pct: 60, q: 1200 }, { t: 'Widows', pct: 25, q: 500 }, { t: 'Disabled', pct: 15, q: 300 }], families: 2000, male: 900, female: 1100, children: 0,
      locations: [{ v: 'Palong Khali, Ukhiya', gps: '21.2105, 92.1450', date: '2026-12-10', n: 800 }, { v: 'Whykong, Teknaf', gps: '21.0601, 92.1680', date: '2026-12-12', n: 700 }, { v: 'Jaliapalong, Ukhiya', gps: '21.2950, 92.0610', date: '2026-12-14', n: 500 }],
      plan: [{ s: 'Beneficiary selection with the Union Parishad', from: '2026-11-20', to: '2026-11-30', e: 'Lists signed by the UP chairman' }, { s: 'Procurement (3 quotations)', from: '2026-11-25', to: '2026-12-05', e: '' }, { s: 'Distribution in 3 unions', from: '2026-12-10', to: '2026-12-14', e: 'Token system, fingerprint on list' }, { s: 'Feedback report and PCR', from: '2026-12-15', to: '2026-12-28', e: '' }],
      start: '2026-11-20', end: '2026-12-14', currency: 'USD', rate: 122.5,
      budget: [{ i: 'Blanket (double)', c: 'Direct', u: 9.5, q: 2000 }, { i: 'Shawl', c: 'Direct', u: 3.2, q: 2000 }, { i: 'Truck rent (3 unions)', c: 'Logistic', u: 120, q: 6 }, { i: 'Volunteers and printing', c: 'Admin', u: 480, q: 1 }],
      docs: { quotes: true, photos: true, design: false, boq: false, reg: false, accounts: false, trustees: false, bank: false },
      deliver: { ack: true, pcr: true, fin: true, inv: true, media: true, benlist: true },
      signers: [{ n: 'Md. Harun', p: 'Executive Director', d: '2026-11-02' }], received: '2026-11-03' },
    { id: 'PPF-2026-017', partner: 'PTN-014', country: 'Bangladesh', region: 'Cox\'s Bazar', name: 'Mosque & Madrasah Repair, Camp 15 and Teknaf', type: 'Construction', apr: 'APR-1172', project: 'PRJ-2026-047',
      need: 'Eight mosques and two madrasahs were damaged by landslides and the October storm.', pressing: 'Roof and wall repair before the monsoon.', aid: 'Repair of 10 buildings with CI sheet, cement and rod.', improve: 'Safe prayer and learning space for around 9,000 people.',
      cats: ['Refugees', 'Local Community', 'Students'], bens: [{ t: 'Students', pct: 20, q: 1800 }, { t: 'Imams', pct: 1, q: 10 }, { t: 'Others', pct: 79, q: 7190 }], families: 1900, male: 4300, female: 3100, children: 1600,
      locations: [{ v: 'Camp 15 (blocks C, D, F)', gps: '21.1690, 92.1530', date: '2026-09-15', n: 5200 }, { v: 'Teknaf Sadar', gps: '20.8640, 92.2980', date: '2026-10-20', n: 3800 }],
      plan: [{ s: 'RRRC permission', from: '2026-08-01', to: '2026-08-31', e: 'TDF-RAD-20241124-001' }, { s: 'Repair works', from: '2026-09-01', to: '2027-02-15', e: '' }],
      start: '2026-09-01', end: '2027-02-28', currency: 'USD', rate: 122.5,
      budget: [{ i: 'Building materials', c: 'Direct', u: 38000, q: 1 }, { i: 'Labour', c: 'Direct', u: 9500, q: 1 }, { i: 'Transport', c: 'Logistic', u: 2100, q: 1 }, { i: 'Supervision', c: 'Admin', u: 1000, q: 1 }],
      docs: { quotes: true, photos: true, design: true, boq: true, reg: false, accounts: false, trustees: false, bank: false },
      deliver: { ack: true, pcr: true, fin: true, inv: true, media: true, benlist: false },
      signers: [{ n: 'Abu Taher', p: 'Chairman', d: '2026-07-20' }], received: '2026-07-22' },
    { id: 'PPF-2026-015', partner: 'PTN-011', country: 'Bangladesh', region: 'Cox\'s Bazar', name: 'Scholarship for CBIU / IIUC students', type: 'Education', apr: 'APR-1166',
      need: 'Students from poor families in Ukhiya drop out of university because of fees.', pressing: 'Semester fees and books.', aid: 'Monthly scholarship for 40 students for 12 months.', improve: 'Students finish their degree.',
      cats: ['Students'], bens: [{ t: 'Students', pct: 100, q: 40 }], families: 40, male: 22, female: 18, children: 0,
      locations: [{ v: 'CBIU, Cox\'s Bazar', gps: '21.4272, 92.0058', date: '2027-01-15', n: 25 }, { v: 'IIUC, Chattogram', gps: '22.4950, 91.7190', date: '2027-01-15', n: 15 }],
      plan: [{ s: 'Interview and selection', from: '2026-12-01', to: '2026-12-20', e: '' }, { s: 'Monthly payment', from: '2027-01-15', to: '2027-12-15', e: '' }],
      start: '2027-01-01', end: '2027-12-31', currency: 'USD', rate: 122.5,
      budget: [{ i: 'Scholarship (40 x 12 months)', c: 'Direct', u: 45, q: 480 }, { i: 'Bank charges', c: 'Admin', u: 120, q: 1 }],
      docs: { quotes: false, photos: false, design: false, boq: false, reg: true, accounts: true, trustees: false, bank: true },
      deliver: { ack: true, pcr: true, fin: true, inv: false, media: true, benlist: true },
      signers: [{ n: 'Rashida Begum', p: 'Secretary', d: '2026-10-10' }], received: '2026-10-12' }
  ],

  receipts: [
    { id: 'F250-2026-0112', date: '2026-11-08', project: 'PRJ-2026-052', items: [{ d: 'RRRC İmam Maaşı - Ekim 2026 (Imam honorarium, October 2026)', q: 1, u: 'Pc', p: 20000 }], org: 'RRRC Office', name: 'Abdul Kader', phone: '+880 1811-000000', addr: 'Motel Road, Cox\'s Bazar', staff1: 'Mawlana Abdul Karim', staff2: 'Afzalur Rahman', recurring: true, status: 'Signed' },
    { id: 'F250-2026-0109', date: '2026-11-05', project: 'PRJ-2026-014', items: [{ d: 'Day labour, loading 3,000 food baskets', q: 12, u: 'Pc', p: 900 }, { d: 'Drinking water for volunteers', q: 60, u: 'Lt', p: 25 }], org: '-', name: 'Nur Mohammad', phone: '+880 1555-000000', addr: 'Balukhali, Ukhiya', staff1: 'Tanvir Ahmed', staff2: 'Rafiqul Islam', recurring: false, status: 'Posted' },
    { id: 'F250-2026-0104', date: '2026-10-31', project: 'PRJ-2026-049', items: [{ d: 'Coconut oil (local market, no invoice)', q: 40, u: 'Lt', p: 260 }], org: 'Kutupalong Bazar', name: 'Jamal Uddin', phone: '+880 1666-000000', addr: 'Kutupalong, Ukhiya', staff1: 'Rokeya Begum', staff2: 'Hasan Mahmud', recurring: false, status: 'Posted' }
  ],

  // Official document register (from TDF_REFERENCE.xlsx and TDF_REFERENCE - FINANCE.xlsx)
  register: [
    { kind: 'Official', particular: 'Permission for Repair of Mosques and Madrasah', dept: 'RAD', date: '2024-11-24', ref: 'TDF-RAD-20241124-001', status: 'Approved by RRRC', ext: 'RRRC/CXB/2024/1187', hq: '', link: 'PCR-RAD-2024-07.pdf', history: [['2024-11-24', 'Submitted to Coordination Office'], ['2024-11-26', 'Received by RRRC'], ['2024-12-09', 'Approved by RRRC']] },
    { kind: 'Official', particular: 'Permission for winter kit distribution, Camp 13 and 26', dept: 'WFD', date: '2026-10-02', ref: 'TDF-WFD-20261002-004', status: 'Approved by CiC', ext: 'CiC-13/2026/882', hq: '', link: '', history: [['2026-10-02', 'Submitted to Coordination Office'], ['2026-10-03', 'Received by CiC'], ['2026-10-09', 'Approved by CiC']] },
    { kind: 'Official', particular: 'Permission for Learning Centre 3 repairs', dept: 'EDU', date: '2026-11-03', ref: 'TDF-EDU-20261103-002', status: 'Received by CiC', ext: 'CiC-8E/2026/412', hq: '', link: '', history: [['2026-11-03', 'Submitted to Coordination Office'], ['2026-11-04', 'Received by CiC']] },
    { kind: 'Official', particular: 'Ramadan 2027 project proposal', dept: 'BCO', date: '2026-11-05', ref: 'TDF-BCO-20261105-003', status: 'Sent to Headquarter', ext: '', hq: '', link: '', history: [['2026-11-05', 'Submitted to Coordination Office'], ['2026-11-06', 'Sent to Headquarter']] },
    { kind: 'Official', particular: 'Soap Training Center batch 4 permission', dept: 'MPC', date: '2026-10-15', ref: 'TDF-MPC-20261015-002', status: 'Received by RRRC', ext: 'RRRC/CXB/2026/2210', hq: '', link: '', history: [['2026-10-15', 'Submitted to Coordination Office'], ['2026-10-17', 'Received by RRRC']] },
    { kind: 'Finance', particular: 'Advance Request for Monthly Regular Expenses', dept: 'WFD', date: '2026-10-23', ref: 'BD-WFD-20261023-001', status: 'Approved by Headquarter', ext: '', hq: 'TDV-MLY-2026-5521', link: 'ADV-WFD-OCT.pdf', history: [['2026-10-23', 'Submitted to Coordination Office'], ['2026-10-24', 'Sent to Headquarter'], ['2026-10-30', 'Approved by Headquarter']] },
    { kind: 'Finance', particular: 'Advance Request for Monthly Regular Expenses', dept: 'WFD', date: '2026-11-05', ref: 'BD-WFD-20261105-002', status: 'Sent to Headquarter', ext: '', hq: '', link: '', history: [['2026-11-05', 'Submitted to Coordination Office'], ['2026-11-06', 'Sent to Headquarter']] },
    { kind: 'Finance', particular: 'Advance Request for scholarship payments', dept: 'EDU', date: '2026-10-12', ref: 'BD-EDU-20261012-001', status: 'Not Approved', ext: '', hq: 'TDV-MLY-2026-5390', link: '', history: [['2026-10-12', 'Submitted to Coordination Office'], ['2026-10-13', 'Sent to Headquarter'], ['2026-10-21', 'Not Approved']] }
  ]
};
