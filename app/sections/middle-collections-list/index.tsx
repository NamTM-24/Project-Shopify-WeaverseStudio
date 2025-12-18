import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";
import { Section, type SectionProps, layoutInputs } from "~/components/section";
import { backgroundInputs } from "~/components/background-image";

interface ProductCard {
  id: string;
  title: string;
  url: string;
  image: string;
  variant?: string;
}

const mockProducts: ProductCard[] = [
  {
    id: "7205168250960",
    title: "Women's Kiwi Clog - Dark Camel (Stony Cream Sole)",
    url: "/products/womens-kiwi-clog",
    image: "//www.allbirds.com/cdn/shop/files/A12147_25Q4_Kiwi-Clog-Dark-Camel-Stony-Cream-Sole_PDP_LEFT_bd7c1a74-a561-4b72-9ea1-3c9f425b8d3d.png?v=1761687828&width=1024",
  },
  {
    id: "7204717297744",
    title: "Allbirds Wool Slipper - Natural White",
    url: "/products/allbirds-slipper-natural-white",
    image: "//www.allbirds.com/cdn/shop/files/A12034_25Q4_Wool-Slipper-Natural-White-Natural-White-Sole_PDP_LEFT.png?v=1759335779&width=1024",
  },
  {
    id: "7204716838992",
    title: "Allbirds Slipper - Dark Grey",
    url: "/products/allbirds-slipper-dark-grey-tweed",
    image: "//www.allbirds.com/cdn/shop/files/A11582_25Q4_Slipper-Tweed-Dark-Grey-Dark-Grey-Sole_PDP_LEFT.png?v=1759335422&width=1024",
  },
  {
    id: "7222321315920",
    title: "Allbirds Slipper - Natural Black Fluff",
    url: "/products/allbirds-slipper-natural-black-fluff",
    image: "//www.allbirds.com/cdn/shop/files/A11805_25Q4_Wool-Slipper-Fluff-Natural-Black-Natural-Black-Sole_PDP_LEFT.png?v=1758757533&width=1024",
  },
  {
    id: "7234438135888",
    title: "Women's Wool Cruiser Slip On Fluff - Natural White",
    url: "/products/womens-wool-cruiser-slip-on-fluff",
    image: "//www.allbirds.com/cdn/shop/files/A11827_25Q4_Wool-Cruiser-Slip-On-Fluff-Natural-White-Natural-White-Sole_PDP_LEFT_968d7840-4494-4668-af40-2315da199ffe.png?v=1761692209&width=1024",
  },
  {
    id: "7234392981584",
    title: "Women's Cruiser Slip On Tweed - Dark Grey",
    url: "/products/womens-cruiser-slip-on-tweed",
    image: "//www.allbirds.com/cdn/shop/files/A11550_25Q4_Cruiser-Slip-On-Tweed-Dark-Grey-Stormy-Grey-Sole_PDP_LEFT_f8d75b7b-bab3-44f9-a4a1-1fb26875c0d5.png?v=1761685238&width=1024",
  },
  {
    id: "7199660212304",
    title: "Women's Wool Cruiser Slip On - Dark Grey",
    url: "/products/womens-wool-cruiser-slip-on",
    image: "//www.allbirds.com/cdn/shop/files/A11636_25Q3_Wool-Cruiser-Slip-On-Dark-Grey-Light-Grey-Sole_PDP_LEFT__1_056967a9-8421-46db-a3ed-cae6cdae557a.png?v=1754513164&width=1024",
  },
  {
    id: "7234402779216",
    title: "Women's Lounger Lift Velvet - Sienna Blush",
    url: "/products/womens-lounger-lift-velvet",
    image: "//www.allbirds.com/cdn/shop/files/A11863_25Q4_Lounger-Lift-Velvet-Sienna-Blush-Blizzard-Sole_PDP_LEFT.png?v=1761770613&width=1024",
  },
];

export interface MiddleCollectionsListProps extends SectionProps {
  heading?: string;
  subheading?: string;
}

export default function MiddleCollectionsList(
  props: MiddleCollectionsListProps & HydrogenComponentProps
) {
  const { heading = "Complete the Collection", subheading = "Tap or click any style to learn more", ...rest } = props;

  return (
    <Section {...rest}>
      <div className="px-2.5">
        {/* Header */}
        <div className="mx-auto mb-2 text-center md:mb-5 md:max-w-4xl">
          <div className="flex flex-col gap-2">
            <h1 className="font-serif text-3xl font-normal text-gray-900 md:text-4xl">
              {heading}
            </h1>
            <h4 className="font-sans text-sm font-normal text-gray-600 md:text-base">
              {subheading}
            </h4>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-white"
            >
              <a 
                href={product.url} 
                title={product.title} 
                className="block h-full w-full"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export const schema = createSchema({
  type: "middle-collections-list",
  title: "Middle Collections List",
  settings: [
    {
      group: "Text",
      inputs: [
        {
          type: "text",
          name: "heading",
          label: "Heading",
          defaultValue: "Complete the Collection",
        },
        {
          type: "text",
          name: "subheading",
          label: "Subheading",
          defaultValue: "Tap or click any style to learn more",
        },
      ],
    },
    {
      group: "Layout",
      inputs: layoutInputs,
    },
    {
      group: "Background",
      inputs: backgroundInputs.filter((inp) => inp.name !== "backgroundFor"),
    },
  ],
});
