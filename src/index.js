require("dotenv").config();
const http=require('http')
const app = require('./app');
const { serverPort } = require('./secret');
const {connectDB}=require("./db")


const server=http.createServer(app)

const main=async()=>{
    try{
       await connectDB()
      server. listen(serverPort, async() => {
        await connectDB()
        console.log(`Server is running at http://localhost:${serverPort}`)
    })
    }catch(e){
        console.log(e)
    }
}


main()
