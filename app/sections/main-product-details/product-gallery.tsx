import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";
import { useRef, useState } from "react";
import { useLoaderData } from "react-router";
import type { loader as productRouteLoader } from "~/routes/products/product";
import { extractProductImages } from "./utils";

interface ProductGalleryProps extends HydrogenComponentProps {
  ref?: React.Ref<HTMLDivElement>;
}

export default function ProductGallery(props: ProductGalleryProps) {
  const { ref, ...rest } = props;
  const { product } = useLoaderData<typeof productRouteLoader>();
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = extractProductImages(product);
  const title = product.title;

  const scrollLeft = () => {
    if (scrollContainerRef.current && currentIndex > 0) {
      const slideWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 0;
      const gap = 10;
      scrollContainerRef.current.scrollBy({ left: -(slideWidth + gap), behavior: "smooth" });
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current && currentIndex < images.length - 1) {
      const slideWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 0;
      const gap = 10;
      scrollContainerRef.current.scrollBy({ left: slideWidth + gap, behavior: "smooth" });
      setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1));
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const slideWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 0;
      const gap = 10;
      const scrollPosition = index * (slideWidth + gap);
      scrollContainerRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
      setCurrentIndex(index);
    }
  };

  return (
    <div ref={ref} {...rest} className="group relative my-3 mb-8 max-md:-mx-6">
      {/* Image Slider */}
      <div
        ref={scrollContainerRef}
        className="flex gap-2.5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
        style={{ paddingLeft: 'calc(5%)', paddingRight: 'calc(5%)' }}
      >
        {images.map((src, index) => (
          <div key={index} className="shrink-0 w-[90%] snap-center">
            <div className="relative aspect-square overflow-hidden rounded-2xl md:aspect-2/1">
              <img
                alt={`${title} - Image ${index + 1}`}
                className="h-full w-full object-contain md:object-cover object-center"
                src={src}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={scrollLeft}
        className="absolute left-8 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-black bg-white/60 text-black opacity-0 transition-opacity duration-200 hover:bg-white group-hover:opacity-100 md:left-4 md:size-11"
        aria-label="Previous Image"
      >
        <svg className="size-8" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M14.0962 16.7175C13.901 16.9128 13.5844 16.9128 13.3891 16.7175L9.14648 12.4749C8.95122 12.2796 8.95122 11.963 9.14648 11.7678L13.3891 7.52512C13.5844 7.32986 13.901 7.32986 14.0962 7.52512C14.2915 7.72038 14.2915 8.03696 14.0962 8.23222L10.2071 12.1213L14.0962 16.0104C14.2915 16.2057 14.2915 16.5222 14.0962 16.7175Z" fill="currentColor" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={scrollRight}
        className="absolute right-8 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-black bg-white/60 text-black opacity-0 transition-opacity duration-200 hover:bg-white group-hover:opacity-100 md:right-4 md:size-11"
        aria-label="Next Image"
      >
        <svg className="size-8" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M10.1464 7.52512C10.3417 7.32986 10.6583 7.32986 10.8536 7.52512L15.0962 11.7678C15.2915 11.963 15.2915 12.2796 15.0962 12.4749L10.8536 16.7175C10.6583 16.9128 10.3417 16.9128 10.1464 16.7175C9.95118 16.5222 9.95118 16.2057 10.1464 16.0104L14.0355 12.1213L10.1464 8.23223C9.95118 8.03697 9.95118 7.72039 10.1464 7.52512Z" fill="currentColor" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-1.5 pt-3 opacity-100 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`size-2 rounded-full transition-colors ${index === currentIndex ? "bg-black" : "bg-gray-300 hover:bg-gray-400"}`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export const schema = createSchema({
  type: "mpd--gallery",
  title: "Product Gallery",
  enabledOn: {
    pages: ["PRODUCT"],
  },
});
