import Image from "next/image";
import { asset } from "@/lib/asset";
import { roomBand } from "@/lib/content";

/**
 * The photograph fills its panel on all four sides. A 21:9 crop on desktop
 * keeps it a band rather than a picture, so it punctuates the stack instead of
 * interrupting it.
 *
 * No caption. The manifesto above it already says this is a room full of
 * clinicians; naming the event and date underneath was documentation of the
 * photograph rather than anything the reader came for. The `alt` text still
 * carries the description for anyone who cannot see it.
 */
export function RoomBand() {
  return (
    <section aria-label="ASME in the room">
      <div className="panel overflow-hidden !p-0">
        <Image
          src={asset(roomBand.src)}
          alt={roomBand.alt}
          width={2400}
          height={1350}
          sizes="(max-width: 1120px) 100vw, 1120px"
          className="block aspect-[4/3] w-full object-cover object-[50%_62%] sm:aspect-[16/9] lg:aspect-[21/9]"
          priority
        />
      </div>
    </section>
  );
}
