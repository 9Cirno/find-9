import React from 'react'
import { NavBar, InputItem, Button,TextareaItem } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import AvatarSelector from '../../component/avatarSelector/avatarSelector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
	state=>state.user,
	{update}
)

class SeekerInfo extends React.Component{

	constructor(props){
		super(props);
		this.state={
			title:'',
			desc:''
		}
	}

	onChange(key,val){
		this.setState({
			[key]:val
		})
	}

	render(){
		const path = this.props.location.pathname
		const redirect = this.props.redirectTo
		return(
			<div>
				{redirect&&redirect!==path ? <Redirect to ={this.props.redirectTo}>}</Redirect>:null}
				<NavBar mode="dark">Complete Infomation</NavBar>
				<AvatarSelector
					selectAvatar={(imgname)=>{
						this.setState({
							avatar:imgname
						})
					}}
				></AvatarSelector>
				<InputItem 
					onChange={v=>this.onChange('title',v)}
					placeholder='example: Software Engineer'
				>
				Objective
				</InputItem>
				<TextareaItem 
					onChange={v=>this.onChange('desc',v)}
					rows={3}
					autoHeight
					title='Experience'
					count='500'
					placeholder='example: 3 years in Python'
				>
				</TextareaItem>
				<Button 
				onClick={()=>{
					this.props.update(this.state)
				}}
				type='primary'>Update</Button>
			</div>
		)
	}
}

export default SeekerInfo 