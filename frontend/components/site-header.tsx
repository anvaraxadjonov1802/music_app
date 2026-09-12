import Link from 'next/link';

type HeaderMode = 'landing' | 'course' | 'lesson';

type SiteHeaderProps = {
  mode?: HeaderMode;
  activeLesson?: 1 | 2 | 3;
};

export function SiteHeader({ mode = 'landing', activeLesson }: SiteHeaderProps) {
  const isLanding = mode === 'landing';

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Solfedjio bosh sahifa">
        <span className="brand-mark" aria-hidden="true">♫</span>
        <span>Solfedjio</span>
      </Link>

      <nav className="main-nav" aria-label="Asosiy navigatsiya">
        <Link className={!activeLesson ? 'nav-pill active' : 'nav-pill'} href="/">
          Bosh sahifa
        </Link>
        {isLanding ? (
          <>
            <Link href="/#courses">Darslar</Link>
            <Link href="/#teachers">O&apos;qituvchilar</Link>
            <Link href="/#pricing">Narxlar</Link>
            <Link href="/#contact">Bog&apos;lanish</Link>
          </>
        ) : (
          <>
            <Link className={activeLesson === 1 ? 'nav-pill lesson-active' : 'nav-pill'} href="/dars/1">1-Dars</Link>
            <Link className={activeLesson === 2 ? 'nav-pill lesson-active' : 'nav-pill'} href="/dars/2">2-Dars</Link>
            <Link className={activeLesson === 3 ? 'nav-pill lesson-active' : 'nav-pill'} href="/dars/3">3-Dars</Link>
          </>
        )}
      </nav>

      <div className="header-actions">
        <Link className="text-link" href="/kurs/1">Kirish</Link>
        <Link className="gradient-button compact" href="/kurs/1">Ro&apos;yxatdan o&apos;tish</Link>
      </div>
    </header>
  );
}
