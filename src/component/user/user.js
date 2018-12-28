import React from 'react'
import {connect} from 'react-redux'
import {Result, WhiteSpace,List,Modal} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
	state=>state.user,
	{logoutSubmit}
)

class User extends React.Component{
	constructor(props){
		super(props)
		this.logOut=this.logOut.bind(this)
	}
	logOut(){
		const alert = Modal.alert

        alert('Logout', 'Are you sure you want Logout?', [
          { text: 'Cancel', onPress: () => console.log('cancel') },
          { text: 'Ok', onPress: () => {
          	browserCookie.erase('userid')
          	this.props.logoutSubmit()
          }},
        ])
      
    
		//browserCookie.erase('userid')
		//window.location.href=window.location.href
	}
	render(){
		const props = this.props
		const Item = List.Item
		return props.user?(

			<div>
				<Result
					img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width:50}} alt=""/>}
					title={this.props.user}
					message={props.type==='boss'?props.company:null}
				/>
			   	<List renderHeader={()=>'Open Position Details'}>
					<Item multipleLine>
						{props.title}
						{this.props.desc.split('\n').map(v=>
							<Item.Brief key={v}>{v}</Item.Brief>
						)}
						{props.salary?<Item.Brief>Salary {props.salary}</Item.Brief>:null}
					</Item>
				</List>
				<WhiteSpace></WhiteSpace>
				<List>
					<Item onClick={this.logOut} >Log Out</Item>
				</List>
			</div>
		):<Redirect to={this.props.redirectTo} />
	}
}

export default User