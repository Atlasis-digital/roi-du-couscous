import { jsPDF } from 'jspdf';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from './i18n/I18nProvider';
import { i18n, photos, contact, hoursDetail, hoursDetailEvening, promo, faq, scrapedReviews } from './data';

const wa = (msg: string) => `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(msg)}`;

const heroV = { hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } } };
const heroChild = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const fade = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={{ ...fade, show: { ...fade.show, transition: { ...fade.show.transition, delay } } }}>{children}</motion.div>;
}
const pageV = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }, exit: { opacity: 0, y: -16, transition: { duration: 0.3 } } };
const CLAY = 'linear-gradient(135deg, #d98a29 0%, #b5482e 55%, #6b7a3a 100%)';

// --- Statut ouvert/fermé ---
function isOpen(): boolean {
  const now = new Date();
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const parse = (s: string) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
  const ranges = [hoursDetail[day], hoursDetailEvening[day]].filter(Boolean) as { open: string; close: string }[];
  return ranges.some(r => mins >= parse(r.open) && mins < parse(r.close));
}
function StatusBadge() {
  const { lang } = useI18n();
  const t = (k: keyof typeof i18n) => i18n[k][lang];
  const [open, setOpen] = useState(isOpen());
  useEffect(() => { const id = setInterval(() => setOpen(isOpen()), 60000); return () => clearInterval(id); }, []);
  return (
    <span className={open ? 'status open' : 'status closed'}>
      {open ? `🟢 ${t('open')}` : `🔴 ${t('closed')}`}
    </span>
  );
}

// --- Réservation ---
function Reservation() {
  const { lang } = useI18n();
  const t = (k: keyof typeof i18n) => i18n[k][lang];
  const [pers, setPers] = useState('2');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('20:00');
  const msg = () => {
    const L = { fr: `Bonjour ${contact.name}, je souhaite réserver une table pour ${pers} personne(s) le ${date} à ${time}.`, en: `Hello ${contact.name}, I'd like to book a table for ${pers} on ${date} at ${time}.`, ar: `مرحباً ${contact.name}، أرغب بحجز طاولة لـ ${pers} شخص في ${date} الساعة ${time}.` };
    return L[lang];
  };
  return (
    <section className="container" style={{ paddingBlock: '4rem' }}>
      <Reveal>
        <div className="box-clay">
          <h2 className="title display">{t('reserve_title')}</h2>
          <div className="res-form">
            <label>{t('persons')}<input type="number" min={1} max={30} value={pers} onChange={(e) => setPers(e.target.value)} /></label>
            <label>{t('date')}<input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
            <label>{t('time')}<input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></label>
          </div>
          <a className="btn" href={wa(msg())} target="_blank" rel="noopener noreferrer">{t('send_wa')}</a>
        </div>
      </Reveal>
    </section>
  );
}

// --- Avis (scrapés Google Maps : note + date) ---
function Reviews() {
  const { lang } = useI18n();
  const t = (k: keyof typeof i18n) => i18n[k][lang];
  const stars = (n: number) => '★'.repeat(n) + '☆'.repeat(5 - n);
  return (
    <section className="faq-section">
      <div className="container" style={{ paddingBlock: '4rem' }}>
      <h2 className="title display reveal" style={{ textAlign: 'center', marginBottom: '1rem' }}>{t('reviews_title')}</h2>
      <div className="rule" style={{ margin: '0 auto 2rem' }} />
      <div className="feature">
        {scrapedReviews.map((r, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="chip" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.3rem', color: 'var(--gold)', letterSpacing: '2px' }}>{stars(r.rating)}</div>
              <p style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{r.date}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <a href={`https://search.google.com/local/reviews?placeid=&q=${encodeURIComponent(contact.name + ' ' + contact.city)}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">★ {contact.rating} ({contact.reviews}) · Google</a>
      </p>
      </div>
    </section>
  );
}

// --- FAQ ---
function Faq() {
  const { lang } = useI18n();
  const t = (k: keyof typeof i18n) => i18n[k][lang];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="faq-section">
      <div className="container" style={{ paddingBlock: '4rem' }}>
      <h2 className="title display reveal" style={{ marginBottom: '1rem' }}>{t('faq_title')}</h2>
      <div className="rule" />
      <div className="faq-list">
        {faq.map((f, i) => (
          <div key={i} className="faq-item">
            <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>{f.q[lang]} <span>{open === i ? '−' : '+'}</span></button>
            <AnimatePresence>{open === i && <motion.div className="faq-a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{f.a[lang]}</motion.div>}</AnimatePresence>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

// --- Galerie lightbox ---
function Gallery() {
  const { lang } = useI18n();
  const t = (k: keyof typeof i18n) => i18n[k][lang];
  const [zoom, setZoom] = useState<number | null>(null);
  return (
    <section style={{ paddingTop: '8rem' }}>
      <div className="container">
        <h2 className="title display" style={{ marginBottom: '2rem' }}>{t('gallery_title')}</h2>
        <div className="masonry">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div key={i} className={`ph ${i % 2 === 0 ? 'tall' : 'wide'}`}
              style={{ backgroundImage: photos[i] ? `url(${photos[i]})` : CLAY, backgroundSize: 'cover', cursor: photos[i] ? 'pointer' : 'default' }}
              initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }} onClick={() => photos[i] && setZoom(i)} />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {zoom !== null && photos[zoom] && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoom(null)}>
            <img src={photos[zoom]} alt="" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// --- Carte Maps ---
function MapBlock() {
  const { lang } = useI18n();
  const t = (k: keyof typeof i18n) => i18n[k][lang];
  return (
    <section className="container" style={{ paddingBlock: '4rem' }}>
      <Reveal>
        <div className="map-wrap">
          <iframe title="map" src={contact.mapsUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <a className="btn btn-ghost" href={contact.mapsDirections} target="_blank" rel="noopener noreferrer">🧭 {t('directions')}</a>
        </div>
      </Reveal>
    </section>
  );
}

function Home() {
  const { lang } = useI18n();
  const t = (k: keyof typeof i18n) => i18n[k][lang];
  return (
    <div>
      {promo.active && <div className="promo">{promo.text[lang]}</div>}
      <section className="hero">
        <div className="container hero-grid">
          <motion.div variants={heroV} initial="hidden" animate="show">
            <motion.span className="eyebrow" variants={heroChild}>{t('eyebrow')}</motion.span>
            <motion.h1 className="display" variants={heroChild}>{contact.name}</motion.h1>
            <motion.div variants={heroChild} style={{ marginBottom: '1rem' }}><StatusBadge /></motion.div>
            <motion.p className="lead" variants={heroChild}>{t('hero_lead')}</motion.p>
            <motion.div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }} variants={heroChild}>
              <a href={wa(`${t('reserve')} — ${contact.name}`)} target="_blank" rel="noopener noreferrer" className="btn">{t('reserve')}</a>
              <Link to="/menu" className="btn btn-ghost">{t('nav_menu')}</Link>
            </motion.div>
          </motion.div>
          <motion.div className="hero-photo" variants={heroChild}
            style={{ backgroundImage: photos[0] ? `url(${photos[0]})` : CLAY, backgroundSize: 'cover' }}
            initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: 'easeOut' }} />
        </div>
      </section>

      <div className="bandeau">
        <div className="container">
          <span>★ {contact.rating} · {contact.reviews} avis</span>
          <span>·</span>
          <span>{contact.city}, {contact.country}</span>
          <span>·</span>
          <StatusBadge />
          <a href={wa(`${t('reserve')} — ${contact.name}`)} target="_blank" rel="noopener noreferrer">{t('reserve')}</a>
        </div>
      </div>

      <section className="container">
        <Reveal>
          <div className="split2">
            <div>
              <div className="rule" />
              <h2 className="title display">{t('about_title')}</h2>
              <p className="muted">{t('about')}</p>
              <p className="muted" style={{ color: 'var(--terracotta)', marginTop: '1.25rem', fontWeight: 600 }}>🕒 {t('hours')}</p>
            </div>
            <div className="hero-photo" style={{ backgroundImage: photos[3] ? `url(${photos[3]})` : CLAY, aspectRatio: '4/5' }} />
          </div>
        </Reveal>
      </section>

      <section style={{ background: 'var(--surface)' }}>
        <div className="container">
          <h2 className="title display reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>{t('feature_title')}</h2>
          <div className="feature">
            {(i18n.features[lang] as any[]).map((f, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div className="chip" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
                  <div className="ic">{f.ic}</div>
                  <h4>{f.h}</h4>
                  <p>{f.p}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}><Link to="/menu" className="btn btn-ghost">{t('nav_menu')}</Link></div>
        </div>
      </section>

      <Reservation />
      <Reviews />
      <MapBlock />
      <Faq />
    </div>
  );
}

function Menu() {
  const { lang } = useI18n();
  const t = (k: keyof typeof i18n) => i18n[k][lang];
  const downloadMenu = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const W = doc.internal.pageSize.getWidth();
    let y = 56;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(22);
    doc.text(contact.name, W / 2, y, { align: 'center' }); y += 22;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(11); doc.setTextColor(120);
    doc.text(t('menu_title'), W / 2, y, { align: 'center' }); y += 28; doc.setTextColor(0);
    (i18n.menu[lang] as any[]).forEach((c: any) => {
      if (y > 760) { doc.addPage(); y = 56; }
      doc.setFont('helvetica', 'bold'); doc.setFontSize(14); doc.setTextColor(181, 72, 46);
      doc.text(c.cat, 56, y); y += 20; doc.setTextColor(0);
      c.items.forEach((m: any) => {
        if (y > 780) { doc.addPage(); y = 56; }
        doc.setFont('helvetica', 'normal'); doc.setFontSize(12);
        doc.text(m.n, 56, y);
        doc.text(m.p, W - 56, y, { align: 'right' }); y += 16;
        doc.setFontSize(9); doc.setTextColor(120);
        doc.text(m.d, 56, y); doc.setTextColor(0); y += 22;
      });
      y += 8;
    });
    doc.save(`${contact.name} - carte.pdf`);
  };
  return (
    <section style={{ paddingTop: '8rem' }}>
      <div className="container menu-wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="title display" style={{ margin: 0 }}>{t('menu_title')}</h2>
          <button className="btn btn-ghost" onClick={downloadMenu}>⬇ {t('download_menu')}</button>
        </div>
        {(i18n.menu[lang] as any[]).map((c, ci) => (
          <Reveal key={ci}>
            <div className="cat">{c.cat}</div>
            {c.items.map((m: any, i: number) => (
              <motion.div key={i} className="dish" whileHover={{ x: 8 }} transition={{ duration: 0.25 }}>
                <div><div className="n">{m.n}</div><div className="d">{m.d}</div></div>
                <div className="p">{m.p}</div>
              </motion.div>
            ))}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const { lang } = useI18n();
  const t = (k: keyof typeof i18n) => i18n[k][lang];
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [msg, setMsg] = useState('');
  const send = () => wa(`${name ? name + ' — ' : ''}${msg}${tel ? ' / ' + tel : ''}`);
  return (
    <section style={{ paddingTop: '8rem' }}>
      <div className="container">
        <h2 className="title display reveal" style={{ marginBottom: '1.5rem' }}>{t('contact_title')}</h2>
        <p className="muted reveal" style={{ marginBottom: '2rem' }}>{t('contact_text')}</p>
        <div className="contact-grid">
          <Reveal>
            <div className="box">
              <ul className="contact-list">
                <li>📍 {contact.address}</li>
                <li>📞 <a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a></li>
                <li>🕒 {t('hours')}</li>
                <li>★ {contact.rating} ({contact.reviews} avis)</li>
              </ul>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <a href={wa(`${t('reserve')} — ${contact.name}`)} target="_blank" rel="noopener noreferrer" className="btn">🟢 {t('whatsapp')}</a>
                <a href={`tel:${contact.phone}`} className="btn btn-ghost">📞 {t('call')}</a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="box-clay">
              <input className="field" placeholder={lang === 'ar' ? 'الاسم' : lang === 'en' ? 'Name' : 'Nom'} value={name} onChange={(e) => setName(e.target.value)} />
              <input className="field" placeholder={lang === 'ar' ? 'الهاتف' : lang === 'en' ? 'Phone' : 'Téléphone'} value={tel} onChange={(e) => setTel(e.target.value)} />
              <textarea className="field" placeholder={lang === 'ar' ? 'رسالتك' : lang === 'en' ? 'Message' : 'Votre message'} value={msg} onChange={(e) => setMsg(e.target.value)} />
              <a className="btn" href={send()} target="_blank" rel="noopener noreferrer">{t('send_wa')}</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Shell() {
  const { lang, setLang } = useI18n();
  const t = (k: keyof typeof i18n) => i18n[k][lang];
  const loc = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, [loc.pathname]);
  useEffect(() => { setMenuOpen(false); }, [loc.pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', on); return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => { document.body.classList.toggle('dark', dark); }, [dark]);

  const links = [
    { to: '/', label: 'Accueil' },
    { to: '/menu', label: t('nav_menu') },
    { to: '/gallery', label: t('nav_gallery') },
    { to: '/contact', label: t('nav_contact') },
  ];
  const share = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const txt = encodeURIComponent(`${contact.name} — ${contact.city}`);
    if (lang === 'ar') window.open(`https://wa.me/?text=${txt}%20${encodeURIComponent(url)}`, '_blank');
    else window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="shell" style={{ background: 'var(--bg)', color: 'var(--ink)', minHeight: '100vh' }}>
      <header className={scrolled ? 'solid' : ''}>
        <div className="container nav">
          <Link to="/" className="brand"><b>Le</b> Roi du Couscous</Link>
          <nav className="desktop-nav"><ul className="nav-links">
            {links.map((l) => (<li key={l.to}><Link to={l.to} className={loc.pathname === l.to ? 'active' : ''} onClick={() => setMenuOpen(false)}>{l.label}</Link></li>))}
          </ul></nav>
          <div className="header-right">
            <button className="dark-toggle" onClick={() => setDark((v) => !v)} aria-label="theme">◐</button>
            <div className="langs">
              {(['fr', 'en', 'ar'] as const).map((l) => (<button key={l} className={lang === l ? 'active' : ''} onClick={() => setLang(l)}>{l === 'fr' ? 'FR' : l === 'en' ? 'EN' : 'ع'}</button>))}
            </div>
            <button className="nav-toggle" aria-label="Menu" onClick={() => setMenuOpen((v) => !v)}><span /><span /><span /></button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            {links.map((l) => (<Link key={l.to} to={l.to} className={loc.pathname === l.to ? 'active' : ''} onClick={() => setMenuOpen(false)}>{l.label}</Link>))}
            <button className="mobile-share" onClick={share}>🔗 {t('share')}</button>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="share-fab" onClick={share} aria-label="share">🔗</button>
      <main>
        <AnimatePresence mode="wait">
          <motion.div key={loc.pathname} variants={pageV} initial="initial" animate="animate" exit="exit">
            <Routes location={loc}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="container">{contact.name} · {t('rights')}</footer>
      <a className="sticky-cta" href={wa(`${t('reserve')} — ${contact.name}`)} target="_blank" rel="noopener noreferrer">🟢 {t('reserve')}</a>
    </div>
  );
}

export default function App() { return <Shell />; }
