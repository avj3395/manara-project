import axios from "axios";
import { showToastWithColor } from "../constants/Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { adminToken } from "../constants/Utils";

export const PORTAL_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://www.emanara.com/rest/default/V1";

export const PORTAL_ORDER_API = "https://www.emanara.com/index.php/rest/V1/";

// let token = "b7fy08hsawpki6kylva8fzc90i3f7dzz";
// let token = "";
// if (typeof window !== "undefined") {
//   token = window && window.localStorage.getItem("taqat_access_token");
// }

// export default axios.create({
//   baseURL: PORTAL_API_URL,
//   headers: {
//     Accept: "application/json",
//     Authorization: `Bearer ${token}`,
//   },
// });

export const mediaURL = "https://www.emanara.com/pub/media/catalog/product";

export const cartId = "DVWx52zTPdiNgdbg5e2dnC1tiaHKFVcK";

export const getAxiosInstance = async () => {
  let token;
  try {
    token = await AsyncStorage.getItem("CUSTOMER_TOKEN");
  } catch (e) {
    token = "";
  } finally {
    const instance = axios.create({
      baseURL: PORTAL_API_URL,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    instance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (isNetworkError(error)) {
          showToastWithColor("No internet connection");
        }
        var include = [500, 403, 429];
        if (include.includes(error?.response?.status)) {
          const msg =
            error?.response?.status == 500
              ? "Server Error occurred. Please try again later"
              : error?.response?.status == 429
              ? "Server Error. Too many requests."
              : "You are not authorized to do this action";
          showToastWithColor(msg);
        }
        return Promise.reject(error);
      }
    );
    return instance;
  }
};

export const getAdminAxiosInstance = async () => {
  const instance = axios.create({
    baseURL: PORTAL_API_URL,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
  });
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (isNetworkError(error)) {
        showToastWithColor("No internet connection");
      }
      var include = [500, 403, 429];
      if (include.includes(error?.response?.status)) {
        const msg =
          error?.response?.status == 500
            ? "Server Error occurred. Please try again later"
            : error?.response?.status == 429
            ? "Server Error. Too many requests."
            : "You are not authorized to do this action";
        showToastWithColor(msg);
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

export const getPaymentAxiosInstance = async () => {
  let token;
  try {
    token = await AsyncStorage.getItem("CUSTOMER_TOKEN");
  } catch (e) {
    token = "";
  } finally {
    const instance = axios.create({
      baseURL: PORTAL_ORDER_API,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    instance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (isNetworkError(error)) {
          showToastWithColor("No internet connection");
        }
        var include = [500, 403, 429];
        if (include.includes(error?.response?.status)) {
          const msg =
            error?.response?.status == 500
              ? "Server Error occurred. Please try again later"
              : error?.response?.status == 429
              ? "Server Error. Too many requests."
              : "You are not authorized to do this action";
          showToastWithColor(msg);
        }
        return Promise.reject(error);
      }
    );
    return instance;
  }
};
function isNetworkError(err) {
  return !!err.isAxiosError && !err.response;
}
