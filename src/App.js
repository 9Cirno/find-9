import React, { Component } from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch,Redirect} from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import SeekerInfo from './container/seekerInfo/seekerInfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import RtcFirebase from './component/rtcFirebase/rtcFirebase'
class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      hasError:false
    }
  }
  componentDidCatch(err,info){
    console.log('error')
    this.setState({
      hasError:true
    })
  }
  render(){
    return this.state.hasError?(
        <div>
        <h2>Page Not Found QAQ</h2>
        <h2>We Are Going To Login</h2>
        <Redirect to={{pathname: "/login",}} />
        </div>
      ):(
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
        <Route path='/dprtc' component={RtcFirebase}></Route>
        <Route path='/seekerinfo' component={SeekerInfo}></Route>
        <Route path='/bossinfo' component={BossInfo}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
        <Route path='/chat/:user' component={Chat}></Route>
        <Route component={Dashboard}></Route>
        </Switch>
      </div>
    )
  }
}




export default App 