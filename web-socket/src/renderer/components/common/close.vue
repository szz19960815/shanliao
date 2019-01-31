<template>
	<div id="C_close">
		<span class="gray" title="最小化" @click="minClick"><i class="el-icon-minus"></i></span>
		<span class="gray" title="最大化" @click="maxClick"><i class="el-icon-plus"></i></span>
		<span class="red" title="关闭" @click="closeClick"><i class="el-icon-close"></i></span>
	</div>
</template>

<script>
	import {ipcRenderer } from 'electron'
	export default {
		name: "C_close",
		methods:{
			minClick(){
				ipcRenderer.send('min');
			},
			maxClick(){
				ipcRenderer.send('max');
			},
			closeClick(){
				ipcRenderer.send('close');
			}
		}
	}
</script>

<style scoped="scoped">
	#C_close{width: 120px;height: 30px;position: absolute;z-index: 99;display: flex;justify-content: center;align-items: center;top: 0px;right: 0px;background:rgba(96,96,96,0.6);}
	#C_close>span{display: flex;width: 40px;height: 30px;justify-content: center;align-items: center;cursor: pointer;border-radius: 3px;overflow: hidden;}
	#C_close>span>i{font-size: 16px;color: white;}
	.gray:hover{background: #888888;}
	.red:hover{background: red;}
	.red:hover>i{color: white !important;}
</style>
