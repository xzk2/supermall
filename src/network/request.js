import Axios from "axios";

export function request(config) {
    //1.创建axios的实例
    const instance = Axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    })
    //2.axios的拦截器
    instance.interceptors.request.use(config => {
        //不能只拦截
        //1.比如config中的一些信息不符合服务器要求
        //2.比如，每次发送网络请求，都希望在界面中显示一个请求图标
        //3.某些网络请求（比如登录(token)），必须携带一些特殊信息
        return config;
    }, err => {

    });//请求拦截(发送成功/失败)

    //2.2.响应拦截
    instance.interceptors.response.use(res => {
        return res.data

    }, err => {

    });
    //3.发送真正的网络请求
    return instance(config)//不用Promise的原因是在底层已经进行了不需要再多余写

}


