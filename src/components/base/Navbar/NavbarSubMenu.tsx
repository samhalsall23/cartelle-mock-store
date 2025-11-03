import { CustomLink } from "@/components/ui/Link/CustomLink";
import { cn } from "@/lib/utils";
import Image from "next/image";

type NavbarSubMenuProps = {
  show: boolean;
  categories: string[];
  collections: string[];
};

export function NavbarSubMenu(props: NavbarSubMenuProps) {
  const { show, categories, collections } = props;

  const containerClass = cn(
    "rounded-sm shadow-custom p-6 w-fit transition-all duration-300 ease-in-out",
    show
      ? "opacity-100 translate-y-0 visible"
      : "opacity-0 -translate-y-4 invisible",
  );

  return (
    <div className={containerClass}>
      <div className="flex gap-6">
        <div className="w-[150px] h-auto self-stretch relative">
          <Image
            className="rounded-sm"
            src={"/assets/chair-image.jpg"}
            alt="chair"
            fill
          />
        </div>
        <div className="flex flex-col pb-10 w-[150px]">
          <p className="text-body-medium text-light pb-6">Shop</p>
          <div className="flex flex-col gap-4">
            {categories.map((category) => (
              <CustomLink
                key={category}
                text={category}
                href={`/shop/${category}`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col pb-10 w-[150px]">
          <p className="text-body-medium text-light pb-6">Collections</p>
          <div className="flex flex-col gap-4">
            {collections.map((collection) => (
              <CustomLink
                key={collection}
                text={collection}
                href={`/shop/${collection}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
