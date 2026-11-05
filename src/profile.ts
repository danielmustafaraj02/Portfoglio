// Single source for the facts shown on the site. Keep in sync with cv/cv.html, cv/cv-it.html and cv/resume.json.

export type Lang = 'en' | 'it';
export type Text = Record<Lang, string>;

export const contact = {
  github: 'https://github.com/danielmustafaraj02',
  linkedin: 'https://www.linkedin.com/in/daniel-mustafaraj-63b1b4247/',
};

// Never imported by the page: vite.config.ts encrypts it into the build, and the page decrypts it once the visitor enters the access code.
export const privateContact = {
  email: 'mustafaraj.daniel2002@gmail.com',
  phone: '+39 391 359 2913',
};

// Course names stay in English in both languages: the programme is taught in English and the transcript uses these names.
export type Course = { name: string; cfu: number; grade?: number };

export const masterCourses: Course[] = [
  { name: 'Microelectronics', cfu: 9, grade: 30 },
  { name: 'Optoelectronic and Photovoltaic Devices', cfu: 9, grade: 30 },
  { name: 'Organic and Molecular Electronics', cfu: 6, grade: 30 },
  { name: 'Industrial Applications of Ionizing Radiation Sources', cfu: 6, grade: 30 },
  { name: 'Nanoelectronics', cfu: 6, grade: 29 },
  { name: 'Electronic Measurements', cfu: 9, grade: 26 },
  { name: 'Microwave Devices', cfu: 9, grade: 26 },
  { name: 'Analog Electronics', cfu: 6, grade: 26 },
  { name: 'Analogue Integrated Circuit Design', cfu: 9 },
  { name: 'Power Electronics', cfu: 9 },
  { name: 'Physics and Optics at the Nanoscale', cfu: 6 },
  { name: 'Nanophotonics and Metasurfaces', cfu: 6 },
];

// Bachelor's transcript (Computer Engineering, 180 CFU). A missing grade means a pass/fail assessment (idoneità).
export type BachelorCourse = { name: Text; cfu: number; grade?: number };

export const bachelorCourses: BachelorCourse[] = [
  { name: { en: 'Elements of Bioinformatics', it: 'Elementi di bioinformatica' }, cfu: 6, grade: 28 },
  { name: { en: 'Artificial Intelligence', it: 'Intelligenza artificiale' }, cfu: 9, grade: 28 },
  { name: { en: 'English B2 (receptive skills)', it: 'Lingua inglese B2 (abilità ricettive)' }, cfu: 3 },
  { name: { en: 'Linear Algebra and Geometry', it: 'Algebra lineare e geometria' }, cfu: 12, grade: 20 },
  { name: { en: 'Calculus 1', it: 'Analisi matematica 1' }, cfu: 12, grade: 25 },
  { name: { en: 'Computer Architecture', it: 'Architettura degli elaboratori' }, cfu: 9, grade: 23 },
  { name: { en: 'General Physics 1', it: 'Fisica generale 1' }, cfu: 12, grade: 26 },
  { name: { en: 'Fundamentals of Computer Science', it: 'Fondamenti di informatica' }, cfu: 12, grade: 19 },
  { name: { en: 'Data and Algorithms', it: 'Dati e algoritmi' }, cfu: 9, grade: 25 },
  { name: { en: 'Elements of Physics 2', it: 'Elementi di fisica 2' }, cfu: 6, grade: 25 },
  { name: { en: 'Elements of Software Engineering', it: 'Elementi di ingegneria del software' }, cfu: 6, grade: 28 },
  { name: { en: 'Fundamentals of Mathematical Analysis and Probability', it: 'Fondamenti di analisi matematica e probabilità' }, cfu: 9, grade: 24 },
  { name: { en: 'Fundamentals of Automatic Control', it: 'Fondamenti di controlli automatici' }, cfu: 9, grade: 20 },
  { name: { en: 'Programming Laboratory', it: 'Laboratorio di programmazione' }, cfu: 6, grade: 28 },
  { name: { en: 'Operating Systems', it: 'Sistemi operativi' }, cfu: 9, grade: 28 },
  { name: { en: 'Circuit Theory', it: 'Teoria dei circuiti' }, cfu: 6, grade: 22 },
  { name: { en: 'Algorithms for Engineering', it: "Algoritmi per l'ingegneria" }, cfu: 6, grade: 29 },
  { name: { en: 'Databases 1', it: 'Basi di dati 1' }, cfu: 9, grade: 30 },
  { name: { en: 'Fundamentals of Electronics', it: 'Fondamenti di elettronica' }, cfu: 9, grade: 27 },
  { name: { en: 'Fundamentals of Telecommunications', it: 'Fondamenti di telecomunicazioni' }, cfu: 9, grade: 23 },
  { name: { en: 'Computer Networks 1', it: 'Reti di calcolatori 1' }, cfu: 9, grade: 24 },
  { name: { en: 'Final project', it: 'Prova finale' }, cfu: 3 },
];

export const passed = masterCourses.filter((c): c is Required<Course> => c.grade !== undefined);
export const passedCfu = passed.reduce((sum, c) => sum + c.cfu, 0);
export const weightedAverage = passed.reduce((sum, c) => sum + c.cfu * c.grade, 0) / passedCfu;

export const focusAreas: { title: Text; evidence: Text }[] = [
  {
    title: { en: 'Photonics & optoelectronics', it: 'Fotonica e optoelettronica' },
    evidence: {
      en: 'Optoelectronic and Photovoltaic Devices (30/30). Now I am studying Physics and Optics at the Nanoscale and Nanophotonics and Metasurfaces',
      it: 'Optoelectronic and Photovoltaic Devices (30/30). Ora studio Physics and Optics at the Nanoscale e Nanophotonics and Metasurfaces',
    },
  },
  {
    title: { en: 'Microelectronics & semiconductor devices', it: 'Microelettronica e dispositivi a semiconduttore' },
    evidence: {
      en: 'Microelectronics (30/30), Nanoelectronics (29/30), Organic and Molecular Electronics (30/30)',
      it: 'Microelectronics (30/30), Nanoelectronics (29/30), Organic and Molecular Electronics (30/30)',
    },
  },
  {
    title: { en: 'Digital design', it: 'Progettazione digitale' },
    evidence: {
      en: 'I write Verilog and program an FPGA board (Tang Nano 9K). I also have a Computer Engineering background',
      it: 'Scrivo Verilog e programmo una scheda FPGA (Tang Nano 9K). Ho anche una base di Ingegneria Informatica',
    },
  },
  {
    title: { en: 'Power electronics & analogue IC design', it: 'Elettronica di potenza e circuiti integrati analogici' },
    evidence: {
      en: 'I am taking both courses this semester',
      it: 'Seguo entrambi i corsi in questo semestre',
    },
  },
];

export const skills: { group: Text; items: Text[] }[] = [
  {
    group: { en: 'Digital design', it: 'Progettazione digitale' },
    items: [{ en: 'Verilog', it: 'Verilog' }, { en: 'FPGA programming (Tang Nano 9K)', it: 'Programmazione FPGA (Tang Nano 9K)' }],
  },
  {
    group: { en: 'Electronics lab', it: 'Laboratorio di elettronica' },
    items: [
      { en: 'LTspice', it: 'LTspice' },
      { en: 'Oscilloscope', it: 'Oscilloscopio' },
      { en: 'Spectrum analyser', it: 'Analizzatore di spettro' },
      { en: 'Raspberry Pi', it: 'Raspberry Pi' },
      { en: 'Arduino', it: 'Arduino' },
    ],
  },
  {
    group: { en: 'Programming', it: 'Programmazione' },
    items: ['Python', 'MATLAB', 'C++', 'Java', 'Assembly'].map(s => ({ en: s, it: s })),
  },
  {
    group: { en: 'Web development', it: 'Sviluppo web' },
    items: ['HTML', 'CSS', 'JavaScript', 'PHP'].map(s => ({ en: s, it: s })),
  },
  {
    group: { en: 'Systems & databases', it: 'Sistemi e basi di dati' },
    items: [
      { en: 'Linux', it: 'Linux' },
      { en: 'MySQL', it: 'MySQL' },
      { en: 'Databases (DBMS)', it: 'Basi di dati (DBMS)' },
    ],
  },
];

export type Project = {
  title: Text;
  when: string;
  summary: Text;
  tags: string[];
  link?: string;
  status?: Text;
  workflow?: { title: Text; detail: Text }[];
  note?: Text;
};

// Planned work stays clearly labeled until it has been built or agreed with a supervisor.
export const projects: Project[] = [
  {
    title: { en: 'Master’s thesis search · shortlist to proposal', it: 'Ricerca tesi magistrale · dalla selezione alla proposta' },
    when: '2026–27',
    status: { en: 'Planning', it: 'In pianificazione' },
    summary: {
      en: 'A focused plan to turn the current openings into a thesis topic that fits my strongest evidence: optoelectronics, lab measurements, photonics and FPGA design.',
      it: 'Un piano concreto per trasformare le offerte attuali in un tema di tesi coerente con i miei punti più forti: optoelettronica, misure di laboratorio, fotonica e progettazione FPGA.',
    },
    tags: ['Thesis planning', 'Photonics', 'Sensors', 'FPGA'],
    workflow: [
      {
        title: { en: '1 · Choose two tracks', it: '1 · Scegliere due direzioni' },
        detail: {
          en: 'Primary: optical and image-sensor characterization, matching ESA Opto-Electronics, imec alumina photonics/read-out ICs, Bosch optical sensors and TNO fibre sensing. Second: FPGA and digital verification, matching ESA Microelectronics, ADI and Leonardo RFSoC.',
          it: 'Prima scelta: caratterizzazione di sensori ottici e d’immagine, in linea con ESA Opto-Electronics, fotonica su allumina e read-out IC di imec, sensori Bosch e sensori in fibra TNO. Seconda: FPGA e verifica digitale, in linea con ESA Microelectronics, ADI e Leonardo RFSoC.',
        },
      },
      {
        title: { en: '2 · Build evidence with what I have', it: '2 · Creare prove con ciò che ho' },
        detail: {
          en: 'Prioritise one shortlist-matched demo at a time: a cocotb-verified UART on the Tang Nano 9K (no parts cost), then a photodiode optical link using the university lab instruments. Keep the room CO₂ monitor as a small extra for sensing, logging and software.',
          it: 'Dare priorità a una dimostrazione alla volta: UART verificata con cocotb sulla Tang Nano 9K (senza acquistare componenti), poi un collegamento ottico con fotodiodo usando gli strumenti del laboratorio universitario. Il monitor CO₂ per la stanza resta un progetto aggiuntivo per sensori, raccolta dati e software.',
        },
      },
      {
        title: { en: '3 · Confirm the thesis fit', it: '3 · Verificare che sia una tesi' },
        detail: {
          en: 'Discuss a focused question with a UniPD supervisor before accepting. Ask the host about thesis eligibility, co-supervision, duration and lab access; several roles are internships unless this is agreed explicitly.',
          it: 'Concordare una domanda di ricerca circoscritta con un relatore UniPD prima di accettare. Chiedere all’ente ospitante se è possibile fare la tesi, come funziona la co-supervisione, la durata e l’accesso al laboratorio: diversi ruoli sono tirocini, salvo accordi espliciti.',
        },
      },
      {
        title: { en: '4 · Apply with a clear proposal', it: '4 · Candidarsi con una proposta chiara' },
        detail: {
          en: 'Tailor the CV and motivation letter to each topic, show one measured or verified result, then prepare for the matching interview track. Check each posting again for current status and deadlines before applying.',
          it: 'Adattare CV e lettera motivazionale a ogni tema, mostrare un risultato misurato o verificato e prepararsi al colloquio della relativa area. Ricontrollare stato e scadenze dell’offerta prima di candidarsi.',
        },
      },
    ],
    note: {
      en: 'Keep spending low: start with the existing Arduino Nano, Raspberry Pi and university lab equipment. Add a genuine NDIR CO₂ sensor for the LED ventilation alert; add a TFT and Spotify display only if a screen is already available or borrowed.',
      it: 'Contenere le spese: partire da Arduino Nano, Raspberry Pi e strumenti del laboratorio universitario già disponibili. Aggiungere un vero sensore CO₂ NDIR per l’avviso LED; TFT e Spotify solo se si può riutilizzare o prendere in prestito uno schermo.',
    },
  },
];
