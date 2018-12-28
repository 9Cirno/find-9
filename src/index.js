import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware,compose} from 'redux'
//import {counter} from './index.redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './config'
import './index.css'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import SeekerInfo from './container/seekerInfo/seekerInfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
const reduxDevtools= window.devToolsExtension?window.devToolsExtension():f=>f
const store = createStore(reducers,compose(
	applyMiddleware(thunk),
	reduxDevtools
	))

ReactDom.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRoute></AuthRoute>
				<Switch>
				<Route path='/seekerinfo' component={SeekerInfo}></Route>
				<Route path='/bossinfo' component={BossInfo}></Route>
				<Route path='/login' component={Login}></Route>
				<Route path='/register' component={Register}></Route>
				<Route path='/chat/:user' component={Chat}></Route>
				<Route component={Dashboard}></Route>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>
	,document.getElementById('root')
)
	


