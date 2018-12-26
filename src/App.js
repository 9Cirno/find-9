import React, { Component } from 'react';
import {Button, List} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
class App extends React.Component{
  render(){
    let boss = '李云龙'
    return(
      <div>
      <h2>独立团，团长{boss}</h2>
      <Group_one boss='big miao'></Group_one>
      <Rider boss='Sun De Sheng'></Rider>
      </div>
    ) 
  }
}

function Rider(props){
  return (<h2>rider boss{props.boss},gogogo!</h2>)
}


class Group_one extends React.Component{
  constructor(props){
    super(props)
    this.state={
      solders:['huzi','zhuzi','wanggengsheng']
    }
    this.addSolder= this.addSolder.bind(this)
  }
  addSolder(){
    this.setState({
      solders:[...this.state.solders,'newB '+Math.random()]
    })
  }
  render(){
    return(
      <div>
      <h2>group One，团长{this.props.boss}</h2>
      <Button onClick={this.addSolder} type='primary'>new solder</Button>
      <List renderHeader={()=>'Solder List'}>
        {this.state.solders.map(v=>{
          return <List.Item key={v}>{v}</List.Item>
        })}
      </List>
      </div>
    ) 
  }
}



export default App 