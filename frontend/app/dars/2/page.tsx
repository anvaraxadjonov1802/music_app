import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { figmaAssets } from '@/lib/figma-assets';
import styles from './lesson-two.module.css';

const whiteKeys = Array.from({ length: 21 }, (_, index) => ({
  id: index,
  tone: index < 7 ? styles.lowKeys : index < 14 ? styles.middleKeys : styles.highKeys,
}));

const blackKeyPositions = [5.2, 9.8, 19, 23.5, 28.1, 37.3, 41.8, 51, 55.6, 60.1, 69.3, 73.9, 83, 87.6];

const registerCards = [
  { emoji: '🐻', title: 'Past Registr', action: '▶ Past tovush', source: 'audio1.wav', tone: styles.lowCard },
  { emoji: '🐱', title: "O‘rta Registr", action: "▶ O‘rta tovush", source: 'audio2.wav', tone: styles.middleCard },
  { emoji: '🐦', title: 'Yuqori Registr', action: '▶ Yuqori tovush', source: 'audio3.wav', tone: styles.highCard },
] as const;

export default function LessonTwoPage() {
  return (
    <main className={styles.page}>
      <SiteHeader mode="lesson" activeLesson={2} />

      <section className={styles.strip}>
        <small>1-SINF › MUSIQA NAZARIYASI › 2-DARS</small>
        <strong>Registr 🎵</strong>
      </section>

      <section className={styles.main}>
        <div className={styles.titleRow}>
          <span className={styles.titleIcon} aria-hidden="true">♬</span>
          <div className={styles.titleCopy}>
            <h1>2-DARS. Registr.</h1>
            <p>
              Musiqiy tovushlar yangrashiga ko&apos;ra baland va past bo&apos;lishi mumkin. Balandligiga ko&apos;ra bir biriga yaqin tovushlar{' '}
              <span className={styles.low}>past</span>, <span className={styles.middle}>o&apos;rta</span> va <span className={styles.high}>yuqori</span> registrni hosil qiladi.
            </p>
          </div>
        </div>

        <figure className={styles.animalStage}>
          <img src={figmaAssets.lessonTwoAnimals} alt="Past, o‘rta va yuqori registrni ayiq, mushuk va qush orqali ko‘rsatuvchi rasm" />
        </figure>

        <div className={styles.keyboard} aria-label="Past, o‘rta va yuqori registrlarga rang bilan ajratilgan klaviatura">
          <div className={styles.whiteKeys}>
            {whiteKeys.map((key) => <span className={`${styles.whiteKey} ${key.tone}`} key={key.id} />)}
          </div>
          {blackKeyPositions.map((left, index) => (
            <span className={styles.blackKey} style={{ left: `${left}%` }} key={index} />
          ))}
        </div>

        <div className={styles.audioRow} aria-label="Registr audio misollari">
          {registerCards.map((card) => (
            <article className={`${styles.audioCard} ${card.tone}`} key={card.title} data-source-audio={card.source}>
              <span className={styles.animalCircle} aria-hidden="true">{card.emoji}</span>
              <strong className={styles.audioTitle}>{card.title}</strong>
              <button className={styles.playPill} type="button" aria-label={`${card.title} manba audiosi`} title="Manba audio playback autentifikatsiya integratsiyasi bilan ulanadi">
                {card.action}
              </button>
            </article>
          ))}
        </div>
      </section>

      <Link className={`${styles.fab} ${styles.prev}`} href="/dars/1" aria-label="1-darsga qaytish">←</Link>
      <Link className={`${styles.fab} ${styles.next}`} href="/dars/3" aria-label="3-darsga o‘tish">→</Link>
    </main>
  );
}
