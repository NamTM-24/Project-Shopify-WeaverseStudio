import {
  createSchema,
  type HydrogenComponentProps,
  IMAGES_PLACEHOLDERS,
  type WeaverseImage,
} from "@weaverse/hydrogen";
import { Image } from "~/components/image";
import Link from "~/components/link";

export interface FeaturedGiftsSquareCardProps extends HydrogenComponentProps {
  ref?: React.Ref<HTMLDivElement>;
  cardImage?: WeaverseImage | string;
  cardHref?: string;
  cardTitle?: string;
}

export default function FeaturedGiftsSquareCard(
  props: FeaturedGiftsSquareCardProps,
) {
  const { ref, cardImage, cardHref, cardTitle, ...rest } = props;

  const imageData =
    typeof cardImage === "string"
      ? { url: cardImage }
      : cardImage || { url: IMAGES_PLACEHOLDERS.product_1 };

  if (!imageData?.url) {
    return null;
  }

  return (
    <div
      ref={ref}
      {...rest}
      className="relative rounded-2xl aspect-square overflow-hidden bg-white"
    >
      <Link
        to={cardHref || "#"}
        className="block h-full"
        title={cardTitle || "Featured gift"}
      >
        <Image
          data={imageData}
          sizes="(min-width: 48em) 25vw, 50vw"
          className="block h-full w-full object-cover"
          alt={cardTitle || "Featured gift"}
          loading="lazy"
        />
      </Link>
    </div>
  );
}

export const schema = createSchema({
  type: "featured-gifts-grid--square-card",
  title: "Square Card",
  settings: [
    {
      group: "Card",
      inputs: [
        {
          type: "image",
          name: "cardImage",
          label: "Card image",
          defaultValue: IMAGES_PLACEHOLDERS.product_1,
        },
        {
          type: "url",
          name: "cardHref",
          label: "Card link",
          placeholder: "https://example.com/product",
        },
        {
          type: "text",
          name: "cardTitle",
          label: "Card title",
          placeholder: "Product name",
        },
      ],
    },
  ],
  presets: {
    cardImage: IMAGES_PLACEHOLDERS.product_1,
  },
});

