# Jules Brief: Real Property Management Workflows for Production

## Purpose

Make the Propdesk production application a real, database-backed property-management product. Use the shared property-management workflows visible in the Propdesk demo as behavioral inspiration, but do not copy demo-only features, branding, code, data, or integrations.

Reference applications:

- Demo reference: https://kokebhoa.org/demo
- Current production app: https://propdesk-smoky.vercel.app/

The demo opened to an install/entry screen in the review session. Therefore, this document does not claim undocumented demo behavior. The implementation target is the shared core already defined by the repository SRS: workspaces, units and residents, billing, payment evidence, maintenance, upkeep, announcements, profiles, and role-based access.

## Non-negotiable Scope Boundary

Build common property-management behavior only. Do not add features merely because they may exist in the demo.

Do not add:

- AI assistants, AI-generated recommendations, or AI shortcuts
- Telegram, SMS, email, or other external messaging integrations
- OCR or automatic payment-slip parsing
- Sensor or automated utility-meter integrations
- Online payment gateways
- Advanced accounting, budgeting, or financial reporting
- Commercial/factory/HR modules unrelated to association property management
- Complex lease, legal, or tenancy-management features
- Demo branding, demo seed data, or hard-coded demo values in production

## Current Production Gaps

The current application has a useful Prisma model foundation, but the live UI is still mostly a demo shell:

1. Login selects a role and writes predictable cookies instead of authenticating a real user.
2. `getTenantContext()` falls back to `demo-workspace-id` and `demo-admin-user-id`.
3. Middleware trusts client-controlled cookies for workspace, user, and role context.
4. Dashboard, profile, resident, maintenance, and calendar screens contain hard-coded values.
5. Several buttons show alerts or comments saying the server action is mocked instead of saving data.
6. The calendar list is a placeholder and its events are mocked.
7. The current invoice flow does not yet expose a complete resident submission and administrator review workflow.
8. Maintenance tickets do not retain status history, descriptions, attachments, notes, or completion records.
9. There is no complete admin workflow for managing units, residents, members, recurring dues, or invoice generation.
10. Several sidebar routes exist without corresponding complete database-backed pages.

Every production-facing number, status, name, date, and list must eventually come from the database or an explicit empty state.

## Route-by-Route Parity Contract

This section is the required implementation checklist. A route is not complete when it merely renders; its visible controls must perform the listed server-backed action and its data must be scoped to the current workspace and role.

### Shared shell and routing

Current problems:

- The portal layout defaults to `ADMIN` when the role header is absent.
- The middleware authorizes from editable `user-role`, `workspace-id`, `user-id`, and `unit-id` cookies.
- The production navigation exposes links such as `/resident/dues`, `/resident/messages`, `/maintenance/messages`, and `/maintenance/tickets` without complete route implementations.
- Role redirects can hide an authorization problem by sending the user back to `/` instead of showing a clear forbidden state.

Required behavior:

- Every protected request resolves a real session and membership before rendering.
- Render navigation only for routes that exist and are authorized for that role.
- Use one shared route map for desktop sidebar, mobile navigation, dashboard quick actions, and deep links.
- Unauthorized access returns a clear 403/Not permitted state or redirects to the role's own dashboard with a message; it must never produce a blank page or generic error.
- Add route smoke tests for every role and every navigation link.

### Admin / association manager

| Route | Current behavior | Required behavior |
|---|---|---|
| `/admin` | Hard-coded counts, collection totals, occupancy, utilities, and month | Query workspace-scoped aggregates. Period switch changes the query. Cards link to filtered invoices, tickets, units, or upkeep. Empty workspace shows zero state. |
| `/admin/invoices` | Hard-coded units/invoices; `Confirm Payment` displays a mock alert; reject/adjust controls do not persist; slip preview is a placeholder | Query invoice/payment-review queue. Search and tabs filter real records. Open a real slip/reference. Confirm, reject, and adjust call transactional server actions, show errors, and update the queue and dashboard exactly once. |
| `/admin/maintenance` | Hard-coded tickets; duplicate `Claim & start` buttons; claim action is mocked | Query real tickets with filters for status, priority, assignee, unit, and text. Log Ticket opens a validated form. Claim changes assignment/status. Admin can assign, reschedule, add notes, resolve, and close. Persist history. |
| `/admin/calendar` | Dates and events are hard-coded; Add Reminder and list view are placeholders | Query `UpkeepEvent` plus permitted linked due dates/ticket visits. Add/edit/complete/delete reminder with validation. Calendar and list show the same records and filters. Selected date is not fixed to 2026. |
| `/admin/announcements` | Compose form renders; Send button shows `Announcement Dispatched via Server Action (Mocked)` and never calls the action | Submit `dispatchAnnouncement` for real. Validate title/body/target/schedule. Specific-unit mode must select units and persist targeting. Show saved announcements with status, author, dates, pin, edit/archive controls. |
| `/admin/community` | Feed, likes, comments, threads, search, and Send controls are static demo content | Either connect each control to persisted announcement/message records or remove it from this release. Do not display fake conversations. Community feed must use the same announcement visibility rules as resident announcements. |
| `/admin/profile` | Displays demo association/user values | Load current user and workspace. Edit profile and workspace fields with authorization, validation, and success/error state. |
| `/admin` unit/member management | No complete route is exposed for units/residents/members | Add an admin route for units and memberships: create/edit/deactivate unit, invite/create user, assign role, attach resident to unit, search/filter, and audit changes. |

### Resident / unit owner

| Route or action | Current behavior | Required behavior |
|---|---|---|
| `/resident` | `hasInvoice = true`, amount/date/status and quick-action counts are hard-coded | Load the authenticated resident's units and invoices. Month navigation changes the query. Show unpaid/overdue/paid/empty states from the database. No resident can see another unit. |
| Resident announcements | Dashboard links to `/admin/announcements`, which is the wrong role route and is blocked by RBAC | Add `/resident/announcements` or `/resident/community` and point all resident links there. Query only announcements targeted to the resident's workspace/unit/role. Read/pinned/expiry behavior must be real. |
| Resident dues/invoices | `/resident/dues` is linked but not implemented in the route tree | Add the route. List invoice details, balance, due date, history, and payment-submission status. Provide a real payment-evidence form with file/reference validation. |
| `/resident/tickets` | One hard-coded ticket; filters do not filter; Edit/Cancel and New Request do nothing | Query only tickets reported by or assigned to the resident's allowed unit. Filters work. New Request creates a ticket with title, description, category, location, priority, attachment, and optional visit availability. Resident can cancel/edit only while allowed by status. Show history and staff updates. |
| Resident community/messages | Quick links and route are absent or point to admin content | Provide a resident-safe read view for announcements. Direct messaging is optional for the core release; if shown, it must be persisted and workspace-scoped, otherwise remove the control. |
| Resident profile | Demo identity/unit and static help rows | Load profile and membership. Allow permitted profile edits. Help/legal/about rows must either link to real content or be removed; do not present inactive controls as complete features. |
| Meter submission | `Submit meter` is a non-functional button and automatic meter features are out of scope | Do not expose it in the core release unless manual meter reading is explicitly accepted as a common workflow. If retained, implement manual input only with validation and workspace/unit scoping. |

### Maintenance staff

| Route or action | Current behavior | Required behavior |
|---|---|---|
| `/maintenance` | Hard-coded KPIs and quick actions; no real queue | Query assigned/authorized work orders. Counts are derived from ticket status. Show urgent/open/in-progress/resolved states and links to filtered queues. |
| Staff ticket queue/detail | Sidebar links to incomplete `/maintenance/tickets`; current dashboard has no functional ticket detail flow | Add queue and detail routes or remove the links. Staff can claim only eligible work, update status, schedule/record visit, add notes, attach completion evidence, and mark resolved. Admin closes. |
| `/maintenance/tools` | Cards for meters, inventory, purchase orders, assets, tanker telemetry, and expenses do nothing; several are explicitly out of core scope | Replace with links only to implemented core work-order/upkeep/announcement views. Remove sensor telemetry and unrelated facility modules from the first release. |
| Staff announcements | Navigation implies messages but no complete route exists | Add a read-only staff announcement view using target rules, or remove the link. |
| Staff profile | Demo identity and static KPIs | Load real user/workspace membership and assigned-ticket counts. Persist permitted profile edits. |

### Cross-role consistency rules

- The same ticket, invoice, announcement, and upkeep record must show consistent status and timestamps across roles, with fields hidden according to authorization rather than duplicated mock data.
- Admin creates/assigns/reviews; resident submits/views/reports; staff executes/updates. No role should see controls belonging to another role.
- A resident announcement link must never point to an admin route.
- A successful mutation must update the current page, related dashboard counters, and other role views after revalidation.
- Failed mutations must preserve prior data and show an actionable error; browser `alert()` is not a substitute for a persisted result.
- Every list needs loading, empty, error, pagination or bounded-query behavior, and filters that actually affect the query.
- Every date and amount must come from stored records and use the workspace timezone/currency.

## Exact Bug Fixes To Do First

These are the highest-signal defects visible in the current Vercel app:

1. Create the resident announcements route and change the resident dashboard link away from `/admin/announcements`.
2. Replace the admin announcement mock alert with a real form submission, including target selection and result state.
3. Replace resident ticket mock content and wire New Request, filters, detail, edit/cancel, and status history.
4. Replace admin invoice mock content and wire payment review to real invoice/payment-slip records.
5. Replace admin maintenance mock cards and duplicate buttons with a real query and one action per ticket.
6. Replace calendar hard-coded dates/events and implement the reminder form and list view.
7. Remove or disable non-functional navigation/cards instead of leaving clickable-looking dead controls.
8. Remove all demo fallbacks and hard-coded production values after the database-backed paths exist.

## Target Roles

Keep the existing role direction, with server-side authorization:

- `ADMIN` or association manager: workspace setup, units, residents, invoices, payment review, maintenance assignment, upkeep, announcements, reporting.
- `UNIT_OWNER` or resident: own unit, invoices and balance, payment evidence, announcements, maintenance requests, profile.
- `STAFF` or maintenance worker: assigned work orders, status updates, notes, completion.

`SUPER_ADMIN` may remain an internal/platform role, but it is not part of the first production workflow unless a concrete workspace-management requirement needs it.

## Required Backend Contract

### 1. Authentication and tenant context

- Replace role-only login with real user authentication using the existing `User` and `WorkspaceMember` models.
- Store only a signed, server-validated session identifier in the browser.
- Resolve `userId`, `workspaceId`, and role from the server-side session, never from arbitrary client cookies or request headers.
- Reject missing or invalid sessions instead of silently falling back to demo IDs.
- Enforce workspace scoping in every query and mutation.
- Add authorization helpers such as `requireSession()`, `requireRole()`, and `requireWorkspaceAccess()`.
- Add logout and session expiry.

### 2. Workspace, units, and residents

- Admin can create and edit workspace details.
- Admin can create, edit, deactivate, and list units.
- Admin can associate a user with a unit and role.
- Resident queries must resolve the resident's allowed unit from membership data, not from a client-provided `unit-id` cookie.
- Add validation for duplicate unit numbers within a workspace and invalid cross-workspace references.

### 3. Billing and invoices

- Admin can configure a recurring or one-time charge for a unit and billing period.
- Generate invoices with amount, billing month, issue date, due date, and balance.
- Support clear business statuses: `UNPAID`, `PARTIALLY_PAID`, `PAID`, `OVERDUE`, `DISPUTED`, `WAIVED`.
- Derive `OVERDUE` from due date and remaining balance; do not store contradictory manual counters.
- Resident sees only their own invoices and balance.
- Admin can filter by period, unit, resident, and status.
- Use database transactions for invoice balance changes.

### 4. Payment evidence review

- Resident submits payment evidence containing invoice, claimed amount, payment method/reference, optional file, and note.
- Store a separate review status for the submission: `PENDING`, `APPROVED`, `REJECTED`.
- Admin can approve, reject with a reason, or adjust the verified amount.
- Approval must be idempotent and transactional: an already approved submission cannot be approved twice or double-counted.
- Rejection must preserve the outstanding invoice balance.
- Record reviewer and review timestamp.
- Do not implement OCR or automatic bank/SMS integrations.

### 5. Maintenance requests and work orders

- Resident creates a request with title, description, category, location/unit, priority, and optional attachment.
- Admin can filter, assign, reschedule, update, and close requests.
- Staff sees only assigned work orders or work orders permitted by role.
- Use a consistent lifecycle such as `OPEN`, `ASSIGNED`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`, `CANCELLED`.
- Add notes and completion details.
- Persist an append-only status/history record with actor and timestamp.
- Closed requests are immutable except for an admin correction path.

### 6. Upkeep and calendar

- Admin creates upkeep events with title, category, date, responsible person, status, and note.
- Calendar and list views query `UpkeepEvent` records.
- Support overdue filtering and completion notes.
- Do not add automated meter collection or external calendar synchronization.

### 7. Announcements and messages

- Admin publishes an announcement to all residents, selected units, or staff where supported by the data model.
- Residents see only announcements addressed to their workspace/unit/role.
- Store author, publication time, optional schedule/expiry, pinned state, and target scope.
- Existing comments/likes/direct-message models should not be expanded until the core announcement workflow is complete.
- Remove the Telegram dispatch comment and any external integration assumptions.

### 8. Dashboard and reporting

- Build dashboard read queries that aggregate saved records for the selected workspace and period.
- Include collection, outstanding/overdue balances, paid invoices, occupied units, payment reviews, open tickets, and overdue upkeep.
- Every metric links to its filtered detail page.
- Empty workspaces must show zero/empty states rather than demo numbers.
- Add loading, error, and success feedback for all mutations.

## Data-Model Corrections

Review the Prisma schema before implementing UI:

- Add a real payment-submission status enum and payment metadata rather than inferring review state from invoice state.
- Add invoice balance/paid-at or an equivalent transaction-safe representation; do not rely only on `claimed_amount` and `verified_amount`.
- Add maintenance description, location, attachment reference, completion note, and status-history records.
- Add upkeep status, responsible user, completion note, and optional due/expiry semantics.
- Add announcement targeting that can safely represent selected units and/or roles.
- Ensure message threads are workspace-scoped through explicit ownership or a provably safe unit join.
- Add indexes for the workspace plus the main filtering fields.
- Use foreign keys and unique constraints to prevent cross-workspace and duplicate records.

Do not migrate or delete production data without a migration plan and backup. Generate a Prisma migration and verify it against a clean database.

## Implementation Order

1. Add real session authentication and server authorization.
2. Add workspace/unit/member management and seed one explicit development workspace only.
3. Replace hard-coded dashboard/profile/resident values with read queries and empty states.
4. Complete invoice generation, resident invoice views, and payment submission/review transactions.
5. Complete maintenance request, assignment, status history, and completion flows.
6. Complete upkeep calendar/list persistence.
7. Complete announcement targeting and resident/staff reads.
8. Add focused role and tenant-isolation tests.
9. Remove mock alerts, demo fallbacks, placeholder copy, and dead routes.
10. Deploy through a Vercel Preview first, then promote the verified `main` commit to Production.

## Acceptance Tests

### Admin

- Can create a workspace, unit, resident membership, invoice, upkeep event, ticket, and announcement.
- Can approve/reject payment evidence and see balances/counters update exactly once.
- Can assign and close a maintenance request.
- Can view only records in the selected workspace.

### Resident

- Can log in with a real account and see only the assigned unit.
- Can see current and overdue invoices.
- Can submit payment evidence and see pending/rejected/approved status.
- Can create and track a maintenance request.
- Can read only announcements addressed to the resident.

### Staff

- Can see assigned work orders.
- Can update status and add completion notes.
- Cannot approve payments, edit workspace configuration, or access unrelated residents.

### Security and correctness

- A user cannot change workspace, user, role, or unit access by editing browser cookies or request headers.
- A user from workspace A cannot read or mutate workspace B records.
- Payment approval is idempotent.
- Dashboard totals are derived from database records.
- `npm ci` followed by `npm run build` passes in a clean environment.
- Vercel Preview deployment is Ready before merging to `main`.

## Definition Of Done

The work is complete when the existing Propdesk screens are backed by real server actions and database reads, the role journeys above pass, tenant isolation is tested, no production screen displays hard-coded demo data, and the Vercel production deployment is Ready from the merged `main` commit.
