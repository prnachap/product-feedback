import { API_AUTH_PREFIX, AUTH_ROUTES, ROUTES } from "@/constants";

/**
 * @description routes that are public and do not require authentication
 * @type {string[]}
 *
 */
export const publicRoutes = [
  "/",
  AUTH_ROUTES.NEW_PASSWORD,
  AUTH_ROUTES.NEW_VERIFICATION,
  AUTH_ROUTES.RESET_PASSWORD,
];

/**
 * @description routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes = [
  AUTH_ROUTES.LOGIN,
  AUTH_ROUTES.REGISTER,
  AUTH_ROUTES.AUTH_ERROR,
];

/**
 * @description The prefix is for API authentication routes,
 * it is used to separate the API routes from the rest of the routes
 * @type {string}
 */
export const apiAuthPrefix = API_AUTH_PREFIX;

/**
 * @description the default route to redirect to after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = ROUTES.HOME;

/**
 * @description the default route to redirect to after logout
 * @type {string}
 */
export const DEFAULT_LOGOUT_REDIRECT = AUTH_ROUTES.LOGIN;
