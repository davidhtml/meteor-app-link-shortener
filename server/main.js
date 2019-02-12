import { Meteor } from 'meteor/meteor';
import { WebApp} from 'meteor/webapp';

import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    console.log('this is from the Custom Middleware222');

    const _id = req.url.slice(1);
    console.log(_id);
    const link = Links.findOne({_id})

    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id)
    } else {
      next();
    }

  })

  WebApp.connectHandlers.use((req, res, next) => {
    // useful req objects properties
    // console.log(req.url, req.method, req.headers, req.query)
    console.log('this is from the Custom Middleware');
    // set HTTP status code
    // res.statusCode = 404;
    // set HTTP headers
    // res.setHeader('my-custom-hederito', 'wth-dude');
    //set HTTP body
    // res.write('<h1>new hederito with new text from Middleware</h1>');
    //end HTTP request
    // res.end();
    next();
  })
});
