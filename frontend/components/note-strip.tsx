import styles from './note-strip.module.css';

const notes = [
  ['do', '1', styles.pink],
  ['re', '2', styles.blue],
  ['mi', '3', styles.pink],
  ['fa', '4', styles.green],
  ['sol', '5', styles.orange],
  ['lya', '6', styles.blueFill],
  ['si', '7', styles.greenFill],
] as const;

export function NoteStrip() {
  return (
    <section className={styles.strip} aria-label="Nota nomlari">
      <div className={styles.inner}>
        <div className={styles.headingBlock}>
          <span className={styles.kicker}>SOLFEDJIO ALIFBOSI</span>
          <strong className={styles.heading}>Notalar bilan do&apos;stlashing</strong>
          <span className={styles.subheading}>DO dan SI gacha — 7 ta asosiy nota</span>
        </div>

        <div className={styles.list}>
          {notes.map(([note, degree, tone]) => (
            <span className={`${styles.chip} ${tone}`} key={note}>
              <span className={styles.degree}>{degree}</span>
              <span className={styles.noteName}>{note}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
