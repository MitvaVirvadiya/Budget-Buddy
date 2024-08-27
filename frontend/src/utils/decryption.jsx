import { jwtDecode } from "jwt-decode";

export function getDecodedToken() {
  const token = localStorage?.getItem('accessToken');

  if (!token) {
    console.error('No access token found');
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);

    const { _id, email, username, role } = decodedToken;

    return { _id, email, username, role };
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}
