import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

class Login extends Component {

  state = {
    error: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const email = this.refs.refemail.value.trim();
    const user = { email };
    const password = this.refs.refpassword.value.trim();
    Meteor.loginWithPassword(user, password, (err) => {
      console.log('logging in', err)
      if (err) {
        this.setState(() => ({error: err.reason}))
      } else {
        this.setState(() => ({error: ''}))
      }
    })
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Login to short lnk</h1>
          {this.state.error ? <p style={{"color": "red"}}>{this.state.error}</p> : undefined}
          <form onSubmit={this.handleSubmit} noValidate className="boxed-view__form">
            <input type="email" ref="refemail" name="email" placeholder="Email"/>
            <input type="password" ref="refpassword" name="password" placeholder="password"/>
            <button className="button">Log in</button>
          </form>

          <Link to="/signup">
            Create a new account
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
