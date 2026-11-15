import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CircleCheck,
  Factory,
  Handshake,
  Languages,
  Layers,
  Mail,
  MapPin,
  Menu,
  Radar,
  ShieldCheck,
  ShoppingBag,
  X,
} from "lucide-react";

const EMAIL = "team@averongroup.ca";

const NAV = [
  ["Services", "#services"],
  ["Process", "#process"],
  ["Partners", "#partners"],
  ["Contact", "#contact"],
];

const SERVICES = [
  {
    icon: Radar,
    title: "Market research",
    text: "We screen thousands of product types against Canadian demand, pricing and competition before committing to a single order.",
  },
  {
    icon: Factory,
    title: "Manufacturer partnerships",
    text: "We work directly with factories on specifications, samples, quality inspection and packaging built for Canada.",
  },
  {
    icon: ShoppingBag,
    title: "Online retail",
    text: "We list, sell and fulfil through Amazon.ca and other online channels, and look after every customer.",
  },
];

const STEPS = [
  ["01", "Research", "Data on demand, price and competition decides what we pursue."],
  ["02", "Sample", "Samples from several suppliers, checked by hand before any order."],
  ["03", "Import", "Freight, customs and bilingual labelling handled end to end."],
  ["04", "Sell & scale", "Launch with a trial order, measure, then reorder with partners who deliver."],
];

const PRINCIPLES = [
  [Layers, "Data before inventory", "No order without evidence of real demand."],
  [ShieldCheck, "Quality you can verify", "Clear specifications and inspected samples."],
  [Languages, "Canada-ready", "Bilingual labelling and Canadian compliance from day one."],
  [Handshake, "Long-term partners", "Straightforward terms and steady communication."],
];

const CAPABILITIES = [
  "Market research",
  "Supplier vetting",
  "Sample inspection",
  "Bilingual labelling",
  "Freight & customs",
  "Amazon.ca fulfilment",
  "Quality control",
  "Product launches",
];

function Logo() {
  return (
    <svg className="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5b8cff" />
          <stop offset="1" stopColor="#9b6bff" />
        </linearGradient>
      </defs>
      <rect x=".75" y=".75" width="30.5" height="30.5" rx="8" fill="#0b1020" stroke="url(#logo-g)" strokeWidth="1.5" />
      <path d="M9.5 23 16 8.5 22.5 23M12.6 17.8h6.8" stroke="url(#logo-g)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Fades sections in as they scroll into view; everything is visible without JS or with reduced motion.
function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((el) => el.classList.add("in"));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Moves the card's glow to follow the pointer.
function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled || open ? "nav-solid" : ""}`}>
      <div className="container nav-inner">
        <a className="brand" href="#top" aria-label="Averon Group home" onClick={() => setOpen(false)}>
          <Logo />
          <span>AVERON</span>
          <span className="brand-sub">GROUP</span>
        </a>
        <nav className="nav-links" aria-label="Main">
          {NAV.slice(0, 3).map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className="btn btn-small nav-cta" href="#contact">
          Contact <ArrowRight size={15} />
        </a>
        <button className="nav-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav className="mobile-menu" aria-label="Mobile">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label} <ArrowUpRight size={18} />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function HeroPanel() {
  return (
    <div className="hero-panel reveal" aria-hidden="true">
      <div className="panel-head">
        <span className="dot" /><span className="dot" /><span className="dot" />
        <span className="panel-title">Product screen</span>
        <span className="chip">Go / no-go</span>
      </div>
      <div className="panel-body">
        <svg className="spark" viewBox="0 0 400 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="spark-line" x1="0" x2="1">
              <stop offset="0" stopColor="#5b8cff" />
              <stop offset="1" stopColor="#a77bff" />
            </linearGradient>
            <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#6d7dff" stopOpacity=".35" />
              <stop offset="1" stopColor="#6d7dff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 96 C40 90 60 70 100 74 S160 92 200 60 S270 40 300 46 S360 20 400 14 L400 120 L0 120Z" fill="url(#spark-fill)" />
          <path className="spark-path" d="M0 96 C40 90 60 70 100 74 S160 92 200 60 S270 40 300 46 S360 20 400 14" fill="none" stroke="url(#spark-line)" strokeWidth="2.5" />
        </svg>
        {[
          ["Demand", "88%"],
          ["Competition", "34%"],
          ["Landed cost", "22%"],
        ].map(([label, width]) => (
          <div className="meter" key={label}>
            <span>{label}</span>
            <div className="meter-track"><div className="meter-fill" style={{ width }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="aurora" aria-hidden="true">
        <span className="blob b1" /><span className="blob b2" /><span className="blob b3" />
      </div>
      <div className="grid-bg" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <div className="pill reveal"><span className="pill-dot" />Product sourcing &amp; distribution · Calgary, Canada</div>
          <h1 className="reveal">Sourcing, <span className="grad">built on data.</span></h1>
          <p className="hero-sub reveal">
            Averon Group finds products Canadians want, partners with manufacturers who build them well, and moves them from the factory floor to the customer's door.
          </p>
          <div className="hero-ctas reveal">
            <a className="btn btn-primary" href={`mailto:${EMAIL}`}>Start a conversation <ArrowRight size={17} /></a>
            <a className="btn btn-ghost" href="#process">How we work</a>
          </div>
        </div>
        <HeroPanel />
      </div>
    </section>
  );
}

function Marquee() {
  const row = [...CAPABILITIES, ...CAPABILITIES];
  return (
    <div className="marquee" aria-label="Capabilities">
      <div className="marquee-track">
        {row.map((c, i) => (
          <span key={i} aria-hidden={i >= CAPABILITIES.length}>
            <i className="tick" />{c}
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, lead }) {
  return (
    <div className="section-head reveal">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHead
          eyebrow="What we do"
          title="End to end, from research to retail."
          lead="One team owns a product from the first data point to the customer's doorstep, so nothing gets lost between steps."
        />
        <div className="cards">
          {SERVICES.map(({ icon: Icon, title, text }) => (
            <article className="card glass reveal" key={title} onMouseMove={spotlight}>
              <div className="icon-wrap"><Icon size={22} strokeWidth={1.75} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section section-alt" id="process">
      <div className="container">
        <SectionHead eyebrow="How we work" title="Small, deliberate steps. Then scale." />
        <ol className="steps">
          {STEPS.map(([num, title, text]) => (
            <li className="step reveal" key={num}>
              <span className="step-num">{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <div className="principles">
          {PRINCIPLES.map(([Icon, title, text]) => (
            <div className="principle reveal" key={title}>
              <Icon size={20} strokeWidth={1.75} />
              <div>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerPanel({ icon: Icon, title, text, items, email }) {
  return (
    <article className="partner glass reveal" onMouseMove={spotlight}>
      <div className="icon-wrap"><Icon size={22} strokeWidth={1.75} /></div>
      <h3>{title}</h3>
      <p>{text}</p>
      <ul>
        {items.map((item) => (
          <li key={item}><CircleCheck size={17} strokeWidth={1.75} />{item}</li>
        ))}
      </ul>
      <a className="text-link" href={`mailto:${email}`}>{email} <ArrowUpRight size={16} /></a>
    </article>
  );
}

function Partners() {
  return (
    <section className="section" id="partners">
      <div className="container">
        <SectionHead
          eyebrow="Work with us"
          title="Two ways to partner."
          lead="Whether you make products or need them, you deal directly with the partners who make the decisions."
        />
        <div className="partners">
          <PartnerPanel
            icon={Factory}
            title="Manufacturers & suppliers"
            text="We're building long-term relationships with reliable factories. We start with samples and a trial order, then grow volume with partners who deliver consistent quality."
            items={["Product catalogue and specifications", "Pricing and minimum order quantities", "Lead times, packaging and labelling options"]}
            email="suppliers@averongroup.ca"
          />
          <PartnerPanel
            icon={ShoppingBag}
            title="Businesses & buyers"
            text="Need a product sourced for your business? Tell us what you need and we'll come back with options, pricing and timelines."
            items={["Product description or reference", "Quantity and target price", "Delivery date and location"]}
            email="orders@averongroup.ca"
          />
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="cta glass reveal">
          <div className="cta-glow" aria-hidden="true" />
          <div className="eyebrow">Contact</div>
          <h2>Let's build something together.</h2>
          <p className="lead">Tell us about your product, your factory or your sourcing need.</p>
          <div className="cta-row">
            <a className="contact-item" href={`mailto:${EMAIL}`}><Mail size={18} />{EMAIL}</a>
            <span className="contact-item"><MapPin size={18} />Calgary, Alberta, Canada</span>
          </div>
          <a className="btn btn-primary" href={`mailto:${EMAIL}`}>Email us <ArrowRight size={17} /></a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a className="brand" href="#top" aria-label="Averon Group home"><Logo /><span>AVERON</span><span className="brand-sub">GROUP</span></a>
          <p>Product sourcing and distribution.<br />Calgary, Alberta, Canada.</p>
        </div>
        <div className="footer-cols">
          <div>
            <h5>Company</h5>
            {NAV.slice(0, 3).map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </div>
          <div>
            <h5>Contact</h5>
            {[EMAIL, "suppliers@averongroup.ca", "orders@averongroup.ca"].map((m) => <a key={m} href={`mailto:${m}`}>{m}</a>)}
          </div>
        </div>
      </div>
      <div className="container footer-base">
        <span>© {new Date().getFullYear()} Averon Group</span>
        <span>averongroup.ca</span>
      </div>
    </footer>
  );
}

export default function App() {
  useReveal();
  return (
    <>
      <div className="noise" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Process />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
