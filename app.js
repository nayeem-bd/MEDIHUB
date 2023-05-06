const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');

const userRouter = require('./routes/userRouter');
const hospitalRouter = require('./routes/hospitalRouter');
const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');
const viewRouter =  require('./routes/viewRouter');

const app = express();
app.enable('trust proxy');

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));


//global middleware
app.use(cors());
app.options('*',cors());

//serving static file
app.use(express.static(path.join(__dirname,'public')));

//set security http headers
app.use(helmet({
    contentSecurityPolicy:false,
    crossOriginIsolated:false
}));

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//rate limit per ip
const limiter = rateLimit({
    max:100,
    windowMs:60*60*1000,
    message:'You tries many times.Try again after a hour'
});

app.use('/api',limiter);

//body parser, reading data from body into req.body
app.use(express.json({limit:'10kb'}));
app.use(express.urlencoded({extended:true,limit:'10kb'}));
app.use(cookieParser());

//data sanitize for noSql injection
app.use(mongoSanitize());

//data sanitize for xss
app.use(xss());

//prevent parameter pollution
app.use(hpp({
    whitelist:['duration','price','difficulty','ratingsQuantity','ratingsAverage']
}));

//for request compression
app.use(compression());

//adding requestTime
app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
});

//Routes
app.use('/',viewRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/hospitals',hospitalRouter);

app.use('*',(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server`,404));
});

app.use(globalErrorHandler);

module.exports = app;