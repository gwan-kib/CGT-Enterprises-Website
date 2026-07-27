import type { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id: string;
  labelledBy: string;
  tone?: "brand" | "dark" | "default" | "subtle";
}

export function SectionContainer({ children, className, id, labelledBy, tone = "default" }: SectionContainerProps) {
  const classes = ["page-section", `page-section--${tone}`, className].filter(Boolean).join(" ");

  return (
    <section aria-labelledby={labelledBy} className={classes} id={id}>
      <div className="page-section__inner">{children}</div>
    </section>
  );
}
