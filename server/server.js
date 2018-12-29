const express = require('express')
const userRouter = require('./user.js')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const utils = require('utility')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const model = require('./model')
const Chat = model.getModel('chat')
const User = model.getModel('user')
io.on('connection',function(socket){
	//console.log('user login')
	socket.on('sendmsg',function(data){
		const {_from, to, msg} = data
		const chatid = [_from,to].sort().join('_')
		Chat.create({chatid:chatid,from:_from,to:to,content:msg},function(err,doc){
			io.emit('recvmsg',Object.assign({},doc._doc))
		})
		//console.log(data)
		//io.emit('recvmsg',data)
	})
})


app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
//common below for debug
app.use((req,res,next)=>{
	if (req.url.startsWith('/user/')||req.url.startsWith('/static/')){
		return next()
	}
	return res.sendFile(path.resolve('build/index.html'))
})
app.use('/',express.static(path.resolve('build')))
//common above for debug
server.listen(9093, ()=>{
	console.log('nood app start at port 9093')
})


// update

// User.update({'user':'xiaohua'},{'$set':{age:23}},(err,doc)=>{
// 	console.log(doc)
// })



//delete
// User.remove({age:26},(err,doc)=>{
// 	console.log(doc)
// })



// add
// User.create({
// 	user:'user1',
// 	age:18
// },(err,doc)=>{
// 	if (!err){
// 		console.log(doc)
// 	}else{
// 		console.log(err)
// 	}

// })

