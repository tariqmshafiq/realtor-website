import type { Metadata } from "next";
import Image from "next/image";

type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

const DEFAULT_TO = "there";
const DEFAULT_CO = "Mitchell Realty Group";
const DEFAULT_NAME = "Sarah Mitchell";
const DEFAULT_EMAIL = "sarah@mitchellrealtygroup.com";
const DEFAULT_PHONE = "(703) 555-0142";
const DEFAULT_LINE =
  "Your trusted guide to buying and selling in Northern Virginia.";

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
const PORTRAIT_IMG = IMG("1573496359142-b8d87734a5a2", 900);
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
    text: "{agent} made the competitive Arlington market feel approachable. They toured us through 20+ homes, negotiated $35K off asking, and we closed in 28 days. Could not recommend them more highly.",
  },
  {
    name: "James Okafor",
    area: "McLean, VA",
    text: "{agent} sold our home in 6 days for $120K over asking. The staging team and pricing strategy were flawless. Truly a 5-star experience from start to finish.",
  },
  {
    name: "Priya & Rohan S.",
    area: "Reston, VA",
    text: "We relocated from Seattle with a tight timeline. {agent} set up everything virtually, found us the perfect townhome, and handled the entire closing. They felt like family by the end.",
  },
  {
    name: "Carol B.",
    area: "Alexandria, VA",
    text: "Downsizing after 30 years in the same house was emotional, but {agent} was patient, kind, and incredibly organized. They got us a full-price offer in one week.",
  },
  {
    name: "Mike & Lauren T.",
    area: "Vienna, VA",
    text: "As first-time buyers, we had a million questions. {agent} walked us through every step — financing, inspections, the works. We ended up in our dream Craftsman in Vienna.",
  },
  {
    name: "Angela Ruiz",
    area: "Fairfax, VA",
    text: "They helped me buy a condo AND find a tenant for it. {agent} handles the DMV like a pro and answers texts at 9pm. Best agent we have ever worked with.",
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
  "D.C.",
  "Bethesda",
];

const STATS = [
  { value: "12+", label: "Years in the DMV" },
  { value: "420+", label: "Homes sold" },
  { value: "98%", label: "List-to-sale ratio" },
  { value: "$640M+", label: "In career sales" },
];

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const p = readParams(await searchParams);
  const title = `${p.name} · Real Estate for ${p.to} in Northern Virginia`;
  const description = `Looking for a home in the DMV? ${p.name} of ${p.co} helps buyers and sellers across Northern Virginia. Contact ${p.phone} or ${p.email}.`;
  return { title, description };
}

function Stars({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-0.5 text-gold-500 ${className}`}
      aria-label="5 out of 5 stars"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="size-4 fill-current"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function Header({ p }: { p: Params }) {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/70 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-md bg-forest-900 font-display text-lg font-bold text-gold-400">
            {p.co.charAt(0)}
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-bold tracking-tight text-forest-950">
              {p.co}
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-widest text-neutral-500">
              DMV · Northern Virginia
            </span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-neutral-600 sm:flex">
          <a className="transition-colors hover:text-forest-800" href="#homes">
            Featured Homes
          </a>
          <a className="transition-colors hover:text-forest-800" href="#reviews">
            Reviews
          </a>
          <a className="transition-colors hover:text-forest-800" href="#areas">
            Areas Served
          </a>
        </nav>
        <a
          href={`tel:${p.phone}`}
          className="hidden rounded-full bg-forest-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest-800 md:inline-flex"
        >
          {p.phone}
        </a>
        <a
          href={`tel:${p.phone}`}
          className="inline-flex rounded-full bg-forest-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest-800 md:hidden"
        >
          Call Now
        </a>
      </div>
    </header>
  );
}

function Hero({ p }: { p: Params }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMG}
          alt="Luxury home in Northern Virginia"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/60 to-forest-950/30" />
      </div>
      <div className="relative mx-auto flex min-h-[78vh] w-full max-w-6xl flex-col justify-center px-5 py-24 sm:px-8">
        <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-gold-400/50 bg-forest-950/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300">
          <span className="size-1.5 rounded-full bg-gold-400" />
          Serving the DMV · Northern Virginia
        </p>
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Hi {p.to}, let’s find your next home together.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-200 sm:text-xl">
          {p.line}
        </p>
        <p className="mt-4 text-base text-neutral-300">
          I’m <span className="font-semibold text-white">{p.name}</span> of{" "}
          <span className="font-semibold text-white">{p.co}</span> — let’s make
          your move feel effortless.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${p.phone}`}
            className="inline-flex items-center justify-center rounded-full bg-gold-500 px-7 py-3.5 text-base font-semibold text-forest-950 transition-colors hover:bg-gold-400"
          >
            Call {p.name}
          </a>
          <a
            href={`mailto:${p.email}`}
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            Email {p.name}
          </a>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-y border-neutral-200 bg-cream-50">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-8 px-5 py-12 sm:px-8 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-3xl font-bold text-forest-900 sm:text-4xl">
              {s.value}
            </p>
            <p className="mt-1 text-sm font-medium uppercase tracking-wider text-neutral-500">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedHomes({ p }: { p: Params }) {
  return (
    <section id="homes" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
              Featured Listings
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-forest-950 sm:text-4xl">
              Homes for sale, {p.to}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-neutral-500">
            Just a sample of what’s moving right now across McLean, Great Falls
            and Reston. I can set up private tours for any of these today.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {LISTINGS.map((l) => (
            <article
              key={l.title}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={l.img}
                  alt={`${l.title} in ${l.area}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-forest-950/85 px-3 py-1 text-xs font-semibold text-gold-300">
                  {l.price}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-forest-950">
                  {l.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">{l.area}</p>
                <div className="mt-4 flex items-center gap-4 border-t border-neutral-100 pt-4 text-sm text-neutral-600">
                  <span>
                    <strong className="font-semibold text-neutral-900">
                      {l.beds}
                    </strong>{" "}
                    bd
                  </span>
                  <span>
                    <strong className="font-semibold text-neutral-900">
                      {l.baths}
                    </strong>{" "}
                    ba
                  </span>
                  <span>
                    <strong className="font-semibold text-neutral-900">
                      {l.sqft}
                    </strong>{" "}
                    sqft
                  </span>
                </div>
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
    <section
      id="about"
      className="scroll-mt-24 bg-cream-50 py-20 sm:py-24"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[2fr_3fr]">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-3 rounded-3xl bg-gold-500/15" />
          <Image
            src={PORTRAIT_IMG}
            alt={`Portrait of ${p.name}`}
            width={720}
            height={900}
            className="relative w-full rounded-2xl object-cover shadow-lg"
          />
          <div className="absolute -bottom-5 -right-4 rounded-2xl bg-forest-900 px-5 py-4 text-white shadow-lg">
            <p className="font-display text-2xl font-bold text-gold-400">5.0</p>
            <p className="text-xs uppercase tracking-widest text-neutral-300">
              Avg. client rating
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
            About Me
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-forest-950 sm:text-4xl">
            Hi, I’m {p.name}.
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-neutral-600">
            <p>
              For over a decade I’ve helped families, first-time buyers, and
              investors navigate the fast-moving Northern Virginia market —
              from the estates of Great Falls to the condos of Arlington and
              everything in between.
            </p>
            <p>
              My philosophy is simple: every client deserves white-glove
              service, honest advice, and a strategy built around their goals.
              Whether you’re buying your first home or selling a legacy
              property, I’ll be by your side at every showing, offer, and
              signature.
            </p>
          </div>
          <div className="mt-7 grid grid-cols-3 gap-4">
            {[
              ["98%", "List-to-sale"],
              ["6 days", "Avg. sell time"],
              ["50+", "5-star reviews"],
            ].map(([v, l]) => (
              <div
                key={l}
                className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-center"
              >
                <p className="font-display text-lg font-bold text-forest-900">
                  {v}
                </p>
                <p className="text-xs text-neutral-500">{l}</p>
              </div>
            ))}
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
    <section
      id="reviews"
      className="scroll-mt-24 bg-forest-950 py-20 text-white sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            Client Love
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Rated 5 stars across the DMV
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-neutral-300">
            Real feedback from real clients {p.to} — from McLean to Alexandria.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <Stars />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-neutral-200">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                <span className="flex size-10 items-center justify-center rounded-full bg-gold-500/20 font-display text-sm font-bold text-gold-300">
                  {r.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">
                    {r.name}
                  </span>
                  <span className="block text-xs text-neutral-400">
                    {r.area} · Verified Client
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Areas({ p }: { p: Params }) {
  return (
    <section id="areas" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
            Where I Work
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-forest-950 sm:text-4xl">
            Northern Virginia & the DMV, {p.to}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-600">
            From award-winning school districts to 10-minute Metro commutes,
            I’ll help you find the neighborhood that fits your life. These are
            the communities I know best — let’s explore them together.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {AREAS.map((a) => (
              <span
                key={a}
                className="rounded-full border border-forest-900/15 bg-cream-50 px-4 py-1.5 text-sm font-medium text-forest-900 transition-colors hover:bg-forest-900 hover:text-white"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={AREA_IMG}
            alt="Washington, D.C. skyline in the DMV area"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Contact({ p }: { p: Params }) {
  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-cream-50 py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-forest-900 px-6 py-14 text-center text-white shadow-xl sm:px-14">
          <div className="absolute -left-16 -top-16 size-56 rounded-full bg-gold-500/10" />
          <div className="absolute -bottom-20 -right-10 size-64 rounded-full bg-gold-500/10" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              Ready When You Are
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Let’s find your place in the DMV, {p.to}.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-neutral-300">
              Text, call, or email anytime — I typically reply within the hour.
              No pressure, no spam, just honest advice about Northern Virginia
              real estate.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`tel:${p.phone}`}
                className="inline-flex w-full items-center justify-center rounded-full bg-gold-500 px-7 py-3.5 text-base font-semibold text-forest-950 transition-colors hover:bg-gold-400 sm:w-auto"
              >
                {p.phone}
              </a>
              <a
                href={`mailto:${p.email}`}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                {p.email}
              </a>
            </div>
            <div className="mx-auto mt-9 grid max-w-lg grid-cols-2 gap-4 border-t border-white/10 pt-8 text-left sm:grid-cols-3">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-neutral-400">
                  Your Agent
                </p>
                <p className="mt-1 text-sm font-semibold">{p.name}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-neutral-400">
                  Brokerage
                </p>
                <p className="mt-1 text-sm font-semibold">{p.co}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-neutral-400">
                  Serving
                </p>
                <p className="mt-1 text-sm font-semibold">Northern VA · DMV</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ p }: { p: Params }) {
  return (
    <footer className="bg-forest-950 py-10 text-neutral-400">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-5 text-center sm:flex-row sm:px-8 sm:text-left">
        <div>
          <p className="font-display text-lg font-bold text-white">{p.co}</p>
          <p className="mt-1 text-xs">
            This page was made just for{" "}
            <span className="font-semibold text-gold-400">{p.to}</span>.
          </p>
        </div>
        <p className="text-xs leading-relaxed sm:max-w-xs">
          {p.name} · Licensed in Virginia · Serving the DMV & Northern Virginia.
          Equal Housing Opportunity.
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
      <FeaturedHomes p={p} />
      <About p={p} />
      <Reviews p={p} />
      <Areas p={p} />
      <Contact p={p} />
      <Footer p={p} />
    </main>
  );
}
