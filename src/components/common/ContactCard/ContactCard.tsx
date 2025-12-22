import { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib";

type ContactCardProps = {
  className?: string;
  href?: string;
  title: string;
  description: string;
  icon: ReactNode;
};

export function ContactCard(props: ContactCardProps) {
  // === PROPS ===
  const { className = "", href, title, description, icon } = props;

  // === RENDERING ===
  const Content = ({ className }: { className?: string }) => (
    <div
      className={cn(
        "flex flex-col gap-5 p-8 border rounded-sm border-neutral-04 h-full",
        className,
      )}
    >
      <div className="flex gap-4 items-center">
        <span className="text-neutral-08">{icon}</span>
        <h4 className="text-xl xl:text-2xl font-medium">{title}</h4>
      </div>
      <p className="text-base text-neutral-10">{description}</p>
    </div>
  );

  if (href) {
    return (
      <Link className={className} href={href}>
        <Content />
      </Link>
    );
  }

  return <Content className={className} />;
}
