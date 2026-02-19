import axios from 'axios';
import Cookies from 'js-cookie';

// دالة apiRequest
// (API) تعمل على إدارة الطلبات إلى واجهة برمجة التطبيقات
//  بطريقة موحدة، مع التركيز على التحقق من صلاحية التوكن وتحديثه عند انتهاء صلاحيته.
// English
// The apiRequest function manages requests to the API in a unified manner,
// focusing on checking the validity of the token and refreshing it when it expires. 

export const apiRequest = async (config) => {
  try {
    const token = Cookies.get("token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    const response = await axios(config);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      try {
        const refreshResponse = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/refresh`, {}, {
          withCredentials: true,
        });
        const newToken = refreshResponse.data.accessToken;
        Cookies.set("token", newToken);
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${newToken}`,
        };
        return await axios(config);
      } catch (refreshError) {
        if (refreshError.response && refreshError.response.status === 401) {
          window.location.href = '/Admin/Login'
        }
      }
    } else {
      throw error;
    }
  }
};