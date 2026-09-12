/**
 * Centralised form submission for the membership (join) and contact forms.
 *
 * The site is a static export (GitHub Pages) with no server, so forms submit
 * from the browser straight to Supabase's REST endpoint. Using REST directly
 * (rather than the supabase-js SDK) keeps the client bundle small.
 *
 * ── To go live ──────────────────────────────────────────────────────────
 * 1. In Supabase, create two tables (a single jsonb `data` column keeps every
 *    form field without pinning a schema yet):
 *      create table memberships (
 *        id uuid primary key default gen_random_uuid(),
 *        created_at timestamptz not null default now(),
 *        data jsonb not null
 *      );
 *      create table contact_messages (
 *        id uuid primary key default gen_random_uuid(),
 *        created_at timestamptz not null default now(),
 *        data jsonb not null
 *      );
 * 2. Lock them down with insert-only RLS (the anon key ships in this public
 *    page, so the public must be able to INSERT but never SELECT):
 *      alter table memberships enable row level security;
 *      create policy "public insert" on memberships
 *        for insert to anon with check (true);
 *      -- (repeat for contact_messages; add NO select policy)
 * 3. Set these in .github/workflows/deploy.yml (build env), NEXT_PUBLIC_ so
 *    they reach the client bundle:
 *      NEXT_PUBLIC_SUPABASE_URL: https://<project>.supabase.co
 *      NEXT_PUBLIC_SUPABASE_ANON_KEY: <anon public key>
 *
 * Until those env vars are set, submissions are logged to the console and the
 * form still shows its success state, so nothing breaks before the keys land.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True once the Supabase env vars are present at build time. */
export const backendConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

async function insert(table: string, data: Record<string, unknown>) {
  const row = { data, created_at: new Date().toISOString() };

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    // No backend configured yet: don't lose the submission silently.
    if (typeof console !== "undefined") {
      console.info(`[forms:${table}] no backend configured yet — payload:`, data);
    }
    return;
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    throw new Error(`Submission failed (${res.status})`);
  }
}

/** Membership / join form submission. */
export function submitMembership(data: Record<string, unknown>) {
  return insert("memberships", data);
}

/** Contact / enquiry form submission. */
export function submitContact(data: Record<string, unknown>) {
  return insert("contact_messages", data);
}
