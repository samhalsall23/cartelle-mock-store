import {
  AnimatedHeadingText,
  BaseSection,
  BreadCrumb,
  ProductTile,
  ProductPurchasePanel,
} from "@/components";
import {
  BLOG_NAVBAR_TEXT,
  SHOP_NAVBAR_TEXT,
} from "@/components/layout/Navbar/lib";
import { cn, routes } from "@/lib";
import { getProductBySlug } from "@/lib/server/queries";
import { SizeTypeEnum } from "@prisma/client";
import Image from "next/image";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage(props: ProductPageProps) {
  // === PROPS ===
  const { params } = props;

  // === PARAMS ===
  const { id } = await params;

  // === FETCHES ===
  const productData = await getProductBySlug(id);

  if (!productData.success || !productData.data) {
    return (
      <main>
        <section className="pb-16 md:pb-25 px-5 md:px-0 w-100 md:w-75 xl:w-60">
          <BreadCrumb
            items={[{ label: BLOG_NAVBAR_TEXT, href: routes.blog }]}
          />
        </section>
      </main>
    );
  }

  // === PREPARE DATA ===
  const product = {
    ...productData.data,
    price: productData.data.price.toFixed(2),
  };

  return (
    <main>
      <BaseSection id="support-section" className="pb-16 xl:pb-20">
        <div className="flex flex-col gap-1 pt-6 md:pt-10 ">
          <div className="pb-4">
            <BreadCrumb
              items={[
                { label: SHOP_NAVBAR_TEXT, href: routes.shop },
                { label: product.name },
              ]}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
            <div className="w-full lg:w-[60%] flex flex-col gap-6">
              {product.images.map((imageUrl, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative w-full h-0 pb-[100%]",
                    index !== 0 && "hidden lg:block",
                  )}
                >
                  <Image
                    priority={index === 0}
                    src={imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1280px) 100vw, 65vw"
                    className="object-cover rounded-sm"
                  />
                </div>
              ))}
            </div>

            <ProductPurchasePanel
              product={product}
              defaultSize={
                product.sizeType === SizeTypeEnum.OneSize
                  ? product.sizes[0]?.id
                  : ""
              }
            />

            <div className="flex flex-col gap-6">
              {product.images.map((imageUrl, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative w-full h-0 pb-[100%]",
                    index === 0 && "hidden lg:block",
                  )}
                >
                  <Image
                    priority={index === 0}
                    src={imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1280px) 100vw, 65vw"
                    className="object-cover rounded-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </BaseSection>
      <BaseSection
        id="related-products-section"
        className="pt-10 pb-16 xl:pb-20 flex flex-col gap-8"
      >
        <AnimatedHeadingText text="Browse more" variant="product-page-title" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full relative">
          <ProductTile
            id={"1"}
            slug="organic-cotton-oversized-tee"
            name={"Organic Cotton Oversized Tee"}
            price={89.99}
            primaryImageUrl={"/assets/clothes-model.jpg"}
            hoverImageUrl={"/assets/clothes-model-hover.jpg"}
          />
          <ProductTile
            id={"2"}
            slug="ss"
            name={"Premium Wool Blend Sweater"}
            price={159.99}
            primaryImageUrl={"/assets/clothes-model.jpg"}
            hoverImageUrl={"/assets/clothes-model-hover.jpg"}
          />
          <ProductTile
            id={"2"}
            slug="2"
            name={"Premium Wool Blend Sweater"}
            price={159.99}
            primaryImageUrl={"/assets/clothes-model.jpg"}
            hoverImageUrl={"/assets/clothes-model-hover.jpg"}
          />
        </div>
      </BaseSection>
    </main>
  );
}
