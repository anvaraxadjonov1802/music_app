'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import styles from './lesson-three.module.css';

const NOTES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'Lya', 'Si'] as const;
const BLACK_AFTER = [0, 1, 3, 4, 5];
const OCTAVES = ['Sub kontr', 'Kontr oktava', 'Katta oktava', 'Kichik oktava', 'Birinchi oktava', 'Ikkinchi oktava', 'Uchinchi oktava', 'To‘rtinchi oktava'] as const;

const NOTE_AUDIO = [
  ['Do', 'audio10.wav'],
  ['Re', 'audio4.wav'],
  ['Mi', 'audio5.wav'],
  ['Fa', 'audio6.wav'],
  ['Sol', 'audio7.wav'],
  ['Lya', 'audio8.wav'],
  ['Si', 'audio9.wav'],
] as const;

type QuizOption = { id: string; label: string; correct: boolean };
type Quiz = {
  id: string;
  number: number;
  prompt: string;
  options: QuizOption[];
  audio?: string[];
};

const QUIZZES: Quiz[] = [
  {
    id: 'octave-register',
    number: 1,
    prompt: '1 oktava notalari qaysi registrga kiradi?',
    options: [
      { id: 'middle', label: 'O‘rta registr', correct: true },
      { id: 'high', label: 'Yuqori registr', correct: false },
      { id: 'low', label: 'Pastki registr', correct: false },
    ],
  },
  {
    id: 'solfege',
    number: 2,
    prompt: 'Solfedjio bu — ?',
    options: [
      { id: 'keys', label: 'Oq va qora klavishlar ketma-ketligi', correct: false },
      { id: 'sing', label: 'Notadan kuylash', correct: true },
      { id: 'memory', label: 'Kuyni yoddan aytish', correct: false },
    ],
  },
  {
    id: 'melody-middle',
    number: 3,
    prompt: 'Kuy qaysi registrda yangradi?',
    audio: ['audio12.wav'],
    options: [
      { id: 'low', label: 'Pastki registr', correct: false },
      { id: 'high', label: 'Yuqori registr', correct: false },
      { id: 'middle', label: 'O‘rta registr', correct: true },
    ],
  },
  {
    id: 'birds',
    number: 4,
    prompt: 'Qushlar sayrashini qaysi registrda ifoda etsa bo‘ladi?',
    options: [
      { id: 'middle', label: 'O‘rta registr', correct: false },
      { id: 'high', label: 'Yuqori registr', correct: true },
      { id: 'low', label: 'Pastki registr', correct: false },
    ],
  },
  {
    id: 'melody-low',
    number: 5,
    prompt: 'Kuy qaysi registrda ijro etildi?',
    audio: ['audio11.wav', 'audio14.wav'],
    options: [
      { id: 'middle', label: 'O‘rta registr', correct: false },
      { id: 'high', label: 'Yuqori registr', correct: false },
      { id: 'low', label: 'Pastki registr', correct: true },
    ],
  },
];

function QuizCard({ quiz }: { quiz: Quiz }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const selectedOption = quiz.options.find((option) => option.id === selected);

  return (
    <article className={styles.quizCard}>
      <div className={styles.quizTop}>
        <span className={styles.quizNumber}>{quiz.number}</span>
        <span className={styles.quizBadge}>PPT mashqi</span>
      </div>
      <h3>{quiz.prompt}</h3>

      {quiz.audio?.length ? (
        <div className={styles.sourceAudioRow}>
          {quiz.audio.map((audio) => (
            <button key={audio} type="button" className={styles.sourceAudio} title="Manba audio web media integratsiyasi bilan ulanadi">
              ▶ Tinglash <small>{audio}</small>
            </button>
          ))}
        </div>
      ) : null}

      <div className={styles.quizOptions}>
        {quiz.options.map((option) => {
          const isSelected = selected === option.id;
          const isCorrect = checked && option.correct;
          const isWrong = checked && isSelected && !option.correct;
          return (
            <button
              type="button"
              key={option.id}
              disabled={checked}
              onClick={() => setSelected(option.id)}
              className={`${styles.quizOption} ${isSelected ? styles.selected : ''} ${isCorrect ? styles.correct : ''} ${isWrong ? styles.wrong : ''}`}
            >
              <span>{option.label}</span>
              <span className={styles.optionMark}>{isCorrect ? '✓' : isWrong ? '×' : isSelected ? '●' : '○'}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.quizFooter}>
        <button
          type="button"
          disabled={!selected || checked}
          className={styles.checkButton}
          onClick={() => setChecked(true)}
        >
          {checked ? 'Tekshirildi' : 'Javobni tekshirish'}
        </button>
        {checked ? (
          <p className={selectedOption?.correct ? styles.goodFeedback : styles.retryFeedback}>
            {selectedOption?.correct ? 'Barakalla! To‘g‘ri javob. ⭐' : `Yana bir eslab ol: to‘g‘ri javob — ${quiz.options.find((option) => option.correct)?.label}.`}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export default function LessonThreePage() {
  return (
    <main className={styles.page}>
      <SiteHeader mode="lesson" activeLesson={3} />

      <section className={styles.strip}>
        <small>1-SINF › MUSIQA NAZARIYASI › 3-DARS</small>
        <strong>Klaviatura 🎹</strong>
      </section>

      <section className={styles.main}>
        <div className={styles.titleRow}>
          <span className={styles.titleIcon} aria-hidden="true">🎹</span>
          <div className={styles.titleCopy}>
            <h1>3-DARS. Klaviatura.</h1>
            <p>Klaviatura — musiqa cholg‘u sozlarida ma’lum tartibda joylashgan oq va qora klavishlar majmui.</p>
          </div>
        </div>

        <section className={styles.keyboardCard}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrow}>7 TA ASOSIY NOTA</span>
              <h2>Oq klavishlarda notalarni topamiz</h2>
            </div>
            <div className={styles.noteOrder}>Do → Re → Mi → Fa → Sol → Lya → Si</div>
          </div>

          <div className={styles.keyboard} aria-label="Do, Re, Mi, Fa, Sol, Lya, Si notalari ko‘rsatilgan klaviatura">
            <div className={styles.whiteKeys}>
              {NOTES.map((note, index) => (
                <div className={styles.whiteKey} key={note}>
                  <span className={styles.noteDot}>{index + 1}</span>
                  <strong>{note}</strong>
                </div>
              ))}
            </div>
            {BLACK_AFTER.map((afterWhite) => (
              <span
                key={afterWhite}
                className={styles.blackKey}
                style={{ left: `${((afterWhite + 1) / 7) * 100}%` }}
              />
            ))}
          </div>

          <div className={styles.noteAudioGrid}>
            {NOTE_AUDIO.map(([note, source], index) => (
              <button key={note} type="button" className={styles.noteAudio} data-note-index={index} title="Manba audio web media integratsiyasi bilan ulanadi">
                <span>♪</span><strong>{note}</strong><small>{source}</small>
              </button>
            ))}
          </div>
        </section>

        <section className={styles.octaveCard}>
          <div className={styles.octaveCopy}>
            <span className={styles.eyebrow}>6-SLAYD</span>
            <h2>Kuy va oktavalar</h2>
            <p>Kuy — bu turli balandlikdagi tovushlarning ma’lum bir ritm va lad bilan uyg‘unlashgan holati.</p>
            <div className={styles.melodyAudioRow}>
              {['audio11.wav', 'audio12.wav', 'audio13.wav'].map((audio, index) => (
                <button key={audio} className={styles.melodyAudio} type="button" title="Manba audio web media integratsiyasi bilan ulanadi">
                  ▶ Namuna {index + 1}<small>{audio}</small>
                </button>
              ))}
            </div>
          </div>
          <div className={styles.octaveMap}>
            {OCTAVES.map((octave, index) => (
              <span key={octave} className={styles.octaveChip} data-level={index}>{octave}</span>
            ))}
          </div>
        </section>

        <section className={styles.exerciseSection}>
          <div className={styles.exerciseHead}>
            <div>
              <span className={styles.eyebrow}>7–11-SLAYDLAR</span>
              <h2>Mashqlar va testlar</h2>
              <p>Asl taqdimotdagi beshta test tushirib qoldirilmagan.</p>
            </div>
            <span className={styles.reviewBadge}>Javob kalitlari metodist tekshiruvida</span>
          </div>

          <div className={styles.quizGrid}>
            {QUIZZES.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)}
          </div>
        </section>
      </section>

      <Link className={`${styles.fab} ${styles.prev}`} href="/dars/2" aria-label="2-darsga qaytish">←</Link>
      <span className={`${styles.fab} ${styles.next} ${styles.nextDisabled}`} aria-label="4-dars keyingi bosqichda">→</span>
    </main>
  );
}
