import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";
import { useRef, useState } from "react";
import { Section, type SectionProps, layoutInputs } from "~/components/section";
import { backgroundInputs } from "~/components/background-image";
import { CartDrawer } from "./cart-drawer";
import { FitGuide } from "./fit-guide";

// Mock data for layout preview
const mockProduct = {
  title: "Women's Kiwi Slipper",
  price: "$66",
  compareAtPrice: "$95",
  discount: "31% off",
  description: "Elevated everyday slipper that proves comfort goes with everything.",
  color: "Dark Camel",
  rating: 5,
  reviewCount: 2,
  images: [
    "//www.allbirds.com/cdn/shop/files/A12142_25Q4_Kiwi-Slipper-Dark-Camel-Stony-Cream-Sole_PDP_LEFT.png?v=1761687976&width=1024",
    "//www.allbirds.com/cdn/shop/files/A12142_25Q4_Kiwi-Slipper-Dark-Camel-Stony-Cream-Sole_PDP_BACK.png?v=1761687975&width=1024",
    "//www.allbirds.com/cdn/shop/files/A12142_25Q4_Kiwi-Slipper-Dark-Camel-Stony-Cream-Sole_PDP_TD_49fe6f45-b3d5-44d6-9ba0-836f9c849d04.png?v=1761687976&width=1024",
    "//www.allbirds.com/cdn/shop/files/A12142_25Q4_Kiwi-Slipper-Dark-Camel-Stony-Cream-Sole_PDP_SOLE.png?v=1761687975&width=1024",
    "//www.allbirds.com/cdn/shop/files/A12142_25Q4_Kiwi-Slipper-Dark-Camel-Stony-Cream-Sole_PDP_PAIR_3Q.png?v=1761687976&width=1024",
  ],
  sizes: [
    { size: "5", available: false },
    { size: "6", available: false },
    { size: "7", available: false },
    { size: "8", available: false },
    { size: "9", available: false },
    { size: "10", available: false },
    { size: "11", available: true },
  ],
  colors: [
    { name: "Medium Grey", handle: "womens-kiwi-slipper-medium-grey", gradient: "linear-gradient(135deg, rgb(139, 138, 143) 50%, rgb(101, 101, 102) 50%)", selected: false },
    { name: "Dark Camel", handle: "womens-kiwi-slipper", gradient: "linear-gradient(135deg, rgb(179, 139, 88) 50%, rgb(229, 220, 194) 50%)", selected: true },
  ],
};

export interface MainProductDetailsProps extends SectionProps {
  ref?: React.Ref<HTMLElement>;
}

export default function MainProductDetails(
  props: MainProductDetailsProps & HydrogenComponentProps
) {
  const { ref, ...rest } = props;

  const product = mockProduct;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFitGuideOpen, setIsFitGuideOpen] = useState(false);

  const handleAddToCart = () => {
    setIsCartOpen(true);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current && currentIndex > 0) {
      const slideWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 0;
      const gap = 10;
      scrollContainerRef.current.scrollBy({ left: -(slideWidth + gap), behavior: "smooth" });
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current && currentIndex < product.images.length - 1) {
      const slideWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 0;
      const gap = 10;
      scrollContainerRef.current.scrollBy({ left: slideWidth + gap, behavior: "smooth" });
      setCurrentIndex((prev) => Math.min(product.images.length - 1, prev + 1));
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const slideWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 0;
      const gap = 10;
      const scrollPosition = index * (slideWidth + gap);
      scrollContainerRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

  return (
    <Section ref={ref} {...rest} overflow="hidden">
        {/* Breadcrumb */}
        <nav className="mx-5 mb-2.5 text-xs text-gray-500 max-lg:mt-10">
          <ol className="flex items-center">
            <li>
              <a href="/" className="hover:underline">Home</a>
            </li>
            <li className="hidden md:block">
              <span className="mx-1.5">/</span>
              <span>{product.title}</span>
            </li>
          </ol>
        </nav>

        {/* Mobile Product Info */}
        <div className="px-5 md:hidden">
          <div className="flex flex-col gap-1">
            <div className="grid grid-cols-[1fr_auto] items-center gap-1.5">
              <h1 className="font-serif text-2xl">{product.title}</h1>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-lg font-medium uppercase tracking-wider">
                  <span className="text-red-600">{product.price}</span>
                  <span className="text-gray-500 line-through">{product.compareAtPrice}</span>
                </div>
                <span className="text-right text-xs tracking-wider text-red-600">({product.discount})</span>
              </div>
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="size-4" viewBox="0 0 18 18" fill="currentColor">
                  <path d="M9 14.118L14.562 17.475L13.086 11.148L18 6.891L11.529 6.342L9 0.375L6.471 6.342L0 6.891L4.914 11.148L3.438 17.475L9 14.118Z" />
                </svg>
              ))}
              <span className="text-sm text-gray-600">({product.reviewCount})</span>
            </div>

            <p className="text-xs text-gray-500">{product.description}</p>
          </div>
        </div>

        {/* Product Gallery */}
        <div className="group relative my-3 mb-8 max-md:-mx-6">
          {/* Image Slider */}
          <div
            ref={scrollContainerRef}
            className="flex gap-2.5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
            style={{ paddingLeft: 'calc(5%)', paddingRight: 'calc(5%)' }}
          >
            {product.images.map((src, index) => (
              <div key={index} className="flex-shrink-0 w-[90%] snap-center">
                <div className="relative aspect-square overflow-hidden rounded-2xl md:aspect-[2/1]">
                  <img
                    alt={`${product.title} - Image ${index + 1}`}
                    className="h-full w-full object-contain md:object-cover object-center"
                    src={src}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Previous Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-8 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-black bg-white/60 text-black opacity-0 transition-opacity duration-200 hover:bg-white group-hover:opacity-100 md:left-4 md:size-11"
            aria-label="Previous Image"
          >
            <svg className="size-8" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M14.0962 16.7175C13.901 16.9128 13.5844 16.9128 13.3891 16.7175L9.14648 12.4749C8.95122 12.2796 8.95122 11.963 9.14648 11.7678L13.3891 7.52512C13.5844 7.32986 13.901 7.32986 14.0962 7.52512C14.2915 7.72038 14.2915 8.03696 14.0962 8.23222L10.2071 12.1213L14.0962 16.0104C14.2915 16.2057 14.2915 16.5222 14.0962 16.7175Z" fill="currentColor" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={scrollRight}
            className="absolute right-8 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-black bg-white/60 text-black opacity-0 transition-opacity duration-200 hover:bg-white group-hover:opacity-100 md:right-4 md:size-11"
            aria-label="Next Image"
          >
            <svg className="size-8" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.1464 7.52512C10.3417 7.32986 10.6583 7.32986 10.8536 7.52512L15.0962 11.7678C15.2915 11.963 15.2915 12.2796 15.0962 12.4749L10.8536 16.7175C10.6583 16.9128 10.3417 16.9128 10.1464 16.7175C9.95118 16.5222 9.95118 16.2057 10.1464 16.0104L14.0355 12.1213L10.1464 8.23223C9.95118 8.03697 9.95118 7.72039 10.1464 7.52512Z" fill="currentColor" />
            </svg>
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-1.5 pt-3 opacity-100 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`size-2 rounded-full transition-colors ${index === currentIndex ? "bg-black" : "bg-gray-300 hover:bg-gray-400"}`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Product Info Panel */}
        <aside className="mx-2.5 grid grid-cols-1 gap-10 rounded-xl bg-white p-5 md:gap-6 lg:grid-cols-4 lg:items-start lg:gap-4 xl:gap-8 xl:p-8">
          {/* Desktop Product Info */}
          <div className="max-md:hidden">
            <div className="flex flex-col gap-1 lg:gap-3">
              <h1 className="font-serif text-2xl lg:text-3xl">{product.title}</h1>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-lg font-medium uppercase tracking-wider">
                  <span className="text-red-600">{product.price}</span>
                  <span className="text-gray-500 line-through">{product.compareAtPrice}</span>
                </div>
                <span className="text-xs tracking-wider text-red-600">({product.discount})</span>
              </div>
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="size-4" viewBox="0 0 18 18" fill="currentColor">
                    <path d="M9 14.118L14.562 17.475L13.086 11.148L18 6.891L11.529 6.342L9 0.375L6.471 6.342L0 6.891L4.914 11.148L3.438 17.475L9 14.118Z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-600">({product.reviewCount})</span>
              </div>
            </div>
          </div>

          {/* Color Selector */}
          <div className="flex flex-col gap-2.5 md:h-full lg:border-l lg:border-gray-200 lg:pl-4 xl:pl-8">
            <div className="flex flex-1 flex-col gap-3">
              {/* Tabs */}
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <button className="cursor-pointer border-b border-black font-mono text-sm font-medium uppercase tracking-wider">
                  All
                </button>
              </div>

              {/* Color Swatches */}
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-500">{product.color}</p>
                <div className="flex flex-wrap items-center gap-1">
                  {product.colors.map((color) => (
                    <button
                      key={color.handle}
                      title={color.name}
                      className={`relative size-9 rounded-full border-3 border-white ${color.selected ? "shadow-[0_0_0_1px_#212121]" : "ring-1 ring-gray-400"}`}
                      style={{ background: color.gradient }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Size Selector */}
          <div className="relative md:h-full lg:border-l lg:border-gray-200 lg:pl-4 xl:pl-8">
            <div className="flex w-full flex-col gap-4">
              {/* Size Grid */}
              <ul className="grid grid-cols-4 gap-2">
                {product.sizes.map((sizeItem) => (
                  <li key={sizeItem.size} className="relative overflow-hidden">
                    <button
                      className={`flex h-12 w-full items-center justify-center rounded-lg border text-sm transition-all
                        ${sizeItem.available 
                          ? "border-black bg-black text-white" 
                          : "border-gray-200 text-gray-400"
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

              {/* Size Guide */}
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
                Add to Cart - {product.price}
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
              <span>{product.title}</span>
              <span>{product.price}</span>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full rounded-full bg-black py-3 text-sm font-medium uppercase tracking-wider text-white"
            >
              Add to Cart - {product.price}
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
              Add to Cart - {product.price}
            </button>
          </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItem={{
          title: product.title,
          variant: `${product.color} (Stony Cream Sole)`,
          size: "11",
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          image: product.images[0],
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
    children: [],
  },
});