const express = require('express')
const app = express()
const port = 1337
const userRoutes = require('../routes/user')
const submitRoutes = require('../routes/submit')
const pluginRoutes = require('../routes/plugin')
const cors = require('cors')
const database = require('../utils/database')
var bodyParser = require('body-parser')
const auth = require("../middleware/auth")

function initDatabaseMiddleWare() {
    if (process.platform === "win32") {
        require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        }).on("SIGINT", () => {
            //console.log('SIGINT: Closing MongoDB connection');
            database.close();
        });
    }
    process.on('SIGINT', () => {
        //console.log('SIGINT: Closing MongoDB connection');
        database.close();
    });

    database.open(() => { });
}

initDatabaseMiddleWare();


app.use(cors())

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/user', userRoutes);

app.use('/submit', submitRoutes);

app.use('/plugins', pluginRoutes);

app.use('/plugin', express.static(__dirname + '/..' + '/plugins'));


//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
    res.status(404).send({ msg: "Route not found" });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`))
