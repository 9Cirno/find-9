const mongoose =require('mongoose')
//connect
const DB_URL='mongodb+srv://manager:3720188917@cluster0-jtdsb.gcp.mongodb.net/test?retryWrites=true'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',()=>{
	console.log('mongo connect success')
})

const models = {
	user:{
		'user':{type:String,require:true},
		'pwd':{type:String,require:true},
		'type':{type:String,require:true},
		//pic
		'avatar':{'type':String},
		'desc':{'type':String},
		'title':{'type':String},
		'company':{'type':String},
		'salary':{'type':String}
	},
	chat:{

	}
}

for (let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports ={
	getModel:(name)=>{
		return mongoose.model(name)
	}
}


// const User = mongoose.model('user',new mongoose.Schema({
// 	user:{type:String,require:true},
// 	age:{type:Number,require:true}
// }))
