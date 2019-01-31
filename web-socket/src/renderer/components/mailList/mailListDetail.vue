<template>
	<div id="mailListDetail">
		<!-- 这是好友列表详情 -->
		<div class="Title" v-if="showTitle">
			<div style="margin-left: 20px;">
				<h2>{{title}}</h2>
			</div>
		</div>
		<div class="add detail" v-if="type == 1">
			<div class="addSearch search">
				<el-input size="small" placeholder="请输入用户名" v-model="addSearchKey" clearable @keyup.enter.native="addSearch">
				</el-input>
				<el-button size="small" type="primary" icon="el-icon-search" plain @click="addSearch">搜索</el-button>
			</div>
			<div class="addList">
				<span class="tip" v-if="addSearchRes.length>0">搜索结果</span>
				<div class="listItem" v-for="(item,index) in addSearchRes">
					<div class="listImg">
						<img src="../../../../static/img/icon.png" alt="">
					</div>
					<div class="listTitle">
						<p>{{item.username}}</p>
					</div>
					<div class="listBtn">
						 <el-button size="mini" type="success" plain icon="el-icon-plus" @click="applyAdd(item.userId,index)">添加</el-button>
					</div>
				</div>
				<div class="listTip" v-if="noAddSearchRes">
					{{noAddSearchResTip}}
				</div>
			</div>
		</div>
		<div class="new detail" v-if="type == 2">
			<span class="tip" v-if="applyList.length>0">申请列表</span>
			<div class="listItem" v-for="(item,index) in applyList">
				<div class="listImg">
					<img src="../../../../static/img/icon.png" alt="">
				</div>
				<div class="listTitle">
					<p>{{item.username}}</p>
					<span>{{item.originated_at | timeStamp}}</span>
				</div>
				<div class="listStatus">
					<el-button @click="agreeApply(item.apply_id)" size="mini" type="success" plain style="margin-bottom: 10px;" v-if="item.apply_status == 2">同意</el-button>
					<el-button size="mini" plain v-if="item.apply_status == 2">拒绝</el-button>
					<span v-if="item.apply_status == 1" style="font-size: 12px;color: #999;margin-bottom: 10px;">已同意</span>
					<el-button size="mini" type="success" plain v-if="item.apply_status == 1">发消息</el-button>
					<span v-if="item.apply_status == 0" style="font-size: 12px;color: #999;">已拒绝</span>
				</div>
			</div>
			<span style="font-size: 12px;color: #999999;margin: 5px auto;display: block;text-align: center;" v-if="applyList.length>0">
				已经到底了，别再拽了o((>ω< ))o
			</span>
			<div class="listTip" v-if="applyList.length<=0">
				主人，您暂时没有好友申请哦(●'◡'●)~
			</div>
		</div>
		<div class="friendInfo detail friend" v-if="type == 3">
			<div class="infoCard">
				<h5>{{detail.username}}</h5>
				<div>
					<img src="../../../../static/img/icon.png" alt="">
				</div>
			</div>
			<div class="infoCard"></div>
			<div class="infoCard"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'mailListDetail',
		props: {
			title: {
				type: String,
			},
			showTitle: {
				type: Boolean,
				default: true
			},
			type: {
				type: Number,
				default: 1
			},
			detail: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				addSearchKey: '',//添加朋友搜索关键字
				addSearchRes: [], //添加朋友搜索结果数组
				noAddSearchRes: false, //没有搜索结果提示
				noAddSearchResTip: '没有找到任何结果哦~',
				applyList: [],
			}
		},
		methods: {
			//添加好友搜索
			addSearch() {
				this.$http.get('/add-friends/search-user?currentUser='+(JSON.parse(localStorage.getItem('username'))).username+'&searchKey='+this.addSearchKey).then((res)=>{
					if(res.data.code == 1){
						this.addSearchRes = res.data.data;
						this.noAddSearchRes = false;
					}else{
						this.addSearchRes = [];
						this.noAddSearchRes = true;
						this.noAddSearchResTip = res.data.msg+' (｡•ˇ‸ˇ•｡) ~*';
					}
				}).catch();
			},
			//申请添加好友
			applyAdd(targetId,index){
				let config = {
					originator_id: (JSON.parse(localStorage.getItem('username'))).userId,
					target_id: targetId
				}
				this.$http.post('/add-friends/apply-add',config).then((res)=>{
					if(res.data.code == 1){
						this.$message({
							type:'success',
							showClose: true,
							message: res.data.msg
						});
						this.addSearchRes.splice(index,1);
					}else if(res.data.code == 2 || res.data.code == 3){
						this.$message({
							type:'warning',
							showClose: true,
							message: res.data.msg
						});
						this.addSearchRes.splice(index,1);
					}else{
						this.$message({
							type:'error',
							showClose: true,
							message: res.data.msg
						});
					}
				}).catch();
			},
			//获取申请列表
			getApplyList(){
				this.$http.get('/add-friends/get-apply-list?target_id='+(JSON.parse(localStorage.getItem('username'))).userId).then((res)=>{
					if(res.data.code == 1){
						this.applyList = res.data.data;
					}else{
						this.applyList = [];
					}
				}).catch();
			},
			//同意
			agreeApply(applyId){
				let config = {
					apply_id: applyId
				}
				this.$http.post('/add-friends/agree-apply',config).then((res)=>{
					if(res.data.code == 1){
						this.$message({
							type:'success',
							showClose: true,
							message: res.data.msg
						});
						this.getApplyList();
					}else{
						this.$message({
							type:'error',
							showClose: true,
							message: res.data.msg
						});
						this.getApplyList();
					}
				}).catch();
			}
		},
		watch: {
			addSearchKey(newValue, oldValue) {
				if(newValue == ''){
					this.addSearchRes = [];
				}
			},
			type(){
				if(this.type == 2){
					this.getApplyList();
				}
			}
		},
		mounted(){
			if(this.type == 2){
				this.getApplyList();
			}
		}
	}
</script>

<style scoped="scoped">
	#mailListDetail {
		flex: 1;
		background: #F5F5F5;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
	}

	#mailListDetail>.detail{
		width: 320px;
		margin: 0 auto;
		flex: 1;
		padding: 20px 0;
		overflow: hidden;
	}
	#mailListDetail>.friend {
		width: 100%;
		margin-top: 80px;
	}
	#mailListDetail>.friend>.infoCard{
		width: 370px;
		height: 160px;
		margin: 0 auto;
	}
	#mailListDetail>.friend>.infoCard:nth-of-type(1){
		display: flex;
		justify-content: space-between;
		overflow: hidden;
	}
	#mailListDetail>.friend>.infoCard:nth-of-type(1)>div{
		width: 80px;
		height: 80px;
	}
	#mailListDetail>.friend>.infoCard:nth-of-type(1)>div>img{
		width: 100%;
		height: 100%;
	}
	#mailListDetail>.friend>.infoCard:nth-of-type(1)>h5{
		width: ;
		font-weight: 400;
		font-size: 28px;
	}
	
	.search{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.addList{
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.listItem{
		width: 100%;
		height: 60px;
		padding: 20px 0;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #E7E7E7;
		overflow: hidden;
	}
	.listImg{
		width: 60px;
		height: 60px;
		background: white;
		border-radius: 5px;
		overflow: hidden;
	}
	.listImg>img{
		width: 100%;
		height: 100%;
	}
	.listTitle{
		flex: 1;
		margin: 3px 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.listTitle>p{
		font-size: 20px;
		color: #555555;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.listTitle>span{
		font-size: 12px;
		color: #999999;
	}
	.listBtn{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.listTip{
		width: 100%;
		height: 60px;
		padding-top: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 12px;
		color: #999999;
		border-bottom: 1px solid #E7E7E7;
	}
	.listStatus{
		width: 80px;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
</style>
