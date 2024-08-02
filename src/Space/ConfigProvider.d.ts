import React, { PropsWithChildren } from "react";
import { SizeType } from ".";
export interface ConfigContextTypes {
    space?: {
        size?: SizeType;
    };
}
export declare const ConfigContext: React.Context<ConfigContextTypes>;
interface ConfigProviderProps extends PropsWithChildren<ConfigContextTypes> {
}
export declare function ConfigProvider(props: ConfigProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
