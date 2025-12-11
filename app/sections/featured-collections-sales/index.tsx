import {
  createSchema,
  type HydrogenComponentProps,
} from "@weaverse/hydrogen";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { backgroundInputs } from "~/components/background-image";
import { layoutInputs, Section } from "~/components/section";
import type { SectionProps } from "~/components/section";
import { cn } from "~/utils/cn";

const gapVariants = cva("", {
  variants: {
    gap: {
      0: "gap-0",
      4: "gap-1",
      8: "gap-2",
      10: "gap-2.5",
      12: "gap-3",
      16: "gap-4",
      20: "gap-5",
      24: "gap-6",
      28: "gap-7",
      32: "gap-8",
      36: "gap-9",
      40: "gap-10",
      44: "gap-11",
      48: "gap-12",
      52: "gap-[52px]",
      56: "gap-14",
      60: "gap-[60px]",
    },
  },
  defaultVariants: {
    gap: 10,
  },
});

// PROPS INTERFACE
export interface FeaturedCollectionsSalesProps
  extends Omit<SectionProps, "gap">, VariantProps<typeof gapVariants> {
  ref?: React.Ref<HTMLElement>;
}

// COMPONENT - Simple container, no loader needed
export default function FeaturedCollectionsSales(
  props: FeaturedCollectionsSalesProps & HydrogenComponentProps,
) {
  const { ref, children, gap = 10, ...rest } = props;

  return (
    <Section ref={ref} {...rest}>
      <div
        className={cn("grid grid-cols-2 md:grid-cols-4", gapVariants({ gap }))}
      >
        {children}
      </div>
    </Section>
  );
}

// SCHEMA
export const schema = createSchema({
  title: "Featured Collection Sales",
  type: "featured-collections-sales",
  childTypes: ["featured-collections-sales-item"],
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
        type: "featured-collections-sales-item",
      },
      {
        type: "featured-collections-sales-item",
      },
      {
        type: "featured-collections-sales-item",
      },
      {
        type: "featured-collections-sales-item",
      },
    ],
  },
});
