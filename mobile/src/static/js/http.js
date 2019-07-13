import axios from 'axios';
import {Toast} from 'antd-mobile';         // antd-mobile轻提示组件Toast

// 拦截请求
axios.interceptors.request.use(config => {
    Toast.loading('加载中',3,()=>{},true)    // loading组件，显示文字加载中，自动关闭延时3s
    return config;
}, err => {
    console.log('请求失败')
    return Promise.reject(err)
})

//拦截响应
axios.interceptors.response.use(config => {
    Toast.hide()
    return config.data;
}, err => {
    console.log('响应失败')
    return Promise.reject(err)
})
