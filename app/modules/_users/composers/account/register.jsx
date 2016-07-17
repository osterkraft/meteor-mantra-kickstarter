// import LoginForm from '../components/Register/RegisterForm.jsx';
import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState, Logger} = context();
  const exception = LocalState.get('REGISTER_ERROR');
  onData(null, {exception, Logger});

  // clearErrors when unmounting the component
  //  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  submitAction: actions._account.register,
  clearErrors: actions._account.registerErrorClear,
  context: () => context
});

export default (component) => composeAll(
    composeWithTracker(composer),
    useDeps(depsMapper)
  )(component);
