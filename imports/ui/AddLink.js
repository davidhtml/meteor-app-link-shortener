import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('app'))

class AddLink extends Component {

  state = {
    url: '',
    isOpen: false,
    error: ''
  }

  onSubmit = (e) => {
    const { url } = this.state;
    e.preventDefault();

    // if (url) {
    Meteor.call('links.insert', url, (err, res) => {
        if (!err) {
          this.setState((prev) => ({url: '', isOpen: !prev.isOpen, error: ''}));
        } else {
          this.setState(() => ({ error: err.reason}))
        }
      })
    // }
  }

  onChange = (e) => {
    e.persist();
    this.setState(() => ({ url: e.target.value }));
  }

  render() {
    console.log(this.state.isOpen)
    return (
      <div>
        <button className="button" onClick={() => this.setState((prev) => ({isOpen: !prev.isOpen}))}>Add Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add link Modal"
          ariaHideApp={false}
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={() => this.setState((prev) => ({isOpen: !prev.isOpen, error: '', url: ''}))}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Add link</h1>
          {this.state.error ? <p style={{"color": "red"}}>{this.state.error}</p> : null}
          <form className="boxed-view__form" onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="URL"
              ref="url"
              value={this.state.url}
              onChange={this.onChange}
              />
            <button className="button">Add link</button>
            <button type="button" className="button button--secondary" onClick={() => this.setState((prev) => ({isOpen: !prev.isOpen, url: '', error: ''}))}>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
};

export default AddLink;
