# TDV ERP: client forms alignment guide

This guide explains how each document the client (Türkiye Diyanet Vakfı, Bangladesh Coordination Office) gave us maps into the ERP. It covers what the prototype does today and what the real Laravel build must do. The clickable prototype is on staging at https://tdv.top5way.com.

Client documents reviewed (10 files):

| # | Client file | What it is | ERP module |
|---|---|---|---|
| 1 | `FORM 250 - Gider Makbuzu Formu` (PDF) | Cash payment receipt when no invoice exists | **Payment Receipts (F-250)** |
| 2 | `Project Proposal Form V3` (PDF, 8 pages) | Funding application from partner organisations | **Partner Proposals (PPF)** |
| 3-7 | `Requisition form - Construction / Education / Multipurpose / Religious / Welfare` (Word) | Department requests for materials | **Requisitions** |
| 8 | `TDF_REFERENCE.xlsx` | Register of official letters with reference numbers and status at CiC, RRRC and HQ | **Document Register**, Official tab |
| 9 | `TDF_REFERENCE - FINANCE.xlsx` | Same register for finance documents (advance requests) | **Document Register**, Finance tab |
| 10 | `Coxs Bazar Coordination Office` (PDF) | Organisation chart | **Organisation**, roles and approval chains |

Logos (`TDV Logolar.pdf` and the full-colour logo image) are used on the login page and on every printed form.

---

## 1. Organisation structure (drives roles and approvals)

```
Country Director (Country Coordinator)
└── Information Management Coordinator
    ├── Operation Coordinator
    │   ├── Welfare Coordinator            (WFD)
    │   ├── Civil Engineer                 (CND)
    │   ├── Purchase & Procurement
    │   ├── Ramadan & Qurban
    │   ├── Human Resource
    │   ├── Emergency (flood, cyclone)
    │   └── Office administrative work
    └── Program Coordinator
        ├── Education Coordinator          (EDU)
        ├── Multipurpose Center            (MPC)
        ├── Religious Affairs Coordinator  (RAD)
        ├── Interview
        ├── CBIU / IIUC Scholarship
        ├── Yetim (orphan) Program
        └── Soap Training Center
```

**Department codes** (from the Excel registers): `BCO` Bangladesh Coordination Office, `CND` Construction, `WFD` Welfare, `EDU` Education, `RAD` Religious Affairs, `MPC` Multipurpose Center.

**Rules for the build**
- Every project, requisition, receipt and register entry carries a department code.
- "Programs" in the ERP are grouped under these six departments instead of generic sectors.
- Approval chain steps are role names, for example "Program Coordinator", not person names. A separate role → person table decides who signs, so a staff change does not break the workflows.

**Roles in the prototype**
- **Admin = Country Director.** The CD gives the final "Approved by" signature and acts for Finance, HQ and RRRC.
- **Moderator = Coordinator.** Coordinators sign the "Checked by" and "Controlled by" steps.

**Roles to add in the real build:** Department Coordinator, Civil Engineer, Headteacher / Supervisor (a limited, form-only login), Finance Manager, Store Keeper and M&E Officer.

---

## 2. Requisitions (5 Word forms)

All five forms share one layout: Date, To (TDF Bangladesh Coordination Office), "Subject: Requisition for …", "Dear Concern", a reason, and an item table (Sl. | Particular | Quantity | Remarks). Only the signature chain differs.

| Form | Requested by | Checked by | Controlled by | Approved by |
|---|---|---|---|---|
| Construction (CND) | Civil Engineer | - | Operation Coordinator | Country Director |
| Welfare (WFD) | Welfare Coordinator | - | Operation Coordinator | Country Director |
| Religious (RAD) | Religious Affairs Coordinator | - | Program Coordinator | Country Director |
| Education (EDU) | Headteacher (+ school name) | Coordinator / Asst. Coordinator | Program Coordinator | Country Director |
| Multipurpose (MPC) | Supervisor | Multipurpose Center Coordinator | Program Coordinator | Country Director |

**Built in the prototype**
- **New requisition:** pick the form, and the chain is set and previewed automatically. Enter up to 5 items and link it to a project.
- **Approval engine:** each signature is one approval step. The drawer shows the chain with labels and names.
- **Print letter:** an A4 letter in the client's exact layout, with the TDV letterhead. Each signature box shows "Signed in ERP" with the date once that step is approved.
- **After approval:** "Send to procurement" creates a Purchase Request linked to the requisition, or "Issue from stock" issues the items from the store.
- **Filtering:** category cards with counts, plus tabs for Waiting for me, In approval, Approved, Returned and Sent to procurement.

**For the real build**
- Use one `requisitions` table with a `form_type` column. Do not build five separate tables.
- Keep the chain in workflow settings so the client can change it without a developer.
- Items do not need prices (the forms have none). Procurement adds the estimate later.
- Store a PDF snapshot at final approval for audit.

---

## 3. Partner Proposals (Project Proposal Form V3)

Partner organisations use this form to apply for TDF funding. It has 5 sections plus an official-use block.

| PPF section | Fields | ERP behaviour |
|---|---|---|
| 1 Organisation | Name, address, contact, email, legal status, registration / affiliations | Stored as a reusable **Partner** record. First-time applicants are flagged. |
| 2 Proposed project | Country, region, project name, project type, need, pressing needs, aid provided, expected improvement | Required fields. Project type is a dropdown. |
| Beneficiaries | 7 priority categories (Orphans, Disabled, Refugees, IDP, Asylum Seeker, Local Community, Students); 9 types with % and quantity; totals of families, male, female and children | Total beneficiaries calculated automatically. |
| Locations | Up to 12 villages / towns with GPS, implementation date and beneficiaries | GPS stored for a map view. |
| Implementation plan | Up to 10 stages with start, end and explanation; project start and end; feedback date | Duration calculated. **Feedback report due = end date + 14 days.** |
| 3 Budget | Up to 15 items (unit cost × quantity); exchange rate USD / EUR / GBP to BDT; Direct, Logistic and Administration costs | All totals and the currency conversion are calculated. A warning shows when admin cost is above 10% (limit to be confirmed). |
| 4 Essential documents | 3 quotations with product photos; architect design and BOQ (construction); BOQ and depth (water wells); first-time documents (registration, accounts, trustees, bank) | Checklist. A warning shows when a first-time applicant is missing documents. |
| Feedback deliverables | Acknowledgment within 7 working days, PCR form, financial statement, invoices, photos / videos ≥1 MB with the TDF logo, beneficiary list with fingerprints | Checklist with calculated due dates. |
| 5 Declaration | Two signatories with name, position and date; anti-terrorism declaration | "I agree" is required. |
| Official use | Amount, date received, Approved / Rejected / **Deferred**, two TDF signatories | Filled from the approval chain. |

**Built in the prototype**
- Full PPF entry page with add-row tables and live totals.
- Review chain: Program Coordinator → Country Director → HQ (final decision), with **Defer** as an extra decision next to Return and Reject.
- Detail page with one tab per section.
- **Convert to project:** an approved PPF becomes a project, carrying over budget, beneficiaries and dates.

**For the real build**
- Offer a public or partner portal so partners fill the PPF themselves. Staff keep the same form for paper submissions.
- Upload slots for each Section 4 document. Do not allow submission without the required ones.
- Export to PDF in the PPF V3 layout.

---

## 4. Payment Receipts (Form 250, Gider Makbuzu)

This is a bilingual (Turkish / English) receipt for cash paid **only when an invoice (fatura) cannot be obtained**. The client's example is the RRRC imam honorarium, October 2026, ৳20,000.

**Built in the prototype**
- **New receipt:** up to 5 item lines (description, amount, unit Pcs / Kg / Lt, unit price), the payee's organisation details, and two employees in charge.
- **Monthly recurring flag**, for example imam honorarium or rent, with "Next month" to copy the receipt.
- **Amount in words**, generated automatically (e.g. "Twenty Thousand taka only"). Bangladeshi Lakh / Crore system.
- **Print Form 250:** the same layout as the paper form, with Turkish number format (20.000,00), the Ankara HQ address, the slogan and the "Önemli Not" footer.
- **Post to finance** (Admin): creates a payment voucher on account `5900 Cash expense (no invoice)`, charged to the project and donor.

**For the real build**
- Require the scanned signed copy before posting to finance.
- Add a monthly cap or alert for cash receipts without an invoice, if the client wants one.

---

## 5. Document Register (TDF reference sheets)

This replaces both Excel sheets.

| Column in Excel | ERP field |
|---|---|
| SL | Row number |
| Particular | Subject |
| Department | Department code |
| Date | Date |
| BD Coordination Office reference number | **Generated automatically** |
| Status | Status with history |
| RRRC / CiC office reference number | External reference (Official only) |
| TDV Headquarter reference number | HQ reference |
| Project Completion Report / Approved Document (hyperlink) | Attached file |

**Reference format:** `PREFIX-DEPT-YYYYMMDD-SERIAL`
- Prefix `TDF` is for official documents and `BD` for finance documents, as in the client's sheets.
- The serial runs per department, per register, per year.
- Examples: `TDF-RAD-20241124-001`, `BD-WFD-20251023-001`.

**Status flow**
- **Official:** Submitted to Coordination Office → Received by CiC → Approved by CiC → Received by RRRC → Approved by RRRC → Sent to Headquarter → Approved by Headquarter / Not Approved.
- **Finance:** Submitted to Coordination Office → Sent to Headquarter → Approved by Headquarter / Not Approved.

**Built in the prototype**
- Official and Finance tabs with a department filter.
- Counters for documents waiting at CiC, RRRC and HQ.
- "Days waiting" on open items.
- Status update with the external reference numbers and the PCR / approved-document file.
- Full status history.
- A dashboard card, "Waiting outside the office".

---

## 6. Branding

- The full-colour TDV logo (red heart, navy wordmark, light-blue English line, Arabic line) is used on the login page and on every printed form.
- In-app colours stay on the existing TDV blue `#008DD2`.
- The logo's red `#E30613` and navy `#0F2F6B` are used for print letterheads.
- Typing mistake on the client's Word forms: "Tukriye". The ERP prints "Türkiye".

---

## 7. Questions to confirm with the client

1. **PCR (Project Completion Report) form:** the PPF and the register refer to it, but we have not received it.
2. **Other numbered forms:** Form 250 implies a series. Please send any other forms used in Bangladesh.
3. **Dropdown lists:** the PPF dropdowns for Country, Region, Project Type and Local Currency.
4. **Reference prefix:** keep `TDF-` for official and `BD-` for finance? Does the serial restart every year, and is it per department (as built) or shared?
5. **RRRC / CiC rejections:** there is no "Not Approved by CiC / RRRC" status in the sheet. Is that intentional?
6. **Requisition prices:** the forms have no estimated price column. Should the ERP ask for one?
7. **Who logs in:** do headteachers, supervisors and partner organisations get their own logins, or do staff enter forms for them?
8. **Admin cost limit** in partner budgets (the prototype warns above 10%).
9. **Form 250 approvals:** is there a cash limit, or a step where the Country Director must approve before payment?

---

## 8. Prototype status (staging)

| Module | Route | Admin | Moderator |
|---|---|---|---|
| Partner Proposals (PPF) | `#/proposals`, `#/proposal/new` | Final review, convert to project | First review, enter PPF |
| Departments & Programs | `#/programs` | ✓ | ✓ |
| Organisation | `#/org` | ✓ | ✓ |
| Requisitions | `#/requisitions` | "Approved by" step | "Checked by" / "Controlled by" steps |
| Payment Receipts (F-250) | `#/receipts` | Post to finance | Create, print |
| Document Register | `#/register` | ✓ | ✓ |
| Approval Workflows | `#/workflow` | Edit all 15 chains, including the 5 requisition chains | No access |

All data is sample data and is stored in the browser. Use "Reset demo data" in the user menu to start over.
