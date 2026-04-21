import {
  THEME,
  ThemeProvider as ThemesProviderPrimitive,
} from "@entities/theme";

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  return (
    <ThemesProviderPrimitive
      attribute="class"
      defaultTheme={THEME.SYSTEM}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemesProviderPrimitive>
  );
};
