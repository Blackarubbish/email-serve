const db = require('./db');



db.connect();


let res = db.findUser("emialwewlal.com").then((data)=>{
    console.log(data.length);
    db.close()
})

console.log(res);
