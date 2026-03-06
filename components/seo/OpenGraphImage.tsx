interface OpenGraphImageProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function OpenGraphImage({
  eyebrow = "CRASH Lab",
  title,
  description
}: OpenGraphImageProps): React.ReactElement {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-[#0A0F1E] p-16 text-white">
      <p className="text-2xl uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</p>
      <div>
        <h1 className="max-w-4xl text-7xl font-semibold">{title}</h1>
        {description ? <p className="mt-6 max-w-3xl text-3xl text-slate-300">{description}</p> : null}
      </div>
      <p className="text-2xl text-slate-400">Responsible AI for Healthcare</p>
    </div>
  );
}
