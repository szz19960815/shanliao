<template>
  <div id="chatWindow">
    <div class="Title">
      <div style="margin-left: 20px;">
        <h2
          style="min-width:300px;max-width:1000px;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;"
        >{{this.user.username}}</h2>
      </div>
    </div>
    <div class="chatContent" id="chatWin">
      <!-- <el-button
            size="mini"
            type="success"
            plain 
            @click="getMessage"
      >获 取</el-button><br>-->
      <div
        v-for="(info,index) in infoArr"
        :key="index"
        style="display:flex;justify-content: space-between;position:relative;min-height:80px;"
      >
        <div class="messageCard" v-if="info.type == 'receive'">
          <div class="messageUser">
            <img src="../../../../static/img/icon.png">
          </div>
          <div class="messageBubble">{{info.information_content}}</div>
          <div style="margin-left:3px;display:flex;align-items:flex-end;font-size:11px;color:rgb(136,136,136);">{{info.send_at | timeStamp}}</div>
        </div>
        <div class="messageCard messageRight" v-if="info.type == 'send'">
          <div style="margin-right:3px;display:flex;align-items:flex-end;font-size:11px;color:rgb(136,136,136);">{{info.send_at | timeStamp}}</div>
          <div class="messageBubble">{{info.information_content}}</div>
          <div class="messageUser">
            <img src="../../../../static/img/icon.png">
          </div>
        </div>
      </div>
      <!-- <div class="messageCard">
        <div class="messageUser"></div>
        <div class="messageBubble">
          {{infoArr[0]}}
        </div>
      </div>-->
    </div>
    <div class="inputContainer">
      <div class="content">
        <div class="functionBar">
          <div>
            <i class="iconfont icon-biaoqing" title="表情"></i>
          </div>
          <div>
            <i class="iconfont icon-fasongwenjian" title="发送文件"></i>
          </div>
          <div>
            <i class="iconfont icon-jieping" title="截屏"></i>
          </div>
        </div>
        <div class="inputArea" @click="inputAreaClick">
          <el-input
            resize="none"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4}"
            v-model="information"
            ref="inputMessage"
            @keydown.enter.native="sendMsg($event)"
          ></el-input>
        </div>
        <div class="sendBar">
          <el-button
            size="mini"
            title="按Enter键发送,Ctrl+Enter键换行"
            type="success"
            plain
            @click="sendMsg"
          >发送(S)</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io";
import Vue from 'vue';
//引入socket.io
import VueSocketio from 'vue-socket.io';
export default {
  name: "chatWindow",
  props: {
    user: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      information: "",
      id: "",
      infoArr: []
    };
  },
  sockets: {
    //监听连接事件
    connect: function() {
      // console.log("连接");
      this.id = this.$socket.id;
      // this.$socket.emit("sureConnect",{currentUser:JSON.parse(localStorage.getItem("username")).userId});
    },
    rematch:function(val){
      console.log(val);
    },
    remessage: function(val) {
      console.log(val);
      if (val.code == 1) {
        if (
          val.data.sender_id ==
          JSON.parse(localStorage.getItem("username")).userId
        ) {
          val.data.type = "send";
        }
        if (
          val.data.receiver_id ==
          JSON.parse(localStorage.getItem("username")).userId
        ) {
          val.data.type = "receive";
        }
        this.infoArr.push(val.data);
      } else {
        return;
      }
      // this.infoArr.
    }
  },
  methods: {
    // 单机获取焦点
    inputAreaClick() {
      this.$refs.inputMessage.focus();
    },
    //消息发送
    sendMsg(e) {
      if(this.$socket == undefined){
        Vue.use(new VueSocketio({debug:true,connection:'http://localhost:3111'}));
        this.sendMsg(e);
      }
      // console.log(this.$socket);
      if (e.ctrlKey == false) {
        e.preventDefault();
        if (this.information != "" && this.information != null) {
          let info = {
            senderId: JSON.parse(localStorage.getItem("username")).userId,
            receiverId: this.user.userId,
            information: this.information
          };
          this.$socket.emit("message", info);
          this.$socket.emit("sureConnect",{currentUser:JSON.parse(localStorage.getItem("username")).userId});
        } else {
          return;
        }
        this.information = "";
        this.$refs.inputMessage.focus();
      }else{
        this.information+='\n';
      }
    },
    //获取消息记录
    getMessage() {
      this.$http
        .get(
          "/websocket/get-message?userId="+JSON.parse(localStorage.getItem("username")).userId+'&friendId='+this.user.userId)
        .then(res => {
          if (res.data.code == 1) {
            this.infoArr = res.data.data;
          }
        })
        .catch();
    }
  },
  beforeMount() {
    this.getMessage();
  },
  updated() {
    this.$nextTick(function() {
      var div = document.getElementById("chatWin");
      div.scrollTop = div.scrollHeight;
    });
  },
  watch: {
    user: function() {
      if (this.user != undefined && this.user != {} && this.user != null) {
        this.getMessage();
      } else {
        return;
      }
    }
  },
  computed: {
    // infoArr: function() {
    //   let l = infoArr.length;
    //   for (let i = 0; i < l; i++) {
    //     // if(let )
    //   }
    // }
  }
};
</script>

<style scoped="scoped">
#chatWindow {
  flex: 1;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chatContent {
  flex: 1;
  padding: 0 20px;
  overflow: auto;
}

.inputContainer {
  height: 190px;
  width: 100%;
  background: white;
  border-top: 2px solid #e7e7e7;
  display: flex;
}

.inputContainer > .content {
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

.functionBar > div {
  margin-right: 20px;
}

.functionBar > div > i {
  font-size: 18px;
  cursor: pointer;
  color: #888888;
}

.functionBar > div > i:hover {
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
.el-textarea__inner {
  padding: 0 !important;
}
textarea {
  border: none !important;
}

.messageCard {
  margin-top: 20px;
  margin-bottom: 20px;
  max-width: 1000px;
  min-width: 300px;
  /* height: 40px; */
  /* overflow: hidden; */
  display: flex;
}
.messageRight {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  right: 0;
}
.messageUser {
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 3px;
  background: white;
  margin-right: 20px;
}
.messageRight > .messageUser {
  margin: 0;
  margin-left: 20px;
}
.messageUser > img {
  width: 100%;
  height: 100%;
}
.messageBubble {
  background: white;
  /* flex: 1; */
  line-height: 40px;
  position: relative;
  border-radius: 3px;
  cursor: pointer;
  padding: 0 10px;
}
.messageRight > .messageBubble {
  background: #b3d8ff;
}
.messageBubble::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  left: -17px;
  top: 10px;
  border: 8.5px solid;
  border-color: transparent white transparent transparent;
  cursor: pointer;
}
.messageRight > .messageBubble::before {
  border-color: transparent transparent transparent #b3d8ff;
  right: -17px;
  left: auto;
}
.messageBubble:hover {
  background: #dddddd;
}
.messageRight > .messageBubble:hover {
  background: #409eff;
}
.messageBubble:hover::before {
  border-color: transparent #dddddd transparent transparent;
}
.messageRight > .messageBubble:hover::before {
  border-color: transparent transparent transparent #409eff;
}
</style>
