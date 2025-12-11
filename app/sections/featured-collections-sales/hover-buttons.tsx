import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";

interface HoverButtonsProps extends HydrogenComponentProps {
  ref?: React.Ref<HTMLDivElement>;
}

function HoverButtons(props: HoverButtonsProps) {
  const { children, ref, ...rest } = props;

  return (
    <div
      ref={ref}
      {...rest}
      className="absolute inset-0  m-auto flex h-fit w-fit flex-col items-center justify-center gap-2 transition-[transform,opacity] duration-500 ease-out translate-y-[30%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
      data-hover-buttons
    >
      <div className="m-auto flex flex-col items-center justify-center gap-2">
        {children}
      </div>
    </div>
  );
}

export default HoverButtons;

export const schema = createSchema({
  type: "hover-buttons",
  title: "Hover Buttons",
  limit: 1,
  childTypes: ["button"],
  settings: [],
});

