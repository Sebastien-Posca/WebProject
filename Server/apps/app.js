const express = require('express')
const app = express()
const port = 3000
const userRoutes = require('../routes/user')
const cors = require('cors')
const database = require('../utils/database')
var bodyParser = require('body-parser')



function initDatabaseMiddleWare() {
    if (process.platform === "win32") {
        require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        }).on("SIGINT", () => {
            console.log('SIGINT: Closing MongoDB connection');
            database.close();
        });
    }
    process.on('SIGINT', () => {
        console.log('SIGINT: Closing MongoDB connection');
        database.close();
    });

    database.open(() => { });
}

initDatabaseMiddleWare();


app.use(cors())

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use('/user', userRoutes);