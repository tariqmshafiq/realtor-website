import type { Metadata } from "next";
import Image from "next/image";

type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

const DEFAULT_TO = "";
const DEFAULT_CO = "Mitchell Realty Group";
const DEFAULT_NAME = "Sarah Mitchell";
const DEFAULT_EMAIL = "sarah@mitchellrealtygroup.com";
const DEFAULT_PHONE = "(703) 555-0142";
const DEFAULT_LINE =
  "A realtor's work is measured in closings, not claims. Here's the proof.";

function readParam(
  sp: Awaited<SearchParams>,
  key: string,
  fallback: string,
): string {
  const value = sp[key];
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : fallback;
}

function readParams(sp: Awaited<SearchParams>) {
  return {
    to: readParam(sp, "to", DEFAULT_TO),
    co: readParam(sp, "co", DEFAULT_CO),
    name: readParam(sp, "name", DEFAULT_NAME),
    email: readParam(sp, "email", DEFAULT_EMAIL),
    phone: readParam(sp, "phone", DEFAULT_PHONE),
    line: readParam(sp, "line", DEFAULT_LINE),
  };
}

type Params = ReturnType<typeof readParams>;

const IMG = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

const HERO_IMG = IMG("1512917774080-9991f1c4c750", 2200);
const PORTRAIT_IMG = IMG("1600210492486-724fe5c67fb0", 900);
const AREA_IMG = IMG("1449844908441-8829872d2607", 1200);

const LISTINGS = [
  {
    img: IMG("1600585154340-be6161a56a0c", 900),
    title: "Modern Colonial",
    price: "$2,150,000",
    beds: 5,
    baths: 6,
    sqft: "5,400",
    area: "McLean, VA",
  },
  {
    img: IMG("1600596542815-ffad4c1539a9", 900),
    title: "Luxury Craftsman",
    price: "$1,495,000",
    beds: 4,
    baths: 5,
    sqft: "3,900",
    area: "Great Falls, VA",
  },
  {
    img: IMG("1600607687939-ce8a6c25118c", 900),
    title: "Renovated Townhome",
    price: "$865,000",
    beds: 3,
    baths: 3,
    sqft: "2,200",
    area: "Reston, VA",
  },
];

const REVIEW_TEMPLATES = [
  {
    name: "Melissa & David H.",
    area: "Arlington, VA",
    text: "Every offer, every call, every detail handled. {agent} made closing feel inevitable.",
  },
  {
    name: "James Okafor",
    area: "McLean, VA",
    text: "Sold in six days, $120K over asking. The staging was flawless; the process, invisible.",
  },
  {
    name: "Priya & Rohan S.",
    area: "Reston, VA",
    text: "We relocated cross-country in three weeks. {agent} never missed a beat — or a deadline.",
  },
  {
    name: "Carol B.",
    area: "Alexandria, VA",
    text: "Downsizing is emotional. {agent} made it calm, clear, and kind.",
  },
  {
    name: "Mike & Lauren T.",
    area: "Vienna, VA",
    text: "First home, endless questions. {agent} answered them all before we asked.",
  },
  {
    name: "Angela Ruiz",
    area: "Fairfax, VA",
    text: "Bought the condo, rented it in a week. Sharp, fast, always on.",
  },
];

const AREAS = [
  "McLean",
  "Great Falls",
  "Vienna",
  "Tysons",
  "Arlington",
  "Alexandria",
  "Falls Church",
  "Reston",
  "Fairfax",
  "Oakton",
  "Herndon",
  "Washington, D.C.",
  "Bethesda",
];

const STATS = [
  { value: "12+", label: "Years in the DMV" },
  { value: "420+", label: "Homes closed" },
  { value: "98%", label: "List-to-sale ratio" },
  { value: "6 days", label: "Average to contract" },
];

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const p = readParams(await searchParams);
  const title = `${p.name} — Northern Virginia Realtor`;
  const description = `${p.name} of ${p.co} — a realtor page for Northern Virginia and the DMV. ${p.phone} · ${p.email}`;
  return { title, description };
}

function Stars({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-0.5 text-accent ${className}`}
      aria-label="5 out of 5 stars"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="size-3.5 fill-current"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
      {children}
    </p>
  );
}

function Header({ p }: { p: Params }) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center border border-ink-950 font-display text-base font-bold text-ink-950">
            {p.co.charAt(0)}
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink-950">
            {p.co}
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-ink-600 sm:flex">
          <a className="transition-colors hover:text-ink-950" href="#work">
            Selected Work
          </a>
          <a className="transition-colors hover:text-ink-950" href="#reviews">
            Reviews
          </a>
          <a className="transition-colors hover:text-ink-950" href="#territory">
            Territory
          </a>
          <a
            href={`mailto:${p.email}`}
            className="transition-colors hover:text-ink-950"
          >
            {p.email}
          </a>
        </nav>
        <a
          href={`tel:${p.phone}`}
          className="rounded-full bg-ink-950 px-5 py-2 text-sm font-semibold text-paper transition-colors hover:bg-ink-800"
        >
          {p.phone}
        </a>
      </div>
    </header>
  );
}

function Hero({ p }: { p: Params }) {
  return (
    <section id="top" className="bg-paper">
      <div className="mx-auto w-full max-w-6xl px-5 pb-14 pt-16 sm:px-8 sm:pb-16 sm:pt-24">
        <Eyebrow>
          {p.co} · Northern Virginia · The DMV
        </Eyebrow>
        {p.to ? (
          <p className="mt-6 text-base text-ink-400">Hi {p.to}, welcome.</p>
        ) : null}
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.05] tracking-tight text-ink-950 sm:text-7xl">
          Meet {p.name}.
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-600">
          {p.line}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${p.phone}`}
            className="rounded-full bg-ink-950 px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-ink-800"
          >
            Call {p.name}
          </a>
          <a
            href={`mailto:${p.email}`}
            className="rounded-full border border-ink-950/20 px-7 py-3.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-ink-950/[0.04]"
          >
            Email {p.name}
          </a>
        </div>
      </div>
      <div className="relative h-[52vh] w-full overflow-hidden sm:h-[62vh]">
        <Image
          src={HERO_IMG}
          alt="Modern home in Northern Virginia"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-b border-ink-100 bg-paper">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-10 px-5 py-16 sm:px-8 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="border-l border-ink-100 pl-5">
            <p className="font-display text-4xl font-medium text-ink-950 sm:text-5xl">
              {s.value}
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-ink-400">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SelectedWork({ p }: { p: Params }) {
  return (
    <section id="work" className="scroll-mt-24 bg-paper py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="mb-14 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Selected Work</Eyebrow>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-medium tracking-tight text-ink-950 sm:text-5xl">
              The DMV, handled by {p.name}.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-600">
            A sample of what is moving across McLean, Great Falls, and Reston
            right now. Private tours can be arranged today.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {LISTINGS.map((l) => (
            <article
              key={l.title}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={l.img}
                  alt={`${l.title} in ${l.area}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-baseline justify-between border-b border-ink-100 py-4">
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink-950">
                    {l.title}
                  </h3>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-ink-400">
                    {l.area}
                  </p>
                </div>
                <p className="font-display text-lg font-medium text-ink-950">
                  {l.price}
                </p>
              </div>
              <div className="flex items-center gap-5 pt-3 text-xs uppercase tracking-[0.18em] text-ink-400">
                <span>{l.beds} bd</span>
                <span>{l.baths} ba</span>
                <span>{l.sqft} sqft</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About({ p }: { p: Params }) {
  return (
    <section id="about" className="scroll-mt-24 border-t border-ink-100 bg-mist py-24 sm:py-32">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[3fr_2fr]">
        <div>
          <Eyebrow>About</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-ink-950 sm:text-6xl">
            {p.name}.
          </h2>
          <div className="mt-7 max-w-xl space-y-5 text-base leading-relaxed text-ink-600">
            <p>
              Twelve years. More than four hundred closings. One rule: every
              client gets the same white-glove attention — whether they are
              buying a condo in Ballston or selling a legacy home in Great
              Falls.
            </p>
            <p>
              At {p.co}, the work is simple in the way that matters: know the
              market, protect the client, and make every transaction feel
              effortless. That is the entire method.
            </p>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            {["Buyers", "Sellers", "Investors", "Relocations"].map((s) => (
              <span
                key={s}
                className="border border-ink-950/15 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-ink-800"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <div className="relative overflow-hidden">
            <Image
              src={PORTRAIT_IMG}
              alt="A modern home interior in Northern Virginia"
              width={720}
              height={900}
              className="w-full object-cover"
            />
          </div>
          <div className="mt-5 flex items-baseline justify-between border-b border-ink-950 pb-3">
            <p className="font-display text-3xl font-medium text-ink-950">5.0</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-ink-400">
              Average client rating
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews({ p }: { p: Params }) {
  const reviews = REVIEW_TEMPLATES.map((r) => ({
    ...r,
    text: r.text.replaceAll("{agent}", p.name),
  }));
  return (
    <section id="reviews" className="scroll-mt-24 bg-paper py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="mb-14">
          <Eyebrow>Kind Words</Eyebrow>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-medium tracking-tight text-ink-950 sm:text-5xl">
            From clients of {p.name}.
          </h2>
        </div>
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="flex flex-col border-t border-ink-950 pt-6">
              <Stars />
              <blockquote className="mt-4 flex-1 font-display text-lg leading-snug text-ink-950">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-6">
                <span className="block text-sm font-semibold text-ink-950">
                  {r.name}
                </span>
                <span className="mt-0.5 block text-xs uppercase tracking-[0.18em] text-ink-400">
                  {r.area} · Verified client
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Territory({ p }: { p: Params }) {
  return (
    <section
      id="territory"
      className="scroll-mt-24 border-t border-ink-100 bg-paper py-24 sm:py-32"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <Eyebrow>Territory</Eyebrow>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-medium tracking-tight text-ink-950 sm:text-5xl">
            Northern Virginia, inside out.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-600">
            From school districts to Metro commutes, {p.name} knows which
            street turns into the right address. These are the communities
            served best.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((a) => (
            <div
              key={a}
              className="border-b border-ink-100 py-3.5 text-sm font-medium text-ink-800"
            >
              {a}
            </div>
          ))}
        </div>
      </div>
      <div className="relative mx-auto mt-16 aspect-[21/9] w-full max-w-6xl overflow-hidden px-5 sm:px-8">
        <Image
          src={AREA_IMG}
          alt="Washington, D.C. and the DMV region"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}

function Contact({ p }: { p: Params }) {
  return (
    <section id="contact" className="scroll-mt-24 bg-ink-950 py-24 text-paper sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
              Contact {p.name}
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
              One conversation is all it takes.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4">
            <a
              href={`tel:${p.phone}`}
              className="font-display text-2xl font-medium transition-colors hover:text-accent sm:text-3xl"
            >
              {p.phone}
            </a>
            <a
              href={`mailto:${p.email}`}
              className="font-display text-xl font-medium transition-colors hover:text-accent sm:text-2xl"
            >
              {p.email}
            </a>
            <p className="pt-2 text-xs uppercase tracking-[0.2em] text-ink-400">
              {p.name} · {p.co}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ p }: { p: Params }) {
  return (
    <footer className="border-t border-ink-100 bg-paper py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-5 text-sm sm:flex-row sm:items-center sm:px-8">
        <p className="text-ink-600">
          {p.co} · Northern Virginia & the DMV
        </p>
        <p className="text-xs uppercase tracking-[0.2em] text-ink-400">
          Equal Housing Opportunity
        </p>
      </div>
    </footer>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const p = readParams(await searchParams);
  return (
    <main className="flex flex-1 flex-col">
      <Header p={p} />
      <Hero p={p} />
      <Stats />
      <SelectedWork p={p} />
      <About p={p} />
      <Reviews p={p} />
      <Territory p={p} />
      <Contact p={p} />
      <Footer p={p} />
    </main>
  );
}
