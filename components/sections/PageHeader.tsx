import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

type Cta = {
  label: string;
  href: string;
  external?: boolean;
  variant?: "primary" | "secondary";
};

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  cta?: Cta;
  secondaryCta?: Cta;
};

/**
 * Top panel for interior pages. White rather than the brand colour: the two
 * accent panels are the home page's hero and the closing call to action, and
 * putting a third on every interior page would spend the colour until it stops
 * meaning anything.
 *
 * The dotted backdrop and the bottom border are gone with the rest of the old
 * decoration. Size does the work instead, via `panel-lg`.
 */
export function PageHeader({ eyebrow, title, lead, cta, secondaryCta }: Props) {
  return (
    <section className="panel-lg">
      <Container>
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="h-display mt-5 text-[2.15rem] sm:text-5xl md:text-[3.25rem]">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted pretty">
              {lead}
            </p>
          )}
          {(cta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              {cta && (
                <ButtonLink
                  href={cta.href}
                  variant="primary"
                  size="lg"
                  {...(cta.external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {cta.label}
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent))]"
                  {...(secondaryCta.external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {secondaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
