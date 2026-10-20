// Single source for the facts shown on the site. Keep in sync with cv/cv.html, cv/cv-it.html and cv/resume.json.

export type Lang = 'en' | 'it';
export type Text = Record<Lang, string>;

export const contact = {
  email: 'mustafaraj.daniel2002@gmail.com',
  phone: '+39 391 359 2913',
  github: 'https://github.com/danielmustafaraj02',
  linkedin: 'https://www.linkedin.com/in/daniel-mustafaraj-63b1b4247/',
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
      en: 'Optoelectronic and Photovoltaic Devices (30/30), Physics and Optics at the Nanoscale and Nanophotonics and Metasurfaces (in progress)',
      it: 'Optoelectronic and Photovoltaic Devices (30/30), Physics and Optics at the Nanoscale e Nanophotonics and Metasurfaces (in corso)',
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
      en: 'Verilog and FPGA programming on a Tang Nano 9K board, on top of a Computer Engineering background',
      it: 'Verilog e programmazione FPGA su scheda Tang Nano 9K, su una base di Ingegneria Informatica',
    },
  },
  {
    title: { en: 'Power electronics & analogue IC design', it: 'Elettronica di potenza e circuiti integrati analogici' },
    evidence: {
      en: 'Both courses in progress this semester',
      it: 'Sto seguendo entrambi i corsi in questo semestre',
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
      { en: 'Database management systems (DBMS)', it: 'Sistemi di gestione di basi di dati (DBMS)' },
    ],
  },
];

export type Project = { title: Text; when: string; summary: Text; tags: string[]; link?: string };

// Add projects here; the Projects section appears as soon as this list is not empty.
export const projects: Project[] = [];
