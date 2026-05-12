type HrefGetterFn = (slug: string) => string;

type StaticRoute = {
  href: string;
  label: string;
};

type DynamicRoute = {
  href: HrefGetterFn;
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

const SPEECH: StaticRoute = {
  href: "/speech/uid",
  label: "Speech",
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
  SPEECH,
};

export const ADMIN_ROUTES = {
  ACCESS_MANAGEMENT,
  SCENARIOS,
};

export const FALLBACK_ROUTES = {
  NO_ACCESS,
  NOT_FOUND,
};
