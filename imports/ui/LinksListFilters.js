import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

 class LinksListFilters extends Component {

  state = {
    showVisible: true
  }

  componentDidMount() {
    this.filterTracked = Tracker.autorun(() => {
      this.setState({showVisible: Session.get('showVisible')});
    })
  }

  componentWillUnmount() {
    this.filterTracked.stop()
  }
  render() {
    return (
      <div>
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={(e) => {
            e.persist()
            Session.set('showVisible', !e.target.checked)
          }}/>
            show hidden links
        </label>
      </div>
    );
  }

}

export default LinksListFilters;
