import React from 'react'
import { NavBar, Icon, List, InputItem,WingBlank, WhiteSpace, Button,TextareaItem } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import AvatarSelector from '../../component/avatarSelector/avatarSelector'
class BossInfo extends React.Component{
	constructor(props){
		super(props);
		this.state={
			user:'',
			pwd:''
		}
	}
	onChange(key,val){
		this.setState({
			[key]:val
		})
	}
	render(){
		return(
			<div>
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
				>
				Position
				</InputItem>
				<InputItem 
					onChange={v=>this.onChange('company',v)}
				>
				Company
				</InputItem>
				<InputItem 
					onChange={v=>this.onChange('salary',v)}
				>
				Salary
				</InputItem>
				<TextareaItem 
					onChange={v=>this.onChange('desc',v)}
					rows={3}
					autoHeight
					title='Details'
					count='500'
					placeholder='example: expert in Python'
				>
				</TextareaItem>
				<Button type='primary'>Update</Button>
  			</div>
		)
	}
}

export default BossInfo