<template>
	<div id="mailList" class="main">
		<list-component>
			<div style="flex: 1;overflow: auto;">
				<span class="tip">添加朋友</span>
				<div class="listCard" @click="addFriend" :class="{active:current=='add'}" style="border-bottom: 1px solid #DCDAD9;">
					<div class="cardImg" style="background: orange;">
						<i class="el-icon-plus" style="color: white;font-size: 22px;"></i>
					</div>
					<div class="cardName" style="justify-content: center;color: #333;font-size: 14px;">
						添加朋友
					</div>
				</div>
				<span class="tip">新的朋友</span>
				<div class="listCard" @click="newFriend" :class="{active:current=='new'}" style="border-bottom: 1px solid #DCDAD9;">
					<div class="cardImg" style="background: orange;">
						<i class="iconfont icon-icon_nf" style="color: white;"></i>
					</div>
					<div class="cardName" style="justify-content: center;color: #333;font-size: 14px;">
						新的朋友
					</div>
				</div>
				<span class="tip">好友列表</span>
				<div class="listCard" v-for="(card,index) in list" @click="chatSelect(index,card)" :class="{active:index==current}">
					<div class="cardImg">
						<img src="../../../../static/img/icon.png">
					</div>
					<div class="cardName">
						<span style="font-size: 14px;">{{card.username}}</span>
						<span style="font-size: 11px;color: #888888;">{{card.text}}</span>
					</div>
					<div class="cardTime">
						{{card.time}}
					</div>
				</div>
			</div>
		</list-component>
		<mail-list-detail :title="title" v-if="hasSelect" :showTitle="showTitle" :type='detailType' :detail='friendDetail'></mail-list-detail>
	</div>
</template>

<script>
	import listComponent from '../common/listComponent.vue';
	import mailListDetail from './mailListDetail.vue';
	export default{
		name: "mailList",
		components:{
			listComponent,
			mailListDetail
		},
		data() {
			return {
				friendDetail: {}, //好友详情信息
				detailType: 1, //详情组件类型 1-添加 2-新的 3-好友信息
				showTitle: true,//是否显示标题
				title: '',
				hasSelect: false,//是否在列表上选过目标
				list: [{
						img: 123,
						name: '哈哈',
						time: new Date().getHours() + ':' + new Date().getMinutes(),
						text: '聊天记录'
					},
					{
						img: 456,
						name: '呵呵',
						time: new Date().getHours() + ':' + new Date().getMinutes(),
						text: '聊天记录'
					},
					{
						img: 123,
						name: '哈哈',
						time: new Date().getHours() + ':' + new Date().getMinutes(),
						text: '聊天记录'
					},
				],
				current:null,
			}
		},
		methods: {
			//添加好友
			addFriend(e){
				this.current = 'add';
				this.title = '添加好友';
				this.hasSelect = true;
				this.showTitle = true;
				this.detailType = 1;
			},
			//新的朋友
			newFriend(){
				this.current = 'new';
				this.title = '新的朋友';
				this.hasSelect = true;
				this.showTitle = true;
				this.detailType = 2;
			},
			//切换好友列表选择
			chatSelect(index,card){
				this.current = index;
				this.hasSelect = true;
				this.showTitle = false;
				this.detailType = 3;
				this.friendDetail = card;
			},
			//获取好友列表
			getFriendsList(){
				this.$http.get('/friends/get-friends-list?userId='+(JSON.parse(localStorage.getItem('username'))).userId).then((res)=>{
					if(res.data.code == 1){
						this.list = res.data.data;
					}else{
						this.list = [];
						this.$message({
							type:'error',
							showClose: true,
							message: res.data.msg
						});
					}
				}).catch();
			}
		},
		mounted(){
			this.getFriendsList();
		}
	}
</script>

<style scoped="scoped">
	#mailList{
		display: flex;
		background: #F5F5F5;
	}
</style>
