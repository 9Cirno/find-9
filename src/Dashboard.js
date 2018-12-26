import React from 'react'
import {Link, Route, Redirect} from 'react-router-dom'
import App from './App'
import {connect} from 'react-redux'
import {logout} from './Auth.redux.js'
function Erying(){
	return <h2>Group_two</h2>
}
function Qibinglian(){
	return <h2>Rider</h2>
}
@connect(
	state=>state.auth,
	{logout}
)
class Dashboard extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		const match = this.props.match
		const redirectToLogin=<Redirect to='/login'></Redirect>
		const app = (
			<div>
				<h1>Independent Group</h1>
				{this.props.isAuth? <button onClick={this.props.logout}>log out</button>:null}
				<ul>
					<li>
						<Link to={`${match.url}/`}>group_one</Link>
					</li>
					<li>
						<Link to={`${match.url}/erying`}>group_two</Link>
					</li>
					<li>
						<Link to={`${match.url}/rider`}>rider</Link>
					</li>
				</ul>
				<Route path={`${match.url}/`} exact component={App}></Route>
				<Route path={`${match.url}/erying`} component={Erying}></Route>
				<Route path={`${match.url}/rider`} component={Qibinglian}></Route>

			</div>
		)
		return this.props.isAuth ? app:redirectToLogin
		
	}
}

export default Dashboard;