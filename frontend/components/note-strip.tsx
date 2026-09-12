const notes = [
  ['do', 'pink'],
  ['re', 'blue'],
  ['mi', 'pink'],
  ['fa', 'green'],
  ['sol', 'orange'],
  ['lya', 'blue-fill'],
  ['si', 'green-fill'],
] as const;

export function NoteStrip() {
  return (
    <section className="note-strip" aria-label="Nota nomlari">
      <div className="note-strip-inner">
        <strong>🎼 NOTALAR BILAN DO&apos;STLASHING:</strong>
        <div className="note-list">
          {notes.map(([note, tone]) => (
            <span className={`note-chip ${tone}`} key={note}>♫ {note}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
