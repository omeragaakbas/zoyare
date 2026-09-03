/**
 * Hand-drawn architecture schematics per project — pure SVG, server-rendered,
 * zero client JS. Styled like engineering blueprints in the brand palette.
 * Flow lines animate via the .schematic-flow class in globals.css
 * (CSS-only, respects prefers-reduced-motion globally).
 */

const INK = "#1A1916";
const BORDER = "#D9D5CC";
const MUTED = "#8A8680";
const ACCENT = "#F15F0E";
const SURFACE = "#EFECE6";
const BG = "#F8F6F2";

const mono = "var(--font-space-mono), monospace";

type NodeProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  accent?: boolean;
};

function Node({ x, y, w, h, label, sub, accent = false }: NodeProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={accent ? "rgba(241,95,14,0.06)" : BG}
        stroke={accent ? ACCENT : BORDER}
        strokeWidth={1}
      />
      {/* corner ticks, drafting-table style */}
      <path d={`M ${x} ${y + 8} V ${y} H ${x + 8}`} fill="none" stroke={accent ? ACCENT : MUTED} strokeWidth={1} />
      <path d={`M ${x + w - 8} ${y + h} H ${x + w} V ${y + h - 8}`} fill="none" stroke={accent ? ACCENT : MUTED} strokeWidth={1} />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 3}
        textAnchor="middle"
        fontFamily={mono}
        fontSize={10}
        letterSpacing={1.2}
        fill={accent ? ACCENT : INK}
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 12}
          textAnchor="middle"
          fontFamily={mono}
          fontSize={8}
          letterSpacing={1}
          fill={MUTED}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Cylinder({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) {
  const ry = 10;
  return (
    <g>
      <path
        d={`M ${x} ${y + ry} A ${w / 2} ${ry} 0 0 1 ${x + w} ${y + ry} V ${y + h - ry} A ${w / 2} ${ry} 0 0 1 ${x} ${y + h - ry} Z`}
        fill={BG}
        stroke={BORDER}
        strokeWidth={1}
      />
      <ellipse cx={x + w / 2} cy={y + ry} rx={w / 2} ry={ry} fill={SURFACE} stroke={BORDER} strokeWidth={1} />
      <text
        x={x + w / 2}
        y={y + h / 2 + 8}
        textAnchor="middle"
        fontFamily={mono}
        fontSize={9}
        letterSpacing={1.2}
        fill={INK}
      >
        {label}
      </text>
    </g>
  );
}

function Flow({ d }: { d: string }) {
  return (
    <g>
      <path d={d} fill="none" stroke={BORDER} strokeWidth={1} />
      <path d={d} fill="none" stroke={ACCENT} strokeWidth={1} className="schematic-flow" />
    </g>
  );
}

function Caption({ text }: { text: string }) {
  return (
    <text x={28} y={428} fontFamily={mono} fontSize={9} letterSpacing={2} fill={MUTED}>
      {text}
    </text>
  );
}

function Frame() {
  return (
    <>
      {/* faint blueprint grid */}
      <g stroke={INK} strokeWidth={0.5} opacity={0.04}>
        {Array.from({ length: 17 }, (_, i) => (
          <line key={`v${i}`} x1={i * 45} y1={0} x2={i * 45} y2={450} />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 45} x2={720} y2={i * 45} />
        ))}
      </g>
    </>
  );
}

function SiemensSchematic() {
  return (
    <>
      <Frame />
      {/* IoT devices feeding the platform */}
      {[120, 200, 280].map((y, i) => (
        <g key={y}>
          <rect x={44} y={y} width={34} height={34} fill={BG} stroke={BORDER} />
          <circle cx={61} cy={y + 17} r={3.5} fill={i === 1 ? ACCENT : MUTED} />
          <path d={`M 78 ${y + 17} H 142`} fill="none" stroke={BORDER} strokeWidth={1} />
        </g>
      ))}
      <text x={44} y={104} fontFamily={mono} fontSize={8} letterSpacing={1.5} fill={MUTED}>
        SENSORS
      </text>

      <Node x={142} y={150} w={158} h={130} label="SIEMENS BUILDINGX" sub="REST API · OAUTH 2.0" />
      <Flow d="M 300 215 H 384" />
      <Node x={384} y={177} w={134} h={76} label="CONNECTOR" sub="JAVA · ZOYARE" accent />
      <Flow d="M 518 215 H 560" />
      <Node x={560} y={150} w={120} h={130} label="MENDIX" sub="ENTERPRISE APPS" />

      {/* token handshake chip */}
      <rect x={398} y={120} width={106} height={26} fill={SURFACE} stroke={BORDER} />
      <text x={451} y={137} textAnchor="middle" fontFamily={mono} fontSize={8} letterSpacing={1.5} fill={MUTED}>
        TOKEN REFRESH
      </text>
      <path d="M 451 146 V 177" fill="none" stroke={BORDER} strokeDasharray="2 4" />

      {/* sample app note */}
      <path d="M 620 280 V 330" fill="none" stroke={BORDER} strokeDasharray="2 4" />
      <rect x={552} y={330} width={136} height={28} fill={BG} stroke={BORDER} />
      <text x={620} y={348} textAnchor="middle" fontFamily={mono} fontSize={8} letterSpacing={1.5} fill={MUTED}>
        SAMPLE APP
      </text>

      <Caption text="FIG. 01 — BUILDINGX PLATFORM CONNECTOR" />
    </>
  );
}

function StratexSchematic() {
  return (
    <>
      <Frame />
      {[
        { x: 84, label: "SCHEDULING" },
        { x: 290, label: "EMPLOYEES" },
        { x: 496, label: "REPORTING" },
      ].map((d) => (
        <g key={d.label}>
          <Node x={d.x} y={64} w={140} h={64} label={d.label} sub="DOMAIN API" />
          <Flow d={`M ${d.x + 70} 128 V 188`} />
        </g>
      ))}

      {/* shared REST layer */}
      <rect x={84} y={188} width={552} height={48} fill="rgba(241,95,14,0.05)" stroke={ACCENT} strokeWidth={1} />
      <text x={360} y={208} textAnchor="middle" fontFamily={mono} fontSize={10} letterSpacing={1.5} fill={ACCENT}>
        REST API LAYER
      </text>
      <text x={360} y={224} textAnchor="middle" fontFamily={mono} fontSize={8} letterSpacing={1.2} fill={MUTED}>
        AUTH · ERROR HANDLING · RATE LIMITING
      </text>

      <Flow d="M 360 236 V 296" />
      <Cylinder x={296} y={296} w={128} h={86} label="POSTGRESQL" />

      {/* docker chip */}
      <rect x={520} y={314} width={116} height={28} fill={SURFACE} stroke={BORDER} />
      <text x={578} y={332} textAnchor="middle" fontFamily={mono} fontSize={8} letterSpacing={1.5} fill={MUTED}>
        DOCKERIZED
      </text>
      <path d="M 424 339 H 520" fill="none" stroke={BORDER} strokeDasharray="2 4" />

      <Caption text="FIG. 02 — WORKFORCE MANAGEMENT BACK-END" />
    </>
  );
}

function StudybuddySchematic() {
  return (
    <>
      <Frame />
      {/* two phones */}
      {[
        { x: 116, name: "STUDENT A" },
        { x: 488, name: "STUDENT B" },
      ].map((p) => (
        <g key={p.name}>
          <rect x={p.x} y={86} width={116} height={228} rx={14} fill={BG} stroke={INK} strokeOpacity={0.45} strokeWidth={1.2} />
          <line x1={p.x + 42} y1={102} x2={p.x + 74} y2={102} stroke={BORDER} strokeWidth={2} strokeLinecap="round" />
          {/* swipe card */}
          <rect x={p.x + 16} y={120} width={84} height={104} fill={SURFACE} stroke={BORDER} />
          <line x1={p.x + 28} y1={146} x2={p.x + 88} y2={146} stroke={MUTED} strokeWidth={1} opacity={0.5} />
          <line x1={p.x + 28} y1={160} x2={p.x + 76} y2={160} stroke={MUTED} strokeWidth={1} opacity={0.35} />
          <line x1={p.x + 28} y1={174} x2={p.x + 82} y2={174} stroke={MUTED} strokeWidth={1} opacity={0.35} />
          {/* chat rows */}
          <rect x={p.x + 16} y={240} width={56} height={12} rx={6} fill={SURFACE} />
          <rect x={p.x + 44} y={260} width={56} height={12} rx={6} fill="rgba(241,95,14,0.18)" />
          <text x={p.x + 58} y={336} textAnchor="middle" fontFamily={mono} fontSize={8} letterSpacing={1.5} fill={MUTED}>
            {p.name}
          </text>
        </g>
      ))}

      {/* match core */}
      <circle cx={360} cy={200} r={64} fill="none" stroke={BORDER} strokeDasharray="3 5" />
      <circle cx={360} cy={200} r={34} fill="rgba(241,95,14,0.07)" stroke={ACCENT} strokeWidth={1.2} />
      <text x={360} y={197} textAnchor="middle" fontFamily={mono} fontSize={9} letterSpacing={1.5} fill={ACCENT}>
        MATCH
      </text>
      <text x={360} y={210} textAnchor="middle" fontFamily={mono} fontSize={7} letterSpacing={1} fill={MUTED}>
        COURSE · GEO
      </text>

      <Flow d="M 232 200 H 326" />
      <Flow d="M 394 200 H 488" />
      <text x={279} y={188} textAnchor="middle" fontFamily={mono} fontSize={8} letterSpacing={1.5} fill={MUTED}>
        WS
      </text>
      <text x={441} y={188} textAnchor="middle" fontFamily={mono} fontSize={8} letterSpacing={1.5} fill={MUTED}>
        WS
      </text>

      {/* geo pin */}
      <path d="M 360 264 V 296" fill="none" stroke={BORDER} strokeDasharray="2 4" />
      <circle cx={360} cy={310} r={5} fill="none" stroke={MUTED} strokeWidth={1.2} />
      <circle cx={360} cy={310} r={1.8} fill={MUTED} />
      <text x={360} y={338} textAnchor="middle" fontFamily={mono} fontSize={8} letterSpacing={1.5} fill={MUTED}>
        RADIUS 5 KM
      </text>

      <Caption text="FIG. 03 — REAL-TIME STUDENT MATCHING" />
    </>
  );
}

function ProaspectSchematic() {
  const stages = [
    { x: 44, label: "CSV", sub: "TIMESHEETS" },
    { x: 178, label: "VALIDATE", sub: "ROWS · RATES" },
    { x: 312, label: "CALCULATE", sub: "PER CLIENT" },
    { x: 446, label: "PDF", sub: "INVOICE GEN" },
    { x: 580, label: "SEND", sub: "SMTP", accent: true },
  ];
  return (
    <>
      <Frame />
      {stages.map((s, i) => (
        <g key={s.label}>
          <Node x={s.x} y={172} w={96} h={72} label={s.label} sub={s.sub} accent={s.accent} />
          {i < stages.length - 1 && <Flow d={`M ${s.x + 96} 208 H ${s.x + 134}`} />}
        </g>
      ))}

      {/* rates db feeding the calculate stage */}
      <Cylinder x={318} y={64} w={84} h={62} label="RATES" />
      <Flow d="M 360 126 V 172" />

      {/* weekly cron trigger */}
      <rect x={44} y={92} width={96} height={26} fill={SURFACE} stroke={BORDER} />
      <text x={92} y={109} textAnchor="middle" fontFamily={mono} fontSize={8} letterSpacing={1.5} fill={MUTED}>
        CRON · WK
      </text>
      <path d="M 92 118 V 172" fill="none" stroke={BORDER} strokeDasharray="2 4" />

      {/* outcome strip */}
      <rect x={44} y={300} width={632} height={44} fill={BG} stroke={BORDER} />
      <text x={64} y={327} fontFamily={mono} fontSize={9} letterSpacing={1.5} fill={MUTED}>
        MANUAL STEPS
      </text>
      <text x={656} y={328} textAnchor="end" fontFamily={mono} fontSize={16} letterSpacing={2} fill={ACCENT}>
        0
      </text>
      <line x1={172} y1={322} x2={630} y2={322} stroke={BORDER} strokeDasharray="2 4" />

      <Caption text="FIG. 04 — AUTOMATED INVOICE PIPELINE" />
    </>
  );
}

function CustomsComplianceSchematic() {
  const stages = [
    { x: 44, label: "PRE-DEPARTURE", sub: "SHIPMENT DATA" },
    { x: 178, label: "ELIGIBILITY", sub: "ORIGIN · TRANSPORT" },
    { x: 312, label: "T+2H WAIT", sub: "COMPLIANCE WINDOW", accent: true },
    { x: 446, label: "STATUS POLL", sub: "CLEARANCE API" },
    { x: 580, label: "SORT DECISION", sub: "ROUTED" },
  ];
  return (
    <>
      <Frame />
      {stages.map((s, i) => (
        <g key={s.label}>
          <Node x={s.x} y={172} w={96} h={72} label={s.label} sub={s.sub} accent={s.accent} />
          {i < stages.length - 1 && <Flow d={`M ${s.x + 96} 208 H ${s.x + 134}`} />}
        </g>
      ))}

      {/* per-parcel compliance state */}
      <Cylinder x={318} y={64} w={84} h={62} label="STATE" />
      <Flow d="M 360 126 V 172" />

      {/* event bus trigger */}
      <rect x={44} y={92} width={96} height={26} fill={SURFACE} stroke={BORDER} />
      <text x={92} y={109} textAnchor="middle" fontFamily={mono} fontSize={8} letterSpacing={1.5} fill={MUTED}>
        EVENTBRIDGE
      </text>
      <path d="M 92 118 V 172" fill="none" stroke={BORDER} strokeDasharray="2 4" />

      {/* outcome strip */}
      <rect x={44} y={300} width={632} height={44} fill={BG} stroke={BORDER} />
      <text x={64} y={327} fontFamily={mono} fontSize={9} letterSpacing={1.5} fill={MUTED}>
        MANUAL TRACKING
      </text>
      <text x={656} y={328} textAnchor="end" fontFamily={mono} fontSize={16} letterSpacing={2} fill={ACCENT}>
        0
      </text>
      <line x1={220} y1={322} x2={630} y2={322} stroke={BORDER} strokeDasharray="2 4" />

      <Caption text="FIG. 05 — CUSTOMS COMPLIANCE STATUS PIPELINE" />
    </>
  );
}

function MembershipPlatformSchematic() {
  return (
    <>
      <Frame />
      {[
        { x: 84, label: "MEMBER AUTH", sub: "SESSION · REFRESH" },
        { x: 290, label: "WEBSHOP", sub: "CART · CHECKOUT" },
        { x: 496, label: "CONTENT", sub: "BANNERS · DOCS" },
      ].map((d) => (
        <g key={d.label}>
          <Node x={d.x} y={64} w={140} h={64} label={d.label} sub={d.sub} />
          <Flow d={`M ${d.x + 70} 128 V 188`} />
        </g>
      ))}

      {/* shared routing layer */}
      <rect x={84} y={188} width={552} height={48} fill="rgba(241,95,14,0.05)" stroke={ACCENT} strokeWidth={1} />
      <text x={360} y={208} textAnchor="middle" fontFamily={mono} fontSize={10} letterSpacing={1.5} fill={ACCENT}>
        MVC ROUTING LAYER
      </text>
      <text x={360} y={224} textAnchor="middle" fontFamily={mono} fontSize={8} letterSpacing={1.2} fill={MUTED}>
        CONTENT TYPE → CONTROLLER → VIEW
      </text>

      <Flow d="M 360 236 V 296" />
      <Cylinder x={296} y={296} w={128} h={86} label="HEADLESS CMS" />

      {/* cache chip */}
      <rect x={520} y={314} width={116} height={28} fill={SURFACE} stroke={BORDER} />
      <text x={578} y={332} textAnchor="middle" fontFamily={mono} fontSize={8} letterSpacing={1.5} fill={MUTED}>
        RSS + CACHE
      </text>
      <path d="M 424 339 H 520" fill="none" stroke={BORDER} strokeDasharray="2 4" />

      <Caption text="FIG. 06 — MEMBERSHIP & CONTENT PLATFORM" />
    </>
  );
}

function MaloleSchematic() {
  return (
    <>
      <Frame />
      <text x={28} y={62} fontFamily={mono} fontSize={8} letterSpacing={1.5} fill={MUTED}>
        STUDIO ADMIN
      </text>

      {/* the two things that steer the flow from outside it */}
      <rect x={210} y={44} width={112} height={28} fill={SURFACE} stroke={BORDER} />
      <text x={266} y={62} textAnchor="middle" fontFamily={mono} fontSize={8} letterSpacing={1.5} fill={MUTED}>
        AVAILABILITY
      </text>
      <path d="M 266 72 V 100" fill="none" stroke={BORDER} strokeDasharray="2 4" />

      <rect x={408} y={44} width={112} height={28} fill={SURFACE} stroke={BORDER} />
      <text x={464} y={62} textAnchor="middle" fontFamily={mono} fontSize={8} letterSpacing={1.5} fill={MUTED}>
        WEBHOOK
      </text>
      <path d="M 464 72 V 100" fill="none" stroke={BORDER} strokeDasharray="2 4" />

      {/* booking pipeline */}
      <Node x={28} y={110} w={110} h={64} label="CLIENT" sub="PICKS SLOT" />
      <Flow d="M 138 142 H 196" />
      <Node x={196} y={100} w={140} h={84} label="BOOKING" sub="HOLD · 20 MIN" />
      <Flow d="M 336 142 H 394" />
      <Node x={394} y={100} w={140} h={84} label="MOLLIE" sub="IDEAL DEPOSIT" accent />
      <Flow d="M 534 142 H 592" />
      <Node x={592} y={110} w={100} h={64} label="CONFIRMED" />

      <Flow d="M 642 174 V 236" />

      {/* everything that fires once a deposit lands */}
      <rect x={84} y={236} width={552} height={48} fill="rgba(241,95,14,0.05)" stroke={ACCENT} strokeWidth={1} />
      <text x={360} y={256} textAnchor="middle" fontFamily={mono} fontSize={10} letterSpacing={1.5} fill={ACCENT}>
        CONFIRMATION PIPELINE
      </text>
      <text x={360} y={272} textAnchor="middle" fontFamily={mono} fontSize={8} letterSpacing={1.2} fill={MUTED}>
        EMAIL · .ICS · PDF DEPOSIT INVOICE
      </text>

      <Flow d="M 360 284 V 316" />
      <Cylinder x={296} y={316} w={128} h={76} label="POSTGRES · EU" />

      {/* reminder chip */}
      <rect x={520} y={334} width={116} height={28} fill={SURFACE} stroke={BORDER} />
      <text x={578} y={352} textAnchor="middle" fontFamily={mono} fontSize={8} letterSpacing={1.5} fill={MUTED}>
        CRON REMINDER
      </text>
      <path d="M 424 348 H 520" fill="none" stroke={BORDER} strokeDasharray="2 4" />

      <Caption text="FIG. 07 — BOOKING & DEPOSIT FLOW" />
    </>
  );
}

function RefajaSchematic() {
  return (
    <>
      <Frame />
      {/* edge delivery */}
      <rect x={272} y={36} width={112} height={28} fill={SURFACE} stroke={BORDER} />
      <text x={328} y={54} textAnchor="middle" fontFamily={mono} fontSize={8} letterSpacing={1.5} fill={MUTED}>
        EDGE CDN
      </text>
      <path d="M 328 64 V 88" fill="none" stroke={BORDER} strokeDasharray="2 4" />

      <Node x={28} y={100} w={132} h={76} label="SEARCH" sub="+ AI CRAWLERS" />
      <Flow d="M 160 138 H 228" />
      <Node x={228} y={88} w={180} h={100} label="STATIC PAGE" sub="ONE FILE · NO BUILD" accent />
      <Flow d="M 408 138 H 476" />
      <Node x={476} y={100} w={132} h={76} label="VISITOR" sub="TEL · MAIL" />

      <Flow d="M 318 188 V 236" />

      {/* what makes the page machine-readable */}
      <rect x={84} y={236} width={552} height={48} fill="rgba(241,95,14,0.05)" stroke={ACCENT} strokeWidth={1} />
      <text x={360} y={256} textAnchor="middle" fontFamily={mono} fontSize={10} letterSpacing={1.5} fill={ACCENT}>
        JSON-LD STRUCTURED DATA
      </text>
      <text x={360} y={272} textAnchor="middle" fontFamily={mono} fontSize={8} letterSpacing={1.2} fill={MUTED}>
        LOCALBUSINESS · SERVICE · OFFERCATALOG
      </text>

      <Flow d="M 360 284 V 320" />

      {/* service area, one tile per municipality */}
      {Array.from({ length: 12 }, (_, i) => (
        <g key={`area${i}`}>
          <rect x={103 + i * 44} y={330} width={30} height={30} fill={BG} stroke={BORDER} />
          <circle cx={118 + i * 44} cy={345} r={3} fill={i % 4 === 1 ? ACCENT : MUTED} />
        </g>
      ))}
      <text x={360} y={384} textAnchor="middle" fontFamily={mono} fontSize={8} letterSpacing={1.5} fill={MUTED}>
        SERVICE AREA · 12 MUNICIPALITIES
      </text>

      <Caption text="FIG. 08 — LOCAL DISCOVERY SETUP" />
    </>
  );
}

const schematics: Record<string, () => React.ReactNode> = {
  siemens: SiemensSchematic,
  stratex: StratexSchematic,
  studybuddy: StudybuddySchematic,
  proaspect: ProaspectSchematic,
  "customs-compliance": CustomsComplianceSchematic,
  "membership-content-platform": MembershipPlatformSchematic,
  "malole-studio": MaloleSchematic,
  "refaja-zorgt": RefajaSchematic,
};

export default function ProjectSchematic({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  const Schematic = schematics[id];
  if (!Schematic) return null;

  return (
    <svg
      viewBox="0 0 720 450"
      className={className}
      aria-hidden="true"
      role="presentation"
      preserveAspectRatio="xMidYMid meet"
    >
      <Schematic />
    </svg>
  );
}
