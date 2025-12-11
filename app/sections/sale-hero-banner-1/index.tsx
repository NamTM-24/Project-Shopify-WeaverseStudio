import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { useEffect, useRef } from "react";
import type { SectionProps } from "~/components/section";
import { layoutInputs, Section } from "~/components/section";
import { cn } from "~/utils/cn";
import { backgroundInputs } from "~/components/background-image";
import { overlayInputs } from "~/components/overlay";
import type { OverlayAndBackgroundProps } from "~/components/overlay-and-background";

const gapVariants = cva("", {
  variants: {
    gap: {
      0: "gap-0",
      4: "gap-1",
      8: "gap-2",
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
    contentPosition: {
      "top left": "items-start justify-start [&_.paragraph]:text-left",
      "top center": "items-center justify-start [&_.paragraph]:text-center",
      "top right": "items-end justify-start [&_.paragraph]:text-right",
      "center left": "items-start justify-center [&_.paragraph]:text-left",
      "center center": "items-center justify-center [&_.paragraph]:text-center",
      "center right": "items-end justify-center [&_.paragraph]:text-right",
      "bottom left": "items-start justify-end [&_.paragraph]:text-left",
      "bottom center": "items-center justify-end [&_.paragraph]:text-center",
      "bottom right": "items-end justify-end [&_.paragraph]:text-right",
    },
  },
  defaultVariants: {
    gap: 20,
    contentPosition: "center center",
  }
})

export interface SaleHeroBannerProps
  extends VariantProps<typeof gapVariants>,
  SectionProps ,
  OverlayAndBackgroundProps {
  ref: React.Ref<HTMLElement>;
}

export default function SaleHeroBanner1(
  props: SaleHeroBannerProps & HydrogenComponentProps,
) {
  const { ref, 
    children, 
    gap = 20, 
    contentPosition = "center center",
    backgroundImage,
    backgroundFit,
    backgroundPosition,
    enableOverlay,
    overlayOpacity,
    overlayColor,
    overlayColorHover,
    ...rest } = props;


  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const buttons = Array.from(
      container.querySelectorAll<HTMLElement>(
        'a[class*="circle"], a[class*="button"], button[class*="circle"], button[class*="button"]',
      ),
    );

    if (buttons.length > 0) {
      const existingWrapper = container.querySelector(".button-wrapper");
      if (existingWrapper) {
        existingWrapper.remove();
      }

      const buttonWrapper = document.createElement("div");
      buttonWrapper.className =
        "button-wrapper flex flex-row items-center justify-center gap-4 md:gap-2 lg:gap-4 pt-4 md:pt-6";

      buttons.forEach((button) => {
        const parent = button.parentElement;
        if (parent && parent !== buttonWrapper) {
          parent.removeChild(button);
          buttonWrapper.appendChild(button);
        }
      });

      if (buttonWrapper.children.length > 0) {
        container.appendChild(buttonWrapper);
      }
    }
  }, [children]);

  return (
    <Section 
      ref={ref} 
      backgroundImage={backgroundImage}
      backgroundFit={backgroundFit}
      backgroundPosition={backgroundPosition}
      enableOverlay={enableOverlay}
      overlayOpacity={overlayOpacity}
      overlayColor={overlayColor}
      overlayColorHover={overlayColorHover}
      {...rest}
      >
      <div
        ref={containerRef}
        className={cn(
          "relative px-5 py-6 md:px-10 md:py-8 lg:px-15 lg:py-12",
          "flex flex-col items-center text-center justify-center",
          gapVariants({ gap , contentPosition}),
          "[&_.subheading]:font-mono",
          "[&_.subheading]:tracking-wide",
          "[&_.subheading]:uppercase",
          "[&_.heading]:font-serif",
          "[&_.heading]:leading-tight",
          "[&_.heading]:select-none",
          "[&_.heading]:md:pt-2",
          "[&_.heading]:md:pb-4",
          "[&_.heading]:pt-1",
          "[&_.heading]:pb-2",
          "[&_.paragraph]:font-sans",
          "[&_.paragraph]:leading-relaxed",
          "[&_.paragraph]:font-normal",
          "[&_.paragraph]:tracking-wide",
          "[&_.paragraph]:md:leading-normal",
        )}
      >
        {children}
      </div>
    </Section>
  );
}

export const schema = createSchema({
  title: "Sale Hero Banner",
  type: "sale-hero-banner",
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
          type: "position",
          label: "Content Position",
          name: "contentPosition",
          defaultValue: "center center"
        },
      ],
    },
    {
      group: "Background",
      inputs: backgroundInputs.filter((input) =>
        ["backgroundImage", "backgroundFit", "backgroundPosition"].includes(
          input.name as string,
        ),
      ),
    },
    {
      group: "Overlay",
      inputs: overlayInputs,
    }
  ],
  presets: {
    backgroundFit: "cover",
    children: [
      {
        type: "subheading",
        content: "Black Friday Preview Sale",
        color: "#fff",
        size: "base",
      },
      {
        type: "heading",
        content: "Up to 50% Off Select Styles",
        color: "#fff",
        size: "scale",
        minSize: 23,
        maxSize: 60,
      },
      {
        type: "paragraph",
        content: "Early Access Starts Now",
        color: "#fff",
        textSize: "xs",
      },
    ],
  },
});
