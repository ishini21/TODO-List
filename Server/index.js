const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

app.use(express.json());
app.use(cors());//resource sharing

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:"abcd123",
    database: 'sys'
})
db.connect((err) => {
    if(!err) {
        console.log("Connected to database successfully");
    }else{
        console.log("Couldn't connect to database");
    }
})

app.post('/new-task', (req, res) => {
    console.log(req.body);
    const q = 'insert into todos (task, createdAt) values (?,?)';
    db.query(q,[req.body.task,new Date()],(err,result) => {
        if(err){
            console.log("Couldn't insert");  
        }else{
            console.log('todo saved');   
        }
    })

})

app.get('/read-tasks',(req, res) => {
    const q = 'select * from todos  ';
    db.query(q, (err,results) => {
        if(err){
            console.log("Couldn't read tasks");  
        }else{
            console.log('get tasks from database successfully');
            res.send(results);  
        }
    })
})

app.listen(5000, () => {
    console.log('listening on port');
});

