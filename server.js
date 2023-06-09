/* eslint-disable no-console */
const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException',err=>{
    console.log(err.name,err.message);
    process.exit(1);
});

dotenv.config({path:'./config.env'});

const app = require('./app');

const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASS);
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('DB connection successfully...');
}).catch(()=>{
    console.log('DB connection error');
});

const port = process.env.PORT || 4000;
const server = app.listen(port,()=>{
    console.log(`App is running on ${port}`);
});

process.on('unhandledRejection',err=>{
    console.log(err.name,err.message);
    server.close(()=>{
        process.exit(1);  
    })
    
});
