import Image from "next/image";
import Link from "next/link";

type ProductTileProps = {
  id: string;
  name: string;
  price: number;
  primaryImageUrl: string;
  hoverImageUrl: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
};

export function ProductTile(props: ProductTileProps) {
  // === PROPS ===
  const {
    id,
    name,
    price,
    primaryImageUrl,
    hoverImageUrl,
    priority = false,
    loading = "lazy",
  } = props;

  return (
    <Link href={`/product/${id}`} className="group flex flex-col gap-3 w-full">
      <div className="relative aspect-square overflow-hidden rounded-md">
        {/* Primary Image */}
        <Image
          src={primaryImageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority={priority}
          loading={loading}
          className="object-cover transition-all duration-700 ease-in-out group-hover:opacity-0"
        />

        {/* Hover Image */}
        <Image
          src={hoverImageUrl}
          alt={`${name} - alternate view`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          loading="lazy"
          className="object-cover transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xl text-neutral-12 line-clamp-2">{name}</p>
        <p className="text-base text-neutral-10 font-semibold">
          ${price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
