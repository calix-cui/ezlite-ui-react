import React, { CSSProperties, useMemo } from "react";
import cs from "classnames";
// import "./index.scss";
import { ConfigContext } from "./ConfigProvider";

export type SizeType = "small" | "middle" | "large" | number | undefined;

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: SizeType | [SizeType, SizeType];
  direction?: "horizontal" | "vertical";
  align?: "start" | "end" | "center" | "baseline";
  split?: React.ReactNode;
  wrap?: boolean;
}

// 对 "small" | "middle" | "large" 转换成对应 class
const getSizeClass = (size: SpaceProps["size"]) => {
  let className = "";
  if (typeof size === "string") {
    className = `space-gap-col-${size} space-gap-row-${size}`;
  } else if (Array.isArray(size)) {
    if (typeof size[0] === "string") className = `space-gap-col-${size[0]}`;
    if (typeof size[1] === "string") className += ` space-gap-row-${size[1]}`;
  }
  return className;
};

// 只对数字类型的 size，转换成对应 style
const getStyle = (size: SpaceProps["size"]) => {
  const style: CSSProperties = {};
  if (typeof size === "number") {
    style.gap = size;
  } else if (Array.isArray(size)) {
    if (typeof size[0] === "number") style.columnGap = size[0];
    if (typeof size[1] === "number") style.rowGap = size[1];
  }
  return style;
};

const Space: React.FC<SpaceProps> = (props) => {
  const { space } = React.useContext(ConfigContext);

  const {
    className,
    style,
    size = space?.size || "small",
    direction = "horizontal",
    align,
    wrap,
    split,
    ...otherProps
  } = props;

  const childNodes = React.Children.toArray(props.children);

  const mergedAlign = direction === "horizontal" && align === undefined ? "center" : align;

  const cn = cs(
    "space",
    `space-${direction}`,
    getSizeClass(size),
    {
      [`space-align-${mergedAlign}`]: mergedAlign,
    },
    className
  );

  const wrappedNodes = childNodes.map((child: React.ReactNode, index) => {
    let key = `space-item-${index}`
    if (React.isValidElement(child)) {
      key = (child && child.key) as string;
    }

    return (
      <>
        <div className="space-item" key={key}>
          {child}
        </div>
        {index < childNodes.length - 1 && split && (
          <span className={`${className}-split`} style={style}>
            {split}
          </span>
        )}
      </>
    );
  });

  const otherStyle = useMemo(() => getStyle(size), [size]);

  if (wrap) otherStyle.flexWrap = "wrap";

  return (
    <div className={cn} style={{ ...otherStyle, ...style }} {...otherProps}>
      {wrappedNodes}
    </div>
  );
};

export default Space;
