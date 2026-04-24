const items = [
  {
    n: "01",
    h: "Benchmark inflation",
    b: "Public radiology benchmarks have saturated. New models report higher scores on tests that no longer reflect clinical reasoning.",
  },
  {
    n: "02",
    h: "Clinical reality gap",
    b: "In practice, frontier multimodal AI still misses the reasoning steps a trained radiologist performs automatically on difficult cases.",
  },
  {
    n: "03",
    h: "No accountable yardstick",
    b: "Hospitals, funders, and policy-makers need a reasoning-heavy benchmark that separates hype from signal and was built with real readers.",
  },
];

export function ProblemStrip(): React.ReactElement {
  return (
    <section className="border-t border-border py-12 lg:py-20" id="problem">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start">
          <div>
            <h2 className="mt-6 font-display text-4xl text-text-primary lg:mt-0 lg:text-5xl">
              The field has outgrown its benchmarks.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-text-secondary lg:justify-self-start">
            RadLE exists because the tests currently used to decide whether healthcare AI is
            ready for the clinic stopped measuring the hard part.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {items.map((item) => (
            <article className="border-t border-border pt-6" key={item.n}>
              <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary">{item.n}</p>
              <h3 className="mt-4 text-2xl font-medium text-text-primary">{item.h}</h3>
              <p className="mt-4 text-sm leading-8 text-text-secondary">{item.b}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
