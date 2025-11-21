# Recurring Expenses

## Purpose
Automate creation of frequent expenses (e.g., monthly subscriptions, weekly classes, daily snacks budgeting).

## Fields
```
{ userId, description, category, amount, interval: 'daily'|'weekly'|'monthly', startDate, nextRun, active }
```
`nextRun` recalculated after each materialization.

## Creation
POST `/api/recurring` sets initial `nextRun` = `startDate` if in future else first interval tick after `startDate`.

## Manual Runner
POST `/api/recurring/run`:
1. Find active recurring items where `nextRun <= now`.
2. Create Expense documents.
3. Advance `nextRun`:
   - daily: +1 day
   - weekly: +7 days
   - monthly: same day next month (clamped if shorter month)
4. Return summary `{ created: number, items: [ids...] }`.

## Edge Cases
- Timezones: dates stored as UTC; UI formats local date.
- Monthly rollover: If target day absent (e.g. Feb 30), fallback to last day of month.
- Deactivation: `PUT /api/recurring/:id/toggle` sets `active=false` to pause generation.

## Future Enhancements
- Cron / serverless scheduled execution instead of manual endpoint.
- History log referencing recurring source id.
- Custom intervals (e.g. bi-weekly) using ISO 8601 durations.
- Notification system before creation.

## Suggested Cron (Example)
Every hour trigger runner (approx coverage):
```
0 * * * * curl -X POST https://api.yourdomain.com/api/recurring/run -H "Authorization: Bearer <token>"
```
(Move auth to service account or internal secret route.)
