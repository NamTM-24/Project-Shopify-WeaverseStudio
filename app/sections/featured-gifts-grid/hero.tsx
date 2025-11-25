import {
  createSchema,
  type HydrogenComponentProps,
  IMAGES_PLACEHOLDERS,
  type WeaverseImage,
} from "@weaverse/hydrogen";
import { Image } from "~/components/image";

export interface FeaturedGiftsHeroProps extends HydrogenComponentProps {
  ref?: React.Ref<HTMLDivElement>;
  heroImage?: WeaverseImage | string;
}

export default function FeaturedGiftsHero(
  props: FeaturedGiftsHeroProps,
) {
  const { ref, heroImage, children, ...rest } = props;

  const imageData =
    typeof heroImage === "string"
      ? { url: heroImage }
      : heroImage || { url: IMAGES_PLACEHOLDERS.collection_1 };

  return (
    <div
      ref={ref}
      {...rest}
      className="relative rounded-2xl row-span-2 col-span-2 aspect-square overflow-hidden bg-transparent"
    >
      {imageData?.url && (
        <Image
          data={imageData}
          sizes="(min-width: 48em) 50vw, 100vw"
          className="object-cover size-full"
          alt="Featured gifts hero"
          loading="eager"
        />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 gap-1 md:justify-center md:items-center md:text-center [&_.subheading]:my-1 [&_.subheading]:text-xs [&_.subheading]:font-mono [&_.subheading]:tracking-[0.2em] [&_.subheading]:uppercase [&_.heading]:font-serif [&_.heading]:text-3xl [&_.heading]:md:text-[40px] [&_.button]:mt-4 [&_.button]:md:mt-5">
        {children}
      </div>
    </div>
  );
}

export const schema = createSchema({
  type: "featured-gifts-grid--hero",
  title: "Hero",
  childTypes: ["subheading", "heading", "paragraph", "button"],
  settings: [
    {
      group: "Hero",
      inputs: [
        {
          type: "image",
          name: "heroImage",
          label: "Hero image",
          defaultValue: IMAGES_PLACEHOLDERS.collection_1,
        },
      ],
    },
  ],
  presets: {
    heroImage: IMAGES_PLACEHOLDERS.collection_1,
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

