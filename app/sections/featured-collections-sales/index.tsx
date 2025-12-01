import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";
import { layoutInputs, Section } from "~/components/section";
import type { SectionProps } from "~/components/section";
import { useState } from "react";
import Link from "~/components/link";

export interface FeaturedCollectionsSalesProps extends SectionProps {
  ref?: React.Ref<HTMLElement>;
}

export default function FeaturedCollectionsSales(
  props: FeaturedCollectionsSalesProps & HydrogenComponentProps,
) {
  const { ref, ...rest } = props;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Section ref={ref} {...rest}>
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
        {/* Card 1: Bestsellers */}
        <div
          className="relative aspect-[0.77] overflow-hidden rounded-[20px] hover:rounded-full"
          style={{
            transitionProperty: "border-radius",
            transitionDuration: "2800ms",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={() => setHoveredIndex(0)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Main Image */}
                  <img
                    alt=""
                    className="w-full h-full object-cover"
                    height="1353"
                    loading="lazy"
                    src="//www.allbirds.com/cdn/shop/files/25Q4_Holiday_Site_Homepage_CategoryRow-01_Desktop-Mobile_2x3_5e949841-f296-498b-ad5b-40ce7cab3925.jpg?v=1761846551&width=1024"
                    width="1024"
                  />

          {/* Hover Image */}
                  <img
                    alt=""
            className={`absolute inset-0 z-10 w-full h-full object-cover transition-opacity duration-500 ease-out ${
              hoveredIndex === 0 ? "opacity-100" : "opacity-0"
            }`}
                    height="1353"
                    loading="lazy"
                    src="//www.allbirds.com/cdn/shop/files/25Q4_Holiday_Site_Homepage_CategoryRow-01_Desktop-Mobile_2x3_5e949841-f296-498b-ad5b-40ce7cab3925.jpg?v=1761846551&width=1024"
                    width="1024"
                  />

          {/* Default Button */}
          <div
            className={`absolute inset-0 z-20 m-auto flex h-fit w-fit flex-col items-center justify-center gap-2 transition-opacity duration-300 ease-out ${
              hoveredIndex === 0 ? "opacity-0" : "opacity-100"
            }`}
          >
                    <a
                      href="#"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white px-3 py-2 text-xs font-normal uppercase text-white"
            >
              SNEAKER SALE
            </a>
          </div>

          {/* Hover Content */}
          <div
            className={`absolute inset-0 z-20 m-auto flex h-fit w-fit flex-col items-center justify-center gap-2 transition-[transform,opacity] duration-500 ease-out ${
              hoveredIndex === 0 ? "translate-y-0 opacity-100" : "translate-y-[30%] opacity-0"
            }`}
                    >
            <div className="m-auto flex flex-col items-center justify-center gap-2">
              <Link
                to="/collections/mens-bestsellers"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white bg-transparent px-4 py-2 text-xs font-normal uppercase text-white transition-colors hover:bg-white hover:text-black w-full"
                    >
                Shop Men
              </Link>
              <Link
                to="/collections/womens-bestsellers"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white bg-transparent px-4 py-2 text-xs font-normal uppercase text-white transition-colors hover:bg-white hover:text-black w-full"
              >
                Shop Women
              </Link>
            </div>
          </div>
        </div>

        {/* Card 2: Mens */}
        <div
          className="relative aspect-[0.77] overflow-hidden rounded-[20px] hover:rounded-full"
          style={{
            transitionProperty: "border-radius",
            transitionDuration: "2800ms",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={() => setHoveredIndex(1)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
                  <img
                    alt=""
                    className="w-full h-full object-cover"
                    height="1353"
                    loading="lazy"
                    src="//www.allbirds.com/cdn/shop/files/25Q4_Holiday_Site_Homepage_CategoryRow-02_Desktop-Mobile_2x3_70b7c1a1-8f7c-4e63-972d-602393aff388.jpg?v=1761846550&width=1024"
                    width="1024"
                  />
                  <img
                    alt=""
            className={`absolute inset-0 z-10 w-full h-full object-cover transition-opacity duration-500 ease-out ${
              hoveredIndex === 1 ? "opacity-100" : "opacity-0"
            }`}
                    height="1353"
                    loading="lazy"
                    src="//www.allbirds.com/cdn/shop/files/25Q4_Holiday_Site_Homepage_CategoryRow-02_Desktop-Mobile_2x3_70b7c1a1-8f7c-4e63-972d-602393aff388.jpg?v=1761846550&width=1024"
                    width="1024"
                  />
          <div
            className={`absolute inset-0 z-20 m-auto flex h-fit w-fit flex-col items-center justify-center gap-2 transition-opacity duration-300 ease-out ${
              hoveredIndex === 1 ? "opacity-0" : "opacity-100"
            }`}
          >
                    <a
                      href="#"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white px-3 py-2 text-xs font-normal uppercase text-white"
            >
              ACTIVE SALE
            </a>
          </div>
          <div
            className={`absolute inset-0 z-20 m-auto flex h-fit w-fit flex-col items-center justify-center gap-2 transition-[transform,opacity] duration-500 ease-out ${
              hoveredIndex === 1 ? "translate-y-0 opacity-100" : "translate-y-[30%] opacity-0"
            }`}
          >
            <div className="m-auto flex flex-col items-center justify-center gap-2">
              <Link
                to="/collections/mens"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white bg-transparent px-4 py-2 text-xs font-normal uppercase text-white transition-colors hover:bg-white hover:text-black w-full"
              >
                Shop Men
              </Link>
              <Link
                to="/collections/womens"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white bg-transparent px-4 py-2 text-xs font-normal uppercase text-white transition-colors hover:bg-white hover:text-black w-full"
              >
                Shop Women
              </Link>
            </div>
          </div>
        </div>

        {/* Card 3: Womens */}
        <div
          className="relative aspect-[0.77] overflow-hidden rounded-[20px] hover:rounded-full"
          style={{
            transitionProperty: "border-radius",
            transitionDuration: "2800ms",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={() => setHoveredIndex(2)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
                  <img
                    alt=""
                    className="w-full h-full object-cover"
                    height="1353"
                    loading="lazy"
                    src="//www.allbirds.com/cdn/shop/files/25Q4_Holiday_Site_Homepage_CategoryRow-03_Desktop-Mobile_2x3_v2.jpg?v=1761846550&width=1024"
                    width="1024"
                  />
                  <img
                    alt=""
            className={`absolute inset-0 z-10 w-full h-full object-cover transition-opacity duration-500 ease-out ${
              hoveredIndex === 2 ? "opacity-100" : "opacity-0"
            }`}
                    height="1353"
                    loading="lazy"
                    src="//www.allbirds.com/cdn/shop/files/25Q4_Holiday_Site_Homepage_CategoryRow-03_Desktop-Mobile_2x3_v2.jpg?v=1761846550&width=1024"
                    width="1024"
                  />
          <div
            className={`absolute inset-0 z-20 m-auto flex h-fit w-fit flex-col items-center justify-center gap-2 transition-opacity duration-300 ease-out ${
              hoveredIndex === 2 ? "opacity-0" : "opacity-100"
            }`}
          >
                    <a
                      href="#"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white px-3 py-2 text-xs font-normal uppercase text-white"
            >
              SLIP-ON SALE
            </a>
          </div>
          <div
            className={`absolute inset-0 z-20 m-auto flex h-fit w-fit flex-col items-center justify-center gap-2 transition-[transform,opacity] duration-500 ease-out ${
              hoveredIndex === 2 ? "translate-y-0 opacity-100" : "translate-y-[30%] opacity-0"
            }`}
          >
            <div className="m-auto flex flex-col items-center justify-center gap-2">
              <Link
                to="/collections/mens"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white bg-transparent px-4 py-2 text-xs font-normal uppercase text-white transition-colors hover:bg-white hover:text-black w-full"
              >
                Shop Men
              </Link>
              <Link
                to="/collections/womens"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white bg-transparent px-4 py-2 text-xs font-normal uppercase text-white transition-colors hover:bg-white hover:text-black w-full"
              >
                Shop Women
              </Link>
            </div>
          </div>
        </div>

        {/* Card 4: Gifts */}
        <div
          className="relative aspect-[0.77] overflow-hidden rounded-[20px] hover:rounded-full"
          style={{
            transitionProperty: "border-radius",
            transitionDuration: "2800ms",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={() => setHoveredIndex(3)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
                  <img
                    alt=""
                    className="w-full h-full object-cover"
                    height="1353"
                    loading="lazy"
                    src="//www.allbirds.com/cdn/shop/files/25Q4_Holiday_Site_Homepage_CategoryRow-04_Desktop-Mobile_2x3_f7524866-ac72-48b8-86aa-55133498d2b4.jpg?v=1761846550&width=1024"
                    width="1024"
                  />
                  <img
                    alt=""
            className={`absolute inset-0 z-10 w-full h-full object-cover transition-opacity duration-500 ease-out ${
              hoveredIndex === 3 ? "opacity-100" : "opacity-0"
            }`}
                    height="1353"
                    loading="lazy"
                    src="//www.allbirds.com/cdn/shop/files/25Q4_Holiday_Site_Homepage_CategoryRow-04_Desktop-Mobile_2x3_f7524866-ac72-48b8-86aa-55133498d2b4.jpg?v=1761846550&width=1024"
                    width="1024"
                  />
          <div
            className={`absolute inset-0 z-20 m-auto flex h-fit w-fit flex-col items-center justify-center gap-2 transition-opacity duration-300 ease-out ${
              hoveredIndex === 3 ? "opacity-0" : "opacity-100"
            }`}
          >
                    <a
                      href="#"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white px-3 py-2 text-xs font-normal uppercase text-white"
            >
              OUTDOOR SALE
            </a>
          </div>
          <div
            className={`absolute inset-0 z-20 m-auto flex h-fit w-fit flex-col items-center justify-center gap-2 transition-[transform,opacity] duration-500 ease-out ${
              hoveredIndex === 3 ? "translate-y-0 opacity-100" : "translate-y-[30%] opacity-0"
            }`}
          >
            <div className="m-auto flex flex-col items-center justify-center gap-2">
              <Link
                to="/pages/holiday-gift-guide?view=holiday-gift-guide&gender=mens"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white bg-transparent px-4 py-2 text-xs font-normal uppercase text-white transition-colors hover:bg-white hover:text-black w-full"
                    >
                Shop Men
              </Link>
              <Link
                to="/pages/holiday-gift-guide?view=holiday-gift-guide&gender=womens"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white bg-transparent px-4 py-2 text-xs font-normal uppercase text-white transition-colors hover:bg-white hover:text-black w-full"
                    >
                Shop Women
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export const schema = createSchema({
  title: "Featured Collection Sales",
  type: "featured-collections-sales",
  settings: [  
    {
      group: "Layout",
      inputs: layoutInputs,
    },
  ],
});