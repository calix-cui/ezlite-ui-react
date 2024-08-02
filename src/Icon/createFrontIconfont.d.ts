import React from 'react';
export declare function createFromIconfont(scriptUrl: string): React.ForwardRefExoticComponent<{
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
