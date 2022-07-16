import axios from 'axios';
export const baseUrl = 'http://localhost:3300';

// axios的实例及拦截器配置
const axiosInstance = axios.create({
  baseURL: baseUrl,
});
// axiosInstance.interceptors.request.use(
  // 排错了好久
  axiosInstance.interceptors.response.use(
  res => res.data,
  (err) => {
    console.log(err, '网络错误');
  }
);
export { axiosInstance };
