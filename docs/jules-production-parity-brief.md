# Jules QA Brief: Complete Role-Based Clickable and Feature Audit

## Mission

Turn the current Propdesk application into a real, usable property-management application. Every visible interactive control must either work end to end or be removed/disabled until it is implemented. Every role must see the same underlying records through a different authorized view.

Reference production URL: https://propdesk-smoky.vercel.app/

Reference demo URL: https://kokebhoa.org/demo

The demo is a behavioral reference only. Do not copy demo-only features, branding, code, seed data, AI, Telegram, OCR, sensor telemetry, online payments, inventory, purchase orders, or unrelated facility modules. Implement only the shared property-management workflows: workspace, units, residents, billing, payment evidence, maintenance, upkeep, announcements, profile, and role access.

## QA Result

The current production build is not feature-complete. Most screens render, but many controls are decorative, mocked, linked to the wrong role, or point to routes that do not exist.

High-severity findings:

1. Login is role selection, not authentication. It writes predictable client cookies.
2. Middleware trusts editable role, workspace, user, and unit cookies.
3. The portal layout defaults to `ADMIN` when role context is absent.
4. Resident dashboard links Announcements to `/admin/announcements`, which is an admin route.
5. Resident dues and messages routes are advertised but do not exist.
6. Maintenance messages and tickets routes are advertised but do not exist.
7. Settings is advertised for all roles but no settings route exists.
8. Admin announcement submission only shows a mock alert and does not save anything.
9. Admin payment confirmation only shows a mock alert and does not update an invoice.
10. Admin ticket claiming only shows a mock alert and does not assign a ticket.
11. Dashboards and detail pages display hard-coded demo records, amounts, names, dates, and counters.
12. Many cards and badges have a pointer cursor but no click handler.
13. Header search, notifications, and user menu do not perform an action.
14. There is no real logout control.

## Testing Evidence and Limitation

The live Vercel app was opened and the admin session was exercised at `/admin` and `/admin/announcements`. The admin page rendered its dashboard and announcement composer. The primary announcement button is visibly present but the source confirms it calls an alert instead of the server action.

Unauthenticated direct requests to `/`, `/admin/*`, `/resident/*`, `/maintenance/*`, and `/settings` redirect to login, which is expected for protected routes. The production build exposes these implemented pages only:

- `/`, `/login`
- `/admin`, `/admin/announcements`, `/admin/calendar`, `/admin/community`, `/admin/invoices`, `/admin/maintenance`, `/admin/profile`
- `/maintenance`, `/maintenance/profile`, `/maintenance/tools`
- `/resident`, `/resident/profile`, `/resident/tickets`

The browser test context did not support clearing or injecting cookies, so a clean resident and staff session could not be switched into the already-shared browser context. The resident and staff findings below are therefore verified against the live route map plus the current source implementation. Jules must add automated browser tests that create real users for all three roles and execute the flows below before calling the work complete.

## Definition Of Interactive Completion

For every button, link, tab, switch, input, clickable card, badge, menu item, and form:

1. It has a clear role-appropriate purpose.
2. It has a real handler or a real navigation target.
3. The handler validates input on the server.
4. The action reads/writes the database within the current workspace.
5. The UI shows loading, success, empty, and error states.
6. Related role views and dashboard counts update after success.
7. Unauthorized users cannot invoke the action by changing the URL, form data, cookies, or request headers.
8. A control that is out of scope is removed, not left as a dead clickable decoration.

## Access-Control Contract

### Admin / association manager may

- Configure the workspace.
- Create, edit, deactivate, and list units.
- Create users and assign workspace memberships.
- Assign residents/owners to units.
- Create invoices and charges.
- Review, approve, reject, and adjust payment evidence.
- View and manage all workspace maintenance tickets.
- Assign staff, schedule visits, add notes, resolve, and close tickets.
- Create and complete upkeep events.
- Publish announcements to all residents or selected units.
- View workspace-scoped operational summaries.

### Resident / unit owner may

- View only their own workspace membership and allowed unit(s).
- View their invoices, balances, due dates, and payment-review status.
- Submit payment evidence for their own invoices.
- View announcements targeted to their workspace/unit/role.
- Create and track maintenance requests for their allowed unit.
- Edit or cancel their own request only while its status permits it.
- Edit allowed profile fields.

### Maintenance staff may

- View only assigned or explicitly authorized work orders.
- Claim eligible work if the workflow permits staff self-assignment.
- Update work status, visit time, notes, and completion details.
- View announcements targeted to staff.
- Edit allowed profile fields.

### Must be forbidden

- Resident cannot open admin invoices, admin community, admin maintenance, admin profile, workspace settings, or another resident's records.
- Staff cannot approve/reject payments, edit workspace configuration, manage memberships, or access unrelated residents.
- Admin cannot impersonate a resident by editing cookies or request headers.
- Any user cannot switch workspace or unit by editing a browser cookie or query parameter.
- Missing or invalid sessions must not fall back to `demo-workspace-id`, `demo-admin-user-id`, or any other demo identity.

## Route and Clickable Audit

### Shared login and shell

#### `/login`

Current defects:

- Three buttons select `ADMIN`, `RESIDENT`, or `STAFF` without email/password, invitation, session lookup, or membership verification.
- The handler writes `user-role`, `workspace-id`, `user-id`, and `unit-id` directly from the browser.
- A user can manufacture a role or tenant context.

Required:

- Replace role selection with real authentication.
- Resolve role and workspace from a server-side session and `WorkspaceMember` record.
- Support logout, session expiry, invalid-session handling, and a clear unauthorized state.
- A development-only demo login may exist only behind an explicit development flag and must never be the production fallback.

#### Header

Current clickable controls:

- Logo link to `/`.
- Search input.
- Language menu.
- Notification button.
- User menu button.

Required:

- Logo returns to the authenticated role dashboard.
- Search submits a workspace-scoped search and displays results or a no-results state. It must not be a decorative input.
- Language menu changes all supported UI text without changing authorization or data.
- Notification button opens a real notification list or is removed until notifications exist.
- User menu opens profile and logout actions. Logout must invalidate the server session.

#### Sidebar

Current defects:

- Resident links `/resident/dues` and `/resident/messages`, but neither route exists.
- Staff links `/maintenance/messages` and `/maintenance/tickets`, but neither route exists.
- All roles link `/settings`, but it does not exist.
- Admin sidebar does not link to announcements or calendar even though those pages exist.

Required:

- Define one route registry containing route, label, role, and feature status.
- Render only implemented routes authorized for the current role.
- Add missing pages before exposing links, or remove the links.
- Add active route state, keyboard accessibility, and a mobile equivalent.
- Add admin links for all implemented admin workflows.

### Admin route audit

#### `/admin`

Current clickable controls:

- Export Report button.
- Review Payments card.
- Follow Up Overdue card.
- Manage Work Orders card.
- Schedule Upkeep card.

Current defects:

- Export Report has no action.
- KPI values are hard-coded: `212`, `4`, `59`, `4`.
- Collection progress is hard-coded to `40%`, `467,213 ETB`, `698,021 ETB`, `35 of 90`, `102 of 102`, and fixed August 2026 text.
- Cards navigate without passing a filter, so their count and destination can disagree.

Required:

- Query all metrics by workspace and selected billing period.
- Export a real workspace-scoped report or remove the button.
- Cards navigate with filter parameters that the destination actually applies.
- Show zero, loading, error, and no-data states.

#### `/admin/invoices`

Current clickable controls:

- Search input.
- By Unit and By Month tabs.
- Dispute `Res` and `Dism` buttons.
- Unit/invoice selection cards.
- Paste SMS button.
- Mark checked button.
- View Full Screen button.
- Reject-reason badges.
- Reject Payment button.
- Adjust Amount button.
- Confirm Payment button.

Current defects:

- Search and tabs do not query or filter records.
- Unit 101, Unit 102, invoice amounts, dates, statuses, disputes, and review counts are hard-coded.
- `Res`, `Dism`, Paste SMS, Mark checked, View Full Screen, reject badges, Reject Payment, and Adjust Amount have no working action.
- Confirm Payment displays `Payment Confirmed via Server Action (Mocked)` and uses a commented-out mock invoice ID.
- SMS/OCR/external bank automation is out of scope; the UI must not imply automatic verification.

Required:

- Query a real payment-review queue scoped to the workspace.
- Search/filter by unit, resident, period, status, and dispute.
- Use a separate payment submission review status: `PENDING`, `APPROVED`, `REJECTED`.
- Confirm, reject, or adjust inside a transaction and make approval idempotent.
- Require rejection reason and record reviewer/timestamp.
- Display actual uploaded evidence or a truthful no-file state.
- If manual reference text is supported, store it as payment evidence; do not call it automatic SMS verification.

#### `/admin/announcements`

Current clickable controls:

- Power Outage, Power Restored, Water Outage, Water Restored, Elevator Down template badges.
- Schedule for later switch.
- Send to specific units switch.
- Send to All Residents button.

Current defects:

- Template badges only change local text, which is acceptable only if the final form saves successfully.
- Schedule switch has no date/time input and does not schedule anything.
- Specific-units switch has no unit selector and cannot target units.
- Send button never calls `dispatchAnnouncement`; it displays a mock alert.
- There is no saved announcement list, edit, archive, expiry, author, or delivery visibility.

Required:

- Validate title and body.
- Add target selector for all residents, selected units, and staff where supported.
- Add date/time when scheduling is enabled.
- Save through `dispatchAnnouncement` and show a pending/scheduled/published result.
- Show the saved announcement list and visibility rules.
- Resident and staff views must read the same records with role-appropriate filtering.

#### `/admin/community`

Current clickable controls:

- Feed and Messages tabs.
- Like button.
- Comment button.
- Search unit input.
- Static thread rows.
- `+ Message Unit` button.
- `View Unit` button.
- Message input and Send icon button.

Current defects:

- Feed post, author, unit, dates, likes, comments, threads, and messages are static demo content.
- Like, comment, thread selection, search, Message Unit, View Unit, and Send do not persist or navigate.
- Direct messaging is not required for the core scope unless fully implemented and workspace-scoped.

Required:

- Either implement persisted announcement feed and direct messages with authorization, or remove those controls and static content.
- Never show fake conversations as real data.
- Thread access must be workspace-scoped and based on allowed unit/member relationships.

#### `/admin/maintenance`

Current clickable controls:

- Log Ticket.
- View Schedule.
- Active/Open/Doing/Urgent/Done tabs.
- Search tickets input.
- My Queue button.
- Three Claim & start buttons.

Current defects:

- Log Ticket and View Schedule do nothing.
- Tabs, search, and My Queue do not filter data.
- Tickets are static demo cards.
- There are duplicate Claim & start buttons on one ticket.
- Claim actions show a mock alert and use a mock ticket ID.
- No detail route, assignment selector, notes, status history, resolution, or close action exists.

Required:

- Query real workspace tickets.
- Make each filter change the query/result set.
- Add validated ticket creation for admin.
- Claim/assign changes assignee and status transactionally.
- Add ticket detail with description, location, priority, reporter, assignee, visit schedule, notes, attachments, history, resolve, and close.
- Enforce staff/admin differences on every mutation.

#### `/admin/calendar`

Current clickable controls:

- Add Reminder.
- Calendar date cells.
- Calendar/List tabs.

Current defects:

- Add Reminder does nothing.
- Selected date defaults to September 9, 2026.
- Event cards are hard-coded for September 9 and 5.
- Legend is static.
- All Reminders says the list would appear here.

Required:

- Persist `UpkeepEvent` records with title, category, date, responsible person, status, notes, and workspace.
- Add/edit/complete/delete reminder actions with confirmation and errors.
- Calendar and list must render the same database records.
- Include overdue filtering and linked ticket/invoice dates only when those records exist.
- Do not expose sensor or automated meter features in the core release.

#### `/admin/profile`

Current defects:

- Identity, email, workspace, and location are hard-coded.
- Settings text is a stub with no controls.

Required:

- Read current user and workspace from the session/database.
- Add authorized profile/workspace editing or remove the stub.
- Add a real settings route only for implemented settings.

#### Missing admin management routes

Add an authorized admin workflow for units, residents, and memberships. It must support create/edit/deactivate unit, create/invite user, assign role, attach user to unit, search/filter, and audit. Do not hide this requirement behind hard-coded demo data.

### Resident route audit

#### `/resident`

Current clickable controls:

- Previous/next month buttons.
- View Bill.
- Pay / Upload Slip.
- Report Issue.
- Announcements.
- Community Rules.
- Submit Meter.

Current defects:

- `hasInvoice` is always true.
- Amount `13,497 ETB`, due date August 15, 2026, and all content are hard-coded.
- Previous/next month buttons do not change the month.
- View Bill has no action.
- Pay / Upload Slip navigates to missing `/resident/dues`.
- Report Issue is the only valid navigation target.
- Announcements incorrectly navigates to `/admin/announcements`.
- Community Rules and Submit Meter are dead controls.

Required:

- Query only the authenticated resident's unit/invoices.
- Make month navigation query real periods.
- Add `/resident/dues` for invoice details and payment evidence upload/reference submission.
- Add `/resident/announcements` or `/resident/community` and link to it.
- Provide real community rules content or remove that control.
- Remove meter submission unless manual meter readings are explicitly accepted and fully implemented.
- Show unpaid, partially paid, paid, overdue, and no-invoice states from stored records.

#### `/resident/dues` (missing)

Required:

- List only the resident's invoices.
- Show amount, balance, due date, status, payment history, and review state.
- Submit payment evidence with invoice, amount, method/reference, optional file, and note.
- Do not allow resident approval, adjustment, or access to another unit.

#### `/resident/messages` (missing)

Required:

- Prefer rename to `/resident/announcements` for the core release.
- Show only announcements targeted to the resident's workspace/unit/role.
- If direct messages are included, persist them and enforce participant/workspace access; otherwise remove the link.

#### `/resident/tickets`

Current clickable controls:

- All/Open/Active/Done filter badges.
- Ticket row.
- Edit / Cancel.
- New Request.

Current defects:

- One ticket is hard-coded.
- Filter badges have no handlers and do not filter.
- Ticket row has no real selection/data loading.
- Edit / Cancel has no handler.
- New Request has no handler or form.
- Ticket detail description, dates, visit schedule, and history are static.

Required:

- Query only tickets for the resident's allowed unit(s).
- Implement real filters.
- Add a New Request form with title, description, category, location, priority, optional attachment, and availability.
- Allow edit/cancel only before the configured status boundary.
- Show append-only status history and staff updates.

#### `/resident/profile`

Current clickable controls:

- Guidance accordion.
- Switch unit account card.
- Seven resource rows: Documents, Help & support, Show tips again, Report Technical Problem, Community rules, Privacy Policy, About.

Current defects:

- Identity, unit, email, location, KPI counts, and membership age are hard-coded.
- Guidance includes Telegram, which is out of scope.
- Switch unit account has no handler.
- All resource rows are decorative and have no destination/action.

Required:

- Read identity, unit, and counts from database records.
- Remove Telegram guidance.
- Implement unit switching only from authorized memberships, or remove it.
- Link resources to real content/actions or remove the rows.
- Technical problem reporting must create a real support/maintenance record or be removed.

### Maintenance staff route audit

#### `/maintenance`

Current clickable controls:

- Six quick-action badges: Add Expense, Expenses, Announcement, Tickets, Supplies, Unpaid Follow Up.
- Three Needs Attention rows.
- Water Meters and Electric Meters cards.

Current defects:

- Every quick-action badge and card is a pointer-looking non-interactive element.
- KPIs `2`, `14`, and `96%` are hard-coded.
- Activity feed is fake: New Ticket, Generator Test, PO Approved.
- Expenses, supplies, purchase orders, generator, and sensor features are outside the core scope.

Required:

- Replace the dashboard with assigned-work-order data and real counts.
- Link only to implemented core work-order, upkeep, and authorized announcement views.
- Remove out-of-scope tools rather than leaving dead cards.
- Staff cannot see billing approval controls.

#### `/maintenance/tools`

Current clickable-looking cards:

- Water meters, Electric meters, Work orders, Announcements, Unpaid bills, Schedule, Assets & manuals, Tanker reserve, Materials, Purchase orders, Expenses.

Current defects:

- Cards have no click handlers or links.
- Tanker reserve/sensor telemetry, assets, materials, purchase orders, and expenses are out of scope.

Required:

- Remove this directory or replace it with links to implemented work orders, upkeep, and staff announcements.
- Do not expose financial/unpaid-bill management to staff beyond a permitted status summary.

#### `/maintenance/tickets` (missing)

Required:

- Add a real assigned queue and detail page, or remove the sidebar link.
- Staff can view assigned work, claim eligible work, update status, schedule/record a visit, add notes, attach completion evidence, and mark resolved.
- Admin closes tickets; staff cannot approve payments or edit workspace membership.

#### `/maintenance/messages` (missing)

Required:

- Add read-only staff announcements, or remove the sidebar link.
- Do not create direct messaging unless it is fully persisted and authorized.

#### `/maintenance/profile`

Current clickable controls:

- Log ticket.
- All tickets.
- Unit water meters.

Current defects:

- Identity, contact details, workspace, membership date, and KPI counts are hard-coded.
- All three buttons do nothing.
- Unit water meters is out of scope unless manual meter entry is explicitly approved.

Required:

- Load current staff profile and assigned-ticket aggregates.
- Link Log ticket and All tickets to working authorized routes, or remove them.
- Remove water-meter action unless it is a real manual workflow.

## Data and Backend Requirements

The existing Prisma schema is a foundation, not proof that the UI works. Add or revise the model to support:

- Server-side sessions and membership-derived role/workspace/unit access.
- Payment submissions with status, amount, method/reference, file, reviewer, reason, and timestamps.
- Invoice paid balance and transaction-safe approval.
- Maintenance description, location, attachment, completion note, and append-only status history.
- Upkeep status, responsible user, completion note, and workspace scope.
- Announcement targeting for all residents, selected units, and any supported staff scope.
- Explicit workspace ownership for message threads.
- Foreign keys, unique constraints, and indexes preventing cross-workspace records.

Every server action must:

1. Resolve the authenticated session.
2. Verify role permission.
3. Verify workspace and record ownership.
4. Validate input with a shared schema.
5. Use a transaction for related financial/status updates.
6. Return structured success/error data.
7. Revalidate affected pages.

Never use a client-provided `workspace-id`, `user-id`, `unit-id`, or role as authority. Never fall back to demo IDs in production.

## Required Automated Tester Suite

Jules must add browser/API tests that run against a seeded test database. For each test, capture URL, role, action, expected result, actual result, and screenshot/log on failure.

### Admin flow

1. Login as admin.
2. Open dashboard; verify metrics are database-derived.
3. Open every sidebar link and every dashboard card.
4. Search/filter invoices by unit, month, and status.
5. Open a payment submission; approve, reject, and adjust in separate test records.
6. Verify duplicate approval does not double-count.
7. Create, assign, update, resolve, and close a maintenance ticket.
8. Create, edit, complete, and delete an upkeep reminder.
9. Publish an all-resident announcement.
10. Publish a selected-unit announcement.
11. Verify profile/settings controls either persist or are absent.
12. Verify export, search, language, notifications, user menu, and logout.

### Resident flow

1. Login as resident with a real membership.
2. Verify only the resident dashboard/routes are visible.
3. Open every sidebar link and every dashboard action.
4. Navigate invoice months and verify records change.
5. Open an invoice and submit payment evidence.
6. Verify the resident sees pending/approved/rejected status but cannot review it.
7. Open announcements and verify workspace/unit targeting.
8. Create, edit/cancel where allowed, and track a maintenance request.
9. Verify profile/resources controls work or are removed.
10. Verify admin/staff URLs return forbidden or safe redirect without exposing data.
11. Logout and verify protected routes redirect to login.

### Maintenance staff flow

1. Login as staff with assigned and unassigned tickets.
2. Verify only staff routes and authorized records are visible.
3. Open every sidebar link and every dashboard action.
4. Claim eligible work, update status, add note, schedule visit, and resolve.
5. Verify staff cannot close if closing is admin-only.
6. Verify staff cannot approve/reject/adjust invoices or edit membership.
7. Read staff-targeted announcements.
8. Verify unrelated workspace tickets are inaccessible.
9. Verify profile actions work or are removed.
10. Logout and verify protected routes redirect to login.

### Negative access tests

- Resident requests every `/admin/*` route.
- Staff requests every `/admin/*` and `/resident/*` route.
- Admin attempts to submit a resident-only mutation with another unit ID.
- Any role changes cookies and request headers.
- Any role changes route IDs to another workspace.
- Expired, missing, and malformed sessions.

Expected result for every negative test: no data leak, no unauthorized mutation, and a clear forbidden/redirect response.

## Completion Gate

Do not call this complete because pages render or the Vercel build passes. Completion requires:

- No dead clickable control remains.
- No fake demo number/name/date appears in production screens.
- No route is advertised unless it exists and is authorized.
- All three roles pass the positive and negative flows above.
- Resident announcements no longer points to admin announcements.
- Payment, ticket, announcement, and upkeep mutations persist and update related views.
- `npm ci` and `npm run build` pass cleanly.
- Vercel Preview is tested first; only a Ready preview is promoted to Production.

