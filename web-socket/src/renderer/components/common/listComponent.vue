<template>
	<div id="listComponent">
		<div class="listCard searchBar">
			<el-input v-model="searchKey" clearable prefix-icon="el-icon-search" size="mini" placeholder="搜索"></el-input>
			<el-button size="mini" icon="el-icon-plus" title="发起群聊"></el-button>
		</div>
		<slot style="flex: 1;"></slot>
	</div>
</template>

<script>
	export default {
		props: {
			type: {
				type: String,
				default: 'chat'
			}
		},
		name: 'listComponent',
		data() {
			return {
				searchKey: '',
				list: [{
						img: 123,
						name: '哈哈',
						time: new Date(),
					},
					{
						img: 456,
						name: '呵呵',
						time: new Date(),
					}
				],
			}
		},
		beforeMount() {}
	}
</script>

<style scoped="scoped">
	#listComponent {
		width: 250px;
		height: 100%;
		background: linear-gradient(to right, #EDEAE9, #EDEAE7);
		display: flex;
		flex-direction: column;
	}

	.listCard {
		width: 100%;
		height: 60px;
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.searchBar {
		border-bottom: 2px solid #E7E7E7;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.el-input {
		width: 200px !important;
	}

	.el-button--mini,
	.el-button--mini.is-round {
		padding: 7px !important;
	}

	.cardImg {
		width: 32px;
		height: 32px;
		border-radius: 3px;
		background: white;
		margin: 20px auto;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 10px;
	}

	.cardImg>img {
		width: 100%;
		height: 100%;
	}

	.cardName {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		height: 32px;
	}

	.cardName>span {
		display: block;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.listCard:hover {
		background: #DCDAD9;
	}

	.cardTime {
		height: 32px;
		margin: 0 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		font-size: 12px;
		color: #888888;
	}

	.active {
		background: #CACACA !important;
	}

	.active:hover {
		background: #CACACA !important;
	}
</style>
