import { BACKEND_URL, GetJWTToken } from "../utils/constants";
import axios from "axios";

export const GetAllItems = async () => {
  const response = await axios.get(`${BACKEND_URL}/product/get-all-items`);
  return response.data;
};

export const AddToCart = async (body) => {
  const { item_id } = body;
  const token = GetJWTToken();
  const response = await axios.post(
    `${BACKEND_URL}/product/add-to-cart`,
    { item_id },
    {
      headers: {
        token,
      },
    }
  );

  return response.data;
};

export const GetCartItems = async () => {
  const token = GetJWTToken();
  const response = await axios.get(
    `${BACKEND_URL}/product/get-all-cart-items`,
    {
      headers: {
        token,
      },
    }
  );
  return response.data;
};

export const GetAllDiscounts = async () => {
  const response = await axios.get(`${BACKEND_URL}/product/get-all-discounts`);
  return response.data;
};

export const Checkout = async (body) => {
  const { discount_id } = body;
  console.log(discount_id);
  const token = GetJWTToken();
  const response = await axios.post(
    `${BACKEND_URL}/product/checkout`,
    { discount_id },
    {
      headers: {
        token,
      },
    }
  );
  console.log(body);

  return response.data;
};
