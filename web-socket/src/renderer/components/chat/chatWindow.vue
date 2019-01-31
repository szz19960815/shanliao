<template>
	<div id="chatWindow">
		<div class="Title">
			<div style="margin-left: 20px;">
				<h2>标题</h2>
			</div>
		</div>
		<div class="chatContent">
		</div>
		<div class="inputContainer">
			<div class="content">
				<div class="functionBar">
					<div><i class="iconfont icon-biaoqing" title="表情"></i></div>
					<div><i class="iconfont icon-fasongwenjian" title="发送文件"></i></div>
					<div><i class="iconfont icon-jieping" title="截屏"></i></div>
				</div>
				<div class="inputArea">
					<el-input resize="none" type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model="information">
					</el-input>
				</div>
				<div class="sendBar">
					<el-button size="mini" title="按Enter键发送,Ctrl+Enter键换行" type="success" plain>发送(S)</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'cahtWindow',
		data() {
			return {
				information:'',
			}
		},
	}
</script>

<style scoped="scoped">
	#chatWindow {
		flex: 1;
		background: #F5F5F5;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.chatContent {
		flex: 1;
		padding: 0 20px;
	}

	.inputContainer {
		height: 190px;
		width: 100%;
		background: white;
		border-top: 2px solid #E7E7E7;
		display: flex;
	}

	.inputContainer>.content {
		flex: 1;
		padding: 0 20px;
		display: flex;
		flex-direction: column;
	}

	.functionBar {
		width: 100%;
		height: 40px;
		display: flex;
		align-items: center;
	}

	.functionBar>div {
		margin-right: 20px;
	}

	.functionBar>div>i {
		font-size: 18px;
		cursor: pointer;
		color: #888888;
	}

	.functionBar>div>i:hover {
		color: #555555;
	}

	.inputArea {
		flex: 1;
	}

	.sendBar {
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.el-textarea__inner{
		padding: 0 !important;
	}
	textarea{
		border: none !important;
	}
</style>
