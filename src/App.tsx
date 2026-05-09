import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import './portfolio.css';

export default function App() {
  const [lightbox, setLightbox] = useState(false);
  const [certOpen, setCertOpen] = useState(false);
  return (
    <div className="portfolio">
      {/* Hero */}
      <header className="hero-section">
        {lightbox && (
          <div className="lightbox" onClick={() => setLightbox(false)}>
            <img src="/ME.jpeg" alt="Daniel Mustafaraj" />
          </div>
        )}
        <div className="hero-content">
          <img src="/ME.jpeg" alt="Daniel Mustafaraj" className="avatar" onClick={() => setLightbox(true)} />
          <div className="hero-text">
            <h1>Daniel <span className="accent">Mustafaraj</span></h1>
            <p className="tagline">Electronic Engineering · Computer Engineering</p>
            <div className="hero-links">
              <a href="https://github.com/danielmustafaraj02" target="_blank" rel="noreferrer" className="btn btn-icon" aria-label="GitHub">
                <svg height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/daniel-mustafaraj-63b1b4247/" target="_blank" rel="noreferrer" className="btn btn-icon" aria-label="LinkedIn">
                <svg height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="mailto:mustafaraj.daniel2002@gmail.com" className="btn btn-outline">mustafaraj.daniel2002@gmail.com</a>
              <a href="/CV.pdf" download className="btn btn-outline">⬇ CV</a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* About */}
        <section className="card">
          <h2>About</h2>
          <p style={{marginBottom:'1rem'}}>
            Master's student in <strong style={{color:'var(--accent2)'}}>Electronic Engineering</strong> at the University of Padua. Currently taking Power Electronics, Analog Integrated Circuit Design, Industrial Applications of Ionizing Radiation Sources, and Organic &amp; Molecular Electronics. In my spare time I'm attending <em>Fisica Moderna</em> lectures at the Department of Physics — covering special relativity and the basics of quantum mechanics.
          </p>
          <div className="about-grid">
            <div><span className="label">Born</span> 02/09/2002 · Monselice (PD)</div>
            <div><span className="label">Location</span> Via Cristoforo Colombo 48, 35043 Monselice (PD)</div>
            <div><span className="label">Phone</span> +39 391 359 2913</div>
            <div><span className="label">Citizenship</span> Italian</div>
          </div>
        </section>

        {/* Education */}
        <section className="card">
          <h2>Education</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2026 – 2027</div>
              <div className="timeline-body">
                <h3>Master's Degree <span className="badge in-progress">In Progress</span></h3>
                <p>LM-29 · Electronic Engineering</p>
                <p className="institution">Università degli Studi di Padova · Facoltà di Ingegneria dell'Informazione</p>
                <p className="muted">Expected graduation: 2027</p>
                <details className="courses-details">
                  <summary>Courses</summary>
                  <table className="courses-table">
                    <thead>
                      <tr><th>Course</th><th>CFU</th><th>Grade</th><th>Date</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Analog Electronics</td><td>6</td><td className="grade">26</td><td>28/01/2026</td></tr>
                      <tr><td>Electronic Measurements</td><td>9</td><td className="grade">26</td><td>10/02/2026</td></tr>
                      <tr><td>Microelectronics</td><td>9</td><td className="grade">30</td><td>20/02/2026</td></tr>
                      <tr><td>Microwave Devices</td><td>9</td><td className="grade">26</td><td>06/10/2025</td></tr>
                      <tr><td>Nanoelectronics</td><td>6</td><td className="grade">29</td><td>19/02/2026</td></tr>
                      <tr><td>Optoelectronic and Photovoltaic Devices</td><td>9</td><td className="grade">30</td><td>23/01/2026</td></tr>
                      <tr className="pending"><td>Analogue Integrated Circuit Design</td><td>9</td><td colSpan={2}><span className="badge in-progress">In Progress</span></td></tr>
                      <tr className="pending"><td>Industrial Applications of Ionizing Radiation Sources</td><td>6</td><td colSpan={2}><span className="badge in-progress">In Progress</span></td></tr>
                      <tr className="pending"><td>Organic and Molecular Electronics</td><td>6</td><td colSpan={2}><span className="badge in-progress">In Progress</span></td></tr>
                      <tr className="pending"><td>Physics and Optics at the Nanoscale</td><td>6</td><td colSpan={2}><span className="badge in-progress">In Progress</span></td></tr>
                      <tr className="pending"><td>Power Electronics</td><td>9</td><td colSpan={2}><span className="badge in-progress">In Progress</span></td></tr>
                      <tr className="pending"><td>Final Project</td><td>21</td><td colSpan={2}><span className="badge in-progress">In Progress</span></td></tr>
                    </tbody>
                  </table>
                </details>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2021 – 2025</div>
              <div className="timeline-body">
                <h3>Bachelor's Degree <span className="badge done">95/110</span></h3>
                <p>L-8 · Computer Engineering (Ingegneria Informatica)</p>
                <p className="institution">Università degli Studi di Padova · Dipartimento di Ingegneria dell'Informazione</p>
                <p className="muted">Thesis: <a href="https://thesis.unipd.it/handle/20.500.12608/89363" target="_blank" rel="noreferrer"><em>L'equazione di Laplace</em></a> · Supervisor: Paolo Musolino</p>
                <p className="muted">Graduated: 22/07/2025 · Age at graduation: 22</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2016 – 2021</div>
              <div className="timeline-body">
                <h3>High School Diploma <span className="badge done">95/100</span></h3>
                <p>Informatica e Telecomunicazioni</p>
                <p className="institution">J.F. Kennedy · Monselice (PD)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="card">
          <h2>Skills</h2>
          <div className="skills-grid">
            <div className="skill-group">
              <h3>Programming Languages</h3>
              <div className="tags">
                {['Assembly','C++','Java','JavaScript','MATLAB','PHP','Python'].map(s => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="skill-group">
              <h3>Web Development</h3>
              <div className="tags">
                <span className="tag">Web Programming</span>
                <span className="tag">DBMS</span>
              </div>
            </div>
            <div className="skill-group">
              <h3>Electronics</h3>
              <div className="tags">
                {['LTspice','Oscilloscope','Spectrum Analyzer','Counter'].map(s => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Languages */}
        <section className="card">
          <h2>Languages</h2>
          <div className="lang-row">
            <span className="lang-name">Italian</span>
            <span className="badge done">Native</span>
          </div>
          <div className="lang-row">
            <span className="lang-name">English</span>
            <span className="badge">B2</span>
          </div>
        </section>


        {/* Certificates */}
        <section className="card">
          <h2>Certificates</h2>
          <div className="cert-item" onClick={() => setCertOpen(true)}>
            <div className="cert-thumb">
              <img src="https://www.mathworks.com/favicon.ico" alt="MATLAB" />
            </div>
            <div>
              <p className="cert-title">MATLAB Onramp</p>
              <p className="muted">MathWorks · <a href="https://matlabacademy.mathworks.com/progress/share/certificate.html?id=5c08de2a-54d0-4fae-b2cf-11abfab504c7&" target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>View online ↗</a></p>
            </div>
          </div>
        </section>

        {certOpen && (
          <div className="lightbox cert-lightbox" onClick={() => setCertOpen(false)}>
            <iframe
              src="https://matlabacademy.mathworks.com/progress/share/certificate.html?id=5c08de2a-54d0-4fae-b2cf-11abfab504c7&"
              title="MATLAB Certificate"
            />
          </div>
        )}

        {/* Projects */}
        <section className="card">
          <h2>Projects</h2>
          <p className="muted">Coming soon!</p>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Daniel Mustafaraj · <a href="/CV.pdf" download>Download CV</a></p>
      </footer>
      <Analytics />
    </div>
  );
}
