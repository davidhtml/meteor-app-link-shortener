import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import history from './history'
import SignUp from './../ui/SignUp';
import Link from './../ui/Link';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';

const nonAuthPages = [ '/', '/signup'];
const authPages = ['/links'];

const onEnterPublicPage = (Component) => {
  if (Meteor.userId()) {
    return <Redirect to="/links" />
    return
  } else {
    return <Component />
  }
}

const onEnterPrivatePage = (Component) => {
  if (!Meteor.userId()) {
    return <Redirect to="/" />
  } else {
    return <Component />
  }
}

const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  const isNonAuthPage = nonAuthPages.includes(pathname);
  const isAuthPage = authPages.includes(pathname);

  if (isAuthenticated && isNonAuthPage) {
    history.replace('/links');
  } else if (!isAuthenticated && isAuthPage) {
    history.replace('/');
  }
}

const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={() => onEnterPublicPage(Login)} />
      <Route exact path="/signup" render={() => onEnterPublicPage(SignUp)} />
      <Route exact path="/links" render={() => onEnterPrivatePage(Link)}/>
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

export { onAuthChange, routes };
