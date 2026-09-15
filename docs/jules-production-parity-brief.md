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
