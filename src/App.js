import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import Adventures from './Adventures.js'
import SignUp from './SignUp.js'
import SignIn from './SignIn.js'
import PrivateRoute from './PrivateRoute.js'

export default class App extends Component {
  state = { token: localStorage.getItem('TOKEN') }

  handleTokenChange = (myToken) => {
    this.setState({ token: myToken})
    localStorage.setItem('TOKEN', myToken)
  }

  render() {
      return (
          <div>
            
              <Router>
                <ul>
                  {this.state.token && <Link to={`/adventures`}><li>adventures</li></Link> }
                  <Link to={`/signup`}><li>signup</li></Link>
                  <Link to={`/signin`}><li>signin</li></Link>
                </ul>
                  <Switch>
                      <PrivateRoute 
                          path="/adventures" token={this.state.token} exact render={(routerProps) => <Adventures {...routerProps} />} 
                      />
                      <Route 
                          path="/signup" exact render={(routerProps) => <SignUp handleTokenChange={this.handleTokenChange} {...routerProps} />} 
                      />
                      <Route 
                          path="/signin" exact render={(routerProps) => <SignIn handleTokenChange={this.handleTokenChange} {...routerProps} />} 
                      />
                        
                  </Switch>
              </Router>
          </div>
      )
  }
}