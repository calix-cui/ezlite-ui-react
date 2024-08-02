import React from "react";
import { IconProps } from ".";
type CreateIconOptions = {
    content: React.ReactNode;
    iconProps?: IconProps;
    viewBox?: string;
};
export declare function createIcon(options: CreateIconOptions): React.ForwardRefExoticComponent<{
    className?: string;
    style?: React.CSSProperties;
    size?: string | string[];
    spin?: boolean;
} & Omit<React.SVGAttributes<SVGElement>, keyof {
    className?: string;
    style?: React.CSSProperties;
    size?: string | string[];
    spin?: boolean;
}> & React.RefAttributes<SVGSVGElement>>;
export {};
