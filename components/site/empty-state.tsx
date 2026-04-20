export function EmptyState({
  title,
  text
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="card px-6 py-8">
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-4 max-w-2xl leading-7 text-white/65">{text}</p>
    </div>
  );
}
