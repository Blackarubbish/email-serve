<template>
  <div>
      <svg t="1650770281041" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3639" width="200" height="200"><path d="M909.5 431.3v381.6c0 19.5-15.9 35.4-35.4 35.4H151.2c-19.5 0-35.4-15.8-35.4-35.4V431.3l8.8-5.3h776.2l8.7 5.3z" fill="#2DB467" p-id="3640"></path><path d="M339.018 613.01l3.111 3.11-151.885 151.886-3.11-3.112zM835.772 761.768l-3.111 3.11-151.885-151.884 3.111-3.111z" fill="#1E7C44" p-id="3641"></path><path d="M909.5 431.3l-123.6 65.8-273.3 145.4-274.5-146.1-122.3-65.1 8.8-5.3L515 191.3 900.8 426z" fill="#3CD97E" p-id="3642"></path><path d="M785.9 417.6v79.5L512.6 642.5 238.1 496.4v-78.8z" fill="#FFFFFF" p-id="3643"></path><path d="M318.7 432h386.8v20H318.7z" fill="#BDBDBD" p-id="3644"></path><path d="M319.3 474.3h386.8v20H319.3z" fill="#CFCFCF" p-id="3645"></path><path d="M319.6 514h386.8v20H319.6z" fill="#E0E0E0" p-id="3646"></path><path d="M319.6 528h386.8v10H319.6z" fill="#EAEAEA" p-id="3647"></path></svg>
      <h3>QQ邮箱定时邮件服务</h3>
      <van-button type="primary" @click="createTask">创建任务</van-button>
      <br/>
      <br/>
      <br/>
      <van-button type="primary" @click="cancelTask" >取消任务</van-button>
  </div>
</template>

<script>

export default {
    name:'WelcomePage',
    methods:{
      createTask(){
        this.$router.push({
          path:'/home'
        })
      },
      cancelTask(){
        this.$router.push({
          path:'/cancel'
        })
      }
    }
}
</script>

<style>

</style>