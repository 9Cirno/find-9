import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem,WingBlank, WhiteSpace, Button } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {login} from '../../redux/user.redux'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import ifindForm from '../../component/ifindForm/ifindForm'
@connect(
	state=>state.user,
	{login}
)
@ifindForm
class Login extends React.Component{
	constructor(props){
		super(props);
		//this.handleChange = this.handleChange.bind(this)
		this.register = this.register.bind(this)
		this.handleLogin=this.handleLogin.bind(this)
	}
	register(){
		this.props.history.push('/register')
	}
	handleLogin(){
		this.props.login(this.props.state)
	}
	render(){
		return(
			<div>
				{this.props.redirectTo&&this.props.redirectTo!=='/login'? <Redirect to={this.props.redirectTo}/>:null}
				<Logo></Logo>
				<h2 className='login_page'>Meet Best Candidate</h2>
				<h2 className='login_page'>Find Best Opportunity</h2>
				<WingBlank>
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