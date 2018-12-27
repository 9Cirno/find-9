import React from 'react'
import {connect} from 'react-redux'
import {login,getUserData} from './Auth.redux'
import {Link, Route, Redirect} from 'react-router-dom'
import axios from 'axios'
@connect(
	state=>state.auth,
	{login,getUserData}
)

class Auth extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:{}
		}
	}
	componentDidMount(){
		this.props.getUserData()
	}


	render(){
		return(
			<div>
				<h2>my name is {this.props.user}, age is {this.props.age}</h2>
				{this.props.isAuth ? <Redirect to='/dashboard' />:null}	
				<h2>Auth Page</h2>
				<button onClick={this.props.login}>login</button>
			</div>
		)
	}
}

export default Auth
//