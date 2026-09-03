type Props = {
  youtubeId: string;
  start?: number;
  title: string;
};

/**
 * Privacy-friendly (youtube-nocookie) responsive video embed. Pass `start`
 * (seconds) to begin playback partway in, e.g. to skip an intro.
 */
export function VideoEmbed({ youtubeId, start = 0, title }: Props) {
  const src = `https://www.youtube-nocookie.com/embed/${youtubeId}?start=${start}&rel=0&modestbranding=1`;
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-brand-ink shadow-soft">
      <iframe
        src={src}
        title={title}
        className="absolute inset-0 h-full w-full"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
