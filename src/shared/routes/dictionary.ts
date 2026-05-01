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

const LOGIN: StaticRoute = {
  href: "/login",
};

const DASHBOARD: StaticRoute = {
  href: "/dashboard",
};

const NEW_DASHBOARD: StaticRoute = {
  href: "/new-dashboard",
};

const SCRIPT_USE: DynamicRoute = {
  href: (id) => `/scripts/${id}/use`,
};

const SCRIPT_EDIT: DynamicRoute = {
  href: (id) => `/scripts/${id}/edit`,
};

export const ROUTES = {
  HOME,
  DASHBOARD,
  NEW_DASHBOARD,
  SCRIPT_USE,
  SCRIPT_EDIT,
  LOGIN,
};
