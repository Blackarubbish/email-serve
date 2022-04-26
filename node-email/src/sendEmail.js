
const nodemailer = require('nodemailer');
const ejs = require('ejs')
const fs = require('fs');
const path = require('path')

console.log(__dirname);
const template = ejs.compile(fs.readFileSync(path.resolve(__dirname,'./ejs/template.ejs'),'utf-8'));
const html = template({
    title: 'Ejs',
    desc: '使用Ejs渲染模板',
    locals:{
        code:'123'
    },
    style:{
        color1:'#FF8936',
        color2:'#cb03e4'
    }
});
// console.log(html);

// 
// 


let transporter = nodemailer.createTransport({
    service: 'qq', // 发送者的邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // SSL安全链接
    auth: {   //发送者的账户密码
      user: '1422507966@qq.com', //账户
      pass: 'fdqjutyxuolsjaaf', //smtp授权码，到邮箱设置下获取
    }
  });

let mailOptions = {
    from: '布莱克辣舞<1422507966@qq.com>', // 发送者昵称和地址
    to: 'lishunlin@cug.edu.cn', // 接收者的邮箱地址
    subject: '一封暖暖的小邮件', // 邮件主题
    // text: 'test mail',  //邮件的text
    html: html  //也可以用html发送  
  };
  
//发送邮件
transporter.sendMail(mailOptions, (error, info) => {  
    if (error) {
    return console.log(error);
    }
    console.log('邮件发送成功 ID：', info.messageId);
});  

