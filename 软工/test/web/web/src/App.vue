<template>
  <div id = 'app'>

    <div v-if="ifSkip!='经理'">
   <div class="pageHeader"  v-if="ifSkip!='登录' ">
    <el-page-header   @back="goBack" v-bind:content="ifSkip" >  </el-page-header>
  </div>
    </div>

   <Login  ref="Login" v-bind:ifSkip="ifSkip" v-on:skip="skip($event)" v-if="ifSkip==='登录'"></Login>

  <CookMain  v-else-if="ifSkip==='厨师'"></CookMain>
    <AllTables v-else-if="ifSkip==='服务员'" ></AllTables>
    <router-view  v-else-if="ifSkip==='经理'" v-on:skip="skip($event)"></router-view>
  </div>





</template>

<script>


import CookMain from './components/cook/CookMain.vue';
import AllTables from './components/waiter/AllTables';
import Login from "./components/Login";

export default {
  name: "App",
  data(){
    return{
      ifSkip:'登录',


    }
  },
  components:{
    Login,
     CookMain,

  /*Home,*/
    AllTables,


  },

  methods:{

    skip(val){
      this.ifSkip=val
      //console.log(this.ifSkip)
    },

    returnLogin(){
      this.ifSkip='登录'
    },

    goBack() {
     this.returnLogin()
    }
  },


};

</script>

<style>


#app{


}

#app .pageHeader{
  text-align: center;
  margin-top: 15px ;
  margin-bottom: 15px;
  margin-left: 30px;
}




</style>