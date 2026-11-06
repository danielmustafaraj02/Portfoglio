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
  image?: string;
  status?: Text;
  workflow?: { title: Text; detail: Text }[];
  note?: Text;
  setup?: { title: Text; steps: Text[] }[];
  code?: { label: Text; lang: string; src: string }[];
};

export const projects: Project[] = [
  {
    title: { en: 'Room CO\u2082 alert monitor', it: 'Monitoraggio CO\u2082 ambientale' },
    when: '2025',
    status: { en: 'Completed', it: 'Completato' },
    image: '/projects/co2-monitor.png',
    summary: {
      en: 'A real-time indoor air-quality monitor that reads CO\u2082, temperature and humidity from an SCD41 sensor and shows the values on the desktop wallpaper with an instant red alert when ventilation is needed.',
      it: 'Un monitor in tempo reale della qualit\u00e0 dell\u2019aria indoor che legge CO\u2082, temperatura e umidit\u00e0 da un sensore SCD41 e mostra i valori sul desktop con un allarme rosso immediato quando serve ventilare.',
    },
    tags: ['Arduino Nano', 'SCD41', 'Python', 'GNOME', 'Air quality'],
    workflow: [
      {
        title: { en: '1 \u00b7 Sense the room', it: '1 \u00b7 Misurare la stanza' },
        detail: {
          en: 'The Arduino Nano reads the SCD41 sensor over I2C and sends CO\u2082, temperature and humidity every 5 s through the serial port at 115\u202f200 baud.',
          it: 'L\u2019Arduino Nano legge il sensore SCD41 via I2C e invia ogni 5\u00a0s i valori di CO\u2082, temperatura e umidit\u00e0 tramite seriale a 115\u202f200 baud.',
        },
      },
      {
        title: { en: '2 \u00b7 Turn data into a live alert', it: '2 \u00b7 Trasformare i dati in un allarme live' },
        detail: {
          en: 'A Python service parses the serial stream, renders a wallpaper image with the latest values and a 24-hour chart, and fires a desktop notification when the CO\u2082 threshold is crossed.',
          it: 'Un servizio Python analizza il flusso seriale, genera un\u2019immagine di sfondo con i valori aggiornati e un grafico delle ultime 24\u00a0ore, e invia una notifica desktop quando viene superata la soglia di CO\u2082.',
        },
      },
      {
        title: { en: '3 \u00b7 Keep the system useful', it: '3 \u00b7 Mantenere il sistema utile' },
        detail: {
          en: 'The script saves the original wallpaper and restores it on exit, reconnects automatically if the board is unplugged, and persists a 24-hour history to a JSON file so the chart survives restarts.',
          it: 'Lo script salva lo sfondo originale e lo ripristina all\u2019uscita, si riconnette automaticamente se la scheda viene scollegata, e salva la cronologia delle ultime 24\u00a0ore in un file JSON cos\u00ec il grafico sopravvive ai riavvii.',
        },
      },
    ],
    note: {
      en: 'High CO\u2082 levels reduce focus, comfort and air quality. A simple visual warning on the wallpaper makes it easy to ventilate before the air becomes stale.',
      it: 'Alti livelli di CO\u2082 riducono concentrazione, comfort e qualit\u00e0 dell\u2019aria. Un semplice avviso visivo sullo sfondo rende facile ventilare prima che l\u2019aria diventi stantia.',
    },
    setup: [
      {
        title: { en: 'Hardware', it: 'Hardware' },
        steps: [
          { en: 'Arduino Nano \u2192 SCD41: VIN\u21925V  GND\u2192GND  SDA\u2192A4  SCL\u2192A5', it: 'Arduino Nano \u2192 SCD41: VIN\u21925V  GND\u2192GND  SDA\u2192A4  SCL\u2192A5' },
          { en: 'Connect the Nano to the PC via USB (shows up as /dev/ttyUSB0)', it: 'Collegare il Nano al PC via USB (appare come /dev/ttyUSB0)' },
          { en: 'Flash scd41_nano.ino with the Sensirion I2C SCD4x library installed in the Arduino IDE', it: 'Caricare scd41_nano.ino con la libreria Sensirion I2C SCD4x installata nell\u2019IDE Arduino' },
        ],
      },
      {
        title: { en: 'Software', it: 'Software' },
        steps: [
          { en: 'pip install pyserial pillow', it: 'pip install pyserial pillow' },
          { en: 'python co2_monitor.py  (or add as a systemd user service for autostart)', it: 'python co2_monitor.py  (oppure aggiungere come servizio systemd utente per l\u2019avvio automatico)' },
          { en: 'Thresholds: green < 1000\u00a0ppm \u00b7 orange 1000\u20132000 \u00b7 red \u2265\u20092000 \u2014 edit CO2_SAFE / CO2_WARNING at the top of the script', it: 'Soglie: verde < 1000\u00a0ppm \u00b7 arancione 1000\u20132000 \u00b7 rosso \u2265\u20092000 \u2014 modificare CO2_SAFE / CO2_WARNING in cima allo script' },
        ],
      },
    ],
    code: [
      {
        label: { en: 'Arduino sketch (scd41_nano.ino)', it: 'Sketch Arduino (scd41_nano.ino)' },
        lang: 'cpp',
        src: `#include <SensirionI2cScd4x.h>
#include <Wire.h>

SensirionI2cScd4x sensor;

void setup() {
  Serial.begin(115200);
  Wire.begin();
  sensor.begin(Wire, SCD41_I2C_ADDR_62);
  sensor.wakeUp();
  sensor.stopPeriodicMeasurement();
  sensor.reinit();
  sensor.startPeriodicMeasurement();
}

void loop() {
  delay(5000);
  bool ready = false;
  sensor.getDataReadyStatus(ready);
  if (!ready) return;

  uint16_t co2; float temp, hum;
  sensor.readMeasurement(co2, temp, hum);
  Serial.print("CO2: ");   Serial.print(co2);  Serial.println(" ppm");
  Serial.print("Temperature: "); Serial.println(temp);
  Serial.print("Humidity: ");    Serial.println(hum);
  Serial.println();
}`,
      },
      {
        label: { en: 'Python service \u2014 key logic (co2_monitor.py)', it: 'Servizio Python \u2014 logica principale (co2_monitor.py)' },
        lang: 'python',
        src: `CO2_SAFE    = 1000   # ppm \u2192 green
CO2_WARNING = 2000   # ppm \u2192 red

def level_color(val):
    if val >= CO2_WARNING: return ACCENT_ALERT   # red
    if val >= CO2_SAFE:    return ACCENT_WARN    # orange
    return ACCENT_SAFE                           # green

def render_wallpaper(co2, temp, humidity, level, readings):
    img  = Image.new("RGB", (1920, 1080), BG)
    draw = ImageDraw.Draw(img)
    accent = [ACCENT_SAFE, ACCENT_WARN, ACCENT_ALERT][level]
    draw.text((960, 330), str(co2), fill=accent, font=F_BIG, anchor="mm")
    draw.text((960, 440), "ppm CO\u2082", fill=TEXT_DIM, font=F_UNIT, anchor="mm")
    draw_graph(draw, readings, ...)   # 24-hour sparkline
    img.save(WALLPAPER_FILE)
    set_wallpaper(WALLPAPER_FILE)     # gsettings set \u2026 picture-uri

# On threshold crossing \u2192 desktop notification
notify("CO2 Alert!", f"{co2} ppm \u2014 ventilate now", urgency="critical")`,
      },
    ],
  },
];
