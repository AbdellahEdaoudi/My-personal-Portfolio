import axios from "axios";

export const handleApiError = async ({
  error,
  retryCallback,
  defaultErrorMsg = "Operation failed.",
  toast,
  router,
  setIsForbidden,
}) => {
  console.error("API error details:", error);
  if (error.response) {
    const errorMsg = error.response.data?.message || defaultErrorMsg;
    if (error.response.status === 401) {
      if (errorMsg === "Access token expired") {
        try {
          await axios.post(
            "/api/auth/refresh",
            {},
            { withCredentials: true }
          );
          if (retryCallback) await retryCallback();
        } catch (refreshError) {
          const refreshMsg = refreshError.response?.data?.message || "Session expired. Please login again.";
          if (toast) toast.error(refreshMsg);
          if (router) router.push("/auth/login");
        }
      } else {
        if (toast) toast.error(errorMsg);
        if (router) router.push("/auth/login");
      }
    } else if (error.response.status === 403) {
      if (setIsForbidden) setIsForbidden(true);
      if (toast) toast.error(errorMsg || "Forbidden: You don't have permission.");
      if (router) router.push("/en");
    } else {
      if (toast) toast.error(`Error: ${errorMsg}`);
    }
  } else if (error.request) {
    if (toast) toast.error("Network error: No response received.");
  } else {
    if (toast) toast.error("Error setting up request.");
  }
};
