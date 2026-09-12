import styles from './note-strip.module.css';

const notes = [
  ['do', '1', styles.do, styles.pink],
  ['re', '2', styles.re, styles.blue],
  ['mi', '3', styles.mi, styles.pink],
  ['fa', '4', styles.fa, styles.green],
  ['sol', '5', styles.sol, styles.orange],
  ['lya', '6', styles.lya, styles.blue],
  ['si', '7', styles.si, styles.green],
] as const;

export function NoteStrip() {
  return (
    <section className={styles.strip} aria-label="Do dan Si gacha nota qatori">
      <div className={styles.inner}>
        <div className={styles.headingBlock}>
          <span className={styles.kicker}>SOLFEDJIO ALIFBOSI</span>
          <strong className={styles.heading}>Notalar bilan do&apos;stlashing</strong>
          <span className={styles.subheading}>DO dan SI gacha — 7 ta asosiy nota</span>
        </div>

        <div className={styles.staffStage} aria-label="Do Re Mi Fa Sol Lya Si nota qatori">
          <div className={styles.staffLines} aria-hidden="true">
            <span /><span /><span /><span /><span />
          </div>

          <div className={styles.noteRow}>
            {notes.map(([note, degree, position, tone]) => (
              <div className={`${styles.noteItem} ${position} ${tone}`} key={note}>
                <span className={styles.noteMark} aria-hidden="true" />
                <span className={styles.noteLabel}>
                  <small>{degree}</small>
                  <strong>{note}</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
