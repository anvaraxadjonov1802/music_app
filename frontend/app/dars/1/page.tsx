import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { figmaAssets } from '@/lib/figma-assets';

const lessonNotes = [
  ['do', 'pink'],
  ['re', 'blue'],
  ['mi', 'pink'],
  ['fa', 'green'],
  ['sol', 'orange'],
  ['lya', 'blue-fill'],
  ['si', 'green-fill'],
] as const;

export default function LessonOnePage() {
  return (
    <main className="lesson-page">
      <SiteHeader mode="lesson" activeLesson={1} />

      <section className="lesson-strip">
        <small>1-SINF › MUSIQA NAZARIYASI › 1-DARS</small>
        <strong>Solfedjio nima? 🎶</strong>
      </section>

      <section className="lesson-main">
        <div className="lesson-left">
          <article className="lesson-card">
            <div className="lesson-card-head">
              <div className="lesson-card-title">
                <span className="round-icon" aria-hidden="true">📖</span>
                <h2>Atama ta&apos;rifi</h2>
              </div>
            </div>
            <p><strong>Solfedjio</strong> – bu musiqada qo&apos;llaniladigan atama bo&apos;lib, italyancha <span className="pink-text">“Solfeggio”</span> ya&apos;ni <span className="blue-text">“sol”</span> va <span className="blue-text">“fa”</span> notalari nomidan kelib chiqadi. U notaga qarab kuylash ma&apos;nosini anglatadi.</p>
          </article>

          <article className="lesson-card history">
            <div className="lesson-card-head">
              <div className="lesson-card-title">
                <span className="round-icon orange" aria-hidden="true">✨</span>
                <h2>Bu qiziq!</h2>
              </div>
              <span className="fact-pill">Tarixiy fakt</span>
            </div>
            <p>Solfedjioning fan sifatida shakllanishi <strong>9 asrda</strong> yashab ijod qilgan italiyalik musiqashunos <span className="orange-text">Gvido de Aresso</span> nomi bilan bog&apos;liq. Aynan u nota tizimini yaratib notalarni nomlaydi.</p>
          </article>

          <div className="lesson-notes" aria-label="Nota nomlari">
            <strong>🎵 Notalar:</strong>
            {lessonNotes.map(([note, tone]) => <span className={`note-chip ${tone}`} key={note}>{note}</span>)}
          </div>
        </div>

        <aside className="lesson-art-card">
          <img src={figmaAssets.lessonOneHistorical} alt="Gvido de Aresso va uning shogirdlari" />
          <div className="lesson-caption">
            <span className="caption-icon" aria-hidden="true">🎼</span>
            <div><strong>Gvido de Aresso va uning nota tizimi</strong><small>Ut queant laxis · notalarga asos bo&apos;lgan qadimiy madhiya · IX asr</small></div>
          </div>
          <div className="lesson-progress">
            <div className="progress-row"><span>Dars progressi</span><span className="progress-pill">1 / 12 dars</span></div>
            <div className="progress-track"><div className="progress-fill" /></div>
          </div>
        </aside>
      </section>

      <Link className="lesson-fab prev" href="/kurs/1" aria-label="Kurs boshiga qaytish">←</Link>
      <Link className="lesson-fab next" href="/dars/2" aria-label="2-darsga o‘tish">→</Link>
    </main>
  );
}
