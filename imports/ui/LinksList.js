import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';
import LinksListItem from './LinksListItem';
import { Session } from 'meteor/session'
import FlipMove from 'react-flip-move';

class LinksList extends Component {

  state = {
    links: []
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('linkuciai');
      const links = Links.find({
        visible: Session.get('showVisible'),
      }).fetch();
      this.setState(() => ({links}))
      console.log(links)
    })
    console.log('component did mount => LInksList')
  }

  componentWillUnmount() {
    this.linksTracker.stop();
    console.log('our component goes awaway from LinksList :((')
  }

  renderLinksListItems = () => {

    if (this.state.links.length === 0) {
      return <p className="item item__status-message">Hidden list component is empty</p>
    }

    return this.state.links.map((link, i) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
      // return <p key={link._id}>{i+1}. {link.url}</p>;
    })
  }

  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }

}

export default LinksList;
