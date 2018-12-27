const express = require('express')

const mongoose =require('mongoose')
//connect
const DB_URL='mongodb+srv://manager:3720188917@cluster0-jtdsb.gcp.mongodb.net/test?retryWrites=true'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',()=>{
	console.log('mongo connect success')
})

const app = express()

const User = mongoose.model('user',new mongoose.Schema({
	user:{type:String,require:true},
	age:{type:Number,require:true}
}))

// update

// User.update({'user':'xiaohua'},{'$set':{age:23}},(err,doc)=>{
// 	console.log(doc)
// })



// delete
// User.remove({age:23},(err,doc)=>{
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


// search
app.get('/data',(req,res)=>{
	User.find({},function(err,doc){
		res.json(doc)
	})
})




app.get('/', (req,res)=>{
	res.send('<h1>Hello world</h1>')
})


app.listen(9093, ()=>{
	console.log('nood app start at port 9093')
})
