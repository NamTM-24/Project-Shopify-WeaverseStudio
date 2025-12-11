import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";

interface DefaultButtonProps extends HydrogenComponentProps {
  ref?: React.Ref<HTMLDivElement>;
}

function DefaultButton(props: DefaultButtonProps) {
  const { children, ref, ...rest } = props;

  return (
    <div
      ref={ref}
      {...rest}
      className="absolute inset-0  m-auto flex h-fit w-fit flex-col items-center justify-center gap-2 transition-opacity duration-300 ease-out opacity-100 group-hover:opacity-0"
      data-default-button
    >
      {children}
    </div>
  );
}

export default DefaultButton;

export const schema = createSchema({
  type: "default-button",
  title: "Default Button",
  limit: 1,
  childTypes: ["button"],
  settings: [],
});

