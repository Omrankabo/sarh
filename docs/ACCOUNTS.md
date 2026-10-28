# Personal accounts — setup and acceptance

## Configuration

Copy `.env.example` to `.env.local` for local configuration. `NEXT_PUBLIC_FIREBASE_MODE=local` (or absent) keeps guest studying available without credentials. For cloud mode supply the Firebase web app's public API key, auth domain, project ID and app ID. These client identifiers are not service-account credentials; authorization is enforced by `firestore.rules`.

The configured project is `sarh-ba9c3`, owned by the user's personal Google account. Firestore is in `europe-west1`, Standard edition, Spark plan. Google and Email/Password providers are enabled. The approved support email is `omrankabo@gmail.com`. Authorized domains include localhost, 127.0.0.1 and sarh-sigma.vercel.app. The five client configuration variables are set in Vercel production; preview deployments require their own approved configuration/domains. No Firebase Analytics SDK is installed.

## Local data and cloud ownership

- IndexedDB `sarh-study-v1` retains the legacy guest record `personal`. Account records use `account:<uid>`.
- Signing in never imports browser history automatically. The learner explicitly chooses whether to import the guest notebook. Stable activity IDs and an import receipt make retries safe; the original guest copy remains.
- `/users/{uid}` contains separate settings, progress, attempts, sessions, recall cards/events/metadata, import receipts and device timer collections. Rules require a matching verified user and validate the record envelope.
- Local saves happen first. The notebook is a durable outbox. Firestore uses its default memory cache, not a second persistent browser cache. Subscriptions reconcile server changes; reconnect/focus retries queued changes.
- Field timestamps resolve positions and answer drafts individually. Completion/error histories are unioned. Recall events are replayed deterministically. Attempts, reviews and sessions retain stable IDs.
- Active timers remain owned by their starting browser; remote timers are informational. Account changes pause/save outgoing study. Reports union overlapping focus intervals and retain Riyadh day boundaries.
- Shared-device sign-in uses session persistence. Explicit shared-device sign-out clears the outgoing notebook only after successful syncing. Offline/error cases keep the notebook and ask the learner to reconnect. Signing out does not delete cloud records or the guest notebook.

## Verification

Run `npm test`, `npm run check`, `npm run content:check`, `npm run release:check` and `npm run firebase:test`. The emulator suite uses disposable test identities only. It covers owner isolation, denied anonymous/unverified access, registration, verification, password reset, cloud round trips, concurrent completion merges and password-to-Google linking. Local tests cover guest import idempotence, per-field merges, concurrent recall events and overlapping focus reports.

The installed Auth emulator rejects adding a password to an existing Google identity with `EMAIL_EXISTS`; this is an emulator limitation observed in its sign-up handler. The app uses Firebase's authenticated `linkWithCredential` flow, but that direction still needs a real-account acceptance check. The local app was observed signed in as the owner's Google account with a confirmed Synced status against the production project. The guest-import choice remained explicit. This confirms one real account, not the two-account/cross-device acceptance gate. In-app browsers may block popups; a same-tab sign-in option is available.

## Live acceptance gate

Provisioning and emulator success do not prove live activation complete. Before marking it complete, use two consenting test accounts to verify:

1. Google sign-in and email registration/verification/reset on desktop and phone.
2. Guest keep-separate/import choices and no duplicated import after refresh.
3. Independent notebooks on one browser, and the same account on a second device.
4. Offline activity followed by reconnect, concurrent reviews and interrupted uploads.
5. Switching accounts during a timer, shared-device cleanup and weekly reports.
6. Both credential-linking directions with recent authentication.

Do not use real learner activity as disposable QA data. No paid services are required by this implementation.
