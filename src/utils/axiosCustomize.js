import axios from "axios";

const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjU1YjYxZTRhYjhhMjBkNGUxZjc0NGQxIiwibmFtZSI6IkknbSBhZG1pbiB4eHgiLCJwaG9uZSI6IjA5MzM2MzQ5MzMiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MDA3NDY1MzQsImV4cCI6MTcwMDgzMjkzNH0.JM7CkkN9YbSyhQl7s80GQsCfVeZl1t3EmiYix7Y60cg"

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
});

// Thêm một bộ đón chặn request
instance.interceptors.request.use(function (config) {
    // Làm gì đó trước khi request dược gửi đi
    //config.headers['Authorization'] = `Bearer ${access_token}`
    if (typeof window !== "undefined" && window && window.localStorage && window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }
    if (!config.headers.Accept && config.headers["Content-Type"]) {
        config.headers.Accept = "application/json";
        config.headers["Content-Type"] = "application/json; charset=utf-8";
    }
    return config;
}, function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
});

// Thêm một bộ đón chặn response
instance.interceptors.response.use(function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response && response.data ? response.data : response;
}, function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    console.log('error', error.response)
    return error && error.response && error.response.data ?
        error.response.data : Promise.reject(error);
});

export default instance