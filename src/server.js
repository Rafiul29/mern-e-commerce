const app = require('./app');
const { serverPort } = require('./secret');
const connectDatabase=require("./config/db")

app.listen(serverPort, async() => {
    await connectDatabase()
    console.log(`Server is running at http://localhost:${serverPort}`)
})