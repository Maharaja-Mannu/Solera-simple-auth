import React from 'react'
import {BrowserRouter as Router ,Switch, Route } from 'react-router-dom'
import Header from './component/Header'
import Login from './component/Login'
import Register from './component/Register'
import './App.css';
import reducer from './reducer'
import NoMatch from './component/NoMatch'

function App() {
  const initialValues ={
    isLoading: false,
    isLoggedIn: false,
    user: '',
    token: null
  }
  const [state, dispatch] = React.useReducer(reducer, initialValues)

  return (
    <Router>
      <Header state={state} dispatch={dispatch}/>
      <Switch>
          <Route exact path="/">
            <h2 className="text-center pt-4">Welcome to Solera Life Science Private Limited</h2>
            {state.user && <h4 className="text-center">{state.user.name}</h4>}
          </Route>
          <Route exact path="/login">
            <Login dispatch={dispatch}/>
          </Route>
          <Route exact path="/register">
            <Register dispatch={dispatch}/>
          </Route>
          <Route exact path="*">
            <NoMatch/>
          </Route>
      </Switch>
    </Router>
  )
}
export default App;
