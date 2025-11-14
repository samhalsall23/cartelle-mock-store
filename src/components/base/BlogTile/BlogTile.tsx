import Link from "next/link";

import { BlogTileImage } from "./BlogTileImage";

export type BlogTileProps = {
  className?: string;
  href: string;
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
  category: string;
};

export function BlogTile(props: BlogTileProps) {
  // === PROPS ===
  const {
    className = "",
    href,
    title,
    description,
    imageUrl,
    alt,
    category,
  } = props;

  return (
    <Link
      href={href}
      className={`flex flex-col md:flex-row group gap-6 md:h-[200px] ${className}`}
    >
      <div className="h-full">
        <BlogTileImage imageUrl={imageUrl} alt={alt} category={category} />
      </div>
      <div className="flex flex-col gap-3 md:gap-6">
        <h5 className="text-lg xl:text-xl">{title}</h5>
        <p className="text-neutral-10">{description}</p>
      </div>
    </Link>
  );
}
