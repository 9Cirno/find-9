import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem,WingBlank, WhiteSpace, Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {login} from '../../redux/user.redux'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

@connect(
	state=>state.user,
	{login}
)


class Login extends React.Component{
	constructor(props){
		super(props);
		this.state={
			user:'',
			pwd:''
		}
		this.handleChange = this.handleChange.bind(this)
		this.register = this.register.bind(this)
		this.handleLogin=this.handleLogin.bind(this)
	}
	register(){
		this.props.history.push('/register')
	}
	handleLogin(){
		this.props.login(this.state)
	}
	handleChange(key,val){
		this.setState({
			[key]:val
		})
	}
	render(){
		return(
			<div>
				{this.props.redirectTo? <Redirect to={this.props.redirectTo}/>:null}
				<Logo></Logo>
				<h2>login page</h2>
				<WingBlank>
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
					</List>
					<WhiteSpace />
					<Button 
					type='primary'
					onClick={this.handleLogin}
					>Login</Button>
					<WhiteSpace />
					<Button 
					type='primary'
					onClick={this.register}
					>Register</Button>
				</WingBlank>
			</div>
		)
	}	
}

export default Login