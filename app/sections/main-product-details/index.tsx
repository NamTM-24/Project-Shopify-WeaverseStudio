import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";
import { useState } from "react";
import { useLoaderData } from "react-router";
import type { loader as productRouteLoader } from "~/routes/products/product";
import { Section, type SectionProps, layoutInputs } from "~/components/section";
import { backgroundInputs } from "~/components/background-image";
import { CartDrawer } from "./cart-drawer";
import { FitGuide } from "./fit-guide";
import { extractProductImages } from "./utils";

export interface MainProductDetailsProps extends SectionProps {
  ref?: React.Ref<HTMLElement>;
}

export default function MainProductDetails(
  props: MainProductDetailsProps & HydrogenComponentProps
) {
  const { ref, children, ...rest } = props;
  const { product } = useLoaderData<typeof productRouteLoader>();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFitGuideOpen, setIsFitGuideOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleAddToCart = () => {
    setIsCartOpen(true);
  };

  const selectedVariant = product.selectedOrFirstAvailableVariant;
  const title = product.title;
  const price = selectedVariant?.price 
    ? `$${parseFloat(selectedVariant.price.amount).toFixed(0)}` 
    : "$0";
  const compareAtPrice = selectedVariant?.compareAtPrice
    ? `$${parseFloat(selectedVariant.compareAtPrice.amount).toFixed(0)}`
    : null;
  
  let discount = null;
  if (selectedVariant?.price && selectedVariant?.compareAtPrice) {
    const currentPrice = parseFloat(selectedVariant.price.amount);
    const originalPrice = parseFloat(selectedVariant.compareAtPrice.amount);
    const discountPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    discount = `${discountPercent}% off`;
  }
  
  const description = product.description || "";
  const colorOption = selectedVariant?.selectedOptions?.find(
    opt => opt.name.toLowerCase() === 'color'
  );
  const color = colorOption?.value || "";
  
  const images = extractProductImages(product);
  
  // Extract sizes từ variants
  const sizeOption = product.options?.find(
    opt => {
      const name = opt.name?.toLowerCase() || '';
      return name.includes('size');
    }
  );
  
  const sizes = sizeOption?.optionValues?.map((optValue: any) => {
    const variant = optValue.firstSelectableVariant;
    
    return {
      size: optValue.name,
      available: variant?.availableForSale || false,
    };
  }) || [];
  
  
  
  // Extract colors từ options
  const colorOptionForList = product.options?.find(
    opt => opt.name?.toLowerCase() === 'color'
  );
  
  const colors = colorOptionForList?.optionValues?.map((optValue: any) => {
    const value = optValue.name;
    const colorSlug = value.toLowerCase().replace(/\s+/g, '-');
    const handle = `${product.handle}-${colorSlug}`;
    const isSelected = value === color;
    
    // Use Shopify swatch color if available, otherwise fallback to gray gradient
    const swatchColor = optValue.swatch?.color;
    const gradient = swatchColor 
      ? swatchColor
      : `linear-gradient(135deg, #999 50%, #666 50%)`;
    
    return {
      name: value,
      handle: handle,
      gradient: gradient,
      selected: isSelected,
    };
  }) || [];

  return (
    <Section ref={ref} {...rest} overflow="hidden">
        {children}

        {/* Mobile Product Info */}
        <div className="px-5 md:hidden">
          <div className="flex flex-col gap-1">
            <div className="grid grid-cols-[1fr_auto] items-center gap-1.5">
              <h1 className="font-serif text-2xl">{title}</h1>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-lg font-medium uppercase tracking-wider">
                  <span className="text-red-600">{price}</span>
                  {compareAtPrice && (
                    <span className="text-gray-500 line-through">{compareAtPrice}</span>
                  )}
                </div>
                {discount && (
                  <span className="text-right text-xs tracking-wider text-red-600">({discount})</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="size-4" viewBox="0 0 18 18" fill="currentColor">
                  <path d="M9 14.118L14.562 17.475L13.086 11.148L18 6.891L11.529 6.342L9 0.375L6.471 6.342L0 6.891L4.914 11.148L3.438 17.475L9 14.118Z" />
                </svg>
              ))}
              <span className="text-sm text-gray-600">(2)</span>
            </div>

            <p className="text-xs text-gray-500">{description}</p>
          </div>
        </div>

        {/* Product Info Panel - Grid 4 columns */}
        <aside className="mx-2.5 grid grid-cols-1 gap-10 rounded-xl bg-white p-5 md:gap-6 lg:grid-cols-4 lg:items-start lg:gap-4 xl:gap-8 xl:p-8">
          {/* Desktop Product Info */}
          <div className="max-md:hidden">
            <div className="flex flex-col gap-1 lg:gap-3">
              <h1 className="font-serif text-2xl lg:text-3xl">{title}</h1>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-lg font-medium uppercase tracking-wider">
                  <span className="text-red-600">{price}</span>
                  {compareAtPrice && (
                    <span className="text-gray-500 line-through">{compareAtPrice}</span>
                  )}
                </div>
                {discount && (
                  <span className="text-xs tracking-wider text-red-600">({discount})</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="size-4" viewBox="0 0 18 18" fill="currentColor">
                    <path d="M9 14.118L14.562 17.475L13.086 11.148L18 6.891L11.529 6.342L9 0.375L6.471 6.342L0 6.891L4.914 11.148L3.438 17.475L9 14.118Z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-600">(2)</span>
              </div>
            </div>
          </div>

          {/* Color Selector */}
          <div className="flex flex-col gap-2.5 md:h-full lg:border-l lg:border-gray-200 lg:pl-4 xl:pl-8">
            <div className="flex flex-1 flex-col gap-3">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <button className="cursor-pointer border-b border-black font-mono text-sm font-medium uppercase tracking-wider">
                  All
                </button>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">{color}</p>
                <div className="flex flex-wrap items-center gap-1">
                  {colors.map((colorItem) => (
                    <button
                      key={colorItem.handle}
                      title={colorItem.name}
                      className={`relative size-9 rounded-full border-3 border-white ${colorItem.selected ? "shadow-[0_0_0_1px_#212121]" : "ring-1 ring-gray-400"}`}
                      style={{ background: colorItem.gradient }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Size Selector */}
          <div className="relative md:h-full lg:border-l lg:border-gray-200 lg:pl-4 xl:pl-8">
            <div className="flex w-full flex-col gap-4">
              <ul className="grid grid-cols-4 gap-2">
                {sizes.map((sizeItem) => (
                  <li key={sizeItem.size} className="relative overflow-hidden">
                    <button
                      onClick={() => sizeItem.available && setSelectedSize(sizeItem.size)}
                      className={`flex h-12 w-full items-center justify-center rounded-lg border text-sm transition-all
                        ${!sizeItem.available
                          ? "border-gray-200 text-gray-400 cursor-not-allowed"
                          : selectedSize === sizeItem.size
                            ? "border-black bg-black text-white"
                            : "border-gray-300 text-gray-900 hover:border-gray-400 cursor-pointer"
                        }
                      `}
                      disabled={!sizeItem.available}
                    >
                      {sizeItem.size}
                      {!sizeItem.available && (
                        <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 10 10" preserveAspectRatio="none">
                          <line x1="10" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                        </svg>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col items-start gap-1 text-xs text-gray-500">
                <p>This style is offered in full sizes only. If you have wide feet or are between sizes we suggest you size up.</p>
                <button className="cursor-pointer underline" onClick={() => setIsFitGuideOpen(true)}>Fit Guide</button>
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex flex-col justify-center md:h-full md:self-center lg:border-l lg:border-gray-200 lg:pl-4 xl:pl-8">
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full rounded-full border border-black bg-black py-4 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-gray-800"
              >
                Add to Cart - {price}
              </button>
              <div className="m-auto flex w-fit flex-col items-center gap-1 text-xs text-black">
                <span>Free Shipping on Orders over $75</span>
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Floating ATC - Mobile */}
        <div className="pointer-events-none fixed bottom-0 left-0 w-full rounded-t-md bg-white py-5 opacity-0 md:hidden">
          <div className="mx-auto flex max-w-[300px] flex-col gap-2.5">
            <div className="flex w-full justify-center gap-2 text-sm">
              <span>{title}</span>
              <span>{price}</span>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full rounded-full bg-black py-3 text-sm font-medium uppercase tracking-wider text-white"
            >
              Add to Cart - {price}
            </button>
            <div className="m-auto flex w-fit flex-col items-center gap-1 text-xs text-black">
              <span>Free Shipping on Orders over $75</span>
              <span>Easy Returns</span>
            </div>
          </div>
        </div>

        {/* Floating ATC - Desktop */}
        <div className="pointer-events-none fixed bottom-0 left-0 hidden w-full bg-white px-10 py-3.5 opacity-0 md:block">
          <div className="flex w-full justify-end gap-3">
            <button
              onClick={handleAddToCart}
              className="rounded-full bg-black px-16 py-3 text-sm font-medium uppercase tracking-wider text-white hover:bg-gray-800"
            >
              Add to Cart - {price}
            </button>
          </div>
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItem={{
          title: title,
          variant: selectedVariant?.title || `${color} (Stony Cream Sole)`,
          size: selectedSize || "",
          price: price,
          compareAtPrice: compareAtPrice || price,
          image: images[0] || "",
          quantity: 1,
        }}
      />
      <FitGuide isOpen={isFitGuideOpen} onClose={() => setIsFitGuideOpen(false)} />
    </Section>
  );
}

export const schema = createSchema({
  type: "main-product-details",
  title: "Main Product Details",
  childTypes: [
    "mpd--breadcrumb",
    "mpd--gallery",
  ],
  enabledOn: {
    pages: ["PRODUCT"],
  },
  settings: [
    {
      group: "Layout",
      inputs: layoutInputs,
    },
    {
      group: "Background",
      inputs: backgroundInputs.filter((inp) => inp.name !== "backgroundFor"),
    },
  ],
  presets: {
    children: [
      { type: "mpd--breadcrumb" },
      { type: "mpd--gallery" },
    ],
  },
});