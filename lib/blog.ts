/**
 * Blog/Insights content. Each article ships with a sectioned body so we can
 * generate a sticky table of contents from the section ids, plus a list of
 * external sources that ground the claims in the article.
 *
 * Editorial rules:
 *   - No em or en dashes in copy.
 *   - Every quantitative claim must be linkable to a source listed in
 *     `sources`. Where a claim cannot be sourced, it should not be made.
 *
 * Roadmap: an automated pipeline will scrape clinical-entrepreneurship news
 * daily and append draft articles to this list. See app/api/articles/generate
 * (not yet implemented). Until then, edit this file directly.
 */

export type ArticleCategory = "Playbook" | "Interview" | "Field note" | "Essay";

export type ArticleSection = {
  id: string;
  heading: string;
  body: string[];
};

export type ArticleSource = {
  label: string;
  url: string;
};

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: ArticleCategory;
  author: string;
  /** ISO yyyy-mm-dd. Used for sort order and human-readable display. */
  date: string;
  readTime: string;
  /** Absolute URL (Unsplash) or local path under /public. */
  cover: string;
  coverAlt: string;
  sections: ArticleSection[];
  /** Public references that ground the claims in the article. */
  sources?: ArticleSource[];
  /** The clinician the story is about, which is not the same as `author`, who
   *  wrote it. Used by the Innovator stories section so every story names its
   *  person the same way. */
  innovator?: { name: string; role?: string };
};

const UNSPLASH = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const articles: Article[] = [
  {
    slug: "clinician-pitch-deck",
    title: "How to write a pitch deck a clinician investor will actually read",
    dek: "The Sequoia ten-slide structure still works. Paul Graham's advice still works. The clinician's instinct to lead with the medicine still kills the deck. Five things to fix before you send.",
    category: "Playbook",
    author: "ASME Editorial",
    date: "2026-04-29",
    readTime: "8 min",
    cover: UNSPLASH("photo-1571019613454-1cb2f99b2d8b"),
    coverAlt: "Laptop on a desk showing a chart and a pitch deck draft.",
    sections: [
      {
        id: "the-ten-slide-pattern",
        heading: "The ten-slide pattern still works",
        body: [
          "The Sequoia Capital pitch-deck template, published in the early 2010s and still the global reference for early-stage decks, prescribes ten slides: Title, Company Purpose, Problem, Solution, Why Now, Market Size, Competitors, Product, Business Model, and Team. Most successful pitch decks across the last decade have varied this structure by no more than one or two slides.",
          "Paul Graham, the co-founder of Y Combinator, frames the same problem from the writing side. The investor reads the deck for thirty seconds before deciding whether to take the meeting. Every slide that does not have a single, sharp, falsifiable claim costs you the meeting. Graham's essays \"How to Present to Investors\" and \"How to Raise Money\" remain the clearest writing on the subject.",
        ],
      },
      {
        id: "the-clinicians-instinct",
        heading: "The clinician's instinct that breaks the deck",
        body: [
          "Clinician founders consistently lead the deck with the clinical problem. The instinct is correct in clinical communication. It is wrong in investor communication.",
          "The investor is not a clinician and is not buying clinical insight. They are underwriting a company. The clinical problem belongs in the deck, but it belongs after the dollar figure (the cost of the problem to the buyer) and after the buyer (who pays). The first three slides of a clinician-led pitch deck should read like an enterprise SaaS deck, with clinical context appearing only after slide five.",
          "This single restructure is the most common feedback clinician founders receive when they show their deck to a non-clinical investor for the first time. Run the test before the meeting. Ask a non-clinician whether the first three slides made them want to read the next seven.",
        ],
      },
      {
        id: "the-customer-evidence-slide",
        heading: "The customer-evidence slide is the one that actually proves anything",
        body: [
          "Investors will forgive a weak market slide. They will not forgive a weak customer slide. Most clinician-led decks underweight customer evidence in favour of clinical evidence (publications, regulatory pathway, KOL endorsements). Both matter. The investor pays for the first.",
          "What goes on the customer-evidence slide. Two anonymised case studies with a numeric outcome. A short quote from a buyer (CFO, CMO, practice owner) rather than from a clinician user. Cohort retention or a comparable usage metric. If you do not have the numbers yet, the question to answer at the meeting is what data you would need to collect over the next six months to populate the slide.",
        ],
      },
      {
        id: "the-team-slide-problem",
        heading: "The team slide problem",
        body: [
          "Clinician founders typically over-build the team slide. Four resumes, three of them clinical, two with overlapping skill sets. Investors at seed and Series A read this as a startup that has not figured out who actually does what.",
          "The cleaner pattern is one founder, one named technical lead, and the named first commercial hire if they exist. Other clinical advisors belong on a separate \"Clinical and scientific\" slide later in the deck, or in an appendix. The investor's mental cost of evaluating four resumes on slide two is significantly higher than the cost of evaluating one clear founder narrative.",
        ],
      },
      {
        id: "five-mistakes-to-avoid",
        heading: "Five mistakes to avoid",
        body: [
          "Burying the dollar figure. The cost of the problem to the buyer should be on slide three, in a font size that is unmissable. If the dollar figure is not concrete, the deck is not finished.",
          "Putting the clinical mechanism before the buyer. Slide four is the buyer. Slide five at the earliest is the mechanism. Reverse the order and the deck reads like a research paper.",
          "Pitching the wrong segment. \"Healthcare\" is not a market. The market is the named buyer (independent GP practice, public tertiary hospital, private health insurer) at a specific price band. Decks that fail to declare the segment lose the meeting on slide six.",
          "A 50-slide appendix. Paul Graham's rule. Decks longer than fifteen slides do not get read. The appendix is for the data room, not the meeting.",
          "No ask. The final slide must include the round size, the use of funds in three lines, and the named lead you are looking for. Decks without an ask end with the investor unsure what you are asking them for, and the meeting drifts.",
        ],
      },
    ],
    sources: [
      {
        label: "Sequoia Capital pitch deck template (university of Victoria mirror)",
        url: "https://www.uvic.ca/gustavson/_assets/docs/pitch-deck-template-web.pdf",
      },
      {
        label: "Paul Graham, How to Present to Investors",
        url: "https://www.paulgraham.com/investors.html",
      },
      {
        label: "Paul Graham, How to Raise Money",
        url: "https://paulgraham.com/fr.html",
      },
      {
        label: "Y Combinator Startup Library, Pitch Deck collection",
        url: "https://www.ycombinator.com/library?categories=Pitch+Deck",
      },
      {
        label: "Y Combinator, Practical Design: Pitching",
        url: "https://blog.ycombinator.com/practical-design-pitching/",
      },
    ],
  },
  {
    slug: "raising-capital-clinician-australia",
    title: "Raising capital as a clinician founder: the Australian seed-to-Series-A path",
    dek: "Pre-seed median A$1M. Seed median A$3M. Series A average A$18M. The clinician founder's roadmap, grounded in Cut Through Venture's 2024 dataset and the lead patterns of Australia's three largest VCs.",
    category: "Playbook",
    author: "ASME Editorial",
    date: "2026-04-15",
    readTime: "9 min",
    cover: UNSPLASH("photo-1450101499163-c8848c66ca85"),
    coverAlt: "Notebook with handwritten financial projections beside a laptop.",
    sections: [
      {
        id: "the-australian-landscape",
        heading: "The Australian landscape, in numbers",
        body: [
          "Cut Through Venture's State of Australian Startup Funding 2024 dataset gives the clearest public view of round sizes. Pre-seed median deal size: A$1 million (a record high). Seed median deal size: A$3 million (also a record high). Series A average: A$18 million, up from A$12 million in 2023. Series A volume is down even as the trigger benchmarks have tightened, meaning fewer companies make it through but the ones that do are larger.",
          "Pre-seed and seed valuations were up roughly 11 to 12 percent year on year. Series A valuations were up around 7 percent. The implication for clinician founders is that the bar for raising at seed has not moved much, but the bar for triggering a Series A has moved up sharply.",
        ],
      },
      {
        id: "pre-seed",
        heading: "Pre-seed: who actually writes the cheque",
        body: [
          "At pre-seed in Australia, the named institutional VCs (Blackbird, AirTree, Square Peg) write some cheques but most of the round comes from angels, accelerators, and high-net-worth individuals who have done it before. Cheque sizes are typically A$50K to A$250K from individuals, A$250K to A$750K from named pre-seed funds.",
          "For clinician founders, the pre-seed conversation should target two profiles. Clinical-entrepreneur angels who have built and exited a healthcare company (a small but growing list in Australia). Health-adjacent VCs who can write a smaller cheque early to lock in the relationship for the seed lead conversation. The accelerator path (Startmate, particularly) remains the highest-signal credential for a clinician with no prior tech track record.",
        ],
      },
      {
        id: "seed-round",
        heading: "Seed round: the real numbers and the real leads",
        body: [
          "At seed, Blackbird and AirTree are the dominant Australian leads, writing A$500K to A$5 million cheques per the public profiles of both funds. Square Peg participates more selectively at seed. The check-size band that a clinician-led healthtech company should plan for is A$2 million to A$5 million for a competitive seed round in 2024-2025.",
          "The structural feature of the Australian seed market is that the lead is almost always Australian. The follow-on capital can come from US or Asian funds, but the relationship-led nature of seed in Australia means the pre-emptive Australian fund is usually the lead. Clinician founders who try to lead-shop in the US at seed almost always lose nine to twelve months.",
        ],
      },
      {
        id: "series-a",
        heading: "Series A: where the bar has moved",
        body: [
          "The A$18 million average Series A in 2024 reflects two things. The benchmarks to trigger an A have moved up across every sector, with healthtech tracking roughly A$2 to A$3 million in ARR (or equivalent for non-SaaS models) plus net revenue retention above 110 percent. And the rounds that do get done are larger because the lead is more often a US or international fund whose minimum cheque size is higher.",
          "For clinician founders, this means two practical things. The seed runway should be planned for 24 to 30 months, not 18, because reaching the new Series A bar takes longer than it did in 2022. And the US-investor conversations should start at month six of the seed runway, not at the start of the Series A process, so that the lead conversation in the next round is not also a first conversation.",
        ],
      },
      {
        id: "plan-the-syndicate",
        heading: "Plan the syndicate before you need it",
        body: [
          "The single highest-leverage thing a clinician founder can do during seed is to map the Series A syndicate they will run twelve to eighteen months later. Three categories of investor to track. Funds that have done at least one Series A in clinical or healthcare-adjacent companies in the previous twelve months. Funds with a partner who has clinical training or a clinical operator background. Strategic investors whose distribution would compress the company's sales cycle.",
          "Maintain a structured monthly investor update from month one of the seed round. The update is the document the Series A is built on. The clinician founders who run a clean monthly update for twelve months arrive at the Series A with a data room that is already half-built. The clinician founders who write the first investor update only when the round is open are six to twelve weeks behind by the time the lead conversation starts.",
        ],
      },
    ],
    sources: [
      {
        label: "Cut Through Venture, State of Australian Startup Funding 2024",
        url: "https://www.cutthrough.com/insights/state-of-australian-startup-funding-2024",
      },
      {
        label: "VC Down Under, State of Startup Seed Funding in Australia and USA 2024",
        url: "https://vcdownunder.substack.com/p/state-of-startup-seed-funding-in",
      },
      {
        label: "Blackbird Ventures (fund profile)",
        url: "https://www.blackbird.vc/",
      },
      {
        label: "Failory, Top 30 Venture Capital Firms in Australia (2026)",
        url: "https://www.failory.com/blog/venture-capital-firms-australia",
      },
      {
        label: "TechCrunch, Seed to Series A: strategic insights for tech founders",
        url: "https://techcrunch.com/2023/12/21/seed-to-series-a-strategic-insights-for-tech-founders-in-the-2024-venture-landscape/",
      },
    ],
  },
  {
    slug: "leave-medicine-without-burning-the-bridge",
    title: "How to leave clinical medicine without burning the bridge",
    dek: "Part-time training is sanctioned by every Australian college. Restraint clauses are mostly unenforceable. The ESS Startup Concession changes the maths. Three reasons not to make it a one-way door.",
    category: "Playbook",
    author: "ASME Editorial",
    date: "2026-04-22",
    readTime: "8 min",
    cover: UNSPLASH("photo-1576091160399-112ba8d25d1d"),
    coverAlt: "Stethoscope and a clinician's notebook on a wooden desk.",
    sections: [
      {
        id: "why-optionality-matters",
        heading: "Why optionality matters",
        body: [
          "Most clinicians frame the founder decision as a single, terminal cliff. The framing is usually wrong. The Australian regulatory and college environment supports a structured part-exit far better than most clinicians realise. Three frameworks make the bridge concrete: the formal part-time pathways at every speciality college, the limits on restraint-of-trade clauses in medical contracts, and the ESS Startup Concession that lets a startup pay you in equity without a tax bill at grant.",
          "Read together, they give you the components of a part-exit that preserves clinical registration, ongoing patient context, and a real income floor while you build. The cost is the time it takes to set them up. The benefit shows up across every fundraise, hiring decision, and pivot the company will face.",
        ],
      },
      {
        id: "part-time-training-is-sanctioned",
        heading: "Part-time training is sanctioned by the colleges",
        body: [
          "The RACGP's Australian General Practice Training program is explicitly defined as a three-year, full-time or part-time equivalent program (four years for rural generalist), per the AGPT registrar training handbook. The college does not require you to choose between training and an outside venture.",
          "The RACP runs a more formal flexible training option that lets advanced trainees vary FTE down to as low as 0.5, with the calendar extending proportionally. The application is straightforward and is approved as a matter of course where service requirements can be met.",
          "Across both colleges, the practical implication is the same. You can structure clinical training and a venture in parallel. The trade is calendar time. You graduate later. You do not lose the registrar progression.",
        ],
      },
      {
        id: "restraint-clauses",
        heading: "Restraint clauses are usually unenforceable, but check anyway",
        body: [
          "Australian courts presume restraint-of-trade clauses are void unless the party seeking to enforce them can show the restraint is reasonable, geographically and temporally, and protects a legitimate business interest. Avant's published guidance for medical practitioners frames the question correctly: enforceability is the exception, not the default.",
          "Case law gives a rough envelope. A 2014 Queensland decision upheld a 15km radius and 18-month restraint on an experienced ophthalmologist. An earlier Queensland decision held that a 12-month restraint on a doctor was unenforceable because only three to four months were needed to find a replacement (Hillhouse Legal Partners summary). Reasonable means narrow, time-limited, and tied to specific protected interests.",
          "Practical implication: do not treat the restraint clause in your existing contract as a binding constraint on what you build. Get a clinician-side employment lawyer to review it. In most cases the lawyer's letter that the restraint is unenforceable is the entire negotiation.",
        ],
      },
      {
        id: "ess-startup-concession",
        heading: "The ESS Startup Concession changes the maths",
        body: [
          "The Tax and Superannuation Laws Amendment (Employee Share Schemes) Act 2015 introduced section 83A-33 of the Income Tax Assessment Act, the ESS Startup Concession. For eligible companies, an employee or advisor receiving discounted ESS interests does not include the discount in assessable income at grant. Tax is deferred until disposal.",
          "Eligibility is specific: the company must be unlisted, less than ten years old, with aggregated turnover under A$50 million in the previous income year. Discounts on shares are capped at 15 percent of market value. Options must have a strike price at or above the market value of an ordinary share at grant.",
          "Without the concession, a discounted grant can produce a tax bill at grant against an asset you cannot sell, the cash-flow disaster every advisor and early employee fears. With the concession, the equity component of your part-exit becomes a real economic instrument rather than a paper liability.",
        ],
      },
      {
        id: "practical-sequence",
        heading: "A practical sequence",
        body: [
          "Before you give notice. Apply for the part-time variation with your college. Have a clinician-side employment lawyer review your existing restraint and IP clauses. Confirm that any equity grant you are receiving has been structured under the ESS Startup Concession (or that you have an alternative tax treatment in writing).",
          "After you give notice. File a short clinical re-entry plan with the named role you would return to and the named contact who has agreed in principle. Diary the date. The plan is not a fallback you intend to use. It is the document that lets you make harder decisions inside the company.",
          "Bridges that are preserved deliberately do not have to be used. Bridges that have been burned cannot be rebuilt on the timeline a hard quarter requires.",
        ],
      },
    ],
    sources: [
      {
        label: "RACGP AGPT registrar training handbook, program time obligations",
        url: "https://www.racgp.org.au/education/registrars/fellowship-pathways/policy-framework/program-handbooks-and-guidance-documents/agpt-registrar-training-handbook/training-program-requirements/program-time-obligations",
      },
      {
        label: "RACP, Part-time and variations in training",
        url: "https://www.racp.edu.au/trainees/flexible-training-options/part-time-and-variations-in-training",
      },
      {
        label: "Avant, Restraint of trade clause guidance for medical practitioners",
        url: "https://avant.org.au/resources/restraint-of-trade-clause",
      },
      {
        label: "Hillhouse Legal Partners, Showing restraint when contracting with surgeons",
        url: "https://hillhouse.com.au/blog/showing-restraint-when-contracting-with-surgeons/",
      },
      {
        label: "AustLII, Income Tax Assessment Act 1997 s 83A-33 (start-up concession)",
        url: "https://www5.austlii.edu.au/au/legis/cth/consol_act/itaa1997240/s83a.33.html",
      },
      {
        label: "ATO, Employee share schemes: start-up companies (standard documents)",
        url: "https://www.ato.gov.au/api/public/content/50c6825e8ab04462bd2cfeb155fc3529_ESS_standard_docs_instructions.pdf",
      },
    ],
  },
  {
    slug: "inside-series-b-clinician-founder",
    title: "Inside a Series B led by a clinician founder: how Heidi Health closed US$65M",
    dek: "Dr Thomas Kelly left a vascular surgical training pathway in 2021 to build Heidi. In October 2025 the company closed a US$65M Series B at a US$465M valuation, led by Point72. What clinician founders can take from a public raise.",
    category: "Interview",
    author: "ASME Editorial",
    innovator: { name: "Dr Thomas Kelly", role: "Co-founder, Heidi Health" },
    date: "2026-04-08",
    readTime: "10 min",
    cover: UNSPLASH("photo-1556761175-5973dc0f32e7"),
    coverAlt: "A boardroom table with notepads and laptops, light streaming through windows.",
    sections: [
      {
        id: "the-numbers",
        heading: "The numbers",
        body: [
          "On 5 October 2025 Melbourne-based Heidi Health announced a US$65 million (A$98 million) Series B, taking the company's post-money valuation to US$465 million (A$704 million). The round was led by Point72 Private Investments, the venture arm of Steven A Cohen's hedge-fund group, with participation from existing investors Blackbird, Headline, and Latitude (the growth fund of Phoenix Court). Reporting in TechCrunch, SmartCompany, and Heidi's own press release confirms the lead, the syndicate, and the valuation.",
          "Heidi was founded in 2021 (originally as Oscar) by Dr Thomas Kelly, a former vascular surgical resident, alongside Waleed Mussa (formerly Goldman Sachs) and Yu Liu (formerly Coles Group). The product is an AI medical scribe that transcribes clinician-patient conversations and produces clinical notes, referral letters, and follow-up assessments.",
        ],
      },
      {
        id: "the-clinician-founder-pattern",
        heading: "The clinician-founder pattern",
        body: [
          "Kelly's public framing of why he left training is consistent with the pattern most Australian clinician founders describe. In a December 2025 CNBC profile he ties the company's existence to a workflow he experienced thousands of times in tertiary care, the unstructured, error-prone moments around documentation and handover.",
          "The structural feature worth noting is that the founder did not need to be the only clinical credibility on the cap table to underwrite the deal. By Series B, Heidi had clinicians from more than two hundred medical specialties using the platform across some seventy-three million patient consults, per the company's October press release. The clinical credibility moved from the founder's CV to the product's usage data. That is the trajectory clinician founders should plan toward.",
        ],
      },
      {
        id: "the-syndicate-shape",
        heading: "The syndicate shape",
        body: [
          "The investor pattern at Heidi's Series B is instructive. A US institutional lead (Point72) anchors the round at the top of the table. An Australian venture firm (Blackbird) follows on from earlier rounds, signalling continuity. Two specialist growth funds (Headline, Latitude) participate at smaller cheque sizes, providing pricing discipline and reference capital.",
          "For Australian clinician founders thinking about a Series B, the structural lesson is that the lead almost certainly comes from the US once the round size crosses the US$30 million mark. Local follow-on capital exists but rarely leads at that scale. Plan the syndicate accordingly. The sequencing implication: build relationships with US healthtech investors at Series A, not Series B, so that the lead conversation in the next round is not also a first conversation.",
        ],
      },
      {
        id: "what-the-public-record-shows",
        heading: "What the public record shows about preparation",
        body: [
          "Heidi's public statements emphasise the customer evidence the company brought to the round. Two hundred plus medical specialties. Seventy-three million consults processed. Active deployment across health systems and individual practices. None of this is the founder's narrative. All of it is the product's record. Investors at growth-stage rounds are pattern-matching against verifiable usage, not pitch-deck logic.",
          "Heidi has also publicly flagged the regulatory questions that follow at scale. In a SmartCompany interview, Kelly highlighted the risk that healthcare AI can degrade under pressure if clinical safety frameworks are not built into the product from the outset. That is a clinician-founder argument that non-clinical founders rarely make in public, and it is the argument that compounds in the company's regulatory and enterprise-sales narrative.",
        ],
      },
      {
        id: "lessons-for-the-next-clinician-founder",
        heading: "Lessons for the next clinician founder",
        body: [
          "Three things that travel from this single public raise. First, the clinical workflow you have lived through is a real basis for a product, but it has to be expressed in usage data, not in personal experience, by the time the round is at growth stage. Second, the syndicate shape will rotate from Australian-led at seed to US-led at Series B, which has to be planned for at Series A. Third, regulatory and clinical-safety language is a competitive moat that clinician founders can credibly assert and that non-clinical founders cannot. Use it.",
        ],
      },
    ],
    sources: [
      {
        label: "TechCrunch, Heidi Health raises $65M Series B led by Steve Cohen's Point72 (5 Oct 2025)",
        url: "https://techcrunch.com/2025/10/05/heidi-health-raises-65m-series-b-led-by-steve-cohens-point72/",
      },
      {
        label: "SmartCompany, Heidi Health's $98 million raise skyrockets its valuation to $704 million",
        url: "https://www.smartcompany.com.au/startupsmart/heidi-health-98-million-raise-valuation-704-million/",
      },
      {
        label: "Heidi Health, Series B announcement (5 Oct 2025)",
        url: "https://www.heidihealth.com/en-us/blog/heidi-series-b",
      },
      {
        label: "Startup Daily, Heidi Health bags $98 million Series B at $703 million valuation",
        url: "https://www.startupdaily.net/topic/funding/heidi-health-bags-98-million-series-b-at-703-million-valuation/",
      },
      {
        label: "CNBC, He left medicine to build an AI tool, now it's worth $460 million (24 Dec 2025)",
        url: "https://www.cnbc.com/2025/12/24/he-left-medicine-to-build-an-ai-tool-now-its-worth-460-million.html",
      },
      {
        label: "SmartCompany, Heidi Health CEO warns healthcare AI can degrade under pressure",
        url: "https://www.smartcompany.com.au/artificial-intelligence/heidi-healthcare-ai-regulation/",
      },
    ],
  },
  {
    slug: "clinician-founders-pricing-too-low",
    title: "Why clinician-led healthtech is leaving money on the table",
    dek: "Healthcare buyers expect a 15 to 25 percent volume discount at scale. 78 percent of SaaS companies now price on value rather than cost.",
    category: "Field note",
    author: "ASME Editorial",
    date: "2026-03-28",
    readTime: "6 min",
    cover: UNSPLASH("photo-1554224155-6726b3ff858f"),
    coverAlt: "A laptop, calculator, and pricing spreadsheet on a clean desk.",
    sections: [
      {
        id: "the-pricing-instinct-gap",
        heading: "The pricing instinct gap",
        body: [
          "Clinicians are trained inside a system in which professional value is reimbursed at rates someone else negotiates. Medicare item numbers. Hospital salary scales. College fellowship rates. By the time a clinician becomes a founder, they have spent a decade as a price-taker in their own labour market and the muscle memory shows up directly in how they price their products. The result, for many clinician-led healthtech companies, is a price floor anchored to cost-plus comparators rather than to the value the product creates for the customer.",
          "The market has moved on from cost-plus. By 2025, 78 percent of SaaS companies primarily implement value-based pricing strategies, up from 62 percent in 2023, according to the Monetizely SaaS Pricing Benchmark Study. SaaS companies that price on value report 30 percent higher revenue growth from enterprise customers than peers using cost-plus models.",
        ],
      },
      {
        id: "what-buyers-expect",
        heading: "What healthcare buyers actually expect",
        body: [
          "Healthcare buyers do not expect to pay list. The same Monetizely analysis cites HIMSS data showing that hospital and health-system buyers typically expect volume discounts of 15 to 25 percent when scaling beyond 250 beds. Companies that price at the floor have nothing to give up in negotiation, which buyers read as a small-vendor red flag rather than as principled pricing.",
          "The implication for clinician-led companies is straightforward. Set list price at the value-based number, not the cost-plus one. Build the discount mechanic into the contract structure. Let enterprise procurement teams claim the discount they expect. The price the customer actually pays is the same price you would have charged from a cost-plus floor, but the negotiation is healthier and the perceived value is higher.",
        ],
      },
      {
        id: "value-based-has-moved-on",
        heading: "Value-based pricing has moved on",
        body: [
          "Bessemer Venture Partners' health-tech atlas tracks the metrics growth-stage healthtech companies are now expected to clear, including net revenue retention, gross margin, and the fraction of contract value tied to outcomes rather than usage. The benchmarks have tightened in 2024 and 2025 as the sector has matured.",
          "True outcome-based pricing, where the vendor shares risk and reward with the customer based on a measurable clinical or operational metric, is now actively explored or piloted by 47 percent of SaaS companies, with 9 percent fully implemented, per the Monetizely study. For clinician-led companies, this is the pricing model the clinical training arguably equips you for better than non-clinical peers, because you can articulate the outcome metric in language the customer trusts.",
        ],
      },
      {
        id: "pricing-audit",
        heading: "A pricing audit grounded in real benchmarks",
        body: [
          "Map the customer's existing cost stack. Labour, software, error rate, opportunity cost. Aim for a dollar figure within thirty percent. If you cannot get to a number, you have not done the work yet, and the price is anchored on instinct.",
          "Calculate your share of the saving. The sector rule of thumb is twenty-five to forty percent of the customer's saving accrues to the vendor. If you are at single-digit share, the customer is not getting a deal. They are getting a charity, and they will likely overconsume the product, which raises your support burden without raising your revenue.",
          "Benchmark against the Bessemer healthtech metrics. Net revenue retention above 110 percent. Gross margin above 70 percent. If the metrics fall short, the price is one of the most likely causes, ahead of churn or product gaps in most cases.",
        ],
      },
      {
        id: "the-renewal-mechanic",
        heading: "The renewal mechanic that protects the relationship",
        body: [
          "Mid-contract price increases break trust. Renewal price increases, set up at signing, are standard for enterprise SaaS and should be standard for clinician-led healthtech. The minimum is an annual review with a CPI floor. The better mechanic is CPI plus a fixed margin (typically 4 to 6 percent), reviewed annually and indexed to a published outcome metric the customer can verify.",
          "Companies that have priced for value from the first contract and built the renewal mechanic into the standard agreement do not need to reprice their existing book. They get the uplift on schedule. Companies that priced cost-plus at the floor and hope to reprice mid-cycle will not recover the gap, even after several years.",
        ],
      },
    ],
    sources: [
      {
        label: "Monetizely, SaaS Pricing Benchmark Study 2025",
        url: "https://www.getmonetizely.com/articles/saas-pricing-benchmark-study-2025-insights-from-100-companies",
      },
      {
        label: "Monetizely, Testing Healthcare SaaS Pricing Strategies (HIMSS data)",
        url: "https://www.getmonetizely.com/articles/testing-healthcare-saas-pricing-strategies-maximizing-value-while-meeting-industry-needs",
      },
      {
        label: "Bessemer Venture Partners, Benchmarks for growing health tech businesses",
        url: "https://www.bvp.com/atlas/benchmarks-for-growing-health-tech-businesses",
      },
      {
        label: "MTPConnect, Australian medtech, biotech and pharmaceutical sector reporting",
        url: "https://www.mtpconnect.org.au/reports",
      },
    ],
  },
  {
    slug: "medicine-everything-to-be-a-founder",
    title: "What clinical training already gave you for the founder job",
    dek: "Counterfactual reasoning, evidence weighting, performance under uncertainty, and the bad-news conversation. Eric Topol has been writing for fifteen years about the cognitive overlap between bedside medicine and frontier technology. Here is what travels.",
    category: "Essay",
    author: "Dr Anu Ganugapati",
    date: "2026-03-12",
    readTime: "7 min",
    cover: UNSPLASH("photo-1454165804606-c3d57bc86b40"),
    coverAlt: "Open notebook and coffee on a wooden table, morning light.",
    sections: [
      {
        id: "the-diagnostic-instinct",
        heading: "The diagnostic instinct and customer discovery",
        body: [
          "The first skill a medical student is drilled in, before any of the science, is taking a clinical history. Open-ended questions. Tolerating silence. Following the patient's narrative before testing the differential. The structure is the same as a competent customer-discovery interview. The complaint is the symptom. The customer's day is the systems review. The workflow they tolerate is the past medical history.",
          "The transferable habit is to start broad and narrow only after the patient has stopped speaking. The clinician's instinct to suppress confirmation bias in a clerking exam is exactly the instinct most non-clinical founders have to learn the hard way through dozens of bad customer interviews.",
        ],
      },
      {
        id: "counterfactual-reasoning",
        heading: "Counterfactual reasoning",
        body: [
          "Eric Topol, the cardiologist, founder of the Scripps Research Translational Institute, and one of the most influential writers on clinician-led innovation, frames clinical decision-making as fundamentally counterfactual. Clinicians, he argues, frequently use conditional reasoning, envisioning potential outcomes for patients in alternative treatment arms before acting. This is the cognitive engine of clinical reasoning, and it is functionally identical to the cognitive engine of product strategy.",
          "Founders who can hold multiple counterfactual product futures in mind, weigh the evidence for each, and act on the highest-expected-value path are doing the same thing the clinician at the bedside is doing. The vocabulary is different. The shape of the work is the same.",
        ],
      },
      {
        id: "evidence-weighting",
        heading: "Evidence weighting in product decisions",
        body: [
          "Medical training drills a hierarchy of evidence into the trainee through repetition. Randomised controlled trial. Cohort study. Case series. Case report. By the time you finish residency the hierarchy is unconscious.",
          "Founders without that hierarchy confuse anecdote with signal constantly. One enthusiastic customer becomes the basis for a roadmap. One angry user kills a feature. The pattern, viewed from clinical reasoning, looks like a junior doctor weighting one bad outcome from a case report higher than a meta-analysis of fifteen studies. The fix is to apply the hierarchy to product evidence. Ten quantitative survey responses beat one charismatic interview. A controlled cohort of free-trial users beats a vocal power user.",
        ],
      },
      {
        id: "performance-under-uncertainty",
        heading: "Performance under uncertainty",
        body: [
          "By graduation, a clinician has made decisions about other people's bodies with incomplete data, in compressed time, while tired, while watched, and while accountable. The medical literature on clinical reasoning under uncertainty is vast and well-validated, and it is the closest cognitive analogue to the day-to-day reality of running a venture-backed company.",
          "Most non-clinical founders have never had to operate at this level of stakes. Their pattern under uncertainty is to ask for more data, defer the decision, or seek a senior person's permission. The clinician's pattern is to gather what is available, reason explicitly, choose, and own it. That asymmetry compounds, because the decision shows up dozens of times a week in a company.",
        ],
      },
      {
        id: "what-to-unlearn",
        heading: "What to unlearn",
        body: [
          "There is one place medicine misleads you, and it is worth naming. Medicine teaches that the safe path is to escalate. When you do not know, you call your senior. When you are uncertain, you order another test. The cost of an unnecessary call is small. The cost of missing a diagnosis is enormous.",
          "Founder life inverts the asymmetry. The cost of escalation, of deferring to the smartest investor in the room or hiring a senior to make a call you should have made yourself, is the dominant cost in the early years. The cost of being wrong is small, because you find out fast and you correct. Notice the escalation instinct. Catch yourself. Make the call.",
          "Topol's broader argument, across two decades of writing on clinician-led innovation, is that the cognitive equipment that makes a competent clinician at the bedside is precisely the cognitive equipment that makes a competent technologist at the frontier. Stop apologising for being a clinician. The apology is what is slowing you down.",
        ],
      },
    ],
    sources: [
      {
        label: "Wikipedia, Eric Topol biography and bibliography",
        url: "https://en.wikipedia.org/wiki/Eric_Topol",
      },
      {
        label: "Eric Topol, The clinical potential of counterfactual AI models",
        url: "https://drerictopol.com/the-clinical-potential-of-counterfactual-ai-models/",
      },
      {
        label: "Eric Topol, The Paradox of Medical AI Implementation (Substack)",
        url: "https://erictopol.substack.com/p/the-paradox-of-medical-ai-implementation",
      },
      {
        label: "Eric Topol, Deep Medicine: How Artificial Intelligence Can Make Healthcare Human Again",
        url: "https://www.amazon.com/Deep-Medicine-Artificial-Intelligence-Healthcare/dp/1541644638",
      },
    ],
  },
  {
    slug: "equity-questions-clinician-advisor",
    title: "Four equity questions before you sign a clinician advisor agreement",
    dek: "The FAST template's standard terms. The ESS Startup Concession's eligibility window. Australian restraint case law. The four checks every clinician advisor should run before they sign.",
    category: "Playbook",
    author: "ASME Editorial",
    date: "2026-02-26",
    readTime: "7 min",
    cover: UNSPLASH("photo-1611224923853-80b023f02d71"),
    coverAlt: "A signed contract and pen resting on a wooden table.",
    sections: [
      {
        id: "advisor-decision-is-tax-decision",
        heading: "The advisor decision is a tax decision",
        body: [
          "A founder messages you on LinkedIn. They are clinical, you are clinical, the company solves a real problem. Would you advise? They will pay you in equity. Most clinicians say yes without confirming the four things that determine whether the equity is worth anything in three years, and at least two of those things are tax structure rather than compensation.",
          "The Australian context is specific. Advisor equity is usually structured as options under an Employee Share Scheme. The default tax treatment under section 83A-110 of the Income Tax Assessment Act produces a taxable benefit at grant in many cases, payable against an asset you cannot sell. The ESS Startup Concession (section 83A-33) defers that tax to disposal but requires the company to qualify. The first question is therefore not how much equity, but under what tax framework.",
        ],
      },
      {
        id: "vesting-schedule",
        heading: "Question one: vesting schedule",
        body: [
          "The Founder Institute's Founder Advisor Standard Template (FAST), the reference template for advisor agreements globally, vests advisor equity over two years on a monthly schedule with a three-month cliff. Per the FAST published terms, the cliff exists so that an unproductive relationship can be terminated without allocating any equity in the first three months. After the cliff, equity vests monthly.",
          "Schedules that diverge from FAST defaults are signals. A four-year schedule with a one-year cliff is the employee schedule and is not appropriate for an advisor. A 100 percent at the end of three years schedule is back-loaded and either reflects a founder unfamiliar with standard terms, or, less charitably, an intent to terminate the relationship just before the grant vests.",
          "Counter-offer if the schedule is back-loaded. Two-year monthly vesting with a three-month cliff. If the founder pushes back without a coherent reason, the answer tells you whether the founder has done a single advisor agreement before.",
        ],
      },
      {
        id: "ess-eligibility",
        heading: "Question two: ESS eligibility and the strike price",
        body: [
          "Per section 83A-33 of the Income Tax Assessment Act 1997, the ESS Startup Concession applies only to companies that are unlisted, less than ten years old, and have aggregated turnover under A$50 million in the previous income year. The discount on shares is capped at 15 percent of market value. Options must have a strike price at or above the market value of an ordinary share at grant.",
          "Ask the founder. Has the company been structured to qualify for the Startup Concession? What is the strike price? What was the most recent valuation, and which valuation method (NTA or arm's length) supports the strike price? If the founder cannot answer in five minutes, the legal work has not been done, and you do not want to be the test case.",
          "If the company does not qualify for the Startup Concession, the structure should be reviewed by your accountant before you sign. Phantom equity, deferred-tax arrangements, or a different security class are workable alternatives, but they need to be set up by someone who has done it before.",
        ],
      },
      {
        id: "change-of-control",
        heading: "Question three: change-of-control acceleration",
        body: [
          "The likely outcome of an early-stage company is acquisition rather than IPO. Without acceleration, an advisor whose equity has only partly vested at acquisition walks away with a fraction of the promised grant. The acquirer often terminates the advisory relationship after close because they bring in their own clinical advisors, so the worst case is the realistic case.",
          "Ask for double-trigger acceleration. 100 percent of unvested equity vests on a change of control plus termination of the advisory relationship. This is the standard ask for senior employees and is reasonable for active advisors. If the founder will not give double-trigger, ask for at least 50 percent acceleration on change of control alone.",
        ],
      },
      {
        id: "what-advisor-means",
        heading: "Question four: what does advisor actually mean",
        body: [
          "Advisor is not a defined role. The FAST template defines four engagement levels and recommends equity bands accordingly. For an early-stage startup at the time of writing: 0.25 percent for an advisory level (occasional intros and document review), 0.5 percent for standard engagement (monthly call, customer intros), 1 percent for an expert level (monthly meeting plus active recruiting and customer calls). For growth-stage companies, the same engagement levels are compensated at lower percentages.",
          "Match the equity to the load. Document the engagement level in the agreement. Renegotiate at six months if the relationship has grown into something different. The founders who respect this conversation are the founders worth advising. The ones who do not are the ones whose equity will not vest anyway.",
          "Final note for Australian advisors: amend the standard FAST template to reference the ESS Startup Concession explicitly where the company qualifies, and replace the default arbitration clause with a clean Australian forum (NSW or Victorian Supreme Court). The FAST template is good, but it is drafted for US incorporation by default.",
        ],
      },
    ],
    sources: [
      {
        label: "Founder Institute, FAST agreement (template and documentation)",
        url: "https://fi.co/fast",
      },
      {
        label: "Founder Institute, The FAST agreement explained",
        url: "https://fi.co/insight/the-founder-institute-s-standard-advisor-agreement-for-startups-fast",
      },
      {
        label: "AustLII, Income Tax Assessment Act 1997 s 83A-33 (start-up concession)",
        url: "https://www5.austlii.edu.au/au/legis/cth/consol_act/itaa1997240/s83a.33.html",
      },
      {
        label: "ATO, Employee share schemes: start-up companies (standard documents)",
        url: "https://www.ato.gov.au/api/public/content/50c6825e8ab04462bd2cfeb155fc3529_ESS_standard_docs_instructions.pdf",
      },
      {
        label: "BlueRock, ESS Start-up Concessions in Action: Case Study",
        url: "https://www.bluerock.com.au/resources/ess-start-up-concessions-in-action-case-study/",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/**
 * Newest first. Pass a limit to cap the result (e.g. for the home Insights
 * grid which shows four).
 */
export function getRecentArticles(limit?: number): Article[] {
  const sorted = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

/** Articles in one category, newest first. Clinician+ Stories are the
 *  "Interview" category, so the Resources page can show them as their own
 *  strand rather than leaving them mixed into the general feed. */
export function getArticlesByCategory(category: ArticleCategory, limit?: number): Article[] {
  const found = getRecentArticles().filter((a) => a.category === category);
  return typeof limit === "number" ? found.slice(0, limit) : found;
}

/** Everything except one category. The counterpart to the above, so an article
 *  cannot appear in both the Stories strand and the general article list. */
export function getArticlesExcept(category: ArticleCategory, limit?: number): Article[] {
  const found = getRecentArticles().filter((a) => a.category !== category);
  return typeof limit === "number" ? found.slice(0, limit) : found;
}

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
