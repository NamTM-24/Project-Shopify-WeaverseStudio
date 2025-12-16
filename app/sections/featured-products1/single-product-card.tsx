import { useId } from "react";
import type { FeaturedProduct1CardQuery } from "storefront-api.generated";

// Type cho product từ query
type Product = NonNullable<FeaturedProduct1CardQuery["product"]>;

interface SingleProductCardProps {
  product: Product;
}

export default function SingleProductCard({ product }: SingleProductCardProps) {
  const uniqueId = useId();

  //variant data
  const variant = product.selectedOrFirstAvailableVariant;
  const colorOption = product.options?.find((opt) => opt.name === "Color");
  const colorValue = colorOption?.optionValues?.[0];

  // Map data sang các biến
  const productTitle = product.title || "Product Title";
  const productVariant = colorValue?.name || variant?.title || "";
  const productHref = `/products/${product.handle}`;
  const productImage = variant?.image?.url || product.images?.nodes?.[0]?.url || "";
  const salePrice = variant?.price?.amount
    ? `$${parseFloat(variant.price.amount).toFixed(0)}`
    : "";
  const originalPrice = variant?.compareAtPrice?.amount
    ? `$${parseFloat(variant.compareAtPrice.amount).toFixed(0)}`
    : "";
  const swatchColor = colorValue?.swatch?.color || "rgb(128, 128, 128)";

  return (
    <div
      className="flex-shrink-0 h-full"
      style={{ width: "401px", marginRight: "10px" }}
    >
      <div className="group relative flex h-full flex-col rounded-2xl transition-all duration-300 ease-in-out w-full bg-white">
        {/* Image */}
        <a
          href={productHref}
          className="relative z-10 aspect-square absolute inset-0 overflow-hidden rounded-t-2xl"
        >
          <img
            alt={`${productTitle} - ${productVariant}`}
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out"
            width="1024"
            height="1024"
            loading="eager"
            src={productImage}
          />
        </a>

        {/* Details */}
        <div className="mt-auto flex flex-col gap-2.5 justify-self-end p-2.5 sm:p-4">
          <a href={productHref} className="flex h-full flex-col gap-1.5 md:gap-1">
            <p className="font-sans text-xs font-medium tracking-wider uppercase md:truncate md:overflow-hidden md:text-sm md:text-ellipsis">
              {productTitle}
            </p>
            <p className="min-h-[1.5em] truncate text-xs tracking-wider text-ellipsis md:text-sm">
              {productVariant}
            </p>
            {/* Mobile Price */}
            <p className="flex items-center gap-1 font-sans text-xs font-medium tracking-wider uppercase xl:hidden">
              <span className="text-red-600">{salePrice}</span>
              {originalPrice && (
                <span className="line-through opacity-65">{originalPrice}</span>
              )}
            </p>
          </a>

          {/* Swatch & Desktop Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-2">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="radio"
                    name={uniqueId}
                    id={uniqueId}
                    className="absolute h-0 w-0 opacity-0"
                    defaultChecked
                  />
                  <label
                    htmlFor={uniqueId}
                    className="block size-4 cursor-pointer rounded-full transition-all duration-200 ease-in-out md:size-5 md:hover:scale-110 lg:size-6"
                    title={`${productTitle} - ${productVariant}`}
                    style={{ backgroundColor: swatchColor }}
                  ></label>
                </div>
              </div>
            </div>
            {/* Desktop Price */}
            <p className="hidden items-center gap-1 font-sans text-sm font-medium tracking-wider uppercase xl:flex">
              <span className="text-red-600">{salePrice}</span>
              {originalPrice && (
                <span className="line-through opacity-65">{originalPrice}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
