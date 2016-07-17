// import LoginForm from '../components/Register/RegisterForm.jsx';
import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState, Meteor, Collections, Logger} = context();

  if (Meteor.subscribe('users.collection').ready()) {

    const exception = LocalState.get('_users.PASSWORD_RESET_ERROR');
    const users = Collections.Users;
    onData(null, {exception, users, Logger});
  }

  // clearErrors when unmounting the component
  // return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitAction: actions._account.resetPassword,
  clearErrors: actions._account.registerErrorClear,
  context: () => context
});

export default (component) => composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
  )(component);
