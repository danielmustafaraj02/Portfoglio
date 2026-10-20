import { useEffect, useRef, useState } from 'react';
import { useOnScreen, useReducedMotion } from './useMotion';

const accentColor = () => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#3df08a';

/** Re-reads the accent colour whenever the light/dark scheme flips, so canvas drawing follows the theme. */
function useAccent() {
  const [accent, setAccent] = useState(accentColor);
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: light)');
    const update = () => setAccent(accentColor());
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return accent;
}

const SWEEP_SECONDS = 4.5;
const CYCLES = 2.5;
const HARMONICS = 6;

/** A function-generator signal that slowly morphs sine -> square -> sine; the truncated square shows Gibbs ringing like a real probe. */
function signal(x: number, seconds: number) {
  const morph = 0.5 + 0.5 * Math.sin(seconds * 0.45 - 1.2);
  const phase = 2 * Math.PI * CYCLES * x;
  let y = 0;
  for (let k = 0; k < HARMONICS; k++) y += (morph ** k * Math.sin((2 * k + 1) * phase)) / (2 * k + 1);
  return y * (1 - 0.18 * morph) + (Math.random() - 0.5) * 0.05;
}

/** Oscilloscope strip: a beam sweeps left to right writing the trace, which fades like phosphor until the beam comes round again. */
export function ScopeTrace() {
  const [ref, running] = useOnScreen<HTMLDivElement>();
  const reduced = useReducedMotion();
  const accent = useAccent();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext('2d');
    if (!el || !ctx || (!reduced && !running)) return;

    let width = 0;
    let height = 0;
    let samples = new Float32Array(0);
    let written = new Uint8Array(0);
    let head = 0;
    let seconds = 0;
    let last = performance.now();
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = el.clientWidth;
      height = el.clientHeight;
      el.width = Math.round(width * dpr);
      el.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(2, Math.floor(width / 2));
      samples = new Float32Array(count);
      written = new Uint8Array(count);
      head = 0;
      if (reduced) {
        for (let i = 0; i < count; i++) samples[i] = signal(i / count, 4);
        written.fill(1);
      }
      if (reduced) draw();
    };

    const draw = () => {
      const count = samples.length;
      ctx.clearRect(0, 0, width, height);
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.strokeStyle = accent;
      ctx.fillStyle = accent;
      ctx.shadowColor = accent;
      ctx.shadowBlur = 7;
      ctx.lineWidth = 1.6;
      const px = (i: number) => (i / (count - 1)) * width;
      const py = (i: number) => height / 2 - samples[i] * height * 0.36;

      // Bucket segments by age so each brightness level is a single path instead of hundreds of strokes.
      const BUCKETS = 14;
      const paths = Array.from({ length: BUCKETS }, () => new Path2D());
      for (let i = 1; i < count; i++) {
        if (!written[i] || !written[i - 1] || i === Math.floor(head) + 1) continue;
        const age = reduced ? 0 : ((head - i + count) % count) / count;
        const path = paths[Math.min(BUCKETS - 1, Math.floor(age * BUCKETS))];
        path.moveTo(px(i - 1), py(i - 1));
        path.lineTo(px(i), py(i));
      }
      for (let b = BUCKETS - 1; b >= 0; b--) {
        ctx.globalAlpha = reduced ? 1 : 0.16 + 0.84 * (1 - (b + 0.5) / BUCKETS) ** 2.4;
        ctx.stroke(paths[b]);
      }

      if (!reduced) {
        const i = Math.min(count - 1, Math.floor(head));
        const x = px(i);
        const y = py(i);
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(x, y, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      seconds += dt;
      const count = samples.length;
      const from = Math.floor(head);
      head += (dt / SWEEP_SECONDS) * count;
      const to = Math.floor(head);
      for (let i = from; i <= to; i++) {
        const index = i % count;
        samples[index] = signal(index / (count - 1), seconds);
        written[index] = 1;
      }
      head %= count;
      draw();
      frame = requestAnimationFrame(tick);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    if (!reduced) frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [reduced, running, accent]);

  return (
    <div ref={ref} className="scope" aria-hidden="true">
      <div className="scope-screen">
        <canvas ref={canvas} />
      </div>
    </div>
  );
}

const GLYPHS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789';
const CELL = 18;

/** Matrix digital rain on a fixed layer behind the page. Skipped entirely under reduced motion. */
export function MatrixRain() {
  const reduced = useReducedMotion();
  const accent = useAccent();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext('2d');
    if (reduced || !el || !ctx) return;

    let columns: { row: number; speed: number; glyph: string }[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;

    const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      el.width = Math.round(width * dpr);
      el.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${CELL - 4}px "IBM Plex Mono", ui-monospace, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      columns = Array.from({ length: Math.ceil(width / CELL) }, () => ({
        row: -Math.random() * (height / CELL),
        speed: 0.18 + Math.random() * 0.4,
        glyph: randomGlyph(),
      }));
      ctx.clearRect(0, 0, width, height);
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (document.hidden || now - last < 45) return;
      last = now;
      // Fade what is already on the layer; destination-out keeps the canvas transparent so the page background shows through.
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';
      columns.forEach((column, i) => {
        const before = Math.floor(column.row);
        column.row += column.speed;
        const row = Math.floor(column.row);
        if (row === before) return;
        const x = i * CELL + CELL / 2;
        // Re-ink the previous head in the trail colour, then draw the new head brighter.
        if (before >= 0) {
          ctx.clearRect(x - CELL / 2, before * CELL, CELL, CELL);
          ctx.fillStyle = accent;
          ctx.fillText(column.glyph, x, before * CELL + CELL / 2);
        }
        column.glyph = randomGlyph();
        if (row >= 0) {
          ctx.clearRect(x - CELL / 2, row * CELL, CELL, CELL);
          ctx.fillStyle = '#eafff1';
          ctx.fillText(column.glyph, x, row * CELL + CELL / 2);
        }
        if (row * CELL > height && Math.random() > 0.96) {
          column.row = -Math.random() * 12;
          column.speed = 0.18 + Math.random() * 0.4;
        }
      });
    };

    resize();
    window.addEventListener('resize', resize);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [reduced, accent]);

  if (reduced) return null;
  return <canvas ref={canvas} className="matrix-rain" aria-hidden="true" />;
}

const TYPE_MS = 55;
const DELETE_MS = 26;
const HOLD_MS = 1700;
const GAP_MS = 350;
const START_DELAY_MS = 1100;

/** Types each phrase, holds it, deletes it, moves on. Screen readers get `fullText` instead. */
export function Typewriter({ prefix, phrases, fullText }: { prefix: string; phrases: string[]; fullText: string }) {
  const reduced = useReducedMotion();
  const [ref, running] = useOnScreen<HTMLParagraphElement>();
  const [state, setState] = useState({ index: 0, length: 0, deleting: false, started: false });

  useEffect(() => {
    if (reduced || !running) return;
    const phrase = phrases[state.index % phrases.length];
    let delay: number;
    let next: typeof state;
    if (!state.started) {
      delay = START_DELAY_MS;
      next = { ...state, started: true };
    } else if (!state.deleting && state.length < phrase.length) {
      delay = TYPE_MS + Math.random() * 40;
      next = { ...state, length: state.length + 1 };
    } else if (!state.deleting) {
      delay = HOLD_MS;
      next = { ...state, deleting: true };
    } else if (state.length > 0) {
      delay = DELETE_MS;
      next = { ...state, length: state.length - 1 };
    } else {
      delay = GAP_MS;
      next = { index: state.index + 1, length: 0, deleting: false, started: true };
    }
    const timer = window.setTimeout(() => setState(next), delay);
    return () => window.clearTimeout(timer);
  }, [state, phrases, reduced, running]);

  if (reduced) return <p className="status">{fullText}</p>;

  const phrase = phrases[state.index % phrases.length];
  const busy = state.started && (state.deleting || state.length < phrase.length);
  return (
    <p ref={ref} className="status">
      <span className="sr-only">{fullText}</span>
      <span aria-hidden="true">
        {prefix}
        <span className="typed-line">
          <em className="typed">{phrase.slice(0, state.length)}</em>
          <span className={`caret${busy ? ' is-busy' : ''}`} />
        </span>
      </span>
    </p>
  );
}
