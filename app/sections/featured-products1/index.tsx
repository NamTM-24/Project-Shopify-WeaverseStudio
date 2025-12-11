import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";
import { useRef } from "react";
import { type SectionProps, layoutInputs, Section } from "~/components/section";
import { backgroundInputs } from "~/components/background-image";

export interface FeaturedProductsProps extends SectionProps {
  ref: React.Ref<HTMLElement>;
}

export default function FeaturedProducts(
  props: FeaturedProductsProps & HydrogenComponentProps,
) {
  const { ref, children, ...rest } = props;
  
  // Ref để điều khiển scroll container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Hàm scroll sang trái
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -420, // 401px (card width) + 10px (margin) + 9px (buffer)
        behavior: 'smooth'
      });
    }
  };

  // Hàm scroll sang phải
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 420,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Section ref={ref} {...rest}>
      <div className="relative my-10" style={{ opacity: 1 }}>
        {/* HEADER: Explore More Button & Navigation Arrows */}
        <div className="mb-6 flex items-center justify-between">
          {/* Tab/Button Container */}
          <div className="relative flex items-center justify-start gap-5 overflow-x-auto scroll-smooth px-5 md:gap-10">
            <div className="transition-colors pointer-events-auto cursor-pointer border-b-2 border-transparent font-mono text-sm tracking-wider whitespace-nowrap uppercase duration-300 select-none hover:border-black md:text-base font-medium border-black">
              Explore More
            </div>
          </div>

          {/* Desktop Arrows Container */}
          <div className="mr-10 hidden items-center justify-end gap-2.5 md:flex">
            {/* Previous Button */}
            <button 
              className="size-10 hover:bg-gray-100 rounded-full transition-colors" 
              title="Previous Product"
              onClick={scrollLeft}
            >
              <svg
                className="size-8"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.0962 16.7175C13.901 16.9128 13.5844 16.9128 13.3891 16.7175L9.14648 12.4749C8.95122 12.2796 8.95122 11.963 9.14648 11.7678L13.3891 7.52512C13.5844 7.32986 13.901 7.32986 14.0962 7.52512C14.2915 7.72038 14.2915 8.03696 14.0962 8.23222L10.2071 12.1213L14.0962 16.0104C14.2915 16.2057 14.2915 16.5222 14.0962 16.7175Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            {/* Next Button */}
            <button 
              className="size-10 hover:bg-gray-100 rounded-full transition-colors" 
              title="Next Product"
              onClick={scrollRight}
            >
              <svg
                className="size-8"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.1464 7.52512C10.3417 7.32986 10.6583 7.32986 10.8536 7.52512L15.0962 11.7678C15.2915 11.963 15.2915 12.2796 15.0962 12.4749L10.8536 16.7175C10.6583 16.9128 10.3417 16.9128 10.1464 16.7175C9.95118 16.5222 9.95118 16.2057 10.1464 16.0104L14.0355 12.1213L10.1464 8.23223C9.95118 8.03697 9.95118 7.72039 10.1464 7.52512Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* CAROUSEL SLIDER MAIN CONTAINER */}
        <div className="relative select-none">
          {/* Container với scrollbar ẩn */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto scroll-smooth hidden-scroll"
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* IE/Edge */
            }}
          >
            {/* Flex container cho các product cards */}
            <div className="flex w-max">

              {/* PRODUCT CARD 1: Women's Tree Runner NZ */}
              <div
                className="flex-shrink-0 h-full"
                style={{ width: "401px", marginRight: "10px" }}
              >
                <div className="group relative flex h-full flex-col rounded-2xl transition-all duration-300 ease-in-out w-full order-0 bg-white">
                  {/* Badge/Z-content (Top Right/Left) */}
                  <div className="absolute top-2.5 right-2.5 left-2.5 z-20 flex items-center justify-between md:top-5 md:right-5 md:left-5">
                    {/* Mobile Badge */}
                    <span
                      className="rounded-full px-2 py-1 text-xs font-medium tracking-wider text-black uppercase block md:hidden"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    >
                      40% Off
                    </span>
                    {/* Desktop Badge */}
                    <span
                      className="hidden rounded-full px-2 py-1.5 text-xs font-medium tracking-wider text-black uppercase md:block"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    >
                      40% Off
                    </span>
                  </div>

                  {/* Image Container & Link */}
                  <a
                    href="/products/womens-tree-runner-nz-dark-navy"
                    className="relative z-10 aspect-square absolute inset-0 overflow-hidden rounded-t-2xl"
                  >
                    <img
                      alt="Women's Tree Runner NZ - Dark Navy (Blizzard Sole)"
                      className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out"
                      width="1024"
                      height="1024"
                      loading="eager"
                      src="//www.allbirds.com/cdn/shop/files/A11928_25Q3_Tree_Runner_NZ_Dark_Navy_Blizzard_Sole_PDP_LEFT-2000x2000.png?v=1751898832&amp;width=1024"
                    />
                  </a>

                  {/* Text/Details Container */}
                  <div className="mt-auto flex flex-col gap-2.5 justify-self-end p-2.5 sm:p-4">
                    <a
                      href="/products/womens-tree-runner-nz-dark-navy"
                      className="flex h-full flex-col gap-1.5 md:gap-1"
                    >
                      <p className="font-sans text-xs font-medium tracking-wider uppercase md:truncate md:overflow-hidden md:text-sm md:text-ellipsis">
                        Women's Tree Runner NZ
                      </p>
                      <p className="min-h-[1.5em] truncate text-xs tracking-wider text-ellipsis md:text-sm">
                        Dark Navy
                      </p>
                      {/* Price visible on smaller screens */}
                      <p className="flex items-center gap-1 font-sans text-xs font-medium tracking-wider uppercase xl:hidden">
                        <span className="text-red-600">$66</span>
                        <span className="line-through opacity-65">$110</span>
                      </p>
                    </a>

                    {/* Swatches and Price (Desktop) */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-start gap-2">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <input
                              type="radio"
                              name="swatch-group-1"
                              id="swatch-1-featured"
                              className="absolute h-0 w-0 opacity-0"
                              defaultChecked
                            />
                            <label
                              htmlFor="swatch-1-featured"
                              className="block size-4 cursor-pointer rounded-full transition-all duration-200 ease-in-out peer-checked:border-2 peer-checked:border-white peer-checked:shadow-[0_0_0_1px_black] md:size-5 md:hover:scale-110 lg:size-6"
                              title="Women's Tree Runner NZ - Dark Navy (Blizzard Sole)"
                              style={{ backgroundColor: "rgb(9, 12, 67)" }}
                            ></label>
                          </div>
                        </div>
                      </div>
                      {/* Price visible on larger screens */}
                      <p className="hidden items-center gap-1 font-sans text-sm font-medium tracking-wider uppercase xl:flex">
                        <span className="text-red-600">$66</span>
                        <span className="line-through opacity-65">$110</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PRODUCT CARD 2: Men's Tree Dasher 2 */}
              <div
                className="flex-shrink-0 h-full"
                style={{ width: "401px", marginRight: "10px" }}
              >
                <div className="group relative flex h-full flex-col rounded-2xl transition-all duration-300 ease-in-out w-full order-1 bg-white">
                  <div className="absolute top-2.5 right-2.5 left-2.5 z-20 flex items-center justify-between md:top-5 md:right-5 md:left-5">
                    <span
                      className="rounded-full px-2 py-1 text-xs font-medium tracking-wider text-black uppercase block md:hidden"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    >
                      30% Off
                    </span>
                    <span
                      className="hidden rounded-full px-2 py-1.5 text-xs font-medium tracking-wider text-black uppercase md:block"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    >
                      30% Off
                    </span>
                  </div>

                  <a
                    href="/products/mens-tree-dashers-blizzard"
                    className="relative z-10 aspect-square absolute inset-0 overflow-hidden rounded-t-2xl"
                  >
                    <img
                      alt="Men's Tree Dasher 2 - Blizzard (Blizzard Sole)"
                      className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out"
                      width="1024"
                      height="1024"
                      loading="eager"
                      src="//www.allbirds.com/cdn/shop/files/A10814_24Q2_Tree-Dasher-2-Blizzard-Blizzard-Blizzard_PDP_LEFT__1.png?v=1750974801&amp;width=1024"
                    />
                  </a>

                  <div className="mt-auto flex flex-col gap-2.5 justify-self-end p-2.5 sm:p-4">
                    <a
                      href="/products/mens-tree-dashers-blizzard"
                      className="flex h-full flex-col gap-1.5 md:gap-1"
                    >
                      <p className="font-sans text-xs font-medium tracking-wider uppercase md:truncate md:overflow-hidden md:text-sm md:text-ellipsis">
                        Men's Tree Dasher 2
                      </p>
                      <p className="min-h-[1.5em] truncate text-xs tracking-wider text-ellipsis md:text-sm">
                        Blizzard
                      </p>
                      <p className="flex items-center gap-1 font-sans text-xs font-medium tracking-wider uppercase xl:hidden">
                        <span className="text-red-600">$94</span>
                        <span className="line-through opacity-65">$135</span>
                      </p>
                    </a>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-start gap-2">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <input
                              type="radio"
                              name="swatch-group-2"
                              id="swatch-2-featured"
                              className="absolute h-0 w-0 opacity-0"
                              defaultChecked
                            />
                            <label
                              htmlFor="swatch-2-featured"
                              className="block size-4 cursor-pointer rounded-full transition-all duration-200 ease-in-out peer-checked:border-2 peer-checked:border-white peer-checked:shadow-[0_0_0_1px_black] md:size-5 md:hover:scale-110 lg:size-6"
                              title="Men's Tree Dasher 2 - Blizzard (Blizzard Sole)"
                              style={{ backgroundColor: "rgb(224, 226, 220)" }}
                            ></label>
                          </div>
                        </div>
                      </div>
                      <p className="hidden items-center gap-1 font-sans text-sm font-medium tracking-wider uppercase xl:flex">
                        <span className="text-red-600">$94</span>
                        <span className="line-through opacity-65">$135</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PRODUCT CARD 3: Women's Wool Runner NZ */}
              <div
                className="flex-shrink-0 h-full"
                style={{ width: "401px", marginRight: "10px" }}
              >
                <div className="group relative flex h-full flex-col rounded-2xl transition-all duration-300 ease-in-out w-full order-2 bg-white">
                  <div className="absolute top-2.5 right-2.5 left-2.5 z-20 flex items-center justify-between md:top-5 md:right-5 md:left-5">
                    <span
                      className="rounded-full px-2 py-1 text-xs font-medium tracking-wider text-black uppercase block md:hidden"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    >
                      40% Off
                    </span>
                    <span
                      className="hidden rounded-full px-2 py-1.5 text-xs font-medium tracking-wider text-black uppercase md:block"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    >
                      40% Off
                    </span>
                  </div>

                  <a
                    href="/products/womens-wool-runner-nz-weathered-brown"
                    className="relative z-10 aspect-square absolute inset-0 overflow-hidden rounded-t-2xl"
                  >
                    <img
                      alt="Women's Wool Runner NZ - Weathered Brown (Weathered Brown Sole)"
                      className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out"
                      width="1024"
                      height="1024"
                      loading="eager"
                      src="//www.allbirds.com/cdn/shop/files/A12074_25Q4_Wool-Runner-NZ-Weathered-Brown-Weathered-Brown-Sole_PDP_LEFT_e0957bd6-7955-48dd-bb9d-6aefbfc4c903.png?v=1758327013&amp;width=1024"
                    />
                  </a>

                  <div className="mt-auto flex flex-col gap-2.5 justify-self-end p-2.5 sm:p-4">
                    <a
                      href="/products/womens-wool-runner-nz-weathered-brown"
                      className="flex h-full flex-col gap-1.5 md:gap-1"
                    >
                      <p className="font-sans text-xs font-medium tracking-wider uppercase md:truncate md:overflow-hidden md:text-sm md:text-ellipsis">
                        Women's Wool Runner NZ
                      </p>
                      <p className="min-h-[1.5em] truncate text-xs tracking-wider text-ellipsis md:text-sm">
                        Weathered Brown
                      </p>
                      <p className="flex items-center gap-1 font-sans text-xs font-medium tracking-wider uppercase xl:hidden">
                        <span className="text-red-600">$66</span>
                        <span className="line-through opacity-65">$110</span>
                      </p>
                    </a>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-start gap-2">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <input
                              type="radio"
                              name="swatch-group-3"
                              id="swatch-3-featured"
                              className="absolute h-0 w-0 opacity-0"
                              defaultChecked
                            />
                            <label
                              htmlFor="swatch-3-featured"
                              className="block size-4 cursor-pointer rounded-full transition-all duration-200 ease-in-out peer-checked:border-2 peer-checked:border-white peer-checked:shadow-[0_0_0_1px_black] md:size-5 md:hover:scale-110 lg:size-6"
                              title="Women's Wool Runner NZ - Weathered Brown (Weathered Brown Sole)"
                              style={{ backgroundColor: "rgb(108, 96, 90)" }}
                            ></label>
                          </div>
                        </div>
                      </div>
                      <p className="hidden items-center gap-1 font-sans text-sm font-medium tracking-wider uppercase xl:flex">
                        <span className="text-red-600">$66</span>
                        <span className="line-through opacity-65">$110</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PRODUCT CARD 4: Men's Strider */}
              <div
                className="flex-shrink-0 h-full"
                style={{ width: "401px", marginRight: "10px" }}
              >
                <div className="group relative flex h-full flex-col rounded-2xl transition-all duration-300 ease-in-out w-full order-3 bg-white">
                  <div className="absolute top-2.5 right-2.5 left-2.5 z-20 flex items-center justify-between md:top-5 md:right-5 md:left-5">
                    <span
                      className="rounded-full px-2 py-1 text-xs font-medium tracking-wider text-black uppercase block md:hidden"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    >
                      50% Off
                    </span>
                    <span
                      className="hidden rounded-full px-2 py-1.5 text-xs font-medium tracking-wider text-black uppercase md:block"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    >
                      50% Off
                    </span>
                  </div>

                  <a
                    href="/products/mens-strider-medium-grey"
                    className="relative z-10 aspect-square absolute inset-0 overflow-hidden rounded-t-2xl"
                  >
                    <img
                      alt="Men's Strider - Medium Grey (Blizzard Sole)"
                      className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out"
                      width="1024"
                      height="1024"
                      loading="eager"
                      src="//www.allbirds.com/cdn/shop/files/A11729_25Q3_Strider-Medium-Grey-Blizzard-Sole_PDP_LEFT.png?v=1754951480&amp;width=1024"
                    />
                  </a>

                  <div className="mt-auto flex flex-col gap-2.5 justify-self-end p-2.5 sm:p-4">
                    <a
                      href="/products/mens-strider-medium-grey"
                      className="flex h-full flex-col gap-1.5 md:gap-1"
                    >
                      <p className="font-sans text-xs font-medium tracking-wider uppercase md:truncate md:overflow-hidden md:text-sm md:text-ellipsis">
                        Men's Strider
                      </p>
                      <p className="min-h-[1.5em] truncate text-xs tracking-wider text-ellipsis md:text-sm">
                        Medium Grey
                      </p>
                      <p className="flex items-center gap-1 font-sans text-xs font-medium tracking-wider uppercase xl:hidden">
                        <span className="text-red-600">$62</span>
                        <span className="line-through opacity-65">$125</span>
                      </p>
                    </a>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-start gap-2">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <input
                              type="radio"
                              name="swatch-group-4"
                              id="swatch-4-featured"
                              className="absolute h-0 w-0 opacity-0"
                              defaultChecked
                            />
                            <label
                              htmlFor="swatch-4-featured"
                              className="block size-4 cursor-pointer rounded-full transition-all duration-200 ease-in-out peer-checked:border-2 peer-checked:border-white peer-checked:shadow-[0_0_0_1px_black] md:size-5 md:hover:scale-110 lg:size-6"
                              title="Men's Strider - Medium Grey (Blizzard Sole)"
                              style={{ backgroundColor: "rgb(139, 138, 143)" }}
                            ></label>
                          </div>
                        </div>
                      </div>
                      <p className="hidden items-center gap-1 font-sans text-sm font-medium tracking-wider uppercase xl:flex">
                        <span className="text-red-600">$62</span>
                        <span className="line-through opacity-65">$125</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PRODUCT CARD 5: Women's Tree Breezer */}
              <div
                className="flex-shrink-0 h-full"
                style={{ width: "401px", marginRight: "10px" }}
              >
                <div className="group relative flex h-full flex-col rounded-2xl transition-all duration-300 ease-in-out w-full order-4 bg-white">
                  <div className="absolute top-2.5 right-2.5 left-2.5 z-20 flex items-center justify-between md:top-5 md:right-5 md:left-5">
                    <span
                      className="rounded-full px-2 py-1 text-xs font-medium tracking-wider text-black uppercase block md:hidden"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    >
                      20% Off
                    </span>
                    <span
                      className="hidden rounded-full px-2 py-1.5 text-xs font-medium tracking-wider text-black uppercase md:block"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    >
                      20% Off
                    </span>
                  </div>

                  <a
                    href="/products/womens-tree-breezers-jet-black"
                    className="relative z-10 aspect-square absolute inset-0 overflow-hidden rounded-t-2xl"
                  >
                    <img
                      alt="Women's Tree Breezer - Jet Black (Black Sole)"
                      className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out"
                      width="1024"
                      height="1024"
                      loading="eager"
                      src="//www.allbirds.com/cdn/shop/files/TB1WJBK_SHOE_LEFT_GLOBAL_WOMENS_TREE_BREEZER_JET_BLACK_BLACK.png?v=1751060487&amp;width=1024"
                    />
                  </a>

                  <div className="mt-auto flex flex-col gap-2.5 justify-self-end p-2.5 sm:p-4">
                    <a
                      href="/products/womens-tree-breezers-jet-black"
                      className="flex h-full flex-col gap-1.5 md:gap-1"
                    >
                      <p className="font-sans text-xs font-medium tracking-wider uppercase md:truncate md:overflow-hidden md:text-sm md:text-ellipsis">
                        Women's Tree Breezer
                      </p>
                      <p className="min-h-[1.5em] truncate text-xs tracking-wider text-ellipsis md:text-sm">
                        Jet Black
                      </p>
                      <p className="flex items-center gap-1 font-sans text-xs font-medium tracking-wider uppercase xl:hidden">
                        <span className="text-red-600">$80</span>
                        <span className="line-through opacity-65">$100</span>
                      </p>
                    </a>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-start gap-2">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <input
                              type="radio"
                              name="swatch-group-5"
                              id="swatch-5-featured"
                              className="absolute h-0 w-0 opacity-0"
                              defaultChecked
                            />
                            <label
                              htmlFor="swatch-5-featured"
                              className="block size-4 cursor-pointer rounded-full transition-all duration-200 ease-in-out peer-checked:border-2 peer-checked:border-white peer-checked:shadow-[0_0_0_1px_black] md:size-5 md:hover:scale-110 lg:size-6"
                              title="Women's Tree Breezer - Jet Black (Black Sole)"
                              style={{ backgroundColor: "rgb(35, 31, 32)" }}
                            ></label>
                          </div>
                        </div>
                      </div>
                      <p className="hidden items-center gap-1 font-sans text-sm font-medium tracking-wider uppercase xl:flex">
                        <span className="text-red-600">$80</span>
                        <span className="line-through opacity-65">$100</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PRODUCT CARD 6: Allbirds Slipper */}
              <div
                className="flex-shrink-0 h-full"
                style={{ width: "401px", marginRight: "10px" }}
              >
                <div className="group relative flex h-full flex-col rounded-2xl transition-all duration-300 ease-in-out w-full order-5 bg-white">
                  <div className="absolute top-2.5 right-2.5 left-2.5 z-20 flex items-center justify-between md:top-5 md:right-5 md:left-5">
                    <span
                      className="rounded-full px-2 py-1 text-xs font-medium tracking-wider text-black uppercase block md:hidden"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    >
                      31% Off
                    </span>
                    <span
                      className="hidden rounded-full px-2 py-1.5 text-xs font-medium tracking-wider text-black uppercase md:block"
                      style={{ backgroundColor: "rgb(255, 255, 255)" }}
                    >
                      31% Off
                    </span>
                  </div>

                  <a
                    href="/products/allbirds-slipper-natural-white"
                    className="relative z-10 aspect-square absolute inset-0 overflow-hidden rounded-t-2xl"
                  >
                    <img
                      alt="Allbirds Wool Slipper - Natural White"
                      className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out"
                      width="1024"
                      height="1024"
                      loading="eager"
                      src="//www.allbirds.com/cdn/shop/files/A12034_25Q4_Wool-Slipper-Natural-White-Natural-White-Sole_PDP_LEFT.png?v=1759335779&amp;width=1024"
                    />
                  </a>

                  <div className="mt-auto flex flex-col gap-2.5 justify-self-end p-2.5 sm:p-4">
                    <a
                      href="/products/allbirds-slipper-natural-white"
                      className="flex h-full flex-col gap-1.5 md:gap-1"
                    >
                      <p className="font-sans text-xs font-medium tracking-wider uppercase md:truncate md:overflow-hidden md:text-sm md:text-ellipsis">
                        Allbirds Slipper
                      </p>
                      <p className="min-h-[1.5em] truncate text-xs tracking-wider text-ellipsis md:text-sm">
                        Natural White
                      </p>
                      <p className="flex items-center gap-1 font-sans text-xs font-medium tracking-wider uppercase xl:hidden">
                        <span className="text-red-600">$52</span>
                        <span className="line-through opacity-65">$75</span>
                      </p>
                    </a>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-start gap-2">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <input
                              type="radio"
                              name="swatch-group-6"
                              id="swatch-6-featured"
                              className="absolute h-0 w-0 opacity-0"
                              defaultChecked
                            />
                            <label
                              htmlFor="swatch-6-featured"
                              className="block size-4 cursor-pointer rounded-full transition-all duration-200 ease-in-out peer-checked:border-2 peer-checked:border-white peer-checked:shadow-[0_0_0_1px_black] md:size-5 md:hover:scale-110 lg:size-6"
                              title="Allbirds Wool Slipper - Natural White"
                              style={{ backgroundColor: "rgb(231, 228, 211)" }}
                            ></label>
                          </div>
                        </div>
                      </div>
                      <p className="hidden items-center gap-1 font-sans text-sm font-medium tracking-wider uppercase xl:flex">
                        <span className="text-red-600">$52</span>
                        <span className="line-through opacity-65">$75</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export const schema = createSchema({
  title: "Featured Products1",
  type: "featured-products1",
  settings: [
    {
      group: "Layout",
      inputs: layoutInputs,
    },
    {
      group: "Background",
      inputs: backgroundInputs,
    },
  ],
});
