import React, { PropsWithChildren } from "react";
import { SizeType } from ".";

export interface ConfigContextTypes {
  space?: {
    size?: SizeType;
  };
}

export const ConfigContext = React.createContext<ConfigContextTypes>({});

interface ConfigProviderProps extends PropsWithChildren<ConfigContextTypes> {}

export function ConfigProvider(props: ConfigProviderProps) {
  const { space, children } = props;

  return <ConfigContext.Provider value={{ space }}>{children}</ConfigContext.Provider>;
}
