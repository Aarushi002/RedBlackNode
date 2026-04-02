export function SplitWords({ text, className = '' }) {
  const words = text.split(' ')
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="word inline-block overflow-hidden align-baseline">
          <span className="inline-block">{word}</span>
          {i < words.length - 1 ? '\u00A0' : null}
        </span>
      ))}
    </span>
  )
}
