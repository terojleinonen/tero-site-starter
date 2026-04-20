export function SectionHeading({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mb-8">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>
      {text ? <p className="mt-4 max-w-3xl text-lg leading-8 text-white/65">{text}</p> : null}
    </div>
  );
}
