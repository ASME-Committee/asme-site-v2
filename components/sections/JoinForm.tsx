"use client";

import { useState, type FormEvent } from "react";
import { Combobox } from "@/components/ui/Combobox";
import { ArrowRight, Check, Linkedin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button, ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/content";
import { submitMembership } from "@/lib/forms";

/**
 * Membership form — the fields ASME collects from new members.
 * `handleSubmit` saves to Supabase via submitMembership (see lib/forms.ts);
 * the CRM reads these rows from the `memberships` table.
 */

type Field = {
  name: string;
  label: string;
  required: boolean;
  options: string[];
  searchable?: boolean;
  help?: string;
};

const BASED = [
  "Victoria",
  "New South Wales",
  "Queensland",
  "South Australia",
  "Tasmania",
  "Western Australia",
  "Northern Territory",
  "Other",
];

const GENDER = ["Woman", "Man", "Non-binary", "Prefer not to say"];


const AGE = ["17-25", "26-35", "36-45", "46-55", "56-65", "65+"];

const CLINICAL_PROFESSION = [
  "Not applicable",
  "Aboriginal and Torres Strait Islander health practice",
  "Chinese medicine",
  "Chiropractic",
  "Dental",
  "Medical",
  "Medical radiation practice",
  "Midwifery",
  "Nursing",
  "Occupational therapy",
  "Optometry",
  "Osteopathy",
  "Paramedicine",
  "Pharmacy",
  "Physiotherapy",
  "Podiatry",
  "Psychology",
];

// Supplied by ASME. Surgical specialities are folded in here, so there is no
// separate surgical question.
const MEDICAL_SPECIALITY = [
  "Not applicable",
  "Anaesthesiology",
  "Cardiology",
  "Dermatology",
  "Emergency Medicine",
  "Endocrinology",
  "ENT",
  "Epidemiology",
  "Gastroenterology & Hepatology",
  "General Physician",
  "Geriatrics",
  "GP",
  "Gynecology",
  "Haematology",
  "Health Administration",
  "Health Informatics",
  "Immunology",
  "Infectious Diseases",
  "Intensive Care",
  "International Medical Graduate",
  "Locum",
  "Medical Education",
  "Nephrologist",
  "Neurology",
  "Obstetrics",
  "Oncology",
  "Ophthalmology",
  "Orthopaedics",
  "Paediatrics",
  "Pain Medicine",
  "Palliative Care",
  "Pathology",
  "Pharmacology",
  "Plastics & Reconstruction",
  "Psychiatry",
  "Public Health",
  "Radiation Oncology",
  "Radiology",
  "Rehabilitation Medicine",
  "Renal",
  "Respiratory Physician",
  "Rheumatology",
  "Rural Generalist (ACCRM GP)",
  "Sexual Health",
  "Sports Medicine",
  "Student",
  "Surgery",
  "Urology",
];


const CURRENT_USE = [
  "Clinician",
  "Researcher",
  "Entrepreneur/Founder",
  "Working in a startup",
  "Working in the healthcare industry",
  "Investor",
  "Management/Strategy Consulting",
  "Advisor",
  "Medical student",
];

// Each option should map to something ASME can do more or less of. "A colleague
// told me" and "my hospital told me" are different levers, so they are split.
// Ordered by ascending commitment. The one-off conversation leads deliberately:
// opening with "Mentoring" makes people who would happily give an hour decide the
// whole question is not for them.
const CONTRIBUTE = [
  "A one-off conversation to share your experience",
  "Mentoring",
  "Speaking at ASME events",
  "Being featured in an innovator spotlight (LinkedIn or newsletter)",
  "Contributing content, such as articles or interviews",
  "Helping organise or host events",
];

const HOW_FOUND = [
  "Personal connection or colleague",
  "LinkedIn",
  "Other social media",
  "Email from ASME",
  "An ASME event",
  "An ASME program (AUSCEP or Clinician+)",
  "My hospital, university or college",
  "Web search",
];

/** Step 1: who you are. */
const aboutYou: Field[] = [
  { name: "based", label: "Where are you primarily based?", required: true, options: BASED },
  { name: "gender", label: "How do you describe your gender?", required: true, options: GENDER },
  { name: "age", label: "What is your age range?", required: true, options: AGE },
];

/** Step 2: your clinical background. Both optional on purpose: students and
 *  people outside the AHPRA professions are welcome, and a required field here
 *  would quietly tell them otherwise. */
const background: Field[] = [
  {
    name: "clinicalProfession",
    label: "Clinical profession",
    required: false,
    options: CLINICAL_PROFESSION,
    help: "AHPRA-registered clinicians only.",
  },
  {
    name: "medicalSpeciality",
    label: "Medical speciality",
    required: false,
    options: MEDICAL_SPECIALITY,
    // 48 options is too many to scan in a native select, whose type-ahead only
    // jumps to the first letter match.
    searchable: true,
  },
];

const inputClass =
  "h-11 w-full rounded-xl border border-border bg-surface-elevated px-4 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus-visible:border-fg/40 focus-visible:ring-2 focus-visible:ring-accent/40";
const selectClass = `${inputClass} appearance-none bg-[right_0.75rem_center] bg-no-repeat pr-10`;

/** One question: a select, or a searchable combobox where the option list is
 *  too long to scan in a native select. Shared by the steps that ask. */
function SelectField({ field }: { field: Field }) {
  return (
    <label className="block">
      <Label required={field.required}>{field.label}</Label>
      {field.help && <span className="-mt-1 mb-2 block text-xs text-fg-subtle">{field.help}</span>}
      {field.searchable ? (
        <Combobox
          name={field.name}
          options={field.options}
          required={field.required}
          placeholder="Start typing to search"
          className={inputClass}
        />
      ) : (
        <select
          name={field.name}
          required={field.required}
          defaultValue=""
          className={selectClass}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none' stroke='%2364748b' stroke-width='1.5'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="" disabled>
            Select an option
          </option>
          {field.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}
    </label>
  );
}

/**
 * A numbered step.
 *
 * The form was twelve questions in one unbroken column, which reads as longer
 * than it is and gives the eye nowhere to rest. Numbering the groups shows how
 * much is left, and it lets the one question that is an offer rather than an
 * answer look like what it is.
 *
 * `tone="offer"` gives a step the dark blue and green treatment the home page,
 * the closing call to action and the contact form all use for the same idea.
 */
function Step({
  n,
  title,
  note,
  tone = "ask",
  children,
}: {
  n: string;
  title: string;
  note?: string;
  tone?: "ask" | "offer";
  children: React.ReactNode;
}) {
  const offer = tone === "offer";
  return (
    <section>
      {/* The ask is dark blue and green; the fields under it stay on white.
          Answering a question is not the same act as being asked, and putting
          form controls on the dark ground would say it was. */}
      <div className={offer ? "contribute-block" : ""}>
        <div className={offer ? "contribute-mark" : ""}>
        <div className="flex items-baseline gap-3">
          <span
            className={`font-mono text-xs tracking-wider ${
              offer ? "text-[rgb(var(--give))]" : "text-[rgb(var(--accent))]"
            }`}
          >
            {n}
          </span>
          <h2
            className={`font-display text-xl tracking-tight ${offer ? "text-white" : "text-fg"}`}
          >
            {title}
          </h2>
        </div>
        {note && (
          <p
            className={`mt-2 max-w-xl text-sm leading-relaxed pretty ${
              offer ? "text-white/75" : "text-fg-muted"
            }`}
          >
            {note}
          </p>
        )}
        </div>
      </div>
      <div className="mt-7 grid gap-6">{children}</div>
    </section>
  );
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span className="mb-2 block text-sm font-medium text-fg">
      {children}
      {required && <span className="ml-0.5 text-[rgb(var(--accent))]">*</span>}
    </span>
  );
}

export function JoinForm() {
  const [uses, setUses] = useState<string[]>([]);
  const [contributions, setContributions] = useState<string[]>([]);
  const [otherContribution, setOtherContribution] = useState(false);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleUse(value: string) {
    setUses((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  }

  function toggleContribution(value: string) {
    setContributions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const fd = new FormData(e.currentTarget);
      const data: Record<string, unknown> = Object.fromEntries(fd.entries());
      // Multi-select state is not in native form fields.
      data.uses = uses;
      data.contributions = contributions;
      await submitMembership(data);
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(
        "Something went wrong submitting the form. Please try again, or email us at " +
          site.email +
          ".",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <section>
        <Container>
          <Reveal className="mx-auto max-w-2xl p-0 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
              <Check className="h-7 w-7" />
            </span>
            <h2 className="mt-6 font-display text-2xl tracking-tight text-fg">You&rsquo;re on the list.</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-fg-muted pretty">
              Thanks for joining ASME. We&rsquo;ll be in touch shortly with your welcome and next steps.
            </p>

            <div className="mt-8 border-t border-border pt-8">
              <p className="mx-auto max-w-md text-sm leading-relaxed text-fg-muted pretty">
                While you wait, follow us on LinkedIn to see what members are building and to catch events before they fill up.
              </p>
              <div className="mt-5 flex justify-center">
                <ButtonLink
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="md"
                >
                  <Linkedin className="h-4 w-4" />
                  Follow us on LinkedIn
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    );
  }

  return (
    <section id="form">
      <Container>
        <form onSubmit={handleSubmit} className="grid max-w-2xl gap-14">
          <Step n="01" title="About you">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <Label required>First name</Label>
              <input name="firstName" type="text" required autoComplete="given-name" className={inputClass} />
            </label>
            <label className="block">
              <Label required>Family name</Label>
              <input name="familyName" type="text" required autoComplete="family-name" className={inputClass} />
            </label>
          </div>

          {/* Email */}
          <label className="block">
            <Label required>Email</Label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@hospital.org.au"
              className={inputClass}
            />
          </label>

          {aboutYou.map((f) => (
            <SelectField key={f.name} field={f} />
          ))}
          </Step>

          <Step
            n="02"
            title="Your clinical background"
            note="Both optional. Students and people outside the AHPRA professions are welcome here."
          >
          {background.map((f) => (
            <SelectField key={f.name} field={f} />
          ))}
          </Step>

          <Step n="03" title="What you do now">
          <fieldset>
            <Label required>
              How are you currently using your clinical degree and experience?
            </Label>
            <span className="-mt-1 mb-3 block text-xs text-fg-subtle">Select all that apply.</span>
            <div className="grid gap-2 sm:grid-cols-2">
              {CURRENT_USE.map((u) => {
                const checked = uses.includes(u);
                return (
                  <label
                    key={u}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                      checked
                        ? "border-brand-blue bg-brand-blue/5 text-fg"
                        : "border-border bg-surface-elevated text-fg-muted hover:border-border-strong"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                        checked ? "border-brand-blue bg-brand-blue text-white" : "border-border-strong"
                      }`}
                    >
                      {checked && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <input
                      type="checkbox"
                      name="currentUse"
                      value={u}
                      checked={checked}
                      onChange={() => toggleUse(u)}
                      className="sr-only"
                    />
                    {u}
                  </label>
                );
              })}
            </div>
          </fieldset>

          </Step>

          {/* Everything above this line is a question ASME needs answered.
              This one is an offer, so it gets the green mark and its own step
              rather than sitting in the run of fields as another checkbox
              group. Optional on purpose: the site promises "two minutes to
              apply", and optional ticks are more honest than ones chosen to
              get past a required field. */}
          <Step
            n="04"
            title="What you could give back"
            note="Optional, and nothing here is a commitment. The society runs on clinicians who give an hour back, and this is where we find out who might. We always ask before putting your name to anything."
            tone="offer"
          >
          <fieldset id="contribute" className="scroll-mt-28">
            <div className="grid gap-2 sm:grid-cols-2">
              {CONTRIBUTE.map((c) => {
                const checked = contributions.includes(c);
                return (
                  <label
                    key={c}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                      checked
                        ? "border-[rgb(var(--give))] bg-[rgb(var(--give))]/[0.14] text-fg"
                        : "border-border bg-surface-elevated text-fg-muted hover:border-border-strong"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                        checked ? "border-[rgb(var(--give))] bg-[rgb(var(--give))] text-[rgb(var(--ink))]" : "border-border-strong"
                      }`}
                    >
                      {checked && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <input
                      type="checkbox"
                      name="contribute"
                      value={c}
                      checked={checked}
                      onChange={() => toggleContribution(c)}
                      className="sr-only"
                    />
                    {c}
                  </label>
                );
              })}

              <label
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                  otherContribution
                    ? "border-[rgb(var(--give))] bg-[rgb(var(--give))]/[0.14] text-fg"
                    : "border-border bg-surface-elevated text-fg-muted hover:border-border-strong"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    otherContribution
                      ? "border-[rgb(var(--give))] bg-[rgb(var(--give))] text-[rgb(var(--ink))]"
                      : "border-border-strong"
                  }`}
                >
                  {otherContribution && <Check className="h-3.5 w-3.5" />}
                </span>
                <input
                  type="checkbox"
                  checked={otherContribution}
                  onChange={() => setOtherContribution((v) => !v)}
                  className="sr-only"
                />
                Something else
              </label>
            </div>

            {otherContribution && (
              <input
                name="contributeOther"
                type="text"
                placeholder="What did you have in mind?"
                className={`${inputClass} mt-2`}
              />
            )}
          </fieldset>
          </Step>

          <Step n="05" title="One last thing">
          <label className="block">
            <Label required>How did you find out about ASME?</Label>
            <select
              name="howFound"
              required
              defaultValue=""
              className={selectClass}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none' stroke='%2364748b' stroke-width='1.5'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
              }}
            >
              <option value="" disabled>
                Select an option
              </option>
              {HOW_FOUND.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
          </Step>

          <div>
            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit application"}
              <ArrowRight className="h-4 w-4" />
            </Button>
            {error && (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <p className="mt-4 text-sm text-fg-subtle">
              Free to join. No clinical-society dues.
            </p>
          </div>
        </form>
      </Container>
    </section>
  );
}
