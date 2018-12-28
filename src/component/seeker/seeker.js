import React from 'react'
import 'antd-mobile/dist/antd-mobile.css';
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'
@connect(
	state=>state.chatuser,
	{getUserList}
)
class Seeker extends React.Component{
	componentDidMount(){
		this.props.getUserList('boss')
	}
	render(){
		return(
			<div>
				 <UserCard userlist={this.props.userlist}></UserCard>
			</div>
		)
	}

}
export default Seeker
//<UserCard userlist={this.props.userList}></UserCard>