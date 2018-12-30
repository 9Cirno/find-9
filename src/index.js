import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware,compose} from 'redux'
//import {counter} from './index.redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import './config'
import './index.css'
import App from './App'
import {BrowserRouter} from 'react-router-dom'

const reduxDevtools= window.devToolsExtension?window.devToolsExtension():f=>f
const store = createStore(reducers,compose(
	applyMiddleware(thunk),
	reduxDevtools
	))

ReactDom.render(
	<Provider store={store}>
		<BrowserRouter>
			<App></App>
		</BrowserRouter>
	</Provider>
	,document.getElementById('root')
)
	


