const express = require('express');
const cors = require('cors');
const path = require('path')
var bodyParser = require('body-parser');


const sendEmail = require('./sendEmail');
const schedule = require('./schedule');
const db = require('./db/db');
const { send, abort } = require('process');

const app = express();


db.connect();

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser());
app.use(cors());




// app.get('/',function(req,res){
//     res.send('sendEmail')
//     console.log(req);
// })

app.post('/sendEmail',function(req,res){
    console.log(req.body);
    let times = req.body.times;
    const user = req.body.hostEmail;
    const scheduleRule = req.body.schedule;
    ( async  ()=>{
        let findUserResult;
        console.log('wozhixinglema?');
        try {
            findUserResult = await db.findUser(user);
            if(Array.isArray(findUserResult)&&findUserResult.length===1){
                res.send({code:'3',response:'这个邮箱已经存在任务'})
                res.end()
                return
            }
            await sendEmail(req.body)
            if(times!=='once'){
                await db.addUser(user);
                schedule.createTask(times,()=>{sendEmail(req.body)},user,scheduleRule);
            }
            res.send({code:'2',response:'完成'});
            res.end();
            return;
        } catch (error) {
            console.log(error);
            res.send({code:'1',response:error})
            res.end();
            return;
        }
       
    })()
})


app.get('/deleteUser',function(req,res){
    console.log(req.query.user);
    const user = req.query.user
    db.deleteUser(user).then((data)=>{
        console.log(data);
        schedule.deleteTask(user);
        res.send({
            code:'1',
            response:'成功！'
        });
        res.end();
    }).catch((err)=>{
        res.send({
            code:'2',
            response:'失败！'+err
        });
        res.end();
    })
})


/* const map = new Map();
app.get('/setUser',function(req,res){
    map.set(req.query.a,new Date());
    console.log(map.entries());
    res.end();
})
 */

const server = app.listen(8081,function(){
    console.log('监听');
})


