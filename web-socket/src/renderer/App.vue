<template>
	<div id="app" class="main">
		<closeBar></closeBar>
		<!-- <span id="closeApp" title="关闭" @click="closeApp"><i class="el-icon-close"></i></span> -->
		<router-view></router-view>
	</div>
</template>

<script>
	import closeBar from './components/common/close.vue';
	export default {
		name: 'web-socket',
		components:{
			closeBar
		},
		methods:{
			closeApp(){
				console.log(13)
			}
		}
	}
</script>

<style scoped="scoped">
	#app {
		position: relative;
		display: flex;
		overflow: hidden;
	}
</style>
