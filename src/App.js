import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addGun, removeGun,addGunAsync} from './index.redux'
//import {Button, List} from 'antd-mobile'
//import 'antd-mobile/dist/antd-mobile.css'

// const mapStatetoProp=(state)=>{
//   return {num:state}
// }
// const actionCreator={addGun, removeGun,addGunAsync}
//App = connect(mapStatetoProp,actionCreator)(App)
@connect(
  state=>({num:state.counter}),
  {addGun, removeGun,addGunAsync}
)
class App extends React.Component{
  render(){
    return(
      <div>
        <h1> now have {this.props.num} guns </h1>
        <button onClick={this.props.addGun}>Request Gun</button>
        <button onClick={this.props.removeGun}>Return Gun</button>
        <button onClick={this.props.addGunAsync}>late Gun</button>
      </div>
    )
  }
}




export default App 