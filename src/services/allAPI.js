import { commonAPI } from "./commonAPI";
import { serverURL } from "./serverURL";

//  1. get all products on the server using - GET
export const getProductsAPI = async () => {
  return await commonAPI("get", `${serverURL}/products`, "");
};

//  2. get all products on the wishlist in server using - GET
export const getViewProductAPI = async (id) => {
  return await commonAPI("get", `${serverURL}/products/${id}`, "");
};

//  3. add a product to cart in the server using - POST, reqBody
export const addCartAPI = async (reqBody) => {
  return await commonAPI("post", `${serverURL}/cart`, reqBody);
};

//  4. get all products on the cart in server using - GET
export const getCartAPI = async () => {
  return await commonAPI("get", `${serverURL}/cart`, "");
};

//  5. Update a item from cart in the server using - PUT
export const updateCartItemAPI = async (id, reqBody) => {
  return await commonAPI("put", `${serverURL}/cart/${id}`, reqBody);
};

//  6. delete a product in the cart in the server using - Delete
export const deleteCartAPI = async (id) => {
  return await commonAPI("delete", `${serverURL}/cart/${id}`, "");
};

//  7. add a product to wishlist in the server using - POST, reqBody
export const addWishlistAPI = async (reqBody) => {
  return await commonAPI("post", `${serverURL}/wishlist`, reqBody);
};

//  8. get all products on the wishlist in server using - GET
export const getWishlistAPI = async () => {
  return await commonAPI("get", `${serverURL}/wishlist`, "");
};

//  9. delete a product in the wishlist in the server using - Delete
export const deleteWishlistAPI = async (id) => {
  return await commonAPI("delete", `${serverURL}/wishlist/${id}`, "");
};

// //  6. Update a resume from history in the server using - PUT
// export const updateResumeHistoryAPI = async (id, reqBody) => {
//   return await commonAPI("put", `${serverURL}/history/${id}`, reqBody);
// };
