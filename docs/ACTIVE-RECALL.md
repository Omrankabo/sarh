# Active recall and visit loading

## Using reviews

1. Complete a story step with **I can explain this now**. Its concepts' cards enter **Ready for first recall**. Unread cards do not create overdue work.
2. Open **Review / المراجعة** from navigation or **Recall today** on the dashboard.
3. Start up to ten distinct cards. Explain aloud, sketch or calculate before revealing each answer.
4. Rate **Again** for incorrect/forgotten, **Hard** for correct with effort, **Good** for correct unaided, or **Easy** for immediate confident recall. Each button previews the next interval.
5. Stop at the completion screen. Short-interval retries are available separately, without an automatic loop.

The queue separates overdue, due now, first recall and upcoming seven days. Within urgency groups, topic priority, recent recall difficulty and oldest due date determine order. Concepts are interleaved within a group without promoting unseen cards ahead of due cards. Topic priority defaults to Normal. Dates and daily reminders use Riyadh time. All reminders are inside the app; no paid service, cloud activation or push delivery is required.

The dashboard remains in its compact layout. The timer widget stays off Home, which has the full timer. Review ratings are self-assessments and never enter independent question accuracy; they continue to count as a qualifying activity under the existing streak rule.

## Scheduler and saved data

- Runtime: `ts-fsrs` **5.4.2**, pinned; FSRS-6, 0.90 requested retention, 365-day maximum interval, deterministic previews. The npm registry exposed this stable version during implementation; the planned v6 / FSRS-7 release was not published there. No unversioned Git dependency is used.
- The retention target is a scheduling parameter, not measured mastery or a promise of examination performance. Short initial learning steps can be minutes; later successful reviews expand to days.
- Existing `sarh-study-v1` IndexedDB notebook and records stay in place. Optional `recall.version: 1` adds concept enrollment, serialized scheduler state, immutable review events, priorities, daily dismissals and a resumable session.
- Legacy schedules retain their due timestamps until the next real rating. No historical grades, focus minutes or successful recalls are invented. Completed steps enroll once without a retroactive overdue backlog.
- Ratings commit in one IndexedDB transaction with a revision check and unique event ID. Concurrent snapshot saves merge independent card revisions and events, then project schedules back into legacy topic progress. Stale ratings are rejected and the newest state is loaded.
- Invalid stored notebooks produce a recovery error rather than being silently replaced.
- The selected session, position and revealed answer survive refresh and language switching. The course flashcard tab and global review center use the same scheduler.

## Loading behavior

A document load or reload starts a visit. Home, Subjects (including Topics), Study library and Review each receive one entrance during that visit. A shared in-memory set owns the behavior; `sessionStorage` holds the visit marker. No persistent first-ever cookie is needed. Language changes and topic tabs do not create another entrance.

The opaque gray overlay contains the existing central artwork and a task-completion percentage. Readiness tracks page mount, local notebook loading, artwork and fonts; it is not a network byte estimate. Once ready, color advances from viewport edges in a 300 ms ease-out reveal. Slow loading retains the gray preparation screen; an eight-second escape displays recovery text rather than trapping the user. Reduced motion uses a short fade. Old route-wide slide animations are removed from teaching panels.

## Delivery phases

- [x] Visit tracking, gray entrance, edge colors, short reveal and no topic-tab animation.
- [x] Adaptive scheduling, concept enrollment and preservation of legacy due dates.
- [x] Ranked review center, dashboard card, navigation count, topic status and daily in-app reminders.
- [x] Bounded review sessions, four ratings, targeted explanation links and saved session state.
- [x] Automated scheduling/storage tests and production/source-exclusion checks.
- [x] Browser checks for enrollment, Arabic/mobile layout, refresh/language continuity, completion and offline review persistence.

Run `npm test` and `npm run build`. Start normally with `Start-Sarh.cmd`. Browser checks use a separate origin on port 3002 so the user's port-3000 records are not changed by test answers.
