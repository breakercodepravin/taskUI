import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import store from "./store";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";

import setAuthToken from "./utils/setAuthToken";

import Navbar from "./components/layouts/Navbar";
import HomeComponent from "./components/Home";
import ContactsComponent from "./components/Contacts";

import "./App.css";

import { logoutUser, setCurrentUser } from "./actions/authActions";
import Login from "./components/auth/login";
import AddContacts from "./components/AddContacts";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  logoutHandler = ()  => {
    this.props.logoutUser()
  }

  render() {
    const { isAuthenticated, loading } = this.props.auth;

    return (
      <BrowserRouter>
        <div className="App ">
          <Navbar auth={isAuthenticated} logoutHandler={this.logoutHandler}/>
          {/* <HomeComponent/> */}
          {isAuthenticated ? (
            <Switch>
              {/* <Route exact path="/" component={HomeComponent} /> */}
              <Route exact path="/contacts/:type" component={AddContacts} />
              <Route exact path="/contacts" component={ContactsComponent} />
              <Route exact path="/login" component={Login} />
            <Redirect from="/" to="/contacts"/>
            </Switch>
          ) : (
            <Switch>
            <Route exact path="/login" component={Login} />
            <Redirect from="/" to="/login"/>
            </Switch>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {logoutUser})(App);
