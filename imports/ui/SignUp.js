import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

class SignUp extends Component {

  state = {
    error: ''
  }

  onSubmit = (e) => {
    e.preventDefault();
    const email = this.refs.refemail.value.trim();
    const password = this.refs.refpassword.value.trim();
    const options = {email, password};
    console.log(options);

    if (password.length < 9) {
      return this.setState(() => ({error: 'password must be at least 9 characters long'}));
    }

    Accounts.createUser(options, (err) => {
      if (err) {
        console.log('erroas kol kurime nauja useri')
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
          <h1>Singup component</h1>

          {this.state.error ? <p style={{"color": "red"}}>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit} noValidate className="boxed-view__form">
            <input type="email" ref="refemail" name="email" placeholder="Email"/>
            <input type="password" ref="refpassword" name="password" placeholder="password"/>
            <button className="button">Create account</button>
          </form>

          <Link to="/">
            Already have an account?
          </Link>
        </div>
      </div>
    );
  }
}

export default SignUp;
