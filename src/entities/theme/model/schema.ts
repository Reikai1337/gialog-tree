import { z } from "zod";

const THEME_LIST = ["light", "dark", "system"] as const;

export const THEME = Object.fromEntries(
  THEME_LIST.map((t) => [t.toUpperCase(), t]),
) as {
  [K in (typeof THEME_LIST)[number] as Uppercase<K>]: K;
};

export const themeSchema = z.enum(THEME_LIST);
export type Theme = z.infer<typeof themeSchema>;
