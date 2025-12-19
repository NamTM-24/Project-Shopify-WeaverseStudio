import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";
import { useLoaderData } from "react-router";
import type { loader as productRouteLoader } from "~/routes/products/product";

interface ProductBreadcrumbProps extends HydrogenComponentProps {
  ref?: React.Ref<HTMLElement>;
}

export default function ProductBreadcrumb(props: ProductBreadcrumbProps) {
  const { ref, ...rest } = props;
  const { product } = useLoaderData<typeof productRouteLoader>();

  return (
    <nav ref={ref} {...rest} className="mx-5 mb-2.5 text-xs text-gray-500 max-lg:mt-10">
      <ol className="flex items-center">
        <li>
          <a href="/" className="hover:underline">Home</a>
        </li>
        <li className="hidden md:block">
          <span className="mx-1.5">/</span>
          <span>{product.title}</span>
        </li>
      </ol>
    </nav>
  );
}

export const schema = createSchema({
  type: "mpd--breadcrumb",
  title: "Breadcrumb",
  enabledOn: {
    pages: ["PRODUCT"],
  },
});
