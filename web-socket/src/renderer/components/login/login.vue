<template>
	<div id="login" class="main">
		<!-- 这是登录页 -->
		<div style="display: flex;flex-direction: column;background: white;border-radius: 15px;overflow: hidden;">
			<el-radio-group v-model="select" @change="selectChange">
				<el-radio-button label="登录"></el-radio-button>
				<el-radio-button label="注册"></el-radio-button>
			</el-radio-group>
			<swiper :options="swiperOption" ref="loginSwiper">
				<swiper-slide>
					<el-form :model="loginForm" status-icon :rules="loginRule" ref="loginForm" label-width="55px" label-position="left"
					 class="form" size="small" :hide-required-asterisk="true">
						<el-form-item label="用户名" prop="user">
							<el-input v-model="loginForm.user" autocomplete="off" placeholder="请输入用户名" title="6-18位字符,只能包含数字、字母(区分大小写)"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="pass">
							<el-input type="password" v-model="loginForm.pass" autocomplete="off" placeholder="请输入密码" title="6-16位字符,只能包含数字、字母(区分大小写)"></el-input>
						</el-form-item>
						<div style="margin: 10px auto;">
							<el-checkbox v-model="checked" style="margin-left: 0;">记住我</el-checkbox>
						</div>	
						<el-button size="small" style="width: 100%;" type="primary" @click="login('loginForm')">登录</el-button>
					</el-form>
				</swiper-slide>
				<swiper-slide>
					<el-form :model="registerForm" status-icon :rules="registerRule" ref="registerForm" label-width="70px"
					 label-position="left" class="form" size="small" :hide-required-asterisk="true">
						<el-form-item label="用户名" prop="user">
							<el-input v-model="registerForm.user" autocomplete="off" placeholder="请输入用户名" title="6-18位字符，只能包含数字、字母(区分大小写)"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="pass">
							<el-input type="password" v-model="registerForm.pass" autocomplete="off" placeholder="请输入密码" title="6-16位字符,只能包含数字、字母(区分大小写)"></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="repass">
							<el-input type="password" v-model="registerForm.repass" autocomplete="off" placeholder="请确认密码" title="6-16位字符,只能包含数字、字母(区分大小写)"></el-input>
						</el-form-item>
						<el-form-item>
						</el-form-item>
						<el-button size="small" style="width: 100%;" type="primary" @click="register('registerForm')">注册</el-button>
					</el-form>
				</swiper-slide>
				<!-- <div class="swiper-button-prev" slot="button-prev"></div>
				<div class="swiper-button-next" slot="button-next"></div> -->
			</swiper>
		</div>
	</div>
</template>

<script>
	import drag from 'electron-drag';
	import {
		swiper,
		swiperSlide
	} from 'vue-awesome-swiper';
	export default {
		name: "login",
		data() {
			return {
				checked: true,//多选框
				//注册表单对象
				registerForm: {
					user: "",
					pass: "",
					repass: ""
				},
				//登录表单对象
				loginForm: {
					user: "",
					pass: ""
				},
				//注册表单验证对象
				registerRule: {
					user: [{
						validator: (rule, value, callback) => {
							if (value === '') {
								callback(new Error('请输入用户名'));
							} else {
								if (this.registerForm.user !== '') {
									// this.$refs.loginForm.validateField('user');
								}
								callback();
							}
						},
						trigger: 'blur'
					}],
					pass: [{
						validator: (rule, value, callback) => {
							if (value === '') {
								callback(new Error('请输入密码'));
							} else {
								if (this.registerForm.pass !== '') {
									// this.$refs.loginForm.validateField('pass');
								}
								callback();
							}
						},
						trigger: 'blur'
					}],
					repass: [{
						validator: (rule, value, callback) => {
							if (value === '') {
								callback(new Error('请确认密码'));
							} else {
								if (this.registerForm.repass !== '') {
									// this.$refs.loginForm.validateField('pass');
								}
								callback();
							}
						},
						trigger: 'blur'
					}]
				},
				//登录表单验证对象
				loginRule: {
					user: [{
						validator: (rule, value, callback) => {
							if (value === '') {
								callback(new Error('请输入用户名'));
							} else {
								if (this.loginForm.user !== '') {
									// this.$refs.loginForm.validateField('user');
								}
								callback();
							}
						},
						trigger: 'blur'
					}],
					pass: [{
						validator: (rule, value, callback) => {
							if (value === '') {
								callback(new Error('请输入密码'));
							} else {
								if (this.loginForm.pass !== '') {
									// this.$refs.loginForm.validateField('pass');
								}
								callback();
							}
						},
						trigger: 'blur'
					}]
				},
				select: "登录",
				//swiper初始化配置
				swiperOption: {
					autoplay: false,
					setWrapperSize: true,
					autoHeight: true,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					mousewheel: false,
					observeParents: true,
					allowTouchMove: false
				}
			};
		},
		methods: {
			//切换
			selectChange(v) {
				if (v == "登录") {
					this.$refs.loginSwiper.swiper.slideToLoop(0, 400, false);
				}
				if (v == "注册") {
					this.$refs.loginSwiper.swiper.slideToLoop(1, 400, false);
				}
			},
			//注册
			register(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						// alert('submit!');
						let config = {
							username: this.registerForm.user,
							pass: this.registerForm.pass,
							repass: this.registerForm.repass
						}
						this.$http.post('/users/register', config).then((res) => {
							if (res.data.code == 1) {
								this.$message({
									type: 'success',
									message: res.data.msg,
									showClose: true,
								});
								this.loginForm.user = config.username;
								this.select = "登录";
								this.$refs.loginSwiper.swiper.slideToLoop(0, 400, false);
							} else {
								this.$message({
									showClose: true,
									message: res.data.msg,
									type: 'error'
								});
							}
						}).catch();
					} else {
						// console.log('error submit!!');
						return false;
					}
				});
			},
			//登录
			login(formName){
				this.$refs[formName].validate((valid) => {
				  if (valid) {
					// alert('submit!');
					let config = {
						username: this.loginForm.user,
						pass: this.loginForm.pass
					}
					this.$http.post('/users/login',config).then((res)=>{
						if(res.data.code == 1){
							this.$message({
								type: 'success',
								message: res.data.msg,
								showClose: true,
							});
							let current = new Date().getTime();
							let value = {
								userId: res.data.data.userId,
								username: res.data.data.username,
								time:current
							};
							if(this.checked){
								localStorage.setItem('username',JSON.stringify(value));
							}
							this.$router.push({path:'/home'});
						}else{
							this.$message({
								showClose: true,
								message: res.data.msg,
								type: 'error'
							});
						}
					}).catch();
				  } else {
					// console.log('error submit!!');
					return false;
				  }
				});
			}
		},
		created() {
			// console.log(BrowserWindow);
		},
		beforeMount(){
			if(localStorage.getItem('username') != undefined){
				this.loginForm.user = JSON.parse(localStorage.getItem('username')).username;
			}
		},
		mounted() {
			// 			var clear = drag('#login');
			// 			console.log(drag.supported)
			// 			if (!drag.supported) {
			// 				document.querySelector('#login').style['-webkit-app-region'] = 'drag';
			// 			}
		},
	}
</script>

<style scoped="scoped">
	#login {
		background: url(../../../../static/img/login_bg.jpg) no-repeat center center;
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.swiper-container {
		height: 300px;
		width: 280px;
		background: white;
	}

	.swiper-slide {
		height: 300px;
		width: 280px;
		overflow: hidden;
		display: flex;
		justify-content: center;
	}

	.el-radio-group {
		display: block;
		width: 140px;
		height: 40px;
		margin: 0 auto;
		margin-top: 30px;
	}

	.form {
		margin-top: 60px;
	}

	.el-input {
		width: 160px !important;
	}
</style>
