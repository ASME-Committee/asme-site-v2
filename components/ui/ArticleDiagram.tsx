/**
 * One diagram per article, drawing the structure the piece is actually about.
 *
 * These have to survive two sizes: roughly 300px wide on a card, and full width
 * at the top of the article. So each is built from at most a handful of shapes
 * with heavy strokes and no small type. At card size they read as a mark; at
 * hero size the geometry is legible enough to mean something before the reader
 * has clicked.
 *
 * Colour comes through `currentColor`, set on the wrapper, so the drawing takes
 * the category's tone. Anything that needs the accent is wrapped in a `<g>` that
 * sets its own colour.
 */

const VB = "0 0 320 200";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox={VB}
      className="h-full w-full"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** Advisor equity: 24 months, flat until the 3-month cliff, then it steps up. */
function Vesting() {
  return (
    <Frame>
      <line x1="46" y1="158" x2="286" y2="158" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      <line x1="46" y1="158" x2="46" y2="44" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      {/* the cliff: nothing vests, then a jump */}
      <path d="M46 158 H92" stroke="currentColor" strokeWidth="3.5" opacity="0.5" />
      <g className="text-[rgb(var(--accent))]">
        <path
          d="M92 158 V132 H126 V116 H160 V100 H194 V84 H228 V68 H262 V52"
          stroke="currentColor"
          strokeWidth="3.5"
        />
        <circle cx="92" cy="132" r="5.5" fill="currentColor" />
      </g>
      <line x1="92" y1="44" x2="92" y2="168" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 5" opacity="0.5" />
    </Frame>
  );
}

/** Raising capital: rounds getting larger, with the raise line rising through. */
function Rounds() {
  const bars = [
    { x: 58, h: 34 },
    { x: 116, h: 60 },
    { x: 174, h: 92 },
    { x: 232, h: 128 },
  ];
  return (
    <Frame>
      <line x1="40" y1="160" x2="286" y2="160" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      {bars.map((b, i) => (
        <rect
          key={b.x}
          x={b.x}
          y={160 - b.h}
          width="34"
          height={b.h}
          rx="3"
          fill="currentColor"
          opacity={0.14 + i * 0.05}
        />
      ))}
      <g className="text-[rgb(var(--accent))]">
        <path d="M75 126 L133 100 L191 68 L249 32" stroke="currentColor" strokeWidth="3.5" />
        <circle cx="249" cy="32" r="6" fill="currentColor" />
      </g>
    </Frame>
  );
}

/** Leaving clinical medicine: the path forks, and a route back stays open. */
function Bridge() {
  return (
    <Frame>
      <path d="M34 122 H126" stroke="currentColor" strokeWidth="3.5" opacity="0.55" />
      <circle cx="126" cy="122" r="6" fill="currentColor" opacity="0.55" />
      {/* the founder branch */}
      <g className="text-[rgb(var(--accent))]">
        <path d="M126 122 C168 122 176 66 220 66 H286" stroke="currentColor" strokeWidth="3.5" />
      </g>
      {/* clinical practice continues */}
      <path d="M126 122 C168 122 176 168 220 168 H286" stroke="currentColor" strokeWidth="3.5" opacity="0.4" />
      {/* the bridge that is not burned */}
      <path
        d="M232 78 C206 108 206 128 232 156"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="5 6"
        opacity="0.75"
      />
      <path d="M232 156 l-9 -5 M232 156 l1 -10" stroke="currentColor" strokeWidth="2" opacity="0.75" />
    </Frame>
  );
}

/** A pitch deck: the sequence, with the problem slide carrying the weight. */
function Deck() {
  const slides = [40, 96, 152, 208, 264];
  return (
    <Frame>
      {slides.map((x, i) => {
        const lead = i === 1;
        return lead ? (
          <g key={x} className="text-[rgb(var(--accent))]">
            <rect x={x - 6} y="52" width="52" height="96" rx="4" fill="currentColor" />
          </g>
        ) : (
          <rect
            key={x}
            x={x}
            y="72"
            width="40"
            height="56"
            rx="4"
            stroke="currentColor"
            strokeWidth="2.5"
            opacity="0.45"
          />
        );
      })}
      <line x1="34" y1="168" x2="286" y2="168" stroke="currentColor" strokeWidth="2" opacity="0.25" />
    </Frame>
  );
}

/** A Series B: the staircase, with the round that landed marked at the top. */
function Staircase() {
  return (
    <Frame>
      <path
        d="M40 168 H100 V132 H160 V96 H220 V52 H286"
        stroke="currentColor"
        strokeWidth="3.5"
        opacity="0.35"
      />
      <g className="text-[rgb(var(--accent))]">
        <path d="M220 96 V52 H286" stroke="currentColor" strokeWidth="4" />
        <circle cx="286" cy="52" r="7" fill="currentColor" />
      </g>
      <line x1="40" y1="180" x2="286" y2="180" stroke="currentColor" strokeWidth="2" opacity="0.2" />
    </Frame>
  );
}

/** Pricing: what it is set at, against what it could bear. */
function PriceGap() {
  return (
    <Frame>
      <rect x="40" y="66" width="96" height="26" rx="4" fill="currentColor" opacity="0.28" />
      <g className="text-[rgb(var(--accent))]">
        <rect x="40" y="118" width="234" height="26" rx="4" fill="currentColor" />
      </g>
      <line x1="136" y1="58" x2="136" y2="152" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 5" opacity="0.6" />
      <line x1="274" y1="110" x2="274" y2="152" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 5" opacity="0.6" />
      <path d="M142 166 H268 M268 166 l-8 -5 M268 166 l-8 5" stroke="currentColor" strokeWidth="2" opacity="0.7" />
    </Frame>
  );
}

/** The essay: clinical training on the left, what it becomes on the right. */
function Transfer() {
  const rows = [56, 92, 128, 164];
  return (
    <Frame>
      {rows.map((y, i) => (
        <g key={y}>
          <circle cx="62" cy={y} r="7" stroke="currentColor" strokeWidth="2.5" opacity="0.5" />
          <path
            d={`M78 ${y} C132 ${y} 188 ${rows[(i + 1) % rows.length]} 244 ${rows[(i + 1) % rows.length]}`}
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.3"
          />
        </g>
      ))}
      <g className="text-[rgb(var(--accent))]">
        <path d="M78 56 C132 56 188 92 244 92" stroke="currentColor" strokeWidth="3.5" />
        <circle cx="62" cy="56" r="7" fill="currentColor" />
        <circle cx="258" cy="92" r="7" fill="currentColor" />
      </g>
      {rows.map((y) => (
        <circle key={y} cx="258" cy={y} r="7" stroke="currentColor" strokeWidth="2.5" opacity="0.5" />
      ))}
    </Frame>
  );
}

const bySlug: Record<string, () => React.JSX.Element> = {
  "equity-questions-clinician-advisor": Vesting,
  "raising-capital-clinician-australia": Rounds,
  "leave-medicine-without-burning-the-bridge": Bridge,
  "clinician-pitch-deck": Deck,
  "inside-series-b-clinician-founder": Staircase,
  "clinician-founders-pricing-too-low": PriceGap,
  "medicine-everything-to-be-a-founder": Transfer,
};

/** Falls back to the rounds ladder, which suits most pieces here, so a new
 *  article never renders an empty frame while its own drawing is written. */
export function ArticleDiagram({ slug }: { slug: string }) {
  const Drawing = bySlug[slug] ?? Rounds;
  return <Drawing />;
}
