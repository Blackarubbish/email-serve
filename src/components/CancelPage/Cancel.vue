<template>
  <div>
        <van-nav-bar
            title="取消邮件任务"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />
        <br/>
        <br>
        <br>
        <van-cell-group >
            <van-field v-model="cancelEmail" label="取消邮箱" type="email" placeholder="输入要取消任务的邮箱"/>
            <br/>
            <van-button type="primary" size="large" @click="sendCancel" >确定</van-button>
        </van-cell-group>   
  </div>
</template>

<script>
import axios from 'axios';
import {Toast} from 'vant'
export default {


    name:'CancelPage',
    data(){
        return{
            cancelEmail:''
        }
    },
    methods:{
        sendCancel(){
            Toast.loading({
                message:'发送中..'
            })
            axios({
                url:'http://localhost:8081/deleteUser',
                method:'GET',
                params:{
                    user:this.cancelEmail
                }
            }).then((response)=>{
                console.log(response);
                if(response.data.code==='1'){
                    Toast.success({
                        message:'取消成功!'
                    })
                }
                if(response.data.code==='2'){
                    Toast.fail({
                        message:'操作失败，请联系管理员'
                    })
                }

            }).catch((err)=>{
                console.log(err);
                Toast.fail({
                    message:'操作失败，请联系管理员'
                })
            })
        },
        goBack(){
            this.$router.back()
        }
    }
}
</script>

<style>

</style>