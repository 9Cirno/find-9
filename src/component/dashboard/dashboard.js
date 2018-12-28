import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import NavLinkBar from '../navLink/navLink'
import {Switch, Route} from 'react-router-dom'
import Boss from '../boss/boss'
import Seeker from '../../component/seeker/seeker'
import User from '../../component/user/user'
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux'

function Msg(){
	return <h2>Msg INDEX</h2>
}


@connect(
	state=>state,
	{getMsgList,sendMsg,recvMsg}
)

class Dashboard extends React.Component{
	componentDidMount(){
		if( !this.props.chat.chatmsg.length){
			this.props.getMsgList()
			this.props.recvMsg()			
		}

	}

	render(){
		const user = this.props.user
		const {pathname} = this.props.location
		const navList=[
			{path:'/boss',
			 text:'seeker',
			 icon:'boss',
			 title:'Seeker List',
			 component:Boss,
			 hide:user.type==='seeker'
			},
			{path:'/seeker',
			 text:'boss',
			 icon:'job',
			 title:'Boss Lisk',
			 component:Seeker,
			 hide:user.type==='boss'
			},
			{path:'/msg',
			 text:'message',
			 icon:'msg',
			 title:'Message',
			 component:Msg,
			},
			{path:'/me',
			 text:'me',
			 icon:'user',
			 title:'User',
			 component:User,
			}

		]
			return(
				<div>
					<NavBar className='fixe-header' mode='dark'>{navList.find(v=>v.path===pathname).title}</NavBar>
					<div style={{marginTop:45}}>
						<Switch>
							{navList.map(v=>(
								<Route key={v.path} path={v.path} component={v.component}></Route>
							))}
						</Switch>
					</div>
					<NavLinkBar data={navList}></NavLinkBar>
				</div>
			)
		}
}

export default Dashboard