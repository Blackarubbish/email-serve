
const schedule = require("node-schedule"); 

const userSchedule = new Map();


function createTask(times,func,user,scheduleTask){

    if(times==='once') return;


    if(userSchedule.has(user)){
        return ;
    }

    const task= schedule.scheduleJob(scheduleTask, function(){
        func()
    });

    userSchedule.set(user,task);

}


function deleteTask(user){
    if(userSchedule.has(user)){
        userSchedule.get(user).cancel();
        userSchedule.delete(user)
    }
}



module.exports = {
    createTask,
    deleteTask
}
