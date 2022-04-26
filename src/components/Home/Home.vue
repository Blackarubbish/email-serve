<template>
    <div class="home-wrapper">
        <van-nav-bar
            title="创建邮件任务"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />
        <div class="home-main">
            <van-cell-group title="个人邮箱配置">
                <van-field v-model="hostEmail" label="邮箱地址" type="email" placeholder="输入要执行发送任务的邮箱地址"/>
                <van-field v-model="authorizationCode" label="授权码" type="password" placeholder="stmp输入授权码"/>
                <van-field v-model="name" label="邮箱昵称" type="text" placeholder="输入邮箱昵称"/>
                <a href="https://service.mail.qq.com/cgi-bin/help?subtype=1&&no=1001256&&id=28"
                    target="_blank"
                >点击查看如何获取stmp授权码</a>
            </van-cell-group>        

            <van-cell-group title="目标邮箱配置">
                <van-field v-model="targetEmail" label="目标邮箱" type="email" placeholder="输入要接收邮件的地址"/>
                
                <van-radio-group class="time-radio"  v-model="radio" direction="horizontal">
                    <label>发送频率</label>
                    <van-radio  name="once">一次</van-radio>
                    <van-radio @click="showPopup" name="eachHour">每小时</van-radio>
                    <van-radio @click="showPopup" name="eachDay">每天</van-radio>
                </van-radio-group>
            </van-cell-group>        

            <van-cell-group title="邮箱模板配置">
                <van-field label="邮箱标题" v-model="emailTitle" type="text" placeholder="输入邮箱标题"/>
                <van-field  label="内容" v-model='emailContent' type="textarea" class="email-content" autosize placeholder="输入内容"/>
                <van-field  label="卡片颜色1" type="color" v-model="color1" />
                <van-field  label="卡片颜色2" type="color" v-model="color2" />
            </van-cell-group>   
            <van-cell-group>
                <van-button size="large" @click="sendConfig" type="primary">发送</van-button>
            </van-cell-group>   
            <van-popup v-model="selectTime" position="bottom" >
                <div v-if='radio==="eachHour"'>
                    <span>每小时的第几分钟</span> <van-stepper v-model="minuteForEachHour" min="0" max="60" />
                    <van-button size="large" @click="selectTime =false"   type="primary">确定</van-button>
                </div>
                <div v-else>
                    <span>每天的第几个小时</span> <van-stepper v-model="hourForEachDay" min="0" max="24" />
                    <span>每小时的第几分钟</span> <van-stepper v-model="minuteForEachDay" min="0" max="60" />
                    <van-button size="large" @click="selectTime =false"  type="primary">确定</van-button>
                </div>
                 
            </van-popup>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import {Toast} from 'vant'

export default {
    name:'HomeSend',
    data() {
        return {
            hostEmail:'',
            authorizationCode:'',
            name:'',
            targetEmail:'',
            emailTitle:'',
            emailContent:'',
            color1:'#FF8936',
            color2:'#cb03e4',
            radio:'once',
            selectTime:false,
            minuteForEachHour:0,
            hourForEachDay:0,
            minuteForEachDay:0
        }
    },
    computed:{

    },
    methods:{
        sendConfig(){
            Toast.loading({
                message:'发送中..'
            })

        const schedule = ()=>{
            let res = ''
            if(this.radio==='eachHour'){
               res =`0 ${this.minuteForEachHour} * * * *` 
            }else if(this.radio==='eachDay'){
                res = `0 ${this.minuteForEachDay} ${this.hourForEachDay} * * *` 
            }else{
                res = ''
            }
            return res
        }

            axios({
                url:'http://localhost:8081/sendEmail',
                method:'POST',
                data:{
                    hostEmail:this.hostEmail,
                    authorizationCode:this.authorizationCode,
                    name:this.name,
                    targetEmail:this.targetEmail,
                    emailTitle:this.emailTitle,
                    emailContent:this.emailContent,
                    color1:this.color1,
                    color2:this.color2,
                    times:this.radio,
                    schedule:schedule()
                }
            }).then((response)=>{
                console.log(response.data);
                if(response.data.code==='1'){
                    Toast.fail({
                        message:'发送失败，请联系管理员'
                    })
                }else if(response.data.code==='3'){
                    Toast.fail({
                        message:'这个邮箱已经存在任务!'
                    })
                }else{
                    Toast.success({
                        message:'发送成功'
                    })
                }

            }).catch((err)=>{
                console.log(err);
                Toast.fail({
                    message:'发送失败，请联系管理员'
                })
            })
        },
        goBack(){
            this.$router.back()
        },
        showPopup(){
            
            this.selectTime = true
        }
    }
}
</script>

<style>

.home-wrapper{
    overflow: hidden;
}

.time-radio{
    display: flex;
    justify-content: space-around;
}

.time-radio label{
    font-size: 14px;
    color: #2c3e50;
}

</style>