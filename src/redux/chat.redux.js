import axios from 'axios'
import 'antd-mobile/dist/antd-mobile.css';
import io from 'socket.io-client'

const socket = io('wss://find-9.com')

//get chat list
const MSG_LIST = 'MSG_LIST'
//load message
const MSG_RECV = 'MSG_RECV'
//mark read
const MSG_READ = 'MSG_READ'

const initState={
	chatmsg:[],
	users:{},
	unread:0
}

export function chat(state=initState, action){
	switch(action.type){
		case MSG_LIST:
			return {...state, 
				chatmsg:action.payload.msgs, 
				users:action.payload.users,
				unread:action.payload.msgs.filter(v=>!v.read&&v.to===action.payload.userid).length}
		case MSG_RECV:
			const n = action.payload.to===action.userid?1:0
			return {...state, chatmsg:[...state.chatmsg, action.payload],unread:state.unread+n}
		case MSG_READ:

			return {...state, 
					chatmsg:state.chatmsg.map(v=>({...v, read:action.payload._from===v.from?true:v.read})),
					unread:state.unread-action.payload.num}
		default:
			return state
	}
}
function msgList(msgs,users,userid){
	return {type:MSG_LIST, payload:{msgs,users,userid}}
}

function msgRecv(msg,userid){
	return {userid,type:MSG_RECV,payload:msg}
}
function msgRead({_from, userid,num}){
	return {type: MSG_READ, payload:{_from,userid,num}}
}
export function readMsg(_from){
	return (dispatch, getState)=>{
		axios.post('/user/readmsg',{_from})
			.then(res=>{
				const userid =getState().user._id
				if (res.status===200 && res.data.code===0){
					dispatch(msgRead({userid,_from,num:res.data.num}))
				}
			})
	}
}


export function recvMsg(){
	return (dispatch, getState)=>{
		socket.on('recvmsg',function(data){
			const userid = getState().user._id
			dispatch(msgRecv(data,userid))
		})
	}
}


export function sendMsg({_from,to,msg}){
	return dispatch=>{
		socket.emit('sendmsg',{_from,to,msg})
	}
}


export function getMsgList(){
	return (dispatch,getState)=>{
		axios.get('/user/getmsglist')
			.then(res=>{
				if (res.status===200 && res.data.code===0){
					const userid = getState().user._id
					dispatch(msgList(res.data.msgs, res.data.users,userid))
				}
			})
	}
}
