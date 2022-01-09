import Vue from "vue";
import VueRouter from "vue-router";
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import CookManger from "../components/CookManger";
import Table from '../components/waiter/Table.vue'
import User from '../components/User'
import Welcome from '../components/Welcome.vue'
import Menu from '../components/Menu.vue'
import Sell from '../components/Sell.vue'
import Inventory from '../components/Inventory'
import '../assets/css/global.css'
import CookMain from "../components/cook/CookMain";
import AllTables from "../components/waiter/AllTables";


Vue.use(VueRouter)

export  default new VueRouter({
   routes:[
       {
           path:'/CookMain',
           name:'CookMain',
           component:CookMain,
       },
       {
           path:'/AllTables',
           name:'AllTables',
           component:AllTables,
       },
      { path: '/', redirect: '/home'},
      { path: '/Login', component: Login },
      { path: '/AllTables', component: AllTables },
      {
         path: '/home',
         name: 'home',
         component: Home,
         redirect: '/welcome',
         children: [
            { path: '/welcome', name: 'welcome', component: Welcome },
            { path: '/user', name: 'user', component: User },
            { path: '/menu', name: 'menu', component: Menu },
            { path: '/Table', name: 'Table', component: Table},
            { path: '/sell', name: 'Sell', component: Sell},
            { path: '/inventory', name: 'Inventory', component: Inventory},
            { path:'/CookMain', name:'CookMain', component:CookMain},
            { path:'/CookManger', name:'CookManger', component:CookManger},
         ]
      },
      
   ]
})