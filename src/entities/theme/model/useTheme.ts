import {
  useTheme as useNextTheme,
  type UseThemeProps as UseThemePropsPrimitive,
} from "next-themes";
import { type Theme, THEME } from "./schema";

export type UseThemeProps = Omit<
  UseThemePropsPrimitive,
  | "themes"
  | "forcedTheme"
  | "setTheme"
  | "theme"
  | "resolvedTheme"
  | "systemTheme"
> & {
  themes: Theme[];
  forcedTheme?: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  theme: Theme;
  resolvedTheme?: typeof THEME.DARK | typeof THEME.LIGHT;
  systemTheme?: typeof THEME.DARK | typeof THEME.LIGHT;
};

export const useTheme = () => useNextTheme() as UseThemeProps;
