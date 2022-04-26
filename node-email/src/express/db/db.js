

const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'81.68.131.25',
    user:'email',
    password:'c6wWH37shzpLTNNF',
    database:'email'
})




function connect(){
    connection.connect();
}

// 查


function findUser(user){
    return  new Promise((resolve,reject)=>{
        connection.query(
            `select * from email_user where user='${user}'`,function(err,result){
                if(err){
                    console.log('[SELECT ERROR] - ',err.message);
                    reject(err)
                    return
                }
                resolve(result)
                return
            }
        )
    })

}


function addUser(user){

    return new Promise((resolve,reject)=>{
        const sql = 'insert into email_user values(?)';
        const param = [user];
        connection.query(sql,param,function(err,result){
            if(err) {
                reject(err)
                return
            }
            resolve(result)
            return
        })
    })
}


function deleteUser(user){
    return new Promise((resolve,reject)=>{
        const sql = `delete from email_user where user='${user}'`;
        connection.query(sql,function(err,result){
            if(err) {
                reject(err)
                return
            }
            resolve(result)
            return
        })
    })

}

// addUser("shdjsdhj@qq.com");
function close(){
    connection.end();
}

module.exports = {
    findUser,
    deleteUser,
    addUser,
    close,
    connect
}
