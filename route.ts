/**
 * @description routes that are public and do not require authentication
 * @type {string[]}
 *
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * @description routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * @description The prefix is for API authentication routes,
 * it is used to separate the API routes from the rest of the routes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * @description the default route to redirect to after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/feedback";

/**
 * @description the default route to redirect to after logout
 * @type {string}
 */
export const DEFAULT_LOGOUT_REDIRECT = "/auth/login";
