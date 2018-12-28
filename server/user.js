const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const utils = require('utility')
const _filter = {'pwd':0,'__v':0}




Router.get('/info',(req,res)=>{
	const {userid} = req.cookies
	if (!userid){
		return res.json({code:1})
	}
	User.findOne({_id:userid},_filter,(err,doc)=>{
		if (err){
			return res.json({code:1, msg:'cookie loading error'})
		}
		if (doc){
			return res.json({code:0, data:doc})
		}
	})
	
})

Router.get('/getmsglist',function(req,res){
	const user = req.cookies.userid
	
	User.find({},(e,userdoc)=>{
		let users={}
		userdoc.forEach(v=>{
			users[v._id]={name:v.user, avatar:v.avatar}
		})
		Chat.find({'$or':[{from:user},{to:user}]},(err,doc)=>{
			if(!err){
				return res.json({code:0,msgs:doc,users:users})
			}
		})
	})

})

Router.post('/update',function(req,res){
	const userid = req.cookies.userid
	if(!userid){
		return json.dumps({code:1})
	}
	const body = req.body
	User.findByIdAndUpdate(userid,body,function(err,doc){
		const data = Object.assign({},{
			user:doc.user,
			type:doc.type
		},body)
		return res.json({code:0, data})
	})
})


Router.get('/list',(req,res)=>{
	//const type = req.query.type 
	const {type} = req.query
	//User.remove({},function(e,d){})
	User.find({type},(err,doc)=>{
		return res.json({code:0,data:doc})
	})
})

Router.post('/register',(req,res)=>{
	const {user,pwd,type} = req.body
	User.findOne({user:user},(err,doc)=>{
		if (doc){
			return res.json({code:1,msg:"username already exist"})
		}

		const userModel = new User({user,type,pwd:md5Pwd(pwd)})
		userModel.save((err,doc)=>{
			if(err){
				return res.json({code:1, msg:'register failed'})
			}
			const {user,type,_id} = doc
			res.cookie('userid',_id)
			return res.json({code:0,data:{user,type,_id}})
		})

		// User.create({user,type,pwd:md5Pwd(pwd)},(err,doc)=>{
		// 	if(err){
		// 		return res.json({code:1, msg:'register failed'})
		// 	}

		// 	return res.json({code:0})
		// })
	})
})

Router.post('/login', (req,res)=>{
	const {user,pwd} = req.body
	User.findOne({user,pwd:md5Pwd(pwd)},_filter,(err,doc)=>{
		if (!doc){
			return res.json({code:1,msg:'Username or/and password is incorrect'})
		}
		res.cookie('userid',doc._id)
		return res.json({code:0,data:doc})
	})
})

//this will be sensetive information and hidh in config file
function md5Pwd(pwd){
	const salt = '123qweasdzxc123qweasdzxc'
	return utils.md5(utils.md5(pwd+salt))
}


module.exports = Router