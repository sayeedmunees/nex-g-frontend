import { commonAPI } from "./commonAPI";
import { serverURL } from "./serverURL";

//  1. get all products on the server using - GET
export const getProductsAPI = async () => {
  return await commonAPI("get", `${serverURL}/products`, "");
};

//  1. add resume to the server using - POST, reqBody
export const addResumeAPI = async (reqBody) => {
  return await commonAPI("post", `${serverURL}/resumes`, reqBody);
};

//  2. add resume to history to the server using - POST, reqBody
export const addHistoryAPI = async (reqBody) => {
  return await commonAPI("post", `${serverURL}/history`, reqBody);
};

//  4. delete a resume from history in the server using - Delete
export const deleteHistoryAPI = async (id) => {
  return await commonAPI("delete", `${serverURL}/history/${id}`, "");
};

//  5. Get a particular resume from history in the server using - Get
export const getAResumeHistoryAPI = async (id) => {
  console.log(id);
  return await commonAPI("get", `${serverURL}/history/${id}`, "");
};

//  6. Update a resume from history in the server using - PUT
export const updateResumeHistoryAPI = async (id, reqBody) => {
  return await commonAPI("put", `${serverURL}/history/${id}`, reqBody);
};
