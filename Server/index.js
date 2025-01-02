const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());//resource sharing

app.post('/new-task', (req, res) => {
    console.log(req.body);

})

app.listen(5000, () => {
    console.log('listening on port');
});

