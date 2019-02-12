import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

const Links = new Mongo.Collection('links');

//method available only on the server
// Meteor.publish()

if (Meteor.isServer) {
  Meteor.publish('linkuciai', function() {
    return Links.find({userId: this.userId});
  })
}

//naming conventions resource.action
// e.g. links.insert
Meteor.methods({
  'links.insert'(url) {
    if (!this.userId) {
       throw new Meteor.Error('not-authorised')
    }
    new SimpleSchema({
     url: {
      type: String,
      label: 'Your link',
      regEx: SimpleSchema.RegEx.Url
     }
   }).validate({ url });

    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    })
  },
  'links.setVisibility'(_id, visible) {
    if (!this.userId) {
       throw new Meteor.Error('not-authorised')
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    }).validate({_id, visible});

    Links.update({userId: this.userId, _id}, {$set: {visible}})
  },
  'links.trackVisit'(_id) {
    console.log(_id);
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Links.update({_id}, {
      $set: {
        lastVisitedAt: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    })
  }
})

export { Links };
