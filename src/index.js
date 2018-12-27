import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware,compose} from 'redux'
//import {counter} from './index.redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom'
import Auth from './Auth.js'
import Dashboard from './Dashboard'
import './config'



const reduxDevtools= window.devToolsExtension?window.devToolsExtension():f=>f
const store = createStore(reducers,compose(
	applyMiddleware(thunk),
	reduxDevtools
	))



ReactDom.render(
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route path='/login' component={Auth}></Route>
				<Route path='/dashboard' component={Dashboard}></Route>
				<Redirect to='/dashboard'></Redirect>
			</Switch>
 
		</BrowserRouter>
	</Provider>
	,document.getElementById('root')
)
	


