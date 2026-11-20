const { useState, useEffect, Fragment } = React;
const html = htm.bind(React.createElement);
const C = window.CONTENT;
const D = window.DATA;

const PHOTOS = {
  dna: "1628595351029-c2bf17511435",
  pipette: "1532187863486-abf9dbad1b69",
  leaves: "1518531933037-91b2f5f229cc",
  team: "1581093450021-4a7360e9a6b5",
  microscope: "1582719471384-894fbb16e074",
  gloves: "1614935151651-0bea6508db6b",
  fluo: "1576086213369-97a306d36557",
  corridor: "1579154204601-01588f351e67",
  seedlings: "1466692476868-aef1dfb1e735"
};
const img = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=72`;

const LOGO_WHITE = "assets/img/logo-lagemf-branca-texto.png";
const LOGO_COLOR = "assets/img/logo-lagemf-colorida-texto.png";
const LOGO_SYMBOL_WHITE = "assets/img/logo-lagemf-branca.png";

const ROUTES = ["home", "about", "people", "publications", "resources", "contact"];
const href = (r) => (r === "home" ? "#/" : `#/${r}`);

const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};

const tr = (v, lang) => (v && typeof v === "object" ? v[lang] : v);

function currentRoute() {
  const r = location.hash.replace(/^#\/?/, "").split(/[?#]/)[0];
  return ROUTES.includes(r) ? r : "home";
}

function useRoute() {
  const [route, setRoute] = useState(currentRoute);
  useEffect(() => {
    const on = () => { setRoute(currentRoute()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

/* ---------- Building blocks ---------- */

function Block({ as = "div", className = "", children }) {
  return html`<${as} className=${className}>${children}<//>`;
}

function Card({ className = "", children }) {
  return html`<div className=${`card-lift glass ${className}`}>${children}</div>`;
}

function SectionHeading({ eyebrow, title, center, light }) {
  return html`<div className=${`section-heading ${center ? "text-center mx-auto" : ""} ${light ? "is-light" : ""}`}>
    ${eyebrow && html`<span className="eyebrow">${eyebrow}</span>`}
    <h2 className="section-title">${title}</h2>
  </div>`;
}

const WAVE_FRONT = "M0,130 C240,10 480,10 720,130 S1200,250 1440,130 L1440,240 L0,240 Z";
const WAVE_BACK = "M0,150 C260,40 520,40 770,140 S1220,240 1440,100 L1440,240 L0,240 Z";
const WAVE_MID = "M0,110 C220,40 470,30 700,120 S1180,230 1440,150 L1440,240 L0,240 Z";

function Wave() {
  return html`<div className="wave" aria-hidden="true">
    <svg viewBox="0 0 1440 240" preserveAspectRatio="none">
      <path className="wave-back" d=${WAVE_BACK} />
      <path className="wave-mid" d=${WAVE_MID} />
      <path className="wave-front" d=${WAVE_FRONT} />
    </svg>
  </div>`;
}

function Hero({ image, title, subtitle, children, size = "sm", wordmark }) {
  return html`<header className=${`hero hero-${size}`}>
    <div className="hero-bg" style=${{ backgroundImage: `url(${img(image, 1920)})` }}></div>
    <div className="hero-overlay"></div>
    <div className="hero-logo" aria-hidden="true"><img src=${LOGO_SYMBOL_WHITE} alt="" /></div>
    <div className="container hero-content text-center">
      ${wordmark
        ? html`<h1 className="m-0">
            <img className="hero-wordmark" src=${LOGO_WHITE} alt=${`LAGEMF, ${title}`} width="1400" height="499" />
          </h1>`
        : html`<h1 className="hero-title">${title}</h1>`}
      ${subtitle && html`<p className="hero-subtitle">${subtitle}</p>`}
      ${children && html`<div className="hero-actions">${children}</div>`}
    </div>
    <${Wave} />
  </header>`;
}

/* ---------- Shared content blocks ---------- */

function Authors({ list }) {
  return html`<p className="pub-authors">${list.map((a, i) => html`<${Fragment} key=${i}>
    ${D.labMembers.includes(a) ? html`<strong>${a}</strong>` : a}${i < list.length - 1 ? ", " : ""}
  <//>`)}</p>`;
}

function PubItem({ p, lang }) {
  return html`<${Block}>
    <article className="pub glass">
      <div className="pub-top">
        <span className="tag">${tr(p.type, lang)}</span>
        <span className="pub-year">${p.year}</span>
      </div>
      <h3 className="pub-title">${p.title}</h3>
      <${Authors} list=${p.authors} />
      <p className="pub-journal">${p.venue}</p>
      ${p.doi && html`<a className="pub-doi" href=${`https://doi.org/${p.doi}`} target="_blank" rel="noopener">
        doi.org/${p.doi} <i className="bi bi-box-arrow-up-right"></i>
      </a>`}
    </article>
  <//>`;
}

function Partners({ t, lang }) {
  return html`<section className="section pt-0">
    <div className="container">
      <${Block}><${SectionHeading} center eyebrow=${t.home.partnersEyebrow} title=${t.home.partnersTitle} /><//>
      <div className="row g-4 justify-content-center mt-1">
        ${D.partners.map((pt, i) => {
          const body = html`
            <div className="partner-logo">
              ${pt.logo
                ? html`<img src=${pt.logo} alt=${pt.name} loading="lazy" />`
                : html`<span className="partner-placeholder">${pt.name}<small>logo</small></span>`}
            </div>
            <p className="partner-name">${tr(pt.full, lang)}</p>`;
          return html`<div className="col-sm-6 col-lg-4" key=${i}>
            <${Block} className="h-100">
              ${pt.url
                ? html`<a className="partner glass h-100" href=${pt.url} target="_blank" rel="noopener">${body}</a>`
                : html`<div className="partner glass h-100">${body}</div>`}
            <//>
          </div>`;
        })}
      </div>
    </div>
  </section>`;
}

/* ---------- Layout ---------- */

function LangSwitch({ lang, setLang }) {
  return html`<div className=${`lang-switch is-${lang}`} role="group" aria-label="Idioma / Language">
    <span className="lang-thumb"></span>
    <button type="button" className=${lang === "pt" ? "active" : ""} aria-pressed=${lang === "pt"} onClick=${() => setLang("pt")}>PT</button>
    <button type="button" className=${lang === "en" ? "active" : ""} aria-pressed=${lang === "en"} onClick=${() => setLang("en")}>EN</button>
  </div>`;
}

function Navbar({ t, lang, setLang, route }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [route]);
  const solid = scrolled || open;

  return html`<nav className=${`navbar navbar-expand-lg fixed-top site-nav ${solid ? "is-solid" : ""}`}>
    <div className="container">
      <a className="navbar-brand" href="#/" aria-label="LAGEMF">
        <img className="brand-img logo-light" src=${LOGO_WHITE} alt="" width="1400" height="499" />
        <img className="brand-img logo-color" src=${LOGO_COLOR} alt="" width="1400" height="510" />
      </a>
      <button className="navbar-toggler" type="button" aria-label="Menu" aria-expanded=${open} onClick=${() => setOpen((o) => !o)}>
        <span className=${`burger ${open ? "is-open" : ""}`}><span></span><span></span><span></span></span>
      </button>
      <div className=${`collapse navbar-collapse ${open ? "show" : ""}`}>
        <ul className="navbar-nav ms-auto align-items-lg-center">
          ${ROUTES.map((r) => html`<li className="nav-item" key=${r}>
            <a className=${`nav-link ${route === r ? "active" : ""}`} aria-current=${route === r ? "page" : undefined} href=${href(r)}>${t.nav[r]}</a>
          </li>`)}
          <li className="nav-item ms-lg-2">
            <a className="nav-link nav-icon" href=${D.instagram} target="_blank" rel="noopener" aria-label="Instagram" title="Instagram"><i className="bi bi-instagram"></i></a>
          </li>
          <li className="nav-item ms-lg-2 mt-2 mt-lg-0"><${LangSwitch} lang=${lang} setLang=${setLang} /></li>
        </ul>
      </div>
    </div>
  </nav>`;
}

function Footer({ t }) {
  const year = new Date().getFullYear();
  return html`<footer className="site-footer">
    <div className="footer-wave" aria-hidden="true">
      <svg viewBox="0 0 1440 240" preserveAspectRatio="none"><path d=${WAVE_FRONT} /></svg>
    </div>
    <div className="footer-body">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <a href="#/" className="footer-brand" aria-label="LAGEMF">
              <img src=${LOGO_WHITE} alt="" width="1400" height="499" />
            </a>
            <p className="footer-muted mt-3">${t.common.uft}, ${t.common.campus}</p>
          </div>
          <div className="col-6 col-lg-3">
            <h3 className="footer-title">${t.footer.nav}</h3>
            <ul className="footer-links">
              ${ROUTES.map((r) => html`<li key=${r}><a href=${href(r)}>${t.nav[r]}</a></li>`)}
            </ul>
          </div>
          <div className="col-6 col-lg-4">
            <h3 className="footer-title">${t.footer.contact}</h3>
            <p className="footer-pre">${t.contact.addressText}</p>
            <ul className="footer-links">
              <li><a href=${`mailto:${D.email}`} className="footer-mail"><i className="bi bi-envelope"></i> ${D.email}</a></li>
              <li><a href=${D.instagram} target="_blank" rel="noopener"><i className="bi bi-instagram"></i> ${D.instagramHandle}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© ${year} LAGEMF, ${t.common.uft}.</span>
          <span>${t.footer.photos}</span>
        </div>
      </div>
    </div>
  </footer>`;
}

/* ---------- Pages ---------- */

function Home({ t, lang }) {
  const h = t.home;
  return html`<${Fragment}>
    <${Hero} size="lg" wordmark image=${PHOTOS.dna} title=${t.common.fullName} subtitle=${h.heroText}>
      <a className="btn btn-main btn-lg" href="#/about">${h.ctaPrimary} <i className="bi bi-arrow-right"></i></a>
      <a className="btn btn-glass btn-lg" href="#/publications">${h.ctaSecondary}</a>
    <//>

    <section className="section">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <${Block}>
              <div className="collage">
                <div className="collage-main">
                  <img src=${img(PHOTOS.pipette, 1000)} alt="" />
                </div>
                <div className="collage-sub">
                  <img src=${img(PHOTOS.seedlings, 600)} alt="" />
                </div>
              </div>
            <//>
          </div>
          <div className="col-lg-6">
            <${Block}><${SectionHeading} eyebrow=${h.introEyebrow} title=${h.introTitle} /><//>
            <${Block}><p className="lead-text">${h.introText}</p><//>
            <${Block}>
              <a className="link-arrow mt-2" href="#/about">${t.common.learnMore} <i className="bi bi-arrow-right"></i></a>
            <//>
          </div>
        </div>
      </div>
    </section>

    <section className="section pt-0">
      <div className="container">
        <${Block}><${SectionHeading} center eyebrow=${h.areasEyebrow} title=${h.areasTitle} /><//>
        <div className="row g-4 mt-1">
          ${h.areas.map((a, i) => html`<div className="col-sm-6 col-lg-3" key=${i}>
            <${Block} className="h-100">
              <${Card} className="area-card h-100">
                <div className="area-media">
                  <div className="area-img"><img src=${img(a.photo, 700)} alt="" /></div>
                  <span className="area-icon"><span className="material-symbols-rounded" aria-hidden="true">${a.icon}</span></span>
                </div>
                <div className="area-body">
                  <h3 className="area-title">${a.title}</h3>
                  <p className="mb-0">${a.text}</p>
                </div>
              <//>
            <//>
          </div>`)}
        </div>
      </div>
    </section>

    <${Partners} t=${t} lang=${lang} />
  <//>`;
}

function About({ t }) {
  const a = t.about;
  return html`<${Fragment}>
    <${Hero} image=${PHOTOS.team} title=${a.title} subtitle=${a.subtitle} />
    <section className="section">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-7">
            <${Block}><${SectionHeading} eyebrow=${a.storyEyebrow} title=${a.storyTitle} /><//>
            ${[a.p1, a.p2, a.p3].map((p, i) => html`<${Block} key=${i}><p className=${i === 0 ? "lead-text" : "body-text"}>${p}</p><//>`)}
          </div>
          <div className="col-lg-5">
            <div className="sticky-media">
              <${Block}>
                <div className="collage collage-about">
                  <div className="collage-main">
                    <img src=${img(PHOTOS.microscope, 900)} alt="" />
                  </div>
                  <div className="collage-sub">
                    <img src=${img(PHOTOS.leaves, 600)} alt="" />
                  </div>
                </div>
              <//>
            </div>
          </div>
        </div>
      </div>
    </section>
  <//>`;
}

function initials(name) {
  const clean = (name || "").replace(/^((Prof|Profa|Dr|Dra)\.?\s+)+/i, "").trim();
  if (!clean || clean.startsWith("[")) return "";
  const parts = clean.split(/\s+/);
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

// Lattes: Academicons (SIL OFL 1.1). ORCID: Simple Icons (CC0).
const BRAND_ICONS = {
  lattes: { viewBox: "0 0 448 512", d: "M 97.871854,434.73261 C 51.534463,339.78442 23.965602,282.44369 23.965602,281.02029 c 0,-2.32214 2.831558,-1.99974 30.672084,3.45957 48.965204,9.61389 75.126384,12.32631 118.735104,12.34258 57.69707,0.0159 104.6807,-9.1222 141.18473,-27.4842 19.31194,-9.71476 30.92555,-18.32755 40.43708,-29.99337 11.716,-14.37824 15.47977,-24.28004 15.61512,-40.94646 0.11867,-15.85237 -2.01801,-24.21167 -11.19035,-43.60874 -3.62892,-7.66433 -6.8168,-16.46265 -7.12098,-19.54964 -0.47493,-4.96814 -0.0684,-5.68084 3.59445,-6.10361 8.00292,-0.94846 47.50732,37.40224 62.05491,60.24069 25.07592,39.38574 27.11161,81.99337 5.88408,123.1953 -13.03903,25.31314 -27.44972,42.82712 -51.57723,62.73362 -40.09844,33.06211 -86.70754,56.08608 -151.06833,74.63514 C 186.61557,459.91141 130.71496,472 119.20225,472 c -2.44075,0 -7.02006,-8.00296 -21.295953,-37.28315 l -0.03402,0.0151 z M 110.77601,281.61191 C 65.760136,275.77998 27.985273,270.70947 26.81537,270.33687 24.815625,269.6926 17.660677,245.82107 13.624773,226.39004 12.607902,221.4726 11.11559,208.45131 10.30202,197.43174 6.6716589,148.26132 17.370799,114.26648 46.041165,83.697237 94.583571,31.98518 198.51713,25.694031 315.77765,67.369458 c 20.58274,7.324215 28.75504,12.410983 24.975,15.580668 -2.79708,2.339846 -21.75315,2.305883 -54.50916,-0.102387 -51.20464,-3.763759 -90.18335,3.357226 -110.27491,20.176211 -30.58742,25.60158 -25.92345,81.72365 13.53071,162.68196 4.27316,8.76586 8.57881,17.34466 9.56318,19.09094 2.28966,4.01773 0.62803,7.74899 -3.3572,7.56196 -1.69755,-0.0813 -39.91486,-4.91203 -84.92926,-10.74592 z m 151.01614,-44.04726 c -35.92814,-6.45997 -68.22691,-28.7388 -78.65437,-54.22127 -5.00209,-12.24165 -4.76437,-28.2131 0.57585,-37.77483 4.83279,-8.64723 17.3107,-18.64993 28.48481,-22.83843 18.59924,-6.96791 51.17019,-4.18853 74.90688,6.40975 22.53229,10.05487 42.50672,27.73816 49.93183,44.18457 9.52925,21.10841 1.59321,44.65955 -18.82072,55.90059 -13.5307,7.44285 -39.82676,11.32572 -56.44249,8.34109 h 0.0181 z" },
  orcid: { viewBox: "0 0 24 24", d: "M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" }
};

function BrandIcon({ name }) {
  const ic = BRAND_ICONS[name];
  return html`<svg className="brand-icon" viewBox=${ic.viewBox} aria-hidden="true" focusable="false"><path d=${ic.d} /></svg>`;
}

function PersonLinks({ p }) {
  if (!p.lattes && !p.orcid && !p.email) return null;
  return html`<div className="person-links">
    ${p.lattes && html`<a className="link-lattes" href=${p.lattes} target="_blank" rel="noopener" aria-label="Currículo Lattes" title="Lattes"><${BrandIcon} name="lattes" /></a>`}
    ${p.orcid && html`<a className="link-orcid" href=${p.orcid} target="_blank" rel="noopener" aria-label="ORCID" title="ORCID"><${BrandIcon} name="orcid" /></a>`}
    ${p.email && html`<a href=${`mailto:${p.email}`} aria-label="E-mail" title="E-mail"><i className="bi bi-envelope"></i></a>`}
  </div>`;
}

function Avatar({ p, size }) {
  const ini = initials(p.name);
  return html`<div className=${`avatar ${size === "lg" ? "avatar-lg" : ""}`}>
    ${p.photo ? html`<img src=${p.photo} alt=${p.name} loading="lazy" />`
      : ini ? html`<span className="avatar-initials">${ini}</span>`
      : html`<i className="bi bi-person"></i>`}
  </div>`;
}

function PersonCard({ p, lang }) {
  return html`<${Card} className="person h-100">
    <${Avatar} p=${p} />
    <h3 className="person-name">${p.name}</h3>
    <p className="person-role">${tr(p.role, lang)}</p>
    ${p.details && html`<p className="person-details">${tr(p.details, lang)}</p>`}
    <${PersonLinks} p=${p} />
  <//>`;
}

function LeadCard({ p, lang }) {
  return html`<div className="lead-card glass">
    <${Avatar} p=${p} size="lg" />
    <div>
      <span className="tag">${tr(p.role, lang)}</span>
      <h3 className="lead-name">${p.name}</h3>
      ${p.bio && html`<p className="mb-0">${tr(p.bio, lang)}</p>`}
      <${PersonLinks} p=${p} />
    </div>
  </div>`;
}

function People({ t, lang }) {
  const pp = t.people;
  return html`<${Fragment}>
    <${Hero} image=${PHOTOS.seedlings} title=${pp.title} subtitle=${pp.subtitle} />
    <section className="section">
      <div className="container">
        ${Object.keys(pp.groups).map((g) => D.people[g] && D.people[g].length ? html`<div className="people-group" key=${g}>
          <${Block}><h2 className="group-title">${pp.groups[g]}</h2><//>
          ${g === "coordination"
            ? D.people[g].map((p, i) => html`<${Block} key=${i}><${LeadCard} p=${p} lang=${lang} /><//>`)
            : html`<div className="row g-4">
                ${D.people[g].map((p, i) => html`<div className="col-sm-6 col-lg-4 col-xl-3" key=${i}>
                  <${Block} className="h-100"><${PersonCard} p=${p} lang=${lang} /><//>
                </div>`)}
              </div>`}
        </div>` : null)}

        <${Block}>
          <div className="cta-strip">
            <div>
              <h2>${pp.joinTitle}</h2>
              <p className="mb-0">${pp.joinText}</p>
            </div>
            <a className="btn btn-light-pill" href="#/contact">${pp.joinCta} <i className="bi bi-arrow-right"></i></a>
          </div>
        <//>
      </div>
    </section>
  <//>`;
}

function Publications({ t, lang }) {
  const pb = t.publications;
  return html`<${Fragment}>
    <${Hero} image=${PHOTOS.gloves} title=${pb.title} subtitle=${pb.subtitle} />
    <section className="section">
      <div className="container">
        <p className="members-note">${pb.membersNote}</p>
        ${D.publications.map((p, i) => html`<${PubItem} key=${i} p=${p} lang=${lang} />`)}
      </div>
    </section>
  <//>`;
}

function Resources({ t, lang }) {
  const r = t.resources;
  return html`<${Fragment}>
    <${Hero} image=${PHOTOS.fluo} title=${r.title} subtitle=${r.subtitle} />
    <section className="section">
      <div className="container">
        <div className="row g-4">
          ${D.resources.map((res, i) => html`<div className="col-md-6" key=${i}>
            <${Block} className="h-100">
              <${Card} className="res-card h-100">
                <div className="res-head">
                  <div className="area-icon"><i className=${`bi ${res.icon}`}></i></div>
                  <span className="tag">${tr(res.type, lang)}</span>
                </div>
                <h3 className="res-title">${res.title}</h3>
                <p>${tr(res.text, lang)}</p>
                <div className="mt-auto d-flex flex-wrap gap-2">
                  ${res.url
                    ? html`<a className="btn btn-main" href=${res.url} target="_blank" rel="noopener">${t.common.access} <i className="bi bi-arrow-up-right"></i></a>`
                    : html`<span className="btn btn-soon disabled">${t.common.soon}</span>`}
                  ${res.doi && html`<a className="btn btn-outline-main" href=${`https://doi.org/${res.doi}`} target="_blank" rel="noopener">${r.paper} <i className="bi bi-box-arrow-up-right"></i></a>`}
                </div>
              <//>
            <//>
          </div>`)}
        </div>
      </div>
    </section>
  <//>`;
}

function Contact({ t }) {
  const c = t.contact;
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(D.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }).catch(() => {});
  };
  const q = encodeURIComponent(D.mapQuery);
  return html`<${Fragment}>
    <${Hero} image=${PHOTOS.corridor} title=${c.title} subtitle=${c.subtitle} />
    <section className="section">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-5 d-flex flex-column gap-4">
            <${Block}>
              <div className="info-card glass">
                <div className="area-icon"><i className="bi bi-geo-alt"></i></div>
                <div>
                  <h3>${c.address}</h3>
                  <p className="footer-pre mb-2">${c.addressText}</p>
                  <a className="link-arrow" href=${`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener">${c.openMap} <i className="bi bi-arrow-up-right"></i></a>
                </div>
              </div>
            <//>
            <${Block}>
              <div className="info-card glass">
                <div className="area-icon"><i className="bi bi-envelope"></i></div>
                <div className="min-w-0">
                  <h3>${c.email}</h3>
                  <a className="email-link" href=${`mailto:${D.email}`}>${D.email}</a>
                  <button type="button" className="copy-btn" onClick=${copy} aria-label="Copiar / Copy">
                    <i className=${`bi ${copied ? "bi-check2" : "bi-copy"}`}></i>
                  </button>
                </div>
              </div>
            <//>
            <${Block}>
              <a className="info-card glass info-link" href=${D.instagram} target="_blank" rel="noopener">
                <div className="area-icon"><i className="bi bi-instagram"></i></div>
                <div>
                  <h3>${c.instagram}</h3>
                  <span className="email-link">${D.instagramHandle}</span>
                </div>
              </a>
            <//>
            <${Block}>
              <div className="opps">
                <h3>${c.opportunitiesTitle}</h3>
                <p className="mb-0">${c.opportunitiesText}</p>
              </div>
            <//>
          </div>
          <div className="col-lg-7">
            <${Block} className="h-100">
              <div className="map-frame glass">
                <iframe title=${c.address} src=${`https://maps.google.com/maps?q=${q}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            <//>
          </div>
        </div>
      </div>
    </section>
  <//>`;
}

/* ---------- App ---------- */

const PAGES = { home: Home, about: About, people: People, publications: Publications, resources: Resources, contact: Contact };

function App() {
  const [lang, setLangState] = useState(() => (store.get("lagemf-lang") === "en" ? "en" : "pt"));
  const setLang = (l) => { setLangState(l); store.set("lagemf-lang", l); };
  const route = useRoute();
  const t = C[lang];

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.title = route === "home" ? t.meta.title : `${t.nav[route]} | LAGEMF`;
  }, [lang, route]);

  const Page = PAGES[route];
  return html`<${Fragment}>
    <${Navbar} t=${t} lang=${lang} setLang=${setLang} route=${route} />
    <main key=${route}><${Page} t=${t} lang=${lang} /></main>
    <${Footer} t=${t} />
  <//>`;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App} />`);
