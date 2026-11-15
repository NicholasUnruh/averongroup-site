import { useEffect, useState } from "react";

// Web3Forms access key for the team inbox. It is public by design: it can only send to that inbox.
const FORM_KEY = "";

const SERVICES = [
  ["Research", "We study demand, pricing and competition before choosing a product."],
  ["Sourcing", "We work directly with manufacturers and inspect samples before ordering."],
  ["Retail", "We sell and ship to customers across Canada through Amazon.ca."],
];

function Logo() {
  return (
    <a className="brand" href="#top" aria-label="Averon Group home">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <path d="M10 22.5 16 9l6 13.5M12.4 17.4h7.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>AVERON</span>
    </a>
  );
}

// Fades sections in as they scroll into view; with reduced motion everything shows at once.
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
      { threshold: 0.15 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${solid ? " nav-solid" : ""}`}>
      <div className="container nav-inner">
        <Logo />
        <nav className="nav-links" aria-label="Main">
          <a href="#about">What we do</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="btn btn-accent btn-small" href="#contact">Get in touch</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <img
        className="hero-img"
        src="./hero-2560.webp"
        srcSet="./hero-1280.webp 1280w, ./hero-2560.webp 2560w"
        sizes="100vw"
        alt=""
        fetchPriority="high"
      />
      <div className="hero-shade" aria-hidden="true" />
      <div className="container hero-copy">
        <h1>Quality products, sourced for Canada.</h1>
        <p>A Calgary company bringing well-made products to Canadian customers.</p>
        <a className="btn btn-light" href="#contact">Get in touch</a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <div className="container about">
        <h2 className="reveal">What we do</h2>
        <ul className="rows">
          {SERVICES.map(([title, text]) => (
            <li className="row reveal" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("idle");

  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          access_key: FORM_KEY,
          subject: `Website enquiry from ${data.name}`,
          from_name: "averongroup.ca",
        }),
        signal: AbortSignal.timeout(15000),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-done" role="status">
        <h3>Thanks, we've got your message.</h3>
        <p>We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="form-grid">
        <label>
          <span>Name</span>
          <input name="name" autoComplete="name" required maxLength={100} />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={150} />
        </label>
        <label className="full">
          <span>Company <em>optional</em></span>
          <input name="company" autoComplete="organization" maxLength={150} />
        </label>
        <label className="full">
          <span>Message</span>
          <textarea name="message" rows={5} required maxLength={3000} />
        </label>
      </div>
      <input className="hp" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-foot">
        <button className="btn btn-accent" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "error" && <p className="form-error" role="alert">Something went wrong. Please try again in a moment.</p>}
      </div>
    </form>
  );
}

function Contact() {
  return (
    <section className="section section-contact" id="contact">
      <div className="container contact">
        <div className="contact-head reveal">
          <h2>Get in touch</h2>
          <p>Manufacturers, buyers and partners: tell us what you have in mind.</p>
        </div>
        <div className="reveal">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Logo />
        <span>© {new Date().getFullYear()} Averon Group · Calgary, Alberta</span>
      </div>
    </footer>
  );
}

export default function App() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
