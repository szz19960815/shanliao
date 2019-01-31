<template>
	<div id="chat" class="main">
		<!-- <span @click="back">这是聊天</span> -->
		<list-component type="chat">
			<div style="flex: 1;overflow: auto;">
				<div class="listCard" v-for="(card,index) in list" @click="chatSelect(index,card)" :class="{active:index==current}">
					<div class="cardImg">
						<img src="../../../../static/img/icon.png">
					</div>
					<div class="cardName">
						<span style="font-size: 14px;">{{card.username}}</span>
						<span style="font-size: 11px;color: #888888;">注册时间:{{card.register_at | timeStamp}}</span>
					</div>
					<div class="cardTime">
						<!-- 注册时间:{{card.register_at | timeStamp}} -->
					</div>
				</div>
			</div>
		</list-component>
		<chat-window></chat-window>
	</div>
</template>

<script>
	import listComponent from '../common/listComponent';
	import chatWindow from './chatWindow';
	export default {
		name: 'chat',
		components: {
			listComponent,
			chatWindow
		},
		data() {
			return {
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
			back() {
				this.$router.push({
					path: '/home'
				});
			},
			chatSelect(index,card){
				this.current = index;
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
	#chat{
		display: flex;
	}
</style>
