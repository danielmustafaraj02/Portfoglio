import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import type { Lang } from './profile';
import { useReducedMotion } from './useMotion';
import { unlock, type Unlocked } from './vault';

const LENGTH = 4;
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'back'] as const;
type Key = (typeof KEYS)[number];
type Status = 'idle' | 'checking' | 'denied' | 'granted' | 'error';

const MIN_CHECK_MS = 450;
const DENIED_MS = 850;
const GRANTED_MS = 1300;

const ui = {
  en: {
    title: 'Enter the access code',
    status: { idle: 'Locked', checking: 'Verifying…', denied: 'Access denied', granted: 'Access granted', error: "Couldn't load. Try again" },
    entered: (n: number) => `${n} of ${LENGTH} digits entered`,
    keypad: 'Keypad',
    clear: 'Clear',
    back: 'Delete last digit',
    close: 'Close',
    hint: (linkedin: string) => <>My email, phone number and CV are locked. No code? <a href={linkedin} target="_blank" rel="noreferrer">Message me on LinkedIn</a>.</>,
  },
  it: {
    title: 'Inserisci il codice di accesso',
    status: { idle: 'Bloccato', checking: 'Verifica…', denied: 'Accesso negato', granted: 'Accesso consentito', error: 'Caricamento non riuscito. Riprova' },
    entered: (n: number) => `${n} cifre su ${LENGTH}`,
    keypad: 'Tastierino',
    clear: 'Cancella',
    back: "Cancella l'ultima cifra",
    close: 'Chiudi',
    hint: (linkedin: string) => <>Email, telefono e CV sono bloccati. Non hai il codice? <a href={linkedin} target="_blank" rel="noreferrer">Scrivimi su LinkedIn</a>.</>,
  },
};

/** Padlock; inside `.lock-panel.is-granted` the shackle lifts and swings open. */
export function LockIcon() {
  return (
    <svg className="lock-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path className="shackle" d="M8 11V7.5a4 4 0 0 1 8 0V11" />
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M12 15v2" />
    </svg>
  );
}

function BackspaceIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5h11a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H9l-6-7z" /><path d="m12 9.5 5 5m0-5-5 5" /></svg>
  );
}

const wait = (ms: number) => new Promise(resolve => window.setTimeout(resolve, ms));

/** Access-code keypad. Typing, pasting and the on-screen keys all work; `onClose` gets the unlocked data, or null if the visitor gave up. */
export function LockDialog({ lang, open, linkedin, onClose }: {
  lang: Lang;
  open: boolean;
  linkedin: string;
  onClose: (result: Unlocked | null) => void;
}) {
  const t = ui[lang];
  const reduced = useReducedMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [lit, setLit] = useState<Key | null>(null);
  const attempt = useRef(0);
  const granted = useRef<Unlocked | null>(null);
  const timer = useRef(0);
  const litTimer = useRef(0);

  useEffect(() => {
    const el = dialog.current;
    if (open && !el?.open) el?.showModal();
    else if (!open && el?.open) el.close();
  }, [open]);

  useEffect(() => () => {
    window.clearTimeout(timer.current);
    window.clearTimeout(litTimer.current);
  }, []);

  const check = async (value: string) => {
    const id = ++attempt.current;
    setStatus('checking');
    try {
      const [result] = await Promise.all([unlock(value), wait(reduced ? 0 : MIN_CHECK_MS)]);
      if (id !== attempt.current) return;
      if (result) {
        granted.current = result;
        setStatus('granted');
        timer.current = window.setTimeout(() => dialog.current?.close(), reduced ? GRANTED_MS / 2 : GRANTED_MS);
      } else {
        setStatus('denied');
        timer.current = window.setTimeout(() => {
          setCode('');
          setStatus('idle');
        }, DENIED_MS);
      }
    } catch {
      if (id !== attempt.current) return;
      setCode('');
      setStatus('error');
    }
  };

  const enter = (next: string) => {
    setCode(next);
    setStatus('idle');
    if (next.length === LENGTH) void check(next);
  };

  const busy = status === 'checking' || status === 'denied' || status === 'granted';
  const press = (key: Key) => {
    if (busy) return;
    if (key === 'clear') enter('');
    else if (key === 'back') enter(code.slice(0, -1));
    else if (code.length < LENGTH) enter(code + key);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const key: Key | null = /^[0-9]$/.test(e.key) ? (e.key as Key) : e.key === 'Backspace' ? 'back' : e.key === 'Delete' ? 'clear' : null;
    if (!key) return;
    e.preventDefault();
    press(key);
    // Light up the matching on-screen key so typing feels like pressing the pad.
    setLit(key);
    window.clearTimeout(litTimer.current);
    litTimer.current = window.setTimeout(() => setLit(null), 140);
  };

  const onPaste = (e: ClipboardEvent<HTMLDialogElement>) => {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '');
    if (!digits || busy) return;
    e.preventDefault();
    enter((code + digits).slice(0, LENGTH));
  };

  const onDialogClose = () => {
    const result = granted.current;
    granted.current = null;
    attempt.current++; // a check still running belongs to this session of the dialog; drop its result
    window.clearTimeout(timer.current);
    setCode('');
    setStatus('idle');
    onClose(result);
  };

  return (
    <dialog
      ref={dialog}
      className="lock-dialog"
      aria-labelledby="lock-title"
      onClose={onDialogClose}
      onClick={e => e.target === e.currentTarget && dialog.current?.close()}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
    >
      <div className={`lock-panel is-${status}`}>
        <LockIcon />
        <h2 id="lock-title">{t.title}</h2>
        <div className="lock-display" aria-hidden="true">
          {Array.from({ length: LENGTH }, (_, i) => (
            <span key={i} className={`lock-cell${i === code.length && status === 'idle' ? ' is-current' : ''}`}>{code[i] ?? ''}</span>
          ))}
        </div>
        <p className="lock-status" role="status">
          <span className="led" aria-hidden="true" />
          {t.status[status]}
          {status === 'idle' && <span className="sr-only">. {t.entered(code.length)}</span>}
        </p>
        {/* First focusable element, so showModal() puts focus on the pad */}
        <div className="keypad" role="group" aria-label={t.keypad}>
          {KEYS.map(key => (
            <button
              key={key}
              type="button"
              className={lit === key ? 'is-lit' : undefined}
              aria-label={key === 'clear' ? t.clear : key === 'back' ? t.back : undefined}
              onClick={() => press(key)}
            >
              {key === 'clear' ? 'C' : key === 'back' ? <BackspaceIcon /> : key}
            </button>
          ))}
        </div>
        <p className="lock-hint">{t.hint(linkedin)}</p>
        <form method="dialog">
          <button className="lock-close" aria-label={t.close}>
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </form>
      </div>
    </dialog>
  );
}
