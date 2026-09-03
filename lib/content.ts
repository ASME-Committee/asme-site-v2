/**
 * Single source of truth for all content on the landing page. All copy is
 * intentionally free of em and en dashes per editorial guideline.
 *
 * Real names, quotes, partner orgs, and AUSCEP participants are taken from
 * asme.org.au and the public AUSCEP startup directory.
 */

export const site = {
  name: "ASME",
  fullName: "Australian Society for Medical Entrepreneurship & Innovation",
  tagline: "A home for clinician innovators.",
  description:
    "Build, invest, and shape the future of healthcare. Without leaving clinical practice behind.",
  url: "https://asme.org.au",
  email: "info@asme.org.au",
  linkedin:
    "https://www.linkedin.com/company/australian-society-for-medical-entrepreneurship-innovation-asme/",
  // Internal membership page (the on-site replica of the Airtable form).
  joinPath: "/join",
  // Original Airtable form — kept for wiring up form submission later.
  joinUrl: "https://airtable.com/appJvGdxRMBwIzthp/shrH2JDdg2Lf9xOvr",
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

/**
 * Eight destinations, all one click, no dropdowns.
 *
 * About and Resources briefly carried a submenu each, but once the child that
 * pointed back at its own parent was removed both were down to a single item.
 * A one-item dropdown is worse than no dropdown: it hides a real destination
 * behind a hover, needs two interactions instead of one, and hover is not a
 * gesture that exists on a phone or tablet. Partners is therefore a
 * destination in its own right again, and Articles is reached from the
 * Resources page, which is where someone looking for an article already is.
 *
 * The dropdown support in Nav and Footer is intentionally left in place for
 * the day a group genuinely has several children.
 */
export const nav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Driving Change", href: "/changing-the-system" },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  { label: "Partners", href: "/partners" },
  { label: "Membership", href: "/membership" },
  { label: "Contact", href: "/contact" },
];

export const hero = {
  eyebrow: "For clinicians who build",
  // Addresses the reader rather than describing ASME: "like you" is what keeps
  // a clinician from filing herself outside the category. "A home for clinician
  // innovators" survives as the tagline in the nav and page title.
  // Rendered as two spans: `headlineAccent` carries the brand gradient. Kept in
  // content so editing the headline here actually changes the page.
  headlineLead: "The future of healthcare will be shaped by",
  headlineAccent: "clinicians like you.",
  sub: "ASME is where clinicians turn frontline insight into real change. We help you build it, and we work on the institutions so that more clinicians can.",
  primaryCta: {
    label: "Join ASME",
    href: "/join",
  },
  secondaryCta: { label: "Explore AUSCEP", href: "#auscep" },
  // The second action in the hero. Deliberately a text link rather than a
  // button: students and registrars are the priority audience, so "Join ASME"
  // has to stay visually dominant. This exists so a senior clinician sees an
  // ask addressed to them without scrolling.
  contributeCta: {
    label: "Already built something? Offer your experience",
    href: "/join#contribute",
  },
} as const;

/**
 * Scale of the society today, as distinct from what its members have built.
 *
 * These used to sit in a card at the bottom of the hero. They were moved out so
 * the hero ends on its call to action: the card added over 200px before the
 * premise began, which pushed the doors past two and a half screens. They now
 * sit with the AUSCEP outcomes in TrackRecord, where all six figures make one
 * proof argument instead of two separated by half a page.
 *
 *   6  = jointStatement.signatories.length
 *   15 = every org across partnerGroups (5 industry + 5 institutional + 5
 *        ecosystem collaborators). Recount both if those lists change.
 */
export const societyMetrics = [
  { value: "2,000+", label: "Clinicians" },
  { value: "6", label: "Medical schools signed" },
  { value: "15", label: "Partners & collaborators" },
] as const;

export const manifesto = {
  eyebrow: "The premise",
  lines: [
    "Clinicians are under-leveraged.",
    "You've lived the pain.",
    "You can build the solutions.",
  ],
  body: [
    "We are a not-for-profit home for doctors, medical students and other clinicians interested in using their training and experience to make an impact at scale on healthcare through entrepreneurship and innovation.",
    "You do not need a company, a title, or a fully formed plan. If you have seen something in healthcare that should work better and want to be part of changing it, this is your society.",
    "Every clinical discipline. Every career stage.",
  ],
} as const;

/**
 * The single documentary photograph on the home page, sitting directly under
 * the manifesto. The manifesto claims a room full of clinicians; this is the
 * room. The event and date are legible on the screens in the shot, so the
 * caption names them.
 */
export const roomBand = {
  src: "/photos/auscep-medtech-showcase.jpg",
  alt: "A full room of clinicians seated at round tables at the AUSCEP Medtech Showcase, facing a speaker at a lectern between two large presentation screens.",
  caption: "The AUSCEP Medtech Showcase, October 2025.",
} as const;

/**
 * Official vision and purpose statements, provided by ASME.
 */
export const visionPurpose = {
  vision:
    "A future where medical entrepreneurship & innovation is considered mainstream for clinicians.",
  purpose:
    "To inspire and empower clinicians to improve healthcare through innovation, entrepreneurship and enterprise.",
} as const;

/** Official "who we are" statement for the About page vision section. Carries the
 *  facts not stated elsewhere: the full society name, founded 2023, a not-for-profit
 *  medical society, and who it is primarily for. */
export const whoWeAre =
  "The Australian Society for Medical Entrepreneurship & Innovation (ASME) is a not-for-profit medical society founded in 2023 that recognises the unique position of clinicians to identify challenges and opportunities to drive advancements in healthcare. While initially focused on doctors, it warmly welcomes all clinicians and medical students.";

/** ASME's four organisational goals, shown alongside vision and purpose. */
export const goals = [
  "Improve awareness of medical entrepreneurship and innovation as a career option.",
  "Facilitate an easier pathway for medical innovators and entrepreneurs.",
  "Fuel economic impact by boosting the number of successful clinician-driven startups and innovations.",
  "Enhance clinician satisfaction by providing more career variety and options.",
];

/** SPARC Clinician Innovation Program. Content taken from the Parkville LHSN
 *  flyer. The program is sold to health services, so the page carries both the
 *  organisational case and a door for individual clinicians. Dates are not yet
 *  set: keep `status` honest until they are. */
export const sparc = {
  eyebrow: "Coming soon",
  title: "SPARC",
  subtitle: "Clinician Innovation Program.",
  hook: "That idea you have been carrying between shifts deserves more than a conversation in the corridor.",
  description:
    "Born from the ARC Global Innovation Centre and delivered across centres around the world, SPARC is a practical, clinician-focused program that helps clinicians turn the problems they see every day into solutions. ASME brings it to Australia.",
  status: "Dates to be confirmed",
  foundationPartners:
    "Launching in Melbourne's Parkville precinct with Peter MacCallum Cancer Centre and Royal Melbourne Hospital.",
  details: [
    {
      title: "Three-month program",
      body: "A focused program designed to fit around clinical commitments.",
      glyph: "clock",
    },
    {
      title: "8 workshops",
      // Deliberately precise: facilitators are healthcare-experienced, and
      // clinician innovators join most sessions rather than teaching them.
      body: "Virtual and in person, covering the full innovation journey from problem definition to implementation. Facilitators come from healthcare, and clinician innovators who have built solutions join most sessions.",
      glyph: "book",
    },
    {
      title: "Mentorship",
      body: "One-on-one and group mentoring from experienced clinician innovators, entrepreneurs and industry experts.",
      glyph: "users",
    },
    {
      title: "Introductions & networking",
      body: "Connect with local and global SPARC alumni, healthcare innovators and the ARC Innovation network.",
      glyph: "network",
    },
    {
      title: "Tailored to your organisation",
      body: "Focus customised to your needs and priorities. Flexible cohort size up to 20 participants.",
      glyph: "target",
    },
    {
      title: "CPD accreditation under review",
      body: "Intended to form part of your clinicians' CPD requirements.",
      glyph: "award",
    },
  ],
  /** The institutional case. SPARC is bought by health services, not individuals. */
  benefits: [
    "Frontline-driven innovation leads to meaningful operational and clinical improvements.",
    "Position your organisation as forward-thinking and clinician-empowered.",
    "Add variety, creativity and purpose beyond day-to-day work, reducing burnout.",
    "Signal that innovation is supported and valued across the organisation.",
    "Bring clinicians together across departments with a shared innovation mindset.",
    "Focus the program on real challenges with tangible, actionable outcomes.",
    "Generate new devices, digital products, care models and partnerships with sustainable benefit.",
  ],
  benefitTitles: [
    "Improve efficiency & patient outcomes",
    "Enhance reputation & attract talent",
    "Engage, empower & retain clinicians",
    "Build a culture of innovation",
    "Strengthen collaboration",
    "Support your strategic priorities",
    "Create long-term value",
  ],
} as const;

/** Announcements: short, dated items that link out to the page where the fact
 *  permanently lives (a partnership goes to Partners, a program to Programs).
 *  Deliberately lightweight so they actually get published. Newest first is not
 *  required; both surfaces sort by date.
 *
 *  TODO: the two dates below are placeholders set to the day this feed was
 *  built. Replace them with the real announcement dates before going live. */
export type Announcement = {
  /** ISO date, e.g. "2026-08-12". Sorted on, and displayed. */
  date: string;
  kind: "Event" | "Program" | "Partnership" | "Update";
  title: string;
  blurb: string;
  href: string;
};

export const announcements: Announcement[] = [
  {
    date: "2026-07-27",
    kind: "Partnership",
    title: "RACMA joins ASME as an institutional partner",
    blurb:
      "The Royal Australasian College of Medical Administrators joins ASME, extending the partner network to the medical colleges.",
    href: "/partners",
  },
  // Bionics Institute leads the feed. Both items still carry the same
  // placeholder date, and Array.prototype.sort is stable, so source order is
  // what puts this first today. Once the real dates land, date order takes
  // over and this ordering comment stops mattering.
  {
    date: "2026-08-20", // TODO: real date
    kind: "Partnership",
    title: "Bionics Institute joins ASME as a partner",
    blurb:
      "One of Australia's leading medical research institutes joins the network supporting clinician-led innovation.",
    href: "/partners",
  },
  {
    date: "2026-09-02",
    kind: "Program",
    title: "SPARC comes to Melbourne's Parkville precinct",
    blurb:
      "ASME will deliver the SPARC Clinician Innovation Program with Peter MacCallum Cancer Centre and Royal Melbourne Hospital.",
    href: "/programs#sparc",
  },
];

/** Newest first. Used by both the home band and the Insights feed. */
export const announcementsByDate = [...announcements].sort((a, b) =>
  b.date.localeCompare(a.date),
);

/** The routing block on the home page: four things ASME does, each linking to
 *  the page that covers it. Mirrors the nav rather than inventing categories,
 *  so a visitor can map what they read here onto where they can go. */
export const whatWeDo = [
  {
    title: "Network",
    blurb:
      "Curious clinicians who see a problem and want to fix it. Some build companies, some change things from where they already work, and some put their clinical training to use in an entirely new way.",
    glyph: "network",
    href: "/membership",
  },
  {
    title: "Programs",
    blurb:
      "SPARC brings innovation training inside your hospital, built around clinical work rather than competing with it. AUSCEP took four cohorts from idea to venture.",
    glyph: "compass",
    href: "/programs",
  },
  {
    title: "Events",
    blurb:
      "Dinners, roundtables and pitch nights, plus the ecosystem events we rate. Deliberately few, so the ones on the calendar earn their place.",
    glyph: "spark",
    href: "/events",
  },
  {
    title: "Driving Change",
    blurb:
      "Working on the universities, training hospitals and colleges that decide whether innovation becomes a normal part of a clinical career.",
    glyph: "path",
    href: "/changing-the-system",
  },
] as const;

export type ClinicianRole = {
  title: string;
  examples: string;
  glyph: "stethoscope" | "heart-pulse" | "activity" | "pill" | "graduation" | "siren" | "brain" | "microscope";
};

/**
 * The home page's routing block: three ways in, not five.
 *
 * Doors one and two are the audiences ASME wants signing up. Door three is not
 * a market: it is the supply that makes the first two doors' promises true, and
 * it is written as an ask rather than an offer. A registrar reading door three
 * sees that experienced clinicians are here and have agreed to give time, which
 * is the strongest recruitment argument on the page precisely because it is
 * addressed to somebody else.
 *
 * Every promise here maps to something the site already delivers: the community
 * directory, the programs page, and the six contribution options in the join
 * form. Nothing new has to be built for this block to be honest. The predecessor
 * `pathways` block promised fifteen things, of which two existed, which is very
 * likely why it was pulled from the home page in the 24 August restructure.
 */
export type Door = {
  id: "noticing" | "building" | "built";
  title: string;
  body: string;
  cta: string;
  href: string;
};

export const doors: Door[] = [
  {
    id: "noticing",
    title: "I keep noticing things that should work better.",
    body: "You have not started anything. You may not think the word entrepreneur applies to you. That is the most common way in, and everyone here was there once.",
    cta: "Meet the community",
    href: "/membership",
  },
  {
    id: "building",
    title: "I am building something.",
    body: "A company, a device, a service, or a change you are pushing through inside your health service. You want people who have done it before, and training that fits around a roster instead of competing with it.",
    cta: "See the programs",
    href: "/programs",
  },
  {
    id: "built",
    title: "I have built one, and I will help the next.",
    body: "You have raised, scaled, or exited, and you know what the first year costs. Give an hour to someone three years behind you. Mentor, speak at a dinner, or sit for one conversation.",
    cta: "Offer your experience",
    href: "/join#contribute",
  },
];

/** Framing for the doors block. This sits high on the page, straight after the
 *  manifesto, because recognising yourself costs the reader nothing: you can
 *  tell which line is you without knowing anything about ASME yet. The sub-line
 *  is kept plain for the same reason. Nothing here should require context the
 *  visitor does not have thirty seconds in. */
export const doorsIntro = {
  eyebrow: "Where you are now",
  heading: "Three ways in.",
  sub: "Most people arrive at one of these. Pick the closest.",
} as const;

/**
 * The home page's live block. Replaces the old arrangement, where the middle of
 * the page read "coming soon" and then "program complete": two closed doors at
 * the exact point a visitor is deciding.
 *
 * It absorbs the standalone "Latest from ASME" band. The newest announcement now
 * leads this section instead of occupying position two, where a first-time
 * visitor met a headline that assumed they already knew what SPARC was.
 */
export const onNow = {
  eyebrow: "On now",
  heading: "Where to find us next.",
  /** SPARC is pinned above the event list: it is the live program, and it is
   *  what most people arriving from the doors will want first. */
  sparc: {
    title: "SPARC Clinician Innovation Program",
    meta: "Melbourne · dates to be confirmed",
    body: "Launching in the Parkville precinct with Peter MacCallum Cancer Centre and Royal Melbourne Hospital. Three months, eight workshops, built to fit around clinical commitments.",
    href: "/programs#sparc",
  },
  footer:
    "Dinners, roundtables and pitch nights, plus the ecosystem events we rate. Deliberately few, so the ones on the calendar earn their place.",
  cta: { label: "All events", href: "/events" },
} as const;

/**
 * The AUSCEP strip, reframed. Same figures, same honesty, different job.
 *
 * The numbers used to sit under a "Program complete" chip, which reads as a
 * closed door at the point a visitor is deciding. AUSCEP is still described as
 * complete on the Programs page, where that fact belongs. Here the figures work
 * as evidence, and the closing line turns them into a reason to join now.
 */
export const trackRecord = {
  eyebrow: "Track record",
  heading: "What clinicians here have already built.",
  /** Spelled out because the acronym means nothing to a first-time reader, and
   *  the figures below are meaningless until they know what produced them. This
   *  sentence has to answer three questions before the numbers land: what AUSCEP
   *  was, that it is finished, and why a finished program is on this page. */
  lede:
    "AUSCEP, the Australian Clinical Entrepreneur Program, took four cohorts of clinicians from an idea to a working venture between 2023 and 2026. ASME ran it with MTPConnect. The program is complete, and its alumni are the people you will meet here.",
  outcomesLabel: "What those four cohorts produced",
  scaleLabel: "The society today",
  cta: { label: "See what AUSCEP delivered", href: "/programs#auscep" },
} as const;

/** The contribution ask, shown under the join call to action. Mirrors the six
 *  options in the join form so the page never promises a way to help that the
 *  form cannot capture. */
export const contributeAsk =
  "Already built something? The society runs on clinicians who give an hour back. Mentor, speak, host an event, or sit for one conversation.";

export const clinicianRoles: ClinicianRole[] = [
  {
    title: "Doctors",
    examples: "Consultants, registrars, GPs, surgeons, JMOs.",
    glyph: "stethoscope",
  },
  {
    title: "Nurses",
    examples: "RNs, nurse practitioners, midwives, clinical leads.",
    glyph: "heart-pulse",
  },
  {
    title: "Allied Health",
    examples: "Physios, OTs, dietitians, audiologists, social workers.",
    glyph: "activity",
  },
  {
    title: "Pharmacists",
    examples: "Hospital, community, clinical, industry.",
    glyph: "pill",
  },
  {
    title: "Med & Health Students",
    examples: "Medical, nursing, pharmacy, allied health students.",
    glyph: "graduation",
  },
  {
    title: "Paramedics",
    examples: "Pre-hospital, retrieval, ambulance leadership.",
    glyph: "siren",
  },
  {
    title: "Psychology & Mental Health",
    examples: "Clinical psychologists, therapists, psychiatrists.",
    glyph: "brain",
  },
  {
    title: "Dental & Specialist",
    examples: "Dentists, prosthodontists, oral health, sub-specialty.",
    glyph: "microscope",
  },
];

export type Pathway = {
  id: "founder" | "investor" | "operator" | "advisor" | "curious";
  title: string;
  pitch: string;
  unlocks: string[];
};

export const pathways: Pathway[] = [
  {
    id: "founder",
    title: "Founder",
    pitch:
      "You have identified a wedge. A workflow that is broken, a market that is mispriced, a patient cohort that is underserved. ASME helps you find co-founders, capital, and your first customers.",
    unlocks: ["AUSCEP cohort entry", "Co-founder matching", "First-cheque introductions"],
  },
  {
    id: "investor",
    title: "Investor",
    pitch:
      "You want clinical pattern matching at the cap table. We connect you to vetted deal flow, syndicates, and a peer group of clinicians writing cheques.",
    unlocks: ["Curated deal flow", "Syndicate access", "Diligence office hours"],
  },
  {
    id: "operator",
    title: "Operator",
    pitch:
      "You do not want to start a company. You want to run one. Health-tech operating roles where clinical credibility is a moat.",
    unlocks: ["Operator job board", "Equity & comp benchmarks", "Founder team matching"],
  },
  {
    id: "advisor",
    title: "Advisor",
    pitch:
      "Your judgement is the product. Get matched with founders who need a clinician on the cap table. Paid in equity, not pizza.",
    unlocks: ["Advisor placements", "Equity grant playbooks", "Clinical advisory boards"],
  },
  {
    id: "curious",
    title: "Curious",
    pitch:
      "You are not sure what shape this takes yet. Start here. Read, attend, ask. No commitment, no jargon, no gatekeeping.",
    unlocks: ["Member-only newsletter", "Open events & socials", "Career path 1:1s"],
  },
];

export const auscep = {
  eyebrow: "Delivered 2023 to 2026",
  title: "AUSCEP",
  subtitle: "The Australian Clinical Entrepreneur Program.",
  /** Program mark. Renders in place of `title`/`subtitle`, which it already
   *  spells out, so the heading carries brand rather than repeating itself.
   *  `subtitle` is kept as the image's alt text. */
  logo: "/auscep-logo.png",
  closed: true,
  description:
    "ASME's flagship clinical entrepreneur program, delivered with MTPConnect across four cohorts from 2023 to 2026. Over 12 months it took clinicians from idea to venture through workshops, mentorship, and a showcase to investors and partners. AUSCEP is now complete. Its alumni and their companies fill the Innovator Directory, and its results are the foundation everything ASME does next is built on.",
  pillars: [
    {
      title: "Build your toolkit",
      body: "Eight immersive in-person workshops and online webinars that combine clinical practice with entrepreneurial thinking.",
    },
    {
      title: "Grow with mentors",
      body: "Ongoing mentorship from experienced clinicians and operators who help you navigate key decisions and de-risk the path.",
    },
    {
      title: "Sharpen your idea",
      body: "Focused 1:1 consultations with the delivery team to review your venture, critique the model, and set clear next steps.",
    },
    {
      title: "Showcase & connect",
      body: "A targeted network of collaborators, investors, and partners. Forums designed to unlock pilots, funding, and partnerships.",
    },
  ],
  // Verified headline results from the 2024 AUSCEP Impact Report (the two-year
  // pilot, Cohorts 1 & 2). Numbers taken directly from the report; update when a
  // newer report is published.
  stats: [
    { value: "152K", label: "Patient lives impacted" },
    { value: "157", label: "Clinicians participated to date" },
    { value: "$40M", label: "Funding secured" },
  ],
  report: {
    label: "Read the AUSCEP Impact Report",
    href: "/auscep-impact-report-2024.pdf",
    // The linked PDF is the 2024 report, which covers only the first two
    // cohorts, so its numbers are smaller than the ones shown above. The note
    // exists to explain that gap to anyone who opens it.
    note: "Figures cover AUSCEP's four cohorts, 2023 to 2026. The 2024 Impact Report linked below covers the first two.",
  },
} as const;

/** Real AUSCEP cohort participants from asme.org.au/startup-directory. */
export type Member = {
  name: string;
  role: string;
  org: string;
  type: "Doctor" | "GP" | "Allied Health" | "Surgeon" | "Psychologist" | "Anaesthetist" | "Paramedic" | "Physiotherapist" | "Dentist" | "Operator";
  bio: string;
  initials: string;
  accent: "blue" | "coral" | "soft-blue";
};

export const members: Member[] = [
  {
    name: "Alexandra Hu",
    role: "Doctor",
    org: "Skan",
    type: "Doctor",
    bio: "Building Skan, an automated full-body skin check designed to detect suspicious skin lesions and aim for earlier melanoma detection.",
    initials: "AH",
    accent: "blue",
  },
  {
    name: "Birinder Giddey",
    role: "CMO & Executive of Medical Services",
    org: "AeroHealth Link",
    type: "Operator",
    bio: "Integrating CASA-compliant drone logistics with Local Health Service Networks to move urgent pathology, blood products, and medicines between rural sites and hubs in minutes.",
    initials: "BG",
    accent: "coral",
  },
  {
    name: "Brenda Taylor",
    role: "Clinical Psychologist",
    org: "Focus Forward Courses",
    type: "Psychologist",
    bio: "Making ADHD education more accessible to the thousands of people who are newly diagnosed as adults.",
    initials: "BT",
    accent: "soft-blue",
  },
  {
    name: "Cameron Grayden",
    role: "Paediatric Anaesthetist",
    org: "Aeris",
    type: "Anaesthetist",
    bio: "Improving the safety of endotracheal intubation. Leveraging clinical expertise to develop new technologies that improve patient outcomes.",
    initials: "CG",
    accent: "blue",
  },
  {
    name: "Elleesha King",
    role: "Team Manager",
    org: "Ambulance Victoria",
    type: "Paramedic",
    bio: "Pulse Tile is a single-use pulse-sensing device for suspected cardiac arrest. It cuts delays from difficult manual pulse palpation and the subjective nature of breathing assessment in DRSABCD.",
    initials: "EK",
    accent: "coral",
  },
  {
    name: "Benjamin Gold",
    role: "Allied Health Professional",
    org: "Medical Support Solutions",
    type: "Allied Health",
    bio: "Vascutherm 5 is a mobile compression and iceless cooling/heating device for use post-operatively, after injury, or after strenuous exercise.",
    initials: "BG",
    accent: "soft-blue",
  },
  {
    name: "Anne Stephenson",
    role: "General Practitioner",
    org: "IMG Coaching",
    type: "GP",
    bio: "Helping IMGs build communication confidence through practical coaching, simulated patients, and small-group sessions so they can connect with patients more easily.",
    initials: "AS",
    accent: "blue",
  },
  {
    name: "Catherene Pham",
    role: "Specialist Prosthodontist Surgeon",
    org: "Bio-Ti Implants",
    type: "Dentist",
    bio: "4D bio-printed titanium implants for slow release and concentrated drug and hormone delivery.",
    initials: "CP",
    accent: "coral",
  },
  {
    name: "Ettie Ben-Shabat",
    role: "Physiotherapist",
    org: "Clinician, researcher, educator",
    type: "Physiotherapist",
    bio: "Clinician-researcher-educator focused on teaching practical sensory and motor recovery to clinicians treating stroke and neurological conditions.",
    initials: "EB",
    accent: "soft-blue",
  },
];

/**
 * Real AUSCEP alumni testimonials with their names, titles, and quotes
 * (verbatim from asme.org.au / programs-opportunities).
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  accent: "blue" | "coral" | "soft-blue";
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I'm finishing up the program a more confident entrepreneur with a stronger sense of purpose and resolve to make a difference, no matter how long it takes. I hope I can stay connected to AUSCEP for ongoing inspiration and collaboration in the future. Thanks!",
    name: "Dr Gill Singleton",
    role: "GP Clinical Entrepreneur",
    initials: "GS",
    accent: "coral",
  },
  {
    quote:
      "The AUSCEP program has been invaluable in helping us refine our business, identify our value, and facilitate introductions to incredibly useful connections and mentors within the health entrepreneurship space.",
    name: "Dr Georgia Downing",
    role: "Medical Doctor",
    initials: "GD",
    accent: "blue",
  },
  {
    quote:
      "As a busy clinician very preoccupied with delivering clinical care, I didn't know there was a world of healthcare innovation that I can only now see with some clarity since the AUSCEP program. I love being part of it. This course has changed my future and its impact on my clinical work from now on.",
    name: "Dr Derek Eng",
    role: "Palliative Medicine",
    initials: "DE",
    accent: "soft-blue",
  },
  {
    quote:
      "I would highly recommend clinicians to apply and join the AUSCEP program. It is a unique opportunity to meet your tribe and learn key knowledge about entrepreneurship in order to contribute towards unsuffering the world. Your adventure and innovation journey starts here. You will be supported, mentored, and provided with professional links. It is time to light a flame instead of cursing the darkness.",
    name: "Dr Mark Lin",
    role: "Consultant Psychiatrist",
    initials: "ML",
    accent: "blue",
  },
  {
    quote:
      "This program was pivotal in giving me the confidence to establish myself as an entrepreneur. Being surrounded by amazing and inspiring people who are driving innovation and change in the most challenging of environments is life changing. We cannot be what we cannot see, and knowing that there is a supportive community of people who have been there before gives you the confidence to continue. That is essential to drive change within healthcare.",
    name: "Sarah Oorschot",
    role: "Clinical Pharmacist",
    initials: "SO",
    accent: "coral",
  },
];

export type Eventish = {
  title: string;
  type:
    | "Conference"
    | "Dinner"
    | "Roundtable"
    | "Pitch night"
    | "Workshop"
    | "Demo day"
    | "Hackathon"
    | "Webinar";
  // Who runs it: an ASME-hosted event, or one we curate from the wider
  // clinician-innovation ecosystem. Drives the badge on each card.
  host: "ASME" | "Ecosystem";
  city?: "Sydney" | "Melbourne" | "Brisbane" | "Gold Coast" | "Perth" | "Adelaide" | "Online";
  date: string; // human display string, e.g. "Jun 12, 2026"
  start: string; // ISO date (first day) used for sorting, e.g. "2026-06-12"
  blurb: string;
  upcoming: boolean;
  href?: string;
};

export const events: Eventish[] = [
  {
    title: "AI in Healthcare",
    type: "Workshop",
    host: "ASME",
    // Month not settled (Oct or Nov). `start` is a sort key only; `date` is
    // what renders, so keep it vague until the date is locked in.
    date: "Late 2026",
    start: "2026-10-01",
    blurb:
      "An ASME workshop on AI in healthcare, run for members of RACMA (the Royal Australasian College of Medical Administrators). Exact date to be confirmed.",
    upcoming: true,
  },
  // Add more events below. host: "ASME" for events ASME runs, "Ecosystem" for
  // curated external ones. `start` is an ISO date (first day) used for sorting;
  // `date` is the human display string. Set `upcoming: false` once it has passed.
];

/**
 * Real partners and ecosystem orgs taken from asme.org.au.
 * Logo files live in public/partners/ and were sourced from the same CDN.
 */
export type Partner = {
  name: string;
  logo: string;
  /** Optional. An org with no site of its own renders as a plain logo, not a
   *  link: `href="#"` looked clickable, did nothing, and is a dead end for
   *  anyone navigating by keyboard. */
  href?: string;
  className?: string; // optional sizing override
};


/**
 * Tiered partnership groups for the Partners page, from the ASME Partnership
 * Framework. Each group has one or more sub-tiers. `logo` is optional — orgs
 * without a logo file render as a name-card; drop a logo into public/partners/
 * and add the path to swap it in.
 */
export type PartnerOrg = {
  name: string;
  logo?: string;
  href?: string;
  /** Optional per-logo size cap override (Tailwind classes) for optical balance
   *  — e.g. compact/square logos that need a taller cap than the default. */
  logoClass?: string;
};
export type PartnerSubtier = { label?: string; featured?: boolean; orgs: PartnerOrg[] };
export type PartnerGroup = {
  tier: string;
  tagline: string;
  description: string;
  subtiers: PartnerSubtier[];
};

export const partnerGroups: PartnerGroup[] = [
  {
    tier: "Industry Partners",
    tagline: "Financial and strategic backing",
    description:
      "Industry organisations that provide financial support and play an active role in strengthening Australia's healthcare innovation ecosystem.",
    subtiers: [
      {
        label: "Principal Industry Partner",
        featured: true,
        orgs: [{ name: "DBG Health", logo: "/partners/dbg-health.svg", href: "https://www.dbghealth.com.au" }],
      },
      {
        label: "Supporting Industry Partners",
        orgs: [
          { name: "Square Peg Capital", logo: "/partners/square-peg.jpg", href: "https://www.squarepeg.vc" },
          { name: "Tricorian Life", logo: "/partners/tricorian-life.svg", href: "https://www.tricorian.com" },
          { name: "Prac3 Group", logo: "/partners/prac3-group.webp", href: "https://prac3.com.au" },
          { name: "Loop Marketing", logo: "/partners/loop-marketing.png", href: "https://loopmarketing.com.au" },
        ],
      },
    ],
  },
  {
    tier: "Institutional Partners",
    tagline: "Advancing innovation from within",
    description:
      "Hospitals, health services, universities, medical colleges, and research institutes advancing clinician innovation within their organisations.",
    subtiers: [
      {
        orgs: [
          { name: "The University of Melbourne", logo: "/partners/uni-melbourne.png", href: "https://www.unimelb.edu.au" },
          { name: "Peter MacCallum Cancer Centre", logo: "/partners/peter-mac.png", href: "https://www.petermac.org", logoClass: "max-h-[44px] max-w-[175px]" },
          { name: "Royal Australasian College of Medical Administrators", logo: "/partners/racma.svg", href: "https://racma.edu.au", logoClass: "max-h-[60px] max-w-[150px]" },
          { name: "Bionics Institute", logo: "/partners/bionics-institute.svg", href: "https://www.bionicsinstitute.org", logoClass: "max-h-[54px] max-w-[150px]" },
        ],
      },
    ],
  },
  {
    tier: "Ecosystem Collaborators",
    tagline: "Shared initiatives, here and abroad",
    description:
      "Australian and international organisations we work alongside through joint programs, alliances, and knowledge exchange.",
    subtiers: [
      {
        orgs: [
      { name: "Heart Foundation", logo: "/partners/heart-foundation.png", href: "https://www.heartfoundation.org.au" },
          { name: "ANDHealth", logo: "/partners/andhealth.png", href: "https://www.andhealth.com.au", logoClass: "max-h-[70px] max-w-[150px]" },
          { name: "Society of Physician Entrepreneurs", logo: "/partners/sope.png", href: "https://sopenet.org", logoClass: "max-h-[70px] max-w-[150px]" },
          { name: "ARC Innovation, Sheba", logo: "/partners/arc.png", href: "https://arc.sheba.gov.il" },
          { name: "Doctorpreneurs", logo: "/partners/doctorpreneurs.png", href: "https://www.doctorpreneurs.com" },
          { name: "Auscelerate", logo: "/partners/auscelerate.png", href: "https://auscelerate.org" },
        ],
      },
    ],
  },
];

/** The home page logo marquee is derived from `partnerGroups`, which the Partners
 *  page renders. The Partners page is the single source of truth, so the two can
 *  never drift apart. Orgs without a logo file are skipped: the marquee is
 *  logos only. Duplicates across tiers are collapsed by name. */
export const partners: Partner[] = Array.from(
  new Map(
    partnerGroups
      .flatMap((g) => g.subtiers.flatMap((s) => s.orgs))
      .filter((o): o is PartnerOrg & { logo: string } => Boolean(o.logo))
      .map((o) => [
        o.name,
        { name: o.name, logo: o.logo, href: o.href, className: o.logoClass },
      ]),
  ).values(),
);

/**
 * The principal industry partner, pulled out of the wall.
 *
 * Derived from whichever sub-tier is marked `featured`, so `partnerGroups`
 * stays the single source of truth and this cannot drift if the tier changes
 * hands. A logo sitting in a row of fifteen at the same size says "one of
 * fifteen", whatever the label above it claims — the principal partner pays to
 * be the only name in its tier, so it is shown alone and several times larger.
 */
export const principalPartner: Partner | null = (() => {
  const org = partnerGroups.flatMap((g) => g.subtiers).find((s) => s.featured)?.orgs[0];
  if (!org?.logo) return null;
  return { name: org.name, logo: org.logo, href: org.href, className: org.logoClass };
})();

/** The label that sits above the principal partner, taken from its sub-tier so
 *  the page and the wall always call the tier the same thing. */
export const principalPartnerLabel =
  partnerGroups.flatMap((g) => g.subtiers).find((s) => s.featured)?.label ?? "Principal Partner";

/** Everyone else. The principal partner is shown above the wall, not in it. */
export const partnerWall: Partner[] = partners.filter(
  (p) => p.name !== principalPartner?.name,
);

const toPartner = (o: PartnerOrg): Partner | null =>
  o.logo ? { name: o.name, logo: o.logo, href: o.href, className: o.logoClass } : null;

/** The supporting industry partners: the paying tier below the principal one.
 *  Kept as their own row on the home page so they are not read as the first
 *  four of fifteen equals — at five columns they used to share a line with the
 *  university that opens the institutional tier. */
export const supportingPartners: Partner[] = (
  partnerGroups.find((g) => g.tier === "Industry Partners")?.subtiers ?? []
)
  .filter((st) => !st.featured)
  .flatMap((st) => st.orgs)
  .map(toPartner)
  .filter((p): p is Partner => p !== null);

/** Institutions and ecosystem collaborators, at one even weight. */
export const ecosystemPartners: Partner[] = partnerWall.filter(
  (p) => !supportingPartners.some((sp) => sp.name === p.name),
);

/** Endorsements from senior figures in Australian medicine.
 *  `badge` marks a formal standing relationship with ASME (patron, ambassador),
 *  so those people need only appear once on the page rather than getting a
 *  second card in the roster below.
 *  `inMemoriam` renders "The late" before the name. We keep endorsements from
 *  supporters who have died: removing them would erase their support. */
export type Endorsement = {
  quote: string;
  name: string;
  role: string;
  badge?: string;
  inMemoriam?: boolean;
};

export const endorsements: Endorsement[] = [
  {
    quote:
      "The greatest impact I've had on patients didn't come from the clinic, it came from building. ASME helps more clinicians find that path.",
    name: "Dr Sam Hupert",
    role: "Co-founder and CEO, Pro Medicus",
  },
  {
    quote:
      "When clinicians and researchers come together, great research can be translated into innovation that transforms patient care.",
    name: "Professor Sharon Lewin AO",
    role: "Director, Doherty Institute",
  },
  {
    quote:
      "ASME is a key piece of the jigsaw, engaging coalface clinicians in the innovations that will drive tomorrow.",
    name: "Professor Fiona Wood AM",
    role: "Director, Burns WA. Inventor of Spray-On Skin",
  },
  {
    quote:
      "Clinicians see the problems in healthcare every day. Giving them the opportunity and the skills to turn those observations into innovation is one of the best ways to improve patient care.",
    name: "Professor Mark Cook AO",
    role: "Chief Medical Officer, EpiMinder",
  },
  {
    quote:
      "As someone that has chosen a career in health entrepreneurship over clinical medicine, I see ASME as much needed to help clinicians understand the full breadth of career options in front of them.",
    name: "Dr Mike Caristo",
    role: "Co-founder, Genesis Capital",
  },
  {
    quote:
      "Medicine and healthcare in Australia must embrace the power of enterprise and the private sector in order to optimise outcomes for the community\u2026 ASME offers a critical opportunity to grow a community of individuals who will ultimately deliver better outcomes locally and around the world.",
    name: "Professor Vlado Perkovic",
    role: "Former Dean of Medicine, UNSW",
  },
  {
    quote:
      "ASME is a great initiative for medical graduates and doctors who would like to become entrepreneurs and impact healthcare at scale.",
    name: "Dr Ben Hurst",
    role: "Founder, HotDoc",
  },
  {
    quote:
      "The journey from great science to better healthcare requires more than discovery. It requires entrepreneurship, investment, and the courage to build. ASME can help clinicians on this journey.",
    name: "Dr Katharine Giles",
    role: "CEO, OncoRes Medical",
  },
  {
    quote:
      "It is exciting to imagine a future where the pathway to medical entrepreneurship is supported by the work of ASME.",
    name: "Professor Jane Gunn",
    role: "Former Dean, Faculty of Medicine, Dentistry and Health Sciences, University of Melbourne",
  },
  {
    quote:
      "Creation of the ASME will foster the entrepreneurial spirit of our world-class medical researchers by providing a practical network to help bring more innovative health products to market. It's a win-win for better healthcare and Australia's future prosperity.",
    name: "Dr Katie Allen",
    role: "Former Federal Member of Parliament, Public Health Professor and Paediatrician",
    inMemoriam: true,
  },
];

/* ------------------------------------------------------------------ *
 * Phase 1 redesign content. Items flagged `placeholder: true` are
 * scaffolding for the six-tab structure; replace the copy and add real
 * names, photos, and links before launch.
 * ------------------------------------------------------------------ */

/** The "why join" set surfaced on Home and Community. Free membership. */
export const memberBenefits = [
  {
    title: "A network of like-minded clinicians",
    // "Like-minded" is about disposition, not job title: the shared trait is
    // curiosity, and the roles it leads to are deliberately left open.
    body: "Curious people who see a problem and want to fix it. Some build companies, some change things from inside, some use their training in new ways.",
    glyph: "network",
  },
  {
    title: "Programs built around clinical life",
    // Names SPARC as the live program and AUSCEP as track record: AUSCEP is
    // complete, so it should not read as something you can still join.
    body: "Practical training with mentors who have done it themselves, designed to fit around your roster rather than compete with it. SPARC runs inside hospitals; AUSCEP delivered four cohorts.",
    glyph: "compass",
  },
  {
    title: "Events worth your time",
    body: "Dinners, roundtables and pitch nights, plus the ecosystem events we rate. Deliberately few, so the ones on the calendar earn their place.",
    glyph: "spark",
  },
  {
    title: "The members' newsletter",
    body: "News, opportunities, and founder stories, sent to your inbox. Yours the moment you join.",
    glyph: "mail",
  },
] as const;

/** Personas surfaced on Community ("who it's for"). */
export const personas = [
  { title: "Founder", body: "You have spotted a wedge and want co-founders, capital, and first customers." },
  { title: "Intrapreneur", body: "You are driving change inside a hospital, health service, or company." },
  { title: "Clinician-investor", body: "You want clinical pattern matching at the cap table and vetted deal flow." },
  { title: "Student", body: "You are early, curious, and want a map for what comes after the training years." },
] as const;

/** People behind ASME. Brandon Carp is confirmed; the rest are placeholders. */
export type Person = {
  name: string;
  title: string;
  group: "Team" | "Patron" | "Ambassador";
  initials: string;
  /** Path under public/ (rendered via asset()); falls back to initials if unset. */
  photo?: string;
  linkedin?: string;
  placeholder?: boolean;
  /** Short profile, one string per paragraph. Only the patron feature card
   *  renders it; the grid cards stay uniform. */
  bio?: string[];
  /** Substantive role outside ASME. "Committee Member" alone says nothing about
   *  why someone should be trusted; this is what does the credibility work. */
  externalRole?: string;
};

export const people: Person[] = [
  // Team
  { name: "Matt Hallam", title: "Chief Executive Officer", group: "Team", initials: "MH", photo: "/team/matt-hallam.png", linkedin: "https://www.linkedin.com/in/matt-hallam-88572131/" },
  { name: "Masha Pelipas", title: "Program Delivery", group: "Team", initials: "MP", photo: "/team/masha-pelipas.png", linkedin: "https://www.linkedin.com/in/mariapelipas/" },
  { name: "Romy Blecher", title: "Marketing and Operations", group: "Team", initials: "RB", photo: "/team/romy-blecher.jpg" },
  { name: "Jack Edwards", title: "Community Engagement", group: "Team", initials: "JE", photo: "/team/jack-edwards.jpg" },
  { name: "Dr Brandon Carp", title: "President & Founder", group: "Team", initials: "BC", photo: "/team/brandon-carp.png", linkedin: "https://www.linkedin.com/in/dr-brandon-carp-5819b0a/", externalRole: "Co-founder, Unified Healthcare Group (UHG)" },
  { name: "Dr Anna Barker", title: "Company Secretary", group: "Team", initials: "AB", photo: "/team/anna-barker.jpg", linkedin: "https://www.linkedin.com/in/anna-barker-64649a60/", externalRole: "EGM, Hammond Innovations" },
  { name: "Dr Lior Rauchberger", title: "Treasurer", group: "Team", initials: "LR", photo: "/team/lior-rauchberger.png", linkedin: "https://www.linkedin.com/in/lior-rauchberger-2401b64/", externalRole: "CEO, myDNA. Founder, Vivi Education" },
  { name: "Dr Simon Kos", title: "Committee Member", group: "Team", initials: "SK", photo: "/team/simon-kos.png", linkedin: "https://www.linkedin.com/in/simonkos/", externalRole: "Global CMO, Heidi" },
  { name: "Dr Anu Ganugapati", title: "Committee Member", group: "Team", initials: "AG", photo: "/team/anu-ganugapati.jpeg", linkedin: "https://www.linkedin.com/in/dr-anu-ganugapati-🩺-3b330a248/", externalRole: "Founder, StatDoctor" },
  // Patrons
  {
    name: "Dr Sam Hupert",
    title: "Co-founder and CEO, Pro Medicus",
    group: "Patron",
    initials: "SH",
    photo: "/team/sam-hupert.jpeg",
    linkedin: "https://www.linkedin.com/in/sam-hupert-53663626/",
    // Card-length on purpose. The longer three-paragraph profile doubled the
    // card's height and made it dominate the eight cards below it.
    bio: [
      "Dr Sam Hupert is one of Australia's most accomplished medical entrepreneurs. A medical graduate and former GP, he co-founded Pro Medicus in 1983, building it into a globally leading medical imaging technology company. His journey from clinician to entrepreneur exemplifies ASME's mission to empower clinicians to innovate, build and improve healthcare at scale.",
    ],
  },
  // Ambassadors
  { name: "Professor Sharon Lewin AO", title: "Director, Doherty Institute", group: "Ambassador", initials: "SL" },
  { name: "Dr Katharine Giles", title: "CEO, OncoRes Medical", group: "Ambassador", initials: "KG", photo: "/team/katharine-giles.jpg", linkedin: "https://www.linkedin.com/in/katharine-giles-64999a8/" },
  { name: "Professor Mark Cook AO", title: "Chief Medical Officer, EpiMinder", group: "Ambassador", initials: "MC" },
];

/** ASME's systems-change advocacy, organised by the institutions that decide
 *  whether clinician innovation becomes mainstream: the universities, the training
 *  hospitals, and the colleges. Surfaced on the Driving Change page.
 *  `stage` names the institution, `proof` carries the verified status. */
export type AdvocacyPillar = {
  stage: string;
  title: string;
  body: string;
  proof?: string;
  /** Anchor the proof line to supporting detail further down the page. */
  proofHref?: string;
};

export const advocacyPillars: AdvocacyPillar[] = [
  {
    stage: "Universities",
    title: "Named as a career, built into training",
    body: "We work with Australia's medical schools to have innovation, entrepreneurship and enterprise recognised as valid career paths for graduates, and built into what students are actually taught.",
    proof: "Six medical schools have signed the Joint Statement, with more in progress.",
    proofHref: "#joint-statement",
  },
  {
    stage: "Training hospitals",
    title: "Clinicians solving the problems they see",
    // Deliberately not "entrepreneurship": the hospital ask is that clinicians
    // are backed to fix what they encounter, not that they start companies.
    body: "We encourage hospitals to back their clinicians to turn the problems they see every day into solutions. That happens through the SPARC Clinician Innovation Program and driving a new culture of innovation.",
    proof: "Coming to Melbourne's Parkville precinct with Peter MacCallum Cancer Centre and Royal Melbourne Hospital.",
    proofHref: "/programs#sparc",
  },
  {
    stage: "Colleges",
    title: "Innovation education, accredited for CPD",
    // The ask is accreditation of the education and programs, not of a
    // clinician's innovation work itself.
    body: "We encourage the colleges, and similar clinician organisations, to support innovation among their members, and to accredit innovation-related education and programs toward CPD.",
    proof: "RACMA joined as an institutional partner, with an AI in Healthcare workshop for members later in 2026.",
    proofHref: "/partners",
  },
];

/** The Joint Statement on Supporting Medical Innovation, Entrepreneurship and
 *  Enterprise for Australian Medical School Graduates — initiated and
 *  coordinated by ASME and signed by medical school deans. Institution names
 *  only (no logos). The signed file itself is held privately and must not be
 *  published; only this on-page summary is public. Add more signatories here as
 *  further schools sign. */
export const jointStatement = {
  eyebrow: "Joint Statement",
  title: "Australia's medical school leaders are",
  titleAccent: "backing clinician innovation.",
  intro:
    "Initiated and coordinated by ASME, the Joint Statement on Supporting Medical Innovation, Entrepreneurship and Enterprise for Australian Medical School Graduates commits its signatories to recognising these as valid career pathways for graduates, and to building awareness, exposure and education of them into medical training.",
  commitments: [
    "Recognising medical innovation, entrepreneurship and enterprise as valid career pathways for graduates.",
    "Exploring opportunities to incorporate awareness, exposure and education of these areas during training.",
  ],
  // Signed statement PDF (verified May 2026 signed copy). Drives the "Read the
  // full statement" link.
  statementHref: "/asme-joint-statement.pdf",
  // Each signatory can carry a `logo` under public/partners. The About page
  // shows the logo when its file exists and falls back to the institution name
  // as text otherwise, so logos can be dropped in over time.
  signatories: [
    { dean: "Professor Jane Gunn", role: "Dean, Faculty of Medicine, Dentistry & Health Sciences", institution: "The University of Melbourne", logo: "/partners/uni-melbourne.png" },
    { dean: "Professor John Prins", role: "Dean, Faculty of Medicine and Health", institution: "The University of Sydney", logo: "/partners/uni-sydney.svg" },
    { dean: "Professor Cheryl Jones", role: "Dean of Medicine and Health", institution: "University of New South Wales", logo: "/partners/unsw.png" },
    { dean: "Professor Ross Coppel", role: "Deputy Dean of Innovation and Strategy, Faculty of Medicine, Nursing & Health Sciences", institution: "Monash University", logo: "/partners/monash.png" },
    { dean: "Professor Paul Fitzgerald", role: "Director, School of Medicine and Psychology", institution: "Australian National University", logo: "/partners/anu.png" },
    { dean: "Professor Riitta Partanen", role: "Dean of Medical School", institution: "The University of Queensland", logo: "/partners/uq.svg" },
  ],
  footnote: "With further medical schools in the process of signing.",
} as const;

/**
 * Photography.
 *
 * One block so every image on the site has its alt text and caption in the
 * same place as the rest of the copy, and so a photo cannot end up on a page
 * with a description written from the filename. Alt text describes what is in
 * the frame for someone who cannot see it; the caption says what the moment is
 * for someone who can.
 */
export const photos = {
  racmaMou: {
    src: "/photos/racma-mou-signing.jpg",
    alt: "Dr Brandon Carp and Professor Erwin Loh seated at a table signing a document, in front of a RACMA banner.",
    caption:
      "Dr Brandon Carp, ASME President, and Professor Erwin Loh, RACMA President, signing the Memorandum of Understanding.",
  },
  sparcLaunch: {
    src: "/photos/sparc-launch-sheba.jpg",
    alt: "The SPARC cohort and faculty standing together on stage at the launch event, in front of a screen reading Thank you for joining us.",
    caption: "The SPARC launch at ARC Innovation, Sheba Medical Centre.",
  },
  auscepCohort: {
    src: "/photos/auscep-cohort.jpg",
    alt: "An AUSCEP cohort of about twenty clinicians standing together in a workshop room, under screens showing the Australian Clinical Entrepreneur Program logo.",
    caption: "An AUSCEP cohort at a Melbourne workshop.",
  },
  eventPanel: {
    src: "/photos/asme-event-panel.jpg",
    alt: "Four panellists on stools taking questions at an ASME event, one speaking into a microphone.",
    caption: "A panel at an ASME evening in Melbourne.",
  },
} as const;

/**
 * The RACMA Memorandum of Understanding. Sits on the Driving Change page under
 * the colleges pillar, which is the ask it answers: this is the first time the
 * clinicians who lead the health system and the clinicians who innovate inside
 * it have been formally brought together.
 */
export const racmaMou = {
  eyebrow: "Memorandum of Understanding",
  title: "Medical leadership and health innovation,",
  titleAccent: "formally together.",
  body: [
    "ASME and the Royal Australasian College of Medical Administrators have signed a Memorandum of Understanding, on a simple premise: the clinicians who lead our health system and the clinicians who innovate within it are working toward the same goal.",
    "The agreement covers education, cross-sector networking, and thought leadership on the future of healthcare delivery. It is the first formal agreement of its kind in Australia.",
  ],
} as const;

/** Programs surfaced on the Programs page. AUSCEP detail lives in `auscep`. */
export type ProgramItem = {
  name: string;
  tagline: string;
  body: string;
  status: "Open" | "Cohort based" | "Coming soon" | "In development" | "Delivered";
  href: string;
  placeholder?: boolean;
};

export const programsList: ProgramItem[] = [
  {
    name: "SPARC",
    tagline: "Clinician Innovation Program",
    body: "A 3-month, clinician-focused program born from the ARC Global Innovation Centre and delivered worldwide, now brought to Australia by ASME. Eight workshops, mentorship, and a focus tailored to your health service. Launching with Peter MacCallum Cancer Centre and Royal Melbourne Hospital.",
    status: "Coming soon",
    href: "#sparc",
  },
  {
    name: "AUSCEP",
    tagline: "The Australian Clinical Entrepreneur Program",
    body: "Our 12-month flagship, delivered with MTPConnect across four cohorts from 2023 to 2026. More than 150 clinicians across VIC, NSW and WA combined clinical practice with entrepreneurial training, mentorship, and a showcase to investors. Now complete.",
    status: "Delivered",
    href: "#auscep",
  },
];

/** Partnership tiers for the Partners page. Placeholder commercial detail. */
export type PartnerTier = {
  name: string;
  blurb: string;
  features: string[];
  placeholder?: boolean;
};

/** Personal message from the founder for the About page. DRAFT from Brandon's
 *  existing words and mission statement. Edit, shorten, or replace freely. */
export const founderMessage = {
  // Split so the heading can follow the site's light-then-bold pattern, and in
  // sentence case like every other heading.
  title: "Why I founded",
  titleAccent: "ASME",
  paragraphs: [
    "When I began the journey of building my business Unified Healthcare Group (UHG), I wasn't following a well-worn path. In many ways, I was creating my own. There were very few examples of doctors building healthcare businesses, no community of like-minded clinicians, and no roadmap to help navigate the challenges of innovation and entrepreneurship. Much of what I learned came through experience, perseverance and more than a few mistakes.",
    "Looking back, I often wondered how many other clinicians had ideas with the potential to improve healthcare but never knew where to begin.",
    "That question became the inspiration for founding the Australian Society for Medical Entrepreneurship & Innovation (ASME) in 2023.",
    "I have always believed that clinicians are uniquely positioned to improve healthcare. Every day, they work at the coalface of our health system. They understand patients, experience the frustrations of the current system and recognise opportunities that others simply cannot see. They are often the first to identify problems worth solving and are ideally placed to help create the solutions.",
    "Yet innovation, entrepreneurship and enterprise have traditionally been viewed as something separate from being a clinician, rather than an extension of it. I believed that needed to change. Whether someone improves a process within their hospital, translates research into practice, develops a new technology, starts a health company or leads system-wide change, they should feel empowered to pursue those opportunities at any stage of their career.",
    "My hope is that ASME helps create a future where every clinician feels inspired and supported to turn ideas into impact, and where innovation, entrepreneurship and enterprise become a natural part of what it means to be a clinician.",
  ],
  name: "Dr Brandon Carp",
  role: "President and Founder, ASME",
  initials: "BC",
  photo: "/people/brandon-carp.jpg",
  portrait: "/people/brandon-carp-portrait.jpg",
  photoAlt: "Dr Brandon Carp, President and Founder of ASME",
  pullQuote:
    "Innovation, entrepreneurship and enterprise have traditionally been viewed as something separate from being a clinician, rather than an extension of it.",
} as const;

/** Clinician+ webinar series. Recordings hosted off-site; `href` opens the
 *  recording (or the events page where no recording link exists yet). */
export type Webinar = { title: string; date: string; blurb: string; href: string };
export const webinars: Webinar[] = [
  {
    title: "Startup Storytelling",
    date: "30 March 2025",
    blurb:
      "Crafting the story that wins over investors, partners, and early users — how clinician founders frame the problem and the pitch.",
    href: "https://www.dropbox.com/scl/fi/hgar92thb2xlq3udaxshu/Webinar-1.mp4?rlkey=v5ymyvc03y5otxd3fe5oush7t&st=k2yy7qfd&dl=0",
  },
  {
    title: "Monetising Your Innovation",
    date: "29 May 2025",
    blurb:
      "Turning a clinical idea into revenue — business models, pricing, and the paths to market open to clinician entrepreneurs.",
    href: "https://www.asme.org.au/events",
  },
  {
    title: "Clinician by day, startup by night",
    date: "23 September 2025",
    blurb:
      "Building a venture while still in practice — balancing clinical work with the demands of the founder journey.",
    href: "https://www.dropbox.com/scl/fi/76nasvrn9p9r70u43amx1/webinar-3.mp4?rlkey=c4gist2dm6es7wxd6rd5q3yk3&st=runtmda9&dl=0",
  },
];

/** Featured videos for the Insights hub. */
export type Video = { title: string; youtubeId: string; start?: number; blurb: string };
export const videos: Video[] = [
  {
    title: "More than one way to be a doctor",
    youtubeId: "BpSRQdUilKE",
    // TODO: set `start` to the second the speech proper begins, to skip the personal intro.
    start: 0,
    blurb:
      "University of Melbourne graduation address, Faculty of Medicine, Dentistry and Health Sciences, 2023.",
  },
];

export const partnerTiers: PartnerTier[] = [
  {
    name: "Principal partner",
    blurb: "Lead the ecosystem alongside ASME with year-round presence across programs, events, and content.",
    features: ["Naming on a flagship program", "Speaking slots at marquee events", "Logo on Home and About", "Access to the member network"],
    placeholder: true,
  },
  {
    name: "Program partner",
    blurb: "Back a specific program such as AUSCEP and connect directly with clinician founders in the cohort.",
    features: ["Program co-branding", "Cohort showcase access", "Logo on Partners page", "Two event passes"],
    placeholder: true,
  },
  {
    name: "Ecosystem partner",
    blurb: "Join the community of universities, funds, and accelerators building Australian healthcare's next decade.",
    features: ["Logo on Partners page", "Event listings", "Cross-promotion", "Friends of ASME network"],
    placeholder: true,
  },
];
