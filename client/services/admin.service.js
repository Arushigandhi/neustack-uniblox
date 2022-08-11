import { BACKEND_URL, GetJWTToken } from "../utils/constants";
import axios from "axios";

export const AddDiscount = async (body) => {
  const token = GetJWTToken();
  const response = await axios.post(`${BACKEND_URL}/admin/add-discount`, body, {
    headers: {
      token,
    },
  });
  return response.data;
};

export const GetAllSoldItems = async () => {
  const token = GetJWTToken();
  const response = await axios.get(`${BACKEND_URL}/admin/get-all-items`, {
    headers: {
      token,
    },
  });
  return response.data;
};

export const GetAllUsers = async () => {
  const token = GetJWTToken();
  const response = await axios.get(`${BACKEND_URL}/admin/get-all-users`, {
    headers: {
      token,
    },
  });
  return response.data;
};

export const GetUserDetails = async (body) => {
  const token = GetJWTToken();
  const response = await axios.get(`${BACKEND_URL}/admin/get-user-details`, {
    headers: {
      token,
    },
    params: body,
  });
  return response.data;
};
