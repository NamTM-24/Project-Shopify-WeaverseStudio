import {
  createSchema,
  type HydrogenComponentProps,
  type ComponentLoaderArgs,
  type WeaverseCollection,
  IMAGES_PLACEHOLDERS,
  type WeaverseImage,
} from "@weaverse/hydrogen";
import { useState } from "react";
import { Image } from "~/components/image";
import type { ImageAspectRatio } from "~/types/others";
import { calculateAspectRatio } from "~/utils/image";

// GraphQL Query - Lấy 1 collection theo ID
const COLLECTION_QUERY = `#graphql
  query singleCollection($country: CountryCode, $language: LanguageCode, $id: ID!)
  @inContext(country: $country, language: $language) {
    node(id: $id) {
      ... on Collection {
        id
        title
        handle
        image {
          url
          altText
          width
          height
        }
      }
    }
  }
` as const;

// Input Type - Dữ liệu từ Settings
interface SalesItemInput {
  collection: WeaverseCollection;
  mainImage: WeaverseImage;
  hoverImage?: WeaverseImage;
  imageAspectRatio: ImageAspectRatio;
}

// Loader - Mỗi item tự query collection của riêng mình
export const loader = async ({
  data,
  weaverse,
}: ComponentLoaderArgs<SalesItemInput>) => {
  const { language, country } = weaverse.storefront.i18n;
  
  if (data.collection?.id) {
    const id = `gid://shopify/Collection/${data.collection.id}`;
    const { node } = await weaverse.storefront.query(COLLECTION_QUERY, {
      variables: { country, language, id },
    });
    return node;
  }
  
  return null;
};

// Output Type
export type SalesItemLoaderData = Awaited<ReturnType<typeof loader>>;

// Props Interface
interface SalesItemProps extends HydrogenComponentProps<SalesItemLoaderData> {
  mainImage: WeaverseImage;
  hoverImage?: WeaverseImage;
  imageAspectRatio: ImageAspectRatio;
  loaderData?: SalesItemLoaderData;
}

function SalesItem(props: SalesItemProps) {
  const { mainImage, hoverImage, imageAspectRatio = "adapt", loaderData, children, ...rest } = props;
  const [isHovered, setIsHovered] = useState(false);
  
  // Lấy dữ liệu collection từ loader của chính item này
  const collection = loaderData;
  
  // Xác định ảnh hiển thị: Ưu tiên ảnh từ Collection, nếu không có thì dùng mainImage
  const mainImageData = typeof mainImage === "object" ? mainImage : { url: mainImage };
  const collectionImage = collection?.image || mainImageData;
  const aspectRatio = calculateAspectRatio(collectionImage, imageAspectRatio);

  return (
    <div
      {...rest}
      className="group relative overflow-hidden rounded-[20px] hover:rounded-full"
      style={{
        aspectRatio,
        transitionProperty: "border-radius",
        transitionDuration: "2800ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image */}
      <Image
        data={collectionImage}
        className="w-full h-full object-cover"
        sizes="auto"
      />

      {/* Hover Image (nếu có) */}
      {hoverImage && (
        <Image
          data={
            typeof hoverImage === "object" ? hoverImage : { url: hoverImage }
          }
          className={`absolute inset-0 z-10 w-full h-full object-cover transition-opacity duration-500 ease-out ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          sizes="auto"
        />
      )}

      {/* Children (Default Button & Hover Buttons) */}
      {children}
    </div>
  );
}

export default SalesItem;

export const schema = createSchema({
  type: "featured-collections-sales-item",
  title: "Sales Item",
  childTypes: ["default-button", "hover-buttons"],
  settings: [
    {
      group: "Collection",
      inputs: [
        {
          type: "collection",
          name: "collection",
          label: "Select Collection",
        },
      ],
    },
    {
      group: "Images",
      inputs: [
        {
          type: "image",
          name: "mainImage",
          label: "Fallback Image",
          helpText: "Used if collection has no image",
        },
        {
          type: "image",
          name: "hoverImage",
          label: "Hover Image (optional)",
        },
        {
          type: "select",
          name: "imageAspectRatio",
          label: "Image aspect ratio",
          defaultValue: "adapt",
          configs: {
            options: [
              { value: "adapt", label: "Adapt to image" },
              { value: "1/1", label: "Square (1/1)" },
              { value: "3/4", label: "Portrait (3/4)" },
              { value: "4/3", label: "Landscape (4/3)" },
              { value: "16/9", label: "Widescreen (16/9)" },
            ],
          },
        },
      ],
    },
  ],
  presets: {
    mainImage: IMAGES_PLACEHOLDERS.banner_1,
    children: [
      {
        type: "default-button",
        children: [
          {
            type: "button",
            text: "Button Default",
            variant: "circle",
          },
        ],
      },
      {
        type: "hover-buttons",
        children: [
          {
            type: "button",
            text: "Shop Men",
            variant: "circle",
            to: "/collections/mens",
          },
          {
            type: "button",
            text: "Shop Women",
            variant: "circle",
            to: "/collections/womens",
          },
        ],
      },
    ],
  },
});
