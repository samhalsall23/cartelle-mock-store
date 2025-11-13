import Link from "next/link";

import { BlogTileImage } from "./BlogTileImage";

export type BlogTileProps = {
  href: string;
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
  category: string;
};

export function BlogTile(props: BlogTileProps) {
  // === PROPS ===
  const { href, title, description, imageUrl, alt, category } = props;

  return (
    <Link href={href} className="flex group gap-2.5 h-[200px]">
      <div className="w-1/3 h-full">
        <BlogTileImage imageUrl={imageUrl} alt={alt} category={category} />
      </div>
      <div className="w-2/3 flex flex-col gap-6">
        <h5 className="text-lg xl:text-xl">{title}</h5>
        <p className="text-neutral-10">{description}</p>
      </div>
    </Link>
  );
}
