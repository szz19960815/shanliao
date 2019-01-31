<template>
	<div id="home" class="main">
		<div class="nav">
			<div class="userImg">
				<img src="../../../../static/img/icon.png" alt="">
			</div>
			<el-menu :default-active="itemBar" class="el-menu-vertical-demo" :collapse="true" background-color="#27292D" @select="select">
				<el-menu-item key="chat" index="chat">
					<i class="iconfont icon-weixinxiaoximianxing"></i>
				</el-menu-item>
				<el-menu-item key="mailList" index="mailList">
					<i class="iconfont icon-contacts-o"></i>
				</el-menu-item>
				<el-menu-item key="collection" index="collection">
					<i class="iconfont icon-shoucang"></i>
				</el-menu-item>
			</el-menu>
			<div class="navBar">
				<i class="iconfont icon-liebiao-copy" @click="showExit"></i>
			</div>
			<div class="navBarList" v-if="showNavBar">
				<ul>
					<li @click="exit">退 出</li>
				</ul>
			</div>
		</div>
		<router-view></router-view>
		<!-- <div class="chatList">

		</div>
		<div class="chatContent">

		</div> -->
	</div>
</template>

<script>
	export default {
		name: "home",
		data() {
			return {
				showNavBar: false, //退出菜单控制
				itemBar: 'chat',
			}
		},
		methods: {
			//导航
			select(index, indexPath) {
				if (this.$route.path == '/home/' + index) {
					return;
				}
				this.$router.push({
					path: '/home/' + index
				});
			},
			//退出菜单控制
			showExit() {
				this.showNavBar = !(this.showNavBar);
			},
			//退出
			exit() {
				this.$confirm('此操作退出闪聊, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$router.push({
						path: '/'
					});
				}).catch(() => {});
			}
		},
		watch:{
// 			'$route.path':function(newVal,oldVal){
// 				console.log(newVal,oldVal);
// 			},
		},
		created() {
			let r = window.location.hash.split('/')[2];
			this.itemBar = r;
		},
	}
</script>

<style scoped="scoped">
	#home {
		width: 100%;
		height: 100%;
		display: flex;
	}

	.nav {
		width: 60px;
		background: #27292D;
		position: relative;
	}

	.userImg {
		width: 32px;
		height: 32px;
		border-radius: 3px;
		background: white;
		margin: 20px auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.userImg>img {
		width: 100%;
		height: 100%;
	}

	.navBar {
		position: absolute;
		width: 40px;
		text-align: center;
		text-align: center;
		bottom: 20px;
		left: 10px;
	}

	.iconfont {
		font-size: 24px;
		color: #6A6A6A;
		cursor: pointer;
	}

	.iconfont:hover {
		color: #409EFF;
	}

	.navBarList {
		position: absolute;
		width: 80px;
		bottom: 20px;
		left: 100%;
		background: #27292D;
		display: flex;
	}

	.navBarList>ul {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.navBarList>ul>li {
		height: 30px;
		color: #888888;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 10px;
		cursor: pointer;
	}

	.el-menu--collapse {
		width: 100%;
	}

	.el-menu-item {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
	}

	.chatList {
		width: 250px;
		height: 100%;
		background: linear-gradient(to right, #EDEAE8, #EDEAE8);
	}
</style>
