/** Full-viewport embed of owner-approved static reference HTML (1:1 handoff). */
export function ReferenceSiteEmbed({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  return (
    <div className="relative w-full min-w-0 max-w-full overflow-hidden">
      <iframe
        src={src}
        title={title}
        className="block h-[100dvh] min-h-[100dvh] w-full border-0 bg-black"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        loading="eager"
      />
    </div>
  );
}
