import axios from 'axios'
import 'antd-mobile/dist/antd-mobile.css';
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')

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
		// case MSG_READ:
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