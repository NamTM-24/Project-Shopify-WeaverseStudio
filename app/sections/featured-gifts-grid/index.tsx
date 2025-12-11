import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";
import { backgroundInputs } from "~/components/background-image";
import type { SectionProps } from "~/components/section";
import { Section, layoutInputs } from "~/components/section";

export interface FeaturedGiftsGridProps extends SectionProps {
  ref?: React.Ref<HTMLElement>;
}

export default function FeaturedGiftsGrid(
  props: FeaturedGiftsGridProps & HydrogenComponentProps,
) {
  const { ref, children, ...rest } = props;

  return (
    <Section ref={ref} {...rest}>
      <div className="grid grid-cols-2 gap-2.5 auto-rows-fr max-md:grid-flow-row-dense md:grid-cols-4">
        {children}
      </div>
    </Section>
  );
}

export const schema = createSchema({
  title: "Featured Gifts Grid",
  type: "featured-gifts-grid",
  childTypes: [
    "featured-gifts-grid--hero",
    "featured-gifts-grid--square-card",
    "featured-gifts-grid--tall-card",
  ],
  settings: [
    {
      group: "Layout",
      inputs: layoutInputs,
    },
    {
      group: "Background",
      inputs: [
        ...backgroundInputs.filter((inp) => inp.name !== "backgroundFor"),
      ],
    },
  ],
  presets: {
    children: [
      {
        type: "featured-gifts-grid--hero",
        heroImage:
          "https://www.allbirds.com/cdn/shop/files/25Q4_Holiday_Site_ColorGrid-01_Desktop-Mobile_1x1_565e2d02-794c-483e-9d0b-15386857e996.jpg?v=1761846551&width=1024",
        children: [
          {
            type: "subheading",
            content: "The Holiday Collection",
            color: "#ffffff",
            alignment: "center",
          },
          {
            type: "heading",
            content: "Feel Good Gifting",
            color: "#ffffff",
            size: "scale",
            minSize: 24,
            maxSize: 40,
          },
          {
            type: "button",
            label: "Shop Gifts",
            href: "https://www.allbirds.com/pages/holiday-gift-guide",
            buttonStyle: "circle",
          },
        ],
      },
      {
        type: "featured-gifts-grid--square-card",
        cardImage:
          "https://www.allbirds.com/cdn/shop/files/25Q4_Holiday_Batch2_Site_ColorGrid-02_Womens_MaryJaneDesktop-Mobile_1x1_b80f3bc7-419a-43e0-bab5-98db12f96994.jpg?v=1762910389&width=1024",
        cardHref: "https://www.allbirds.com/products/womens-breezer-mary-jane",
        cardTitle: "Women's Breezer Mary Jane",
      },
      {
        type: "featured-gifts-grid--tall-card",
        cardImage:
          "https://www.allbirds.com/cdn/shop/files/25Q4_Holiday_Site_ColorGrid-04_Desktop-Mobile_9x16_b29b3c9c-8ecc-43ea-9739-46c2df3a008a.jpg?v=1761846550&width=1024",
        cardHref: "https://www.allbirds.com/products/allbirds-slipper",
        cardTitle: "Allbirds Wool Slipper",
      },
      {
        type: "featured-gifts-grid--square-card",
        cardImage:
          "https://www.allbirds.com/cdn/shop/files/25Q4_Holiday_Site_ColorGrid-05_Desktop-Mobile_1x1_151d7121-1b2d-455c-8a6d-df7a69a81d02.jpg?v=1761846550&width=1024",
        cardHref:
          "https://www.allbirds.com/products/mens-wool-cruiser-mid-select",
        cardTitle: "Men's Wool Cruiser Mid Select",
      },
    ],
  },
});
