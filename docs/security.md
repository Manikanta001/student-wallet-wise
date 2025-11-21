# Security Considerations

## Authentication
- JWT signed with HS256 using `JWT_SECRET`.
- Expiration: 7 days. Consider refresh token pair + rotation for production.

## Passwords
- Hashed with bcrypt (cost=10). Increase cost (12+) if acceptable performance.
- Never stored in plain text.

## Token Storage (Frontend)
- MVP uses `localStorage`. Vulnerable to XSS.
- Recommended upgrade: httpOnly secure cookie + CSRF token or double submit cookie pattern.

## Validation
- All inbound bodies validated with zod; extend schemas to restrict categories list if needed.
- Sanitize description/category for length & allowed chars (future).

## Rate Limiting (Future)
- Add middleware (e.g., express-rate-limit) per IP and per user for auth / write endpoints.

## Logging & Monitoring
- Add request logging (pino / morgan) excluding sensitive headers.
- Monitor failed login attempts -> potential brute force detection.

## Data Access
- User scoping enforced by `userId` filter in queries.
- Ensure no route returns other users' documents by always including `userId` in query filters.

## Sensitive Config
- `.env` gitignored. Use secrets manager in production (AWS SSM, GCP Secret Manager, Vault, etc.).

## CORS
- Currently permissive (`cors()` default). Restrict origins in production:
```ts
app.use(cors({ origin: ['https://yourdomain.com'], credentials: true }));
```

## Dependencies
- Run `npm audit` regularly; patch moderate / high vulnerabilities.

## Error Responses
- Avoid leaking stack traces; global handler returns generic 500 message.

## Backup & Recovery
- Implement MongoDB backup strategy (automated snapshots) for production.

## Future Hardening
- Helmet middleware for common security headers.
- Content Security Policy to mitigate XSS.
- Object-level authorization if introducing shared resources.
