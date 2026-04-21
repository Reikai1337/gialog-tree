type HrefGetterFn = (slug: string) => string;

type StaticRoute = {
  href: string;
};

type DynamicRoute = {
  href: HrefGetterFn;
};

const HOME: StaticRoute = {
  href: "/",
};

const STUDIO: StaticRoute = {
  href: "/studio",
};

const GENRE: DynamicRoute = {
  href: (name) => `/genre/${name}`,
};

const SERVER_RENDER: DynamicRoute = {
  href: (name) => `/render/${name}`,
};

export const ROUTES = {
  HOME,
  GENRE,

  SERVER_RENDER,

  STUDIO,
};
