import React from 'react'
import Logo from '../../component/logo/logo'
import { List, Radio, InputItem,WingBlank, WhiteSpace, Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import ifindForm from '../../component/ifindForm/ifindForm'

@connect(
	state=>state.user,
	{register}
)
@ifindForm
class Register extends React.Component{
	constructor(props){
		super(props)
		this.handleRegister=this.handleRegister.bind(this)
	}
	handleRegister(){
		this.props.register(this.props.state)
	}
	componentDidMount(){
		this.props.handleChange('type','seeker')
	}
	render(){
		const RadioItem = Radio.RadioItem
		return(
			<div>
				{this.props.redirectTo? <Redirect to={this.props.redirectTo}/>:null}
				<Logo></Logo>
				<h2>Register page</h2>
				<WingBlank />
				<List>
					{this.props.msg?<p ckassName='error-msg'><font color='red'>{this.props.msg}</font></p>:null}
					<WhiteSpace />
					<InputItem
						onChange={v=>this.props.handleChange('user',v)}
					>Username</InputItem>
					<WhiteSpace />
					<InputItem
						onChange={v=>this.props.handleChange('pwd',v)}
						type='password'
					>Password</InputItem>
					<WhiteSpace />
					<InputItem
						onChange={v=>this.props.handleChange('repeatpwd',v)}
						type='password'
					>RepeatPWD</InputItem>
					<WhiteSpace />
					<RadioItem 
						checked={this.props.state.type==='seeker'}
						onChange={()=>this.props.handleChange('type','seeker')}>
						I'm looking for job
					</RadioItem>
					<WhiteSpace />
					<RadioItem 
					checked={this.props.state.type==='boss'}
					onChange={()=>this.props.handleChange('type','boss')}>
						I'm hiring for worker
					</RadioItem>
				</List>
				<WhiteSpace />
				<Button 
					type='primary'
					onClick={this.handleRegister}
				>Register</Button>
			</div>
		)
	}
}

export default Register