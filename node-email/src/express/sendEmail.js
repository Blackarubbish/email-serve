


const nodemailer = require('nodemailer');
const ejs = require('ejs')
const fs = require('fs');
const path = require('path')


function sendEmail(config){

    return new Promise((resolve,reject)=>{
        const transporter = nodemailer.createTransport({
            service: 'qq', // 发送者的邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
            port: 465, // SMTP 端口
            secureConnection: true, // SSL安全链接
            auth: {   //发送者的账户密码
                user: config.hostEmail, //账户
                pass: config.authorizationCode, //smtp授权码，到邮箱设置下获取
            }
        });
        
        const mailOptions = {
            from: `${config.name}<${config.hostEmail}>`, // 发送者昵称和地址
            to: config.targetEmail, // 接收者的邮箱地址
            subject: config.emailTitle, // 邮件主题
            // text: 'test mail',  //邮件的text
            html: createHtmlTemplate(config.color1,config.color2,config.emailTitle,config.emailContent)  //也可以用html发送  
        };
        
        //发送邮件
        transporter.sendMail(mailOptions, (error, info) => {  
            if (error) {
                reject(error)
            }
            resolve('邮件发送成功 ID'+info);
        }); 
    })
 
}




function createHtmlTemplate(color1,color2,title,content){
    const template = ejs.compile(fs.readFileSync(path.resolve(__dirname,'./ejs/template.ejs'),'utf-8'));
    const html = template({
        title: title,
        desc: '使用Ejs渲染模板',
        content,
        style:{
            color1,
            color2
        }
    });
    return html
}



module.exports = sendEmail

