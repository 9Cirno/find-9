import React from 'react'
import {NavBar,List, InputItem,Icon,Grid} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css';
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'
import QueueAnim from 'rc-queue-anim'
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
		this.onInputChange = this.onInputChange.bind(this)
		this.onInputClick = this.onInputClick.bind(this)
	}
	scrollToBottom () {
		console.log(this.messagesEnd)
  		this.messagesEnd.scrollIntoView({ block: 'end',behavior: 'smooth' })
	}
	componentDidUpdate() {

		if(this.messagesEnd){
  			this.scrollToBottom()
		}
	}
	componentDidMount(){
		
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList()
			this.props.recvMsg()
		}
		setTimeout(()=>{if(this.messagesEnd){
			this.scrollToBottom()
		}},2000)
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
		this.scrollToBottom()
	}
	onInputClick(){
		this.scrollToBottom()
	}
	onInputChange(v){
		this.setState({text:v})
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
			<div id='chat-page' 
			 ref={(el) => { this.messagesEnd = el }}>
				<NavBar mode='dark'
					icon={<Icon type='left'/>}
					onLeftClick={()=>{
						this.props.history.goBack()
					}}
					className='navbar'
				>{users[userid].name}
				</NavBar>
				<div  className="chat-area"
					>
					
					<QueueAnim 
					delay={0} duration={100} interval={50} className="queue-simple"
					>
					{	chatmsg.map(v=>{
						const avatar=require(`../img/${users[v.from].avatar}.png`)
						return v.from===userid?(
							<List key={v._id}>
								<Item
									thumb={avatar}
									wrap
								>
									{v.content}
								</Item>
							</List>
							):(
							<List key={v._id}>
								<Item 
									extra={<img alt='avatar' src={avatar}/>}
									className='chat-me'
									wrap
									>{v.content}
								</Item>
							</List>						
							)
					})}
					<Item className='chat-me-placeholder'></Item>
					</QueueAnim>
				</div>

				<div className="stick-footer">
					<List>
						<InputItem
							value={this.state.text}
							onChange={v=>this.onInputChange(v)}
							onClick={this.onInputClick}
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