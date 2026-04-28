import { useState } from 'react';
import './portfolio.css';

export default function App() {
  const [lightbox, setLightbox] = useState(false);
  return (
    <div className="portfolio">
      {/* Hero */}
      <header className="hero-section">
        <div className="hero-content">
          <img src="/ME.jpeg" alt="Daniel Mustafaraj" className="avatar" onClick={() => setLightbox(true)} />
          {lightbox && (
            <div className="lightbox" onClick={() => setLightbox(false)}>
              <img src="/ME.jpeg" alt="Daniel Mustafaraj" />
            </div>
          )}
          <div className="hero-text">
            <h1>Daniel <span className="accent">Mustafaraj</span></h1>
            <p className="tagline">Electronic Engineering · Computer Engineering</p>
            <div className="hero-links">
              <a href="https://github.com/danielmustafaraj02" target="_blank" rel="noreferrer" className="btn">GitHub</a>
              <a href="mailto:mustafaraj.daniel2002@gmail.com" className="btn btn-outline">mustafaraj.daniel2002@gmail.com</a>
              <a href="/CV.pdf" download className="btn btn-outline">⬇ Download CV</a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* About */}
        <section className="card">
          <h2>About</h2>
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
          </div>
        </section>

        {/* Skills */}
        <section className="card">
          <h2>Skills</h2>
          <div className="skills-grid">
            <div className="skill-group">
              <h3>Programming Languages</h3>
              <div className="tags">
                {['Assembly','C++','Java','JavaScript','PHP','Python'].map(s => (
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


        {/* Projects */}
        <section className="card">
          <h2>Projects</h2>
          <p className="muted">Coming soon!</p>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Daniel Mustafaraj · <a href="/CV.pdf" download>Download CV</a></p>
      </footer>
    </div>
  );
}
