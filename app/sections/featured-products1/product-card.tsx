import {
  createSchema,
  type ComponentLoaderArgs,
  type WeaverseProduct,
} from "@weaverse/hydrogen";
import type { FeaturedProduct1CardQuery } from "storefront-api.generated";
import SingleProductCard from "./single-product-card";

// Data interface - product picker input
interface FeaturedProductCardData {
  product?: WeaverseProduct;
}

// Props interface
interface FeaturedProductCardProps {
  loaderData: FeaturedProduct1CardLoaderData;
}

// GraphQL Query - lấy 1 product
const FEATURED_PRODUCT1_CARD_QUERY = `#graphql
  query FeaturedProduct1Card(
    $country: CountryCode
    $language: LanguageCode
    $id: ID!
  ) @inContext(country: $country, language: $language) {
    product(id: $id) {
      id
      title
      handle
      images(first: 1) {
        nodes {
          url
        }
      }
      options {
        name
        optionValues {
          name
          swatch {
            color
          }
        }
      }
      selectedOrFirstAvailableVariant(
        selectedOptions: []
        ignoreUnknownOptions: true
        caseInsensitiveMatch: true
      ) {
        id
        title
        image {
          url
          altText
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;

// Loader data type
export type FeaturedProduct1CardLoaderData = Awaited<ReturnType<typeof loader>>;

// Loader - query 1 product
export const loader = async ({
  data,
  weaverse,
}: ComponentLoaderArgs<FeaturedProductCardData>) => {
  const { language, country } = weaverse.storefront.i18n;
  const { product } = data;

  if (product?.id) {
    const id = `gid://shopify/Product/${product.id}`;
    const response = await weaverse.storefront.query<FeaturedProduct1CardQuery>(
      FEATURED_PRODUCT1_CARD_QUERY,
      { variables: { country, language, id } }
    );
    return { product: response.product };
  }

  return { product: null };
};

// Component - render SingleProductCard hoặc placeholder
export function FeaturedProductCard(props: FeaturedProductCardProps) {
  const { loaderData } = props;
  const product = loaderData?.product;

  // Nếu chưa chọn product - hiển thị placeholder
  if (!product) {
    return (
      <div
        className="flex-shrink-0 h-full flex items-center justify-center bg-gray-100 rounded-2xl"
        style={{ width: "401px", marginRight: "10px", minHeight: "400px" }}
      >
        <p className="text-gray-400">Select a product</p>
      </div>
    );
  }

  // Đã có product - render SingleProductCard
  return <SingleProductCard product={product} />;
}

// Schema - có product picker input
export const schema = createSchema({
  title: "Product Card",
  type: "featured-product1--card",
  settings: [
    {
      group: "Product",
      inputs: [
        {
          type: "product",
          name: "product",
          label: "Select Product",
        },
      ],
    },
  ],
});

export default FeaturedProductCard;
