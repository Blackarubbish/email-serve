import Vue from 'vue';
import VueRouter from 'vue-router';

import CancelPage from '../components/CancelPage/Cancel.vue';
import HomeSend from  '../components/Home/Home.vue';
import WelcomePage from '../components/Welcome/Welcome.vue'
Vue.use(VueRouter)


export default new VueRouter({
    routes:[
        {
            path:'/',
            component:WelcomePage,
        },
        {
            path:'/home',
            component:HomeSend
        },
        {
            path:'/cancel',
            component:CancelPage
        }
    ]
})