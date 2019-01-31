/**
 * 
 * http配置
 */

import Axios from 'axios'
import {
	Loading,
	Message
} from 'element-ui'

// axios 配置
const axios = Axios.create({
	baseURL: 'http://localhost:3000', // 测试环境
	// baseURL: 'http://admin.mmiauto.com', // 生产环境
	timeout: 30000, // 请求超时时间
});

var _this = this
var loadingInstance = Loading.service({
	lock: true,
	text: '小主请稍等...',
	spinner: 'el-icon-loading',
	background: 'rgba(0, 0, 0, 0.6)'
})
loadingInstance.close()
// http request 拦截器
axios.interceptors.request.use(
	config => {
		loadingInstance = Loading.service({
			lock: true,
			text: '小主请稍等...',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.6)'
		})
		if(localStorage.getItem('username') && ((new Date().getTime())-(JSON.parse(localStorage.getItem('username')).time))/(3600*24*1000)>=30){
			Message.error('记住用户名已失效，请重新登录！')
			localStorage.removeItem('username')
			window.location.href = '/'
		}
		//      if (localStorage.getItem('token')) {
		//          config.headers['laravel_session'] = localStorage.getItem('token');
		//      }
		return config;
	},
	err => {
		loadingInstance.close()
		Message({
			message: err.message,
			type: 'error',
			duration: 5 * 1000
		})
		// 		if (_this.sbShow) {
		// 			_this.sbShow = false
		// 		}
		// 		if (_this.loading) {
		// 			_this.loading = false
		// 		}
		return Promise.reject(err);
	});

// http response 拦截器
axios.interceptors.response.use(
	response => {
		setTimeout(() => {
			loadingInstance.close()
		}, 800)
		if (response.data.errorcode == -1) {
			Message.error('认证过期,请重新登录')
			localStorage.removeItem('token')
			window.location.href = '/'
		}
		return response;
	},
	err => {
		loadingInstance.close()
		Message({
			message: err.message,
			type: 'error',
			duration: 5 * 1000
		})
		// 		if (_this.sbShow) {
		// 			_this.sbShow = false
		// 		}
		// 		if (_this.loading) {
		// 			_this.loading = false
		// 		}
		if (err && err.response) {
			switch (err.response.status) {
				case 400:
					Message.error('请求错误')
					break

				case 401:
					Message.error('未授权，请登录')
					break

				case 403:
					Message.error('拒绝访问')
					break

				case 404:
					Message.error(`请求地址出错: ${err.response.config.url}`)
					break

				case 408:
					Message.error('请求超时')
					break

				case 500:
					Message.error('服务器内部错误')
					break

				case 501:
					Message.error('服务未实现')
					break

				case 502:
					Message.error('网关错误')
					break

				case 503:
					Message.error('服务不可用')
					break

				case 504:
					Message.error('网关超时')
					break

				case 505:
					Message.error('HTTP版本不受支持')
					break

				default:
					Message.error('未知错误,请您联系管理员')
					break
			}
		}

		return Promise.reject(err)
	});

export default axios;
