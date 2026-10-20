export function SectionHeading({
  index,
  title,
  description,
}: {
  index?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="max-w-3xl">
      <div className="flex items-center gap-3">
        {index ? <span className="chip">{index}</span> : null}
        <span className="rule flex-1" aria-hidden="true" />
      </div>
      <h2 className="display mt-5 text-[28px] leading-[1.1] text-ink sm:text-[38px]">{title}</h2>
      {description ? (
        <p className="mt-3 text-[14.5px] leading-7 text-muted">{description}</p>
      ) : null}
    </header>
  );
}
