import axios from "axios";

async function getGoogleOAuthUrl() {
  axios.get("http://localhost:5000/api/v1/login/google");
}

export async function getCurrentAuthenticatedUser() {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/auth/me");
    return { data: response.data };
  } catch (error) {
    return { data: {} };
  }
}

export default getGoogleOAuthUrl;
