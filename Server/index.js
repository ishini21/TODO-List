const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

app.use(express.json());
app.use(cors());//resource sharing

const db = mysql.createConnection({
    host: 'localhost',
    user: '',
    password:"",
    database: ''
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
    const q = 'insert into todos (task, createdAt, status) values (?,?,?)';
    db.query(q,[req.body.task,new Date(),'active'],(err,result) => {
        if(err){
            console.log("Couldn't insert");  
        }else{
            console.log('todo saved');
            const updateTasks = 'select * from todos'
            db.query(updateTasks, (error,newList) => {
                res.send(newList);
            })   
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
app.post('/update-task', (req, res) => {
    // Debug: Log the incoming request body
    console.log(req.body);

    // Destructure the request body for better readability
    const { task, updateId } = req.body;

    // Validate input to prevent SQL errors
    if (!task || !updateId) {
        console.error("Invalid input: task or updateId is missing");
        return res.status(400).send("Task and updateId are required");
    }

    // SQL query to update the task
    const q = 'UPDATE todos SET task = ? WHERE id = ?';

    // Execute the query
    db.query(q, [task, updateId], (err, results) => {
        if (err) {
            console.error("Error updating todo:", err);
            return res.status(500).send("Failed to update todo");
        } else {
            console.log("Todo updated successfully");
            res.send("Todo updated successfully");
        }
    });
});

// app.post('/update-task', (req, res) => {
//     console.log(req.body);
//     const q = 'UPDATE todos SET task = ? WHERE id =?'
//     db.query(q,[req.body.task, req.body.updateId], (err, results) =>{
//         if(err){
//             console.log(err);  
//         }else{
//             console.log('todo updated successfully');
//         }

//     })
// })

app.post('/delete-task',(req, res) =>{
    const q = 'delete from todos where id = ?';
    db.query(q,[req.body.id],(err, results) =>{
        if(err){
            console.log('Failed to delete');
        }else{
            console.log('Todo deleted successfully');
            db.query('select * from todos',(e,newList) =>{
                res.send(newList);
            })
        }
    })
})
app.post('/complete-task',(req, res) =>{
    const q = 'update todos set status = ? where id = ? '
    db.query(q,['completed',req.body.id],(err,result) =>{

        if(result){
            db.query('select * from todos',(e,newList) =>{
                res.send(newList);
        })
    }


    });

})
app.listen(5000, () => {
    console.log('listening on port');
});

