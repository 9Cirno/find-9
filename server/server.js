const express = require('express')
const userRouter = require('./user.js')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const utils = require('utility')
const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
app.listen(9093, ()=>{
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

