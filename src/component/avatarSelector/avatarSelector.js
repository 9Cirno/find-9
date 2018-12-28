import React from 'react'
import {Grid,List} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import PropTypes from 'prop-types'
class AvatarSelector extends React.Component{

	static propTypes = {
		selectAvatar: PropTypes.func
	}

	constructor(props){
		super(props)
		this.state={}
	}

	render(){

		const avatarList='girl,boy,woman,man,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
			.split(',').map(v=>({
				icon:require(`../img/${v}.png`),
				text:v
			}))
		const gridHeader = this.state.text?(<div>
			<span>selected  </span>
			<img style={{width:20}} src={this.state.icon} alt=""/>
			</div>):<div>Please select an avatar icon</div>
		return(
			<div>	
				<List renderHeader={gridHeader}>
					<Grid 
					columnNum='5'
					data={avatarList}
					onClick={elm=>{
						this.setState(elm)
						this.props.selectAvatar(elm.text)
					}}
					/>
				</List>
  			</div>
		)
	}
}

export default AvatarSelector