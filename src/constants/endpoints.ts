export const BASE_URL = "http://localhost:5000";
export const END_POINTS = {
  GET_FEEDBACKS: `${BASE_URL}/api/v1/feedbacks`,
  GET_USER: `${BASE_URL}/api/v1/auth/me`,
  LOGOUT: `${BASE_URL}/api/v1/auth/logout`,
  CREATE_FEEDBACK: `${BASE_URL}/api/v1/feedbacks`,
  ADD_COMMENT: `${BASE_URL}/api/v1/feedbacks/comments`,
};
