import axios from "axios";
import QS from "qs";
// vuex的路径根据自己的路径去写
import store from "@/store/index";
import { Toast } from "vant";

// 环境的切换
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "";
} else if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = "";
}

axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

//  提示函数
const tips = (res) => {
  Toast({
    message: res,
    duration: 1500,
    forbidClick: true,
  });
};

//创建请求加载动画
const loading = () => {
  Toast.loading({
    message: "加载中...",
    forbidClick: true,
  });
};
//请求拦截器
axios.interceptors.request.use(
  (config) => {
    loading();
    console.log(config);
    // 判断vuex 存不存在token值
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);

//接口响应拦截
axios.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        default:
          tips(error.response.data.message);
      }
      return Promise.reject(error.response);
    }
  }
);

// 封装 get 和 post 方法
export default {
  get: function (url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params: params })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.data);
        });
    });
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, QS.stringify(params))
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.data);
        });
    });
  },
};
