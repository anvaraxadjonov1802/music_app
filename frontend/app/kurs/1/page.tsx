import Link from 'next/link';
import { NoteStrip } from '@/components/note-strip';
import { SiteHeader } from '@/components/site-header';
import { figmaAssets } from '@/lib/figma-assets';

function WaveBars() {
  const heights = [12, 28, 20, 36, 16, 24, 32, 14, 20];
  return <div className="wave-bars" aria-hidden="true">{heights.map((height, index) => <i key={index} style={{ height }} />)}</div>;
}

export default function GradeOneCoursePage() {
  return (
    <main className="course-cover">
      <SiteHeader mode="course" />

      <section className="cover-hero">
        <div className="cover-copy">
          <div className="cover-badges">
            <span className="badge pink">🎵 1-SINF DARSLIGI</span>
            <span className="badge blue">Musiqa va san&apos;at maktablari uchun</span>
          </div>

          <div>
            <h1 className="cover-title">Solfedjio fani <span>olamiga marhamat!</span></h1>
            <p className="hero-lead" style={{ marginTop: 20 }}>Bolalar musiqa va san&apos;at maktablarining 1-sinf o&apos;quvchilari uchun maxsus ishlab chiqilgan qiziqarli, zamonaviy va interaktiv ta&apos;lim platformasi. Notalarni qo&apos;shiq va o&apos;yinlar orqali oson o&apos;rganing!</p>
          </div>

          <div className="hero-actions">
            <Link className="gradient-button" href="/dars/1">🚀 Darsni boshlash</Link>
            <Link className="outline-button" href="/">Dastur haqida</Link>
          </div>

          <div className="cover-tags">
            <span className="soft-tag green">✓ Interaktiv mashqlar</span>
            <span className="soft-tag blue">♫ Vizual notalar</span>
            <span className="soft-tag orange">🏅 Milliy dastur</span>
          </div>
        </div>

        <div className="cover-media">
          <img src={figmaAssets.coverVisual} alt="Solfedjio 1-sinf vizual darsi" />
          <div className="cover-wave">
            <div className="cover-wave-copy">
              <span className="play-dot" aria-hidden="true">▶</span>
              <div><strong>Gammani to&apos;g&apos;ri tinglang</strong><small>Solfedjio 1-sinf mashg&apos;uloti</small></div>
            </div>
            <WaveBars />
          </div>
        </div>
      </section>

      <NoteStrip />
    </main>
  );
}
