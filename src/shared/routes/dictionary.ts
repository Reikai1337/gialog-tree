type HrefGetterFn = (slug: string) => string;

type StaticRoute = {
  href: string;
  label: string;
};

type DynamicRoute = {
  href: HrefGetterFn;
  label: string;
};

const HOME: StaticRoute = {
  href: "/",
  label: "Home",
};

const LOGIN: StaticRoute = {
  href: "/login",
  label: "Login",
};

const ACCESS_MANAGEMENT: StaticRoute = {
  href: "/studio/access",
  label: "Access",
};
const SCENARIOS: StaticRoute = {
  href: "/studio/scenarios",
  label: "Scenarios",
};

const SCENARIOS_CREATE: StaticRoute = {
  href: "/studio/scenarios/create",
  label: "Scenarios",
};

const SCENARIOS_EDIT: DynamicRoute = {
  href: (id) => `/studio/scenarios/${id}`,
  label: "Scenarios",
};

const SCENARIOS_USE: DynamicRoute = {
  href: (id) => `/scenarios/${id}`,
  label: "Scenarios use",
};

const NO_ACCESS: StaticRoute = {
  href: "/no-access",
  label: "No access",
};
const NOT_FOUND: StaticRoute = {
  href: "/404",
  label: "Not found",
};

export const PUBLIC_ROUTES = {
  HOME,
  LOGIN,
};

export const AUTH_ROUTES = {
  SCENARIOS_USE,
};

export const ADMIN_ROUTES = {
  ACCESS_MANAGEMENT,
  SCENARIOS,
  SCENARIOS_CREATE,
  SCENARIOS_EDIT,
};

export const FALLBACK_ROUTES = {
  NO_ACCESS,
  NOT_FOUND,
};
