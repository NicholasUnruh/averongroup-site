import { useEffect, useState } from "react";

// Web3Forms access key for the team inbox. It is public by design: it can only send to that inbox.
const FORM_KEY = "";

const SERVICES = [
  ["01", "Sourcing", "We build direct relationships with manufacturers to bring proven products to the Canadian market."],
  ["02", "Distribution", "We manage importing, customs and logistics, so every product arrives ready for Canadian customers."],
  ["03", "Sales", "We bring products to market on Amazon.ca and other online channels, reaching shoppers nationwide."],
];

function Logo() {
  return (
    <a className="brand" href="#top" aria-label="Averon Group home">
      averon<i>.</i>
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
        </nav>
        <a className="btn btn-glass btn-small" href="#contact">Get in touch</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-copy">
        <h1>Sourcing, distribution and sales for Canadian consumers.</h1>
        <a className="btn btn-light" href="#contact">Get in touch</a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section section-about" id="about">
      <div className="container">
        <div className="section-head reveal">
          <h2>What we do</h2>
          <p>From the manufacturer to the Canadian customer, we manage every step.</p>
        </div>
        <ul className="cards">
          {SERVICES.map(([num, title, text]) => (
            <li className="card reveal" key={title}>
              <span className="card-num">{num}</span>
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
        <button className="btn btn-glass" type="submit" disabled={status === "sending"}>
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
          <p>Have a product, a question or a partnership in mind? Send us a message and we'll get back to you.</p>
        </div>
        <div className="panel reveal">
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
        <div className="backdrop">
          <img
            className="backdrop-img"
            src="./hero-2560.webp"
            srcSet="./hero-1280.webp 1280w, ./hero-2560.webp 2560w, ./hero-3840.webp 3840w"
            sizes="(max-width: 860px) 330vw, 150vw"
            alt=""
            fetchPriority="high"
          />
          <div className="backdrop-shade" aria-hidden="true" />
          <Hero />
          <About />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
