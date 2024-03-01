import { API_AUTH_PREFIX, APP_ROUTES } from "@/constants";

/**
 * @description routes that are public and do not require authentication
 * @type {string[]}
 *
 */
export const publicRoutes = [
  "/",
  APP_ROUTES.NEW_PASSWORD,
  APP_ROUTES.NEW_VERIFICATION,
  APP_ROUTES.RESET_PASSWORD,
];

/**
 * @description routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes = [
  APP_ROUTES.LOGIN,
  APP_ROUTES.REGISTER,
  APP_ROUTES.AUTH_ERROR,
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
export const DEFAULT_LOGIN_REDIRECT = APP_ROUTES.HOME_PAGE;

/**
 * @description the default route to redirect to after logout
 * @type {string}
 */
export const DEFAULT_LOGOUT_REDIRECT = APP_ROUTES.LOGIN;
