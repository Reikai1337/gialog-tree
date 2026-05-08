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

const EX_USE: StaticRoute = {
  href: "/example-use",
};
const EX_EDIT: StaticRoute = {
  href: "/example-edit",
};

// const SCRIPT_USE: DynamicRoute = {
//   href: (id) => `/scripts/${id}/use`,
// };

// const SCRIPT_EDIT: DynamicRoute = {
//   href: (id) => `/scripts/${id}/edit`,
// };

export const ROUTES = {
  HOME,
  DASHBOARD,
  LOGIN,
  EX_USE,
  EX_EDIT,
};
