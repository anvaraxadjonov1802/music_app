import styles from './note-strip.module.css';

const notes = [
  ['do', styles.pink],
  ['re', styles.blue],
  ['mi', styles.pink],
  ['fa', styles.green],
  ['sol', styles.orange],
  ['lya', styles.blueFill],
  ['si', styles.greenFill],
] as const;

function StaffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6.5h16M4 9h16M4 11.5h16M4 14h16M4 16.5h16" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" opacity=".42" />
      <path d="M13.7 4.25v10.1a2.65 2.65 0 1 1-1.5-2.39V6.4l5.05-1.2v7.1a2.65 2.65 0 1 1-1.5-2.39V3.7l-2.05.55Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg className={styles.noteIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9.5 18.25a3.25 3.25 0 1 1-2.1-3.04V6.4l9.1-2.1v10.2a3.25 3.25 0 1 1-2.1-3.04V7.1L9.5 8.2v10.05Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NoteStrip() {
  return (
    <section className={styles.strip} aria-label="Nota nomlari">
      <div className={styles.inner}>
        <strong className={styles.heading}>
          <span className={styles.headingIcon}><StaffIcon /></span>
          <span>NOTALAR BILAN DO&apos;STLASHING:</span>
        </strong>
        <div className={styles.list}>
          {notes.map(([note, tone]) => (
            <span className={`${styles.chip} ${tone}`} key={note}>
              <NoteIcon />
              <span>{note}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
