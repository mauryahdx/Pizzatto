require("dotenv").config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const PORT = process.env.PORT || 4000
const mongoose = require("mongoose")

const session = require('express-session')
const flash = require('express-flash')
const MongoDBStore = require('connect-mongo')(session)
const passport = require('passport')
const Emitter = require('events')

//Database Connection
const url = 'mongodb://localhost:27017/pizza';

mongoose.connect(url, {useUnifiedTopology:true});

const connection = mongoose.connection;
connection.once('open', () => {

    console.log('Database Connected...');

});


//Sessiion Store 

 let mongoStore = new MongoDBStore({
     mongooseConnection: connection,
    collection: 'sessions'
})

//Event Emitter
const eventEmitter= new Emitter()
app.set('eventEmitter', eventEmitter)

// Session Config

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000*60*60*24}
}))


//Passport Config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

//Assets 
app.use(express.static('public'))
app.use(express.urlencoded({extended :false}))
app.use(express.json())

//Global middleware

app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

// set Template Engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)



const server = app.listen(PORT, ()=>{
                console.log(`listening on port ${PORT}`)
})

// Socket

const io = require('socket.io')(server)

io.on('connection', (socket)=>{
   
    // Join
    //console.log(socket.id)
    socket.on('join', (orderId) => {
        socket.join(orderId)
    })
       
})

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced', (data) =>{
    io.to('adminRoom').emit('orderPlaced', data)
})