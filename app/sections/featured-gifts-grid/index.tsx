import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";
import type { SectionProps } from "~/components/section";
import { Section, layoutInputs } from "~/components/section";

type GiftCard = {
  title?: string;
  image?: string;
  href?: string;
};

const DEFAULT_HERO_IMAGE =
  "https://www.allbirds.com/cdn/shop/files/25Q4_Holiday_Site_ColorGrid-01_Desktop-Mobile_1x1_565e2d02-794c-483e-9d0b-15386857e996.jpg?v=1761846551&width=1024";

const DEFAULT_TOP_CARD: Required<GiftCard> = {
  title: "Women's Breezer Mary Jane",
  image:
    "https://www.allbirds.com/cdn/shop/files/25Q4_Holiday_Batch2_Site_ColorGrid-02_Womens_MaryJaneDesktop-Mobile_1x1_b80f3bc7-419a-43e0-bab5-98db12f96994.jpg?v=1762910389&width=1024",
  href: "https://www.allbirds.com/products/womens-breezer-mary-jane",
};

const DEFAULT_TALL_CARD: Required<GiftCard> = {
  title: "Allbirds Wool Slipper",
  image:
    "https://www.allbirds.com/cdn/shop/files/25Q4_Holiday_Site_ColorGrid-04_Desktop-Mobile_9x16_b29b3c9c-8ecc-43ea-9739-46c2df3a008a.jpg?v=1761846550&width=1024",
  href: "https://www.allbirds.com/products/allbirds-slipper",
};

const DEFAULT_BOTTOM_CARD: Required<GiftCard> = {
  title: "Men's Wool Cruiser Mid Select",
  image:
    "https://www.allbirds.com/cdn/shop/files/25Q4_Holiday_Site_ColorGrid-05_Desktop-Mobile_1x1_151d7121-1b2d-455c-8a6d-df7a69a81d02.jpg?v=1761846550&width=1024",
  href: "https://www.allbirds.com/products/mens-wool-cruiser-mid-select",
};

export interface FeaturedGiftsGridProps extends SectionProps {
  ref?: React.Ref<HTMLElement>;
  heroImage?: string;
  topCardTitle?: string;
  topCardImage?: string;
  topCardHref?: string;
  tallCardTitle?: string;
  tallCardImage?: string;
  tallCardHref?: string;
  bottomCardTitle?: string;
  bottomCardImage?: string;
  bottomCardHref?: string;
}

export default function FeaturedGiftsGrid(
  props: FeaturedGiftsGridProps & HydrogenComponentProps,
) {
  const {
    ref,
    children,
    heroImage,
    topCardTitle,
    topCardImage,
    topCardHref,
    tallCardTitle,
    tallCardImage,
    tallCardHref,
    bottomCardTitle,
    bottomCardImage,
    bottomCardHref,
    ...rest
  } = props;

  const heroSrc = heroImage || DEFAULT_HERO_IMAGE;
  const resolvedTop: GiftCard = {
    title: topCardTitle || DEFAULT_TOP_CARD.title,
    image: topCardImage || DEFAULT_TOP_CARD.image,
    href: topCardHref || DEFAULT_TOP_CARD.href,
  };
  const resolvedTall: GiftCard = {
    title: tallCardTitle || DEFAULT_TALL_CARD.title,
    image: tallCardImage || DEFAULT_TALL_CARD.image,
    href: tallCardHref || DEFAULT_TALL_CARD.href,
  };
  const resolvedBottom: GiftCard = {
    title: bottomCardTitle || DEFAULT_BOTTOM_CARD.title,
    image: bottomCardImage || DEFAULT_BOTTOM_CARD.image,
    href: bottomCardHref || DEFAULT_BOTTOM_CARD.href,
  };

  const renderCard = (card: GiftCard, extra = "") => {
    if (!card?.image) {
      return null;
    }

    return (
      <div className={`relative rounded-2xl overflow-hidden bg-white ${extra}`}>
        <a className="block h-full" href={card.href ?? "#"} title={card.title}>
          <img
            alt={card.title || "Featured gift"}
            className="block h-full w-full object-cover"
            src={card.image}
            loading="lazy"
          />
        </a>
      </div>
    );
  };

  return (
    <Section ref={ref} {...rest}>
      <div className="grid grid-cols-2 gap-2.5 auto-rows-fr max-md:grid-flow-row-dense md:grid-cols-4">
        <div className="relative rounded-2xl row-span-2 col-span-2 aspect-square overflow-hidden bg-transparent">
          {heroSrc ? (
            <img
              alt="Featured gifts hero"
              className="object-cover size-full"
              src={heroSrc}
              loading="eager"
            />
          ) : null}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 gap-1 md:justify-center md:items-center md:text-center [&_.subheading]:my-1 [&_.subheading]:text-xs [&_.subheading]:font-mono [&_.subheading]:tracking-[0.2em] [&_.subheading]:uppercase [&_.heading]:font-serif [&_.heading]:text-3xl [&_.heading]:md:text-[40px] [&_.button]:mt-4 [&_.button]:md:mt-5">
            {children}
          </div>
        </div>

        {renderCard(resolvedTop, "aspect-square")}
        {renderCard(resolvedTall, "row-span-2 aspect-[1/2]")}
        {renderCard(resolvedBottom, "aspect-square")}
      </div>
    </Section>
  );
}

export const schema = createSchema({
  title: "Featured Gifts Grid",
  type: "featured-gifts-grid",
  childTypes: ["subheading", "heading", "paragraph", "button"],
  settings: [
    {
      group: "Layout",
      inputs: layoutInputs,
    },
    {
      group: "Content",
      inputs: [
        {
          type: "image",
          name: "heroImage",
          label: "Hero image",
        },
        { type: "text", name: "topCardTitle", label: "Top card title", defaultValue: DEFAULT_TOP_CARD.title },
        { type: "image", name: "topCardImage", label: "Top card image", defaultValue: DEFAULT_TOP_CARD.image },
        { type: "url", name: "topCardHref", label: "Top card link", defaultValue: DEFAULT_TOP_CARD.href },
        { type: "text", name: "tallCardTitle", label: "Tall card title", defaultValue: DEFAULT_TALL_CARD.title },
        { type: "image", name: "tallCardImage", label: "Tall card image", defaultValue: DEFAULT_TALL_CARD.image },
        { type: "url", name: "tallCardHref", label: "Tall card link", defaultValue: DEFAULT_TALL_CARD.href },
        {
          type: "text",
          name: "bottomCardTitle",
          label: "Bottom card title",
          defaultValue: DEFAULT_BOTTOM_CARD.title,
        },
        {
          type: "image",
          name: "bottomCardImage",
          label: "Bottom card image",
          defaultValue: DEFAULT_BOTTOM_CARD.image,
        },
        {
          type: "url",
          name: "bottomCardHref",
          label: "Bottom card link",
          defaultValue: DEFAULT_BOTTOM_CARD.href,
        },
      ],
    },
  ],
  presets: {
    heroImage: DEFAULT_HERO_IMAGE,
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
        buttonStyle: "primary",
      },
    ],
  },
});