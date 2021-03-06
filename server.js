const express = require('express');
const http=require('http');
const app = express()
var port= process.env.PORT || 8080;
const path=require('path');
const bodyParser=require('body-parser');
const webpack=require('webpack');
const webpackDevMiddleware=require('webpack-dev-middleware');
const webpackConfig=require('./webpack.config')
const server=http.createServer(app);
const socketIo= require('socket.io')
const io=socketIo(server);


app.use(express.static(__dirname));

app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'index.html'))
});

  app.use(bodyParser.urlencoded({extends:false}));

io.on('connection',socket=>{
  socket.on('message',body=>{
    socket.broadcast.emit('message',{
      body,
      from:  socket.id.slice(8)
    })
  })
})

// configure your socket.io instance here

server.listen(port);
console.log("server stated on port ", port)
