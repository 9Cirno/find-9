import React from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component{
	static propTypes = {
		userlist: PropTypes.array.isRequired
	}
	handleClick(v){
		this.props.history.push(`/chat/${v._id}`)
	}
	render(){
		return (
			<WingBlank>
				<WhiteSpace size='lg'/>
					{this.props.userlist.map(v=>(
						v.avatar? (
							<Card
							 onClick={()=>this.handleClick(v)}
							 key={v._id}>
							<Card.Header
								title={v.user}
								thumb={require(`../img/${v.avatar}.png`)}
								extra={<span>{v.title}</span>}
							></Card.Header>
								<Card.Body>
									{v.type==='boss' ? <h4>Company: {v.company}</h4>:null}
									
									{v.desc.split('\n').map(d=>(
										<div key={d}>{d}</div>
									))}
									
									{v.type==='boss' ? <div>salary: {v.salary}</div>:null}
								</Card.Body>
						</Card>

						): null

					))}
				</WingBlank>
		)
	}
}

export default UserCard