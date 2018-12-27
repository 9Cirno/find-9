import React from 'react'
import Logo from '../../component/logo/logo'
import { List, Radio, InputItem,WingBlank, WhiteSpace, Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import {Route, Redirect} from 'react-router-dom'

@connect(
	state=>state.user,
	{register}
)


class Register extends React.Component{
	constructor(props){
		super(props);
		this.state={
			user:'',
			pwd:'',
			repeatpwd:'',
			type:'seeker'
		}
		this.handleRegister=this.handleRegister.bind(this)
	}
	handleRegister(){
		this.props.register(this.state)
	}
	handleChange(key,val){
		this.setState({
			[key]:val
		})
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
						onChange={v=>this.handleChange('user',v)}
					>Username</InputItem>
					<WhiteSpace />
					<InputItem
						onChange={v=>this.handleChange('pwd',v)}
						type='password'
					>Password</InputItem>
					<WhiteSpace />
					<InputItem
						onChange={v=>this.handleChange('repeatpwd',v)}
						type='password'
					>RepeatPWD</InputItem>
					<WhiteSpace />
					<RadioItem 
						checked={this.state.type=='seeker'}
						onChange={()=>this.handleChange('type','seeker')}>
						I'm looking for job
					</RadioItem>
					<WhiteSpace />
					<RadioItem 
					checked={this.state.type=='boss'}
					onChange={()=>this.handleChange('type','boss')}>
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