const app=require("./app");
const dotenv=require("dotenv");
const connectDatabase=require("./config/database")


// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });
  

//config

dotenv.config({path:"backend/config/config.env"})

//Conecting to Database
connectDatabase()
// mongoose.connect(process.env.DB_URI).then(()=>console.log("DB Connection Successfull!")).catch((err)=>{console.log(err)});

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is Working on :https://localhost:${process.env.PORT}`);

})
//unhandled Promises Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error :${err.message}`);
    console.log(`Shutting Down the Server due to unhandles Promises Rejection`);
    server.close(()=>{
        process.exit(1);
    });
});