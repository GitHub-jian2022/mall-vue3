import axios from 'axios'
import { Toast } from 'vant'
import router from '../router'
import { baseURL } from '../config/baseURL'

// 创建axios实例
const service = axios.create({
  baseURL, 
  timeout: 20000 // 请求超时时间
});

// request拦截器,在请求之前做一些处理
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['token'] = token
    }
    return config;
  },
  error => {
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器,数据返回后进行一些处理
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    if (res.code == "401") {
      Toast.fail(res.msg);
    } else if (res.code == "403") {
      // code为403代表token已经失效,
      // 提示用户,然后跳转到登陆页面
      router.push("/login");
    } 
    return res;
  },
  error => {
    Promise.reject(error);
  }
);
export default service;
