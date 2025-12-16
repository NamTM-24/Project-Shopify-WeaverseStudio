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

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -420, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 420, behavior: "smooth" });
    }
  };

  return (
    <Section ref={ref} {...rest}>
      <div className="relative my-10" style={{ opacity: 1 }}>
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <div className="relative flex items-center justify-start gap-5 overflow-x-auto scroll-smooth px-5 md:gap-10">
            <div className="transition-colors pointer-events-auto cursor-pointer border-b-2 border-transparent font-mono text-sm tracking-wider whitespace-nowrap uppercase duration-300 select-none hover:border-black md:text-base font-medium border-black">
              Explore More
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="mr-10 hidden items-center justify-end gap-2.5 md:flex">
            <button
              className="size-10 hover:bg-gray-100 rounded-full transition-colors"
              title="Previous Product"
              onClick={scrollLeft}
            >
              <svg className="size-8" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M14.0962 16.7175C13.901 16.9128 13.5844 16.9128 13.3891 16.7175L9.14648 12.4749C8.95122 12.2796 8.95122 11.963 9.14648 11.7678L13.3891 7.52512C13.5844 7.32986 13.901 7.32986 14.0962 7.52512C14.2915 7.72038 14.2915 8.03696 14.0962 8.23222L10.2071 12.1213L14.0962 16.0104C14.2915 16.2057 14.2915 16.5222 14.0962 16.7175Z" fill="currentColor"></path>
              </svg>
            </button>
            <button
              className="size-10 hover:bg-gray-100 rounded-full transition-colors"
              title="Next Product"
              onClick={scrollRight}
            >
              <svg className="size-8" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.1464 7.52512C10.3417 7.32986 10.6583 7.32986 10.8536 7.52512L15.0962 11.7678C15.2915 11.963 15.2915 12.2796 15.0962 12.4749L10.8536 16.7175C10.6583 16.9128 10.3417 16.9128 10.1464 16.7175C9.95118 16.5222 9.95118 16.2057 10.1464 16.0104L14.0355 12.1213L10.1464 8.23223C9.95118 8.03697 9.95118 7.72039 10.1464 7.52512Z" fill="currentColor"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* CAROUSEL */}
        <div className="relative select-none">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scroll-smooth hidden-scroll"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex w-max">{children}</div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export const schema = createSchema({
  title: "Featured Products1",
  type: "featured-products1",
  childTypes: ["featured-product1--card"],
  presets: {
    children: [
      { type: "featured-product1--card" },
    ],
  },
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
