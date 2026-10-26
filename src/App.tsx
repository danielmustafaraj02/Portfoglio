import { useEffect, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import './portfolio.css';
import { LockDialog, LockIcon } from './LockDialog';
import { MatrixRain, ScopeTrace, Typewriter } from './motion';
import { useReducedMotion, useSectionReveal } from './useMotion';
import { bachelorCourses, contact, focusAreas, masterCourses, passedCfu, projects, skills, weightedAverage, type Lang } from './profile';
import { restore, type Unlocked } from './vault';

const CERTIFICATE_URL = 'https://matlabacademy.mathworks.com/progress/share/certificate.html?id=5c08de2a-54d0-4fae-b2cf-11abfab504c7&';
// Download names; the files themselves are decrypted in the browser once the visitor unlocks them.
const CV_FILE = { en: 'CV-Daniel-Mustafaraj.pdf', it: 'CV-Daniel-Mustafaraj-IT.pdf' };

const ui = {
  en: {
    title: 'Daniel Mustafaraj · Electronic Engineering',
    tagline: 'MSc Electronic Engineering · University of Padua',
    statusPrefix: "Looking for a master's thesis or internship in ",
    statusPhrases: ['photonics & optoelectronics', 'digital design (Verilog, FPGA)', 'microelectronics', 'power electronics'],
    statusFull: "Looking for a master's thesis or internship in photonics, digital design, microelectronics or power electronics.",
    languageLabel: 'Language',
    showPhoto: 'Show a larger photo',
    photoAlt: 'Daniel Mustafaraj on his graduation day, wearing the laurel wreath',
    close: 'Close',
    navLabel: 'Contact and CV',
    emailMe: 'Email me',
    cvEn: 'CV (English)',
    cvIt: 'CV (Italian)',
    unlock: 'Unlock contact & CV',
    emailPhone: 'Email & phone',
    unlockWithCode: 'Unlock with the access code',
    about: 'About',
    aboutP1: (avg: string) =>
      `I'm in the second year of the MSc in Electronic Engineering at the University of Padua. My average is ${avg}/30. Before that I did a Bachelor's in Computer Engineering, so I know both the hardware side and the software side.`,
    aboutP2:
      "What I like most is the point where physics meets circuits: semiconductor devices, optoelectronics, photonics, and digital design in Verilog on FPGA. This semester I'm studying Power Electronics, Analogue Integrated Circuit Design, and Physics and Optics at the Nanoscale.",
    basedIn: 'Based in',
    availability: 'Availability',
    availabilityValue: "Master's thesis from early 2027",
    location: 'Monselice (PD), Italy',
    phone: 'Phone',
    languages: 'Languages',
    languagesValue: 'Italian (native), English (B2)',
    lookingFor: "What I'm looking for",
    lookingForIntro: "I want to do my master's thesis (starting at the beginning of 2027) or an internship in one of these areas. It can be in a company or in a research lab, in Italy or in Europe:",
    education: 'Education',
    msc: 'MSc Electronic Engineering',
    inProgress: 'In progress',
    department: 'Università degli Studi di Padova · Department of Information Engineering',
    mscSummary: (avg: string, cfu: number) => <>Average <strong>{avg}/30</strong> over {cfu} CFU · I expect to graduate in 2027</>,
    exams: 'Exams',
    course: 'Course',
    grade: 'Grade',
    ongoing: 'in progress',
    pass: 'Pass',
    bsc: 'BSc Computer Engineering',
    thesis: 'Thesis',
    thesisNote: '(about the Laplace and heat equations) · supervisor Prof. Paolo Musolino · graduated in July 2025',
    diploma: 'Technical High School Diploma',
    school: 'ITIS J.F. Kennedy, Monselice (PD) · Computer Science and Telecommunications',
    projects: 'Projects',
    skills: 'Skills',
    certificates: 'Certificates',
    badges: 'Badges',
    badgeBachelor: "Bachelor's Degree, Computer Engineering",
    badgeEnglish: 'English B2, Reading and Listening',
    badgeIssuer: 'University of Padua',
    badgeBachelorAlt: "Digital badge: Bachelor's Degree in Ingegneria Informatica, Università di Padova",
    badgeEnglishAlt: 'Digital badge: English B2, Reading-Listening, Università di Padova',
    downloadCv: 'Download CV',
  },
  it: {
    title: 'Daniel Mustafaraj · Ingegneria Elettronica',
    tagline: 'Laurea Magistrale in Ingegneria Elettronica · Università di Padova',
    statusPrefix: 'Cerco una tesi magistrale o un tirocinio in ',
    statusPhrases: ['fotonica e optoelettronica', 'progettazione digitale (Verilog, FPGA)', 'microelettronica', 'elettronica di potenza'],
    statusFull: 'Cerco una tesi magistrale o un tirocinio in fotonica, progettazione digitale, microelettronica o elettronica di potenza.',
    languageLabel: 'Lingua',
    showPhoto: 'Mostra la foto più grande',
    photoAlt: "Daniel Mustafaraj il giorno della laurea, con la corona d'alloro",
    close: 'Chiudi',
    navLabel: 'Contatti e CV',
    emailMe: 'Scrivimi',
    cvEn: 'CV (inglese)',
    cvIt: 'CV (italiano)',
    unlock: 'Sblocca contatti e CV',
    emailPhone: 'Email e telefono',
    unlockWithCode: 'Sblocca con il codice di accesso',
    about: 'Chi sono',
    aboutP1: (avg: string) =>
      `Frequento il secondo anno della Laurea Magistrale in Ingegneria Elettronica all'Università di Padova. La mia media è ${avg}/30. Prima ho fatto la Laurea Triennale in Ingegneria Informatica, quindi conosco sia la parte hardware sia la parte software.`,
    aboutP2:
      "Quello che mi piace di più è dove la fisica incontra i circuiti: dispositivi a semiconduttore, optoelettronica, fotonica e progettazione digitale in Verilog su FPGA. In questo semestre studio Power Electronics, Analogue Integrated Circuit Design e Physics and Optics at the Nanoscale.",
    basedIn: 'Residenza',
    availability: 'Disponibilità',
    availabilityValue: 'Tesi magistrale da inizio 2027',
    location: 'Monselice (PD)',
    phone: 'Telefono',
    languages: 'Lingue',
    languagesValue: 'Italiano (madrelingua), inglese (B2)',
    lookingFor: 'Cosa cerco',
    lookingForIntro: "Voglio fare la tesi magistrale (da inizio 2027) o un tirocinio in uno di questi ambiti. Può essere in un'azienda o in un laboratorio di ricerca, in Italia o in Europa:",
    education: 'Istruzione',
    msc: 'Laurea Magistrale in Ingegneria Elettronica',
    inProgress: 'In corso',
    department: "Università degli Studi di Padova · Dipartimento di Ingegneria dell'Informazione",
    mscSummary: (avg: string, cfu: number) => <>Media <strong>{avg}/30</strong> su {cfu} CFU · laurea prevista nel 2027</>,
    exams: 'Esami',
    course: 'Corso',
    grade: 'Voto',
    ongoing: 'in corso',
    pass: 'Idoneo',
    bsc: 'Laurea Triennale in Ingegneria Informatica',
    thesis: 'Tesi',
    thesisNote: '(sulle equazioni di Laplace e del calore) · relatore Prof. Paolo Musolino · laureato a luglio 2025',
    diploma: 'Diploma di Istituto Tecnico',
    school: 'ITIS J.F. Kennedy, Monselice (PD) · Informatica e Telecomunicazioni',
    projects: 'Progetti',
    skills: 'Competenze',
    certificates: 'Certificazioni',
    badges: 'Badge',
    badgeBachelor: 'Laurea Triennale in Ingegneria Informatica',
    badgeEnglish: 'Inglese B2, Reading e Listening',
    badgeIssuer: 'Università di Padova',
    badgeBachelorAlt: 'Badge digitale: Laurea Triennale in Ingegneria Informatica, Università di Padova',
    badgeEnglishAlt: 'Badge digitale: Inglese B2, Reading-Listening, Università di Padova',
    downloadCv: 'Scarica il CV',
  },
};

function initialLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (fromUrl === 'en' || fromUrl === 'it') return fromUrl;
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'it') return saved;
  } catch { /* storage unavailable: fall back to the browser language */ }
  return navigator.language.toLowerCase().startsWith('it') ? 'it' : 'en';
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" /></svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v11" /><path d="m7 10.5 5 5 5-5" /><path d="M5 20h14" /></svg>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section className="section" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      <div className="section-body">{children}</div>
    </section>
  );
}

export default function App() {
  const photo = useRef<HTMLDialogElement>(null);
  const [lang, setLang] = useState<Lang>(initialLang);
  const [unlocked, setUnlocked] = useState<Unlocked | null>(null);
  const [lockOpenedFrom, setLockOpenedFrom] = useState<'hero' | 'about' | null>(null);
  const heroEmail = useRef<HTMLAnchorElement>(null);
  const aboutEmail = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const t = ui[lang];
  useSectionReveal(reduced);

  useEffect(() => {
    restore().then(result => result && setUnlocked(result), () => { /* stay locked */ });
  }, []);

  const closeLock = (result: Unlocked | null) => {
    const from = lockOpenedFrom;
    setLockOpenedFrom(null);
    if (!result) return;
    flushSync(() => setUnlocked(result));
    // The button that opened the lock is gone; move focus to the email link that replaced it.
    (from === 'about' ? aboutEmail : heroEmail).current?.focus();
  };

  const switchLang = (next: Lang) => {
    if (next === lang) return;
    // Crossfade the whole page so the change of language reads as one state change, not a flash of new text.
    if (!reduced && document.startViewTransition) document.startViewTransition(() => flushSync(() => setLang(next)));
    else setLang(next);
  };
  const avg = weightedAverage.toLocaleString(lang === 'it' ? 'it-IT' : 'en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const cvLangs: Lang[] = lang === 'it' ? ['it', 'en'] : ['en', 'it'];
  const cvLabel = { en: t.cvEn, it: t.cvIt };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.title;
    try { localStorage.setItem('lang', lang); } catch { /* not persisted; the URL still carries it */ }
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState(null, '', url);
  }, [lang, t.title]);

  return (
    <>
    <MatrixRain />
    <div className="portfolio">
      <div className="lang-switch" role="group" aria-label={t.languageLabel}>
        {(['en', 'it'] as const).map(l => (
          <button key={l} type="button" lang={l} aria-pressed={lang === l} onClick={() => switchLang(l)}>
            {l === 'en' ? 'English' : 'Italiano'}
          </button>
        ))}
      </div>

      <header className="hero">
        <button type="button" className="avatar" onClick={() => photo.current?.showModal()} aria-label={t.showPhoto}>
          <img src="/me-480.jpg" alt="Daniel Mustafaraj" width={150} height={150} />
        </button>
        <div className="hero-text">
          <h1>Daniel Mustafaraj</h1>
          <p className="tagline">{t.tagline}</p>
          <Typewriter key={lang} prefix={t.statusPrefix} phrases={t.statusPhrases} fullText={t.statusFull} />
          <nav className="hero-links" aria-label={t.navLabel}>
            <a href={contact.github} target="_blank" rel="noreferrer" className="btn btn-icon" aria-label="GitHub"><GitHubIcon /></a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="btn btn-icon" aria-label="LinkedIn"><LinkedInIcon /></a>
            {unlocked ? (
              <>
                <a ref={heroEmail} href={`mailto:${unlocked.email}`} className="btn revealed"><MailIcon />{t.emailMe}</a>
                {cvLangs.map((cv, i) => (
                  <a
                    key={cv}
                    href={unlocked.cv[cv]}
                    download={CV_FILE[cv]}
                    className={i === 0 ? 'btn btn-primary revealed' : 'btn revealed'}
                    style={{ animationDelay: `${(i + 1) * 80}ms` }}
                  >
                    <DownloadIcon />{cvLabel[cv]}
                  </a>
                ))}
              </>
            ) : (
              <button type="button" className="btn btn-primary" onClick={() => setLockOpenedFrom('hero')}><LockIcon />{t.unlock}</button>
            )}
          </nav>
        </div>
      </header>

      <ScopeTrace />

      <dialog ref={photo} className="photo-dialog" onClick={e => e.target === e.currentTarget && photo.current?.close()}>
        <img src="/me-900.jpg" alt={t.photoAlt} width={900} height={1200} />
        <form method="dialog"><button className="btn">{t.close}</button></form>
      </dialog>

      <LockDialog lang={lang} open={lockOpenedFrom !== null} linkedin={contact.linkedin} onClose={closeLock} />

      <main>
        <Section id="about" title={t.about}>
          <p>{t.aboutP1(avg)}</p>
          <p>{t.aboutP2}</p>
          <dl className="facts">
            <div><dt>{t.basedIn}</dt><dd>{t.location}</dd></div>
            {unlocked ? (
              <>
                <div className="revealed"><dt>Email</dt><dd><a ref={aboutEmail} href={`mailto:${unlocked.email}`}>{unlocked.email}</a></dd></div>
                <div className="revealed"><dt>{t.phone}</dt><dd><a href={`tel:${unlocked.phone.replace(/\s/g, '')}`}>{unlocked.phone}</a></dd></div>
              </>
            ) : (
              <div>
                <dt>{t.emailPhone}</dt>
                <dd><button type="button" className="link-button" onClick={() => setLockOpenedFrom('about')}><LockIcon />{t.unlockWithCode}</button></dd>
              </div>
            )}
            <div><dt>{t.languages}</dt><dd>{t.languagesValue}</dd></div>
            <div><dt>{t.availability}</dt><dd>{t.availabilityValue}</dd></div>
          </dl>
        </Section>

        <Section id="focus" title={t.lookingFor}>
          <p>{t.lookingForIntro}</p>
          <dl className="focus">
            {focusAreas.map(area => (
              <div key={area.title.en}>
                <dt>{area.title[lang]}</dt>
                <dd>{area.evidence[lang]}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="education" title={t.education}>
          <ol className="timeline">
            <li>
              <span className="when">2025 – 2027</span>
              <div>
                <h3>{t.msc} <span className="badge">{t.inProgress}</span></h3>
                <p className="institution"><img className="logo" src="/logo-unipd.svg" alt="" />{t.department}</p>
                <p>{t.mscSummary(avg, passedCfu)}</p>
                <details className="courses" open>
                  <summary>{t.exams}</summary>
                  <table>
                    <thead><tr><th scope="col">{t.course}</th><th scope="col">CFU</th><th scope="col">{t.grade}</th></tr></thead>
                    <tbody>
                      {masterCourses.map(c => (
                        <tr key={c.name} className={c.grade ? (c.grade === 30 ? 'top' : '') : 'pending'}>
                          <td lang="en">{c.name}</td>
                          <td>{c.cfu}</td>
                          <td>{c.grade ?? t.ongoing}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </details>
              </div>
            </li>
            <li>
              <span className="when">2021 – 2025</span>
              <div>
                <h3>{t.bsc} <span className="badge">95/110</span></h3>
                <p className="institution"><img className="logo" src="/logo-unipd.svg" alt="" />{t.department}</p>
                <p>
                  {t.thesis}: <a href="https://thesis.unipd.it/handle/20.500.12608/89363" target="_blank" rel="noreferrer" lang="it"><em>L'equazione di Laplace</em></a>{' '}
                  {t.thesisNote}
                </p>
                <details className="courses">
                  <summary>{t.exams}</summary>
                  <table>
                    <thead><tr><th scope="col">{t.course}</th><th scope="col">CFU</th><th scope="col">{t.grade}</th></tr></thead>
                    <tbody>
                      {bachelorCourses.map(c => (
                        <tr key={c.name.en} className={c.grade === 30 ? 'top' : ''}>
                          <td lang={lang}>{c.name[lang]}</td>
                          <td>{c.cfu}</td>
                          <td>{c.grade ?? t.pass}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </details>
              </div>
            </li>
            <li>
              <span className="when">2016 – 2021</span>
              <div>
                <h3>{t.diploma} <span className="badge">95/100</span></h3>
                <p className="institution"><img className="logo" src="/logo-kennedy.png" alt="" />{t.school}</p>
              </div>
            </li>
          </ol>
        </Section>

        {projects.length > 0 && (
          <Section id="projects" title={t.projects}>
            <ul className="projects">
              {projects.map(p => (
                <li key={p.title.en}>
                  <h3>{p.link ? <a href={p.link} target="_blank" rel="noreferrer">{p.title[lang]}</a> : p.title[lang]}<span className="when">{p.when}</span></h3>
                  <p>{p.summary[lang]}</p>
                  <p className="tags">{p.tags.join(' · ')}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section id="skills" title={t.skills}>
          <dl className="skills">
            {skills.map(s => (
              <div key={s.group.en}>
                <dt>{s.group[lang]}</dt>
                <dd>{s.items.map(item => item[lang]).join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="certificates" title={t.certificates}>
          <a className="cert" href={CERTIFICATE_URL} target="_blank" rel="noreferrer">
            <img src="/certificate-preview.jpg" alt="MATLAB Onramp certificate, MathWorks" width={814} height={576} loading="lazy" />
            <span>MATLAB Onramp<span className="muted"> · MathWorks</span></span>
          </a>
        </Section>

        <Section id="badges" title={t.badges}>
          <ul className="badges">
            {[
              { src: '/badges/bachelor-ingegneria-informatica.png', label: t.badgeBachelor, alt: t.badgeBachelorAlt },
              { src: '/badges/english-b2.png', label: t.badgeEnglish, alt: t.badgeEnglishAlt },
            ].map(b => (
              <li key={b.src}>
                <img src={b.src} alt={b.alt} width={400} height={400} loading="lazy" />
                <span>{b.label}<span className="muted"> · {t.badgeIssuer}</span></span>
              </li>
            ))}
          </ul>
        </Section>
      </main>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Daniel Mustafaraj
          {unlocked && <> · <a href={unlocked.cv[lang]} download={CV_FILE[lang]}>{t.downloadCv}</a></>}
        </p>
      </footer>
    </div>
    </>
  );
}
