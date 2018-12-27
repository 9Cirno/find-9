import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware,compose} from 'redux'
//import {counter} from './index.redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom'
import './config'
import './index.css'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'

const reduxDevtools= window.devToolsExtension?window.devToolsExtension():f=>f
const store = createStore(reducers,compose(
	applyMiddleware(thunk),
	reduxDevtools
	))

function Boss(){
	return <h2>bosspage</h2>
}

ReactDom.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRoute></AuthRoute>
				<Route path='/boss' component={Boss}></Route>
				<Route path='/login' component={Login}></Route>
				<Route path='/register' component={Register}></Route>
			</div>
		</BrowserRouter>
	</Provider>
	,document.getElementById('root')
)
	


