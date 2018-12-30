import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {loadData} from '../../redux/user.redux'
import {connect} from 'react-redux'
@withRouter
@connect(
	null,
	{loadData}
)
class AuthRoute extends React.Component{
	componentDidMount(){
		const publicList = ['/login','/register']
		const validList = ['/chat','/boss','/bossinfo','/seeker','/seekerinfo','/me','/msg']
		const pathname =this.props.location.pathname
		const routehead = '/'+pathname.split('/')[1]
		if (publicList.indexOf(pathname)>-1){
			return null
		}
		//get user info
		axios.get('/user/info')
			.then(res=>{
				if (res.status===200){
					if(res.data.code===0){
						this.props.loadData(res.data.data)

						if(validList.indexOf(routehead)==-1){

							this.props.history.push('/login')
						}
					}else{
						this.props.history.push('/login')
					}
				}
			})
	}
	render(){
		return null
	}
}

export default AuthRoute