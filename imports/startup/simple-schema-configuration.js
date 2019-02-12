import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

SimpleSchema.defineValidationErrorTransform(e => {
  return new Meteor.Error(400, e.message)
  // const customError = new MyCustomErrorType(error.message);
  // customError.errorList = error.details;
  // return customError;
});
