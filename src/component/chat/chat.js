import React from 'react'
import io from 'socket.io-client'
import {NavBar,List, InputItem,Icon,Grid} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css';
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'
const socket = io('ws://localhost:9093')

@connect(
	state=>state,
	{getMsgList,sendMsg,recvMsg,readMsg}
)
class Chat extends React.Component{
	constructor(props){
		super(props)
		this.state={text:'',msg:[],	showEmoji:false}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleEmoji = this.handleEmoji.bind(this)
	}
	componentDidMount(){
		
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList()
			this.props.recvMsg()
		}

	}
	componentWillUnmount(){
		const to = this.props.match.params.user
		this.props.readMsg(to)
	}
	handleEmoji(){
		this.state.showEmoji?this.setState({showEmoji:false}):this.setState({showEmoji:true})
		setTimeout(()=>{
			window.dispatchEvent(new Event('resize'))
		},0)

	}
	handleSubmit(){
		//socket.emit('sendmsg',{text:this.state.text})
		//
		const _from = this.props.user._id
		const to = this.props.match.params.user
		const msg = this.state.text
		if(msg.length){
		this.props.sendMsg({_from, to, msg})
		this.setState({
			text:''
			})
		}
	}

	render(){

		const emoji ='😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾'
										.split(' ').filter(v=>v).map(v=>({text:v}))
		const users = this.props.chat.users
		const userid = this.props.match.params.user
		const chatid = getChatId(userid, this.props.user._id)
		const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
		const Item = List.Item

		if(!users[userid]){
			return null
		}
		return(
			<div id='chat-page'>
				<NavBar mode='dark'
					icon={<Icon type='left'/>}
					onLeftClick={()=>{
						this.props.history.goBack()
					}}
				>{users[userid].name}
				</NavBar>
				{chatmsg.map(v=>{
					const avatar=require(`../img/${users[v.from].avatar}.png`)
					return v.from==userid?(
						<List key={v._id}>
							<Item
								thumb={avatar}
							>
								{v.content}
							</Item>
						</List>
						):(
						<List key={v._id}>
							<Item 
								extra={<img src={avatar}/>}
								className='chat-me'>
								{v.content}
							</Item>
						</List>						
						)
				})}
				<div className="stick-footer">
					<List>
						<InputItem
							value={this.state.text}
							onChange={v=>{
								this.setState({text:v})
							}}
							extra={
								<div>
									<span
										style={{marginRight:15}}
										onClick={()=>this.handleEmoji()}
									>😂</span>
									<span onClick={()=>this.handleSubmit()}>Send</span>
								</div>
							}
						></InputItem>
					</List>
					{this.state.showEmoji?<Grid 
						data={emoji}
						columnNum={9}
						carouselMaxRow={4}
						isCarousel={true}
						onClick={
							el=>{
								this.setState({
									text:this.state.text+el.text
								})
							}
						}
					/>:null}
					
				</div>
			</div>
		)
	}
}

export default Chat