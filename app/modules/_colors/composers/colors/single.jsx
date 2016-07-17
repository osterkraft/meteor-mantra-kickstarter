import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';

export const singleComposer = ({context, _id, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();
  const error = LocalState.get('_colors.DELETE_ERROR');
  if (Meteor.subscribe('_colors.single', _id).ready()) {
    const record = Collections.Colors.findOne(_id);
    if (record) {
      onData(null, {record, error});
    }
  }
  //    returns clearErrors when unmounting the component
  //    Caution : actions always unmount the component,
  //           so clearErrors will wipe action errors before than can be seen
  // return clearErrors;

};

export const depsMapper = (context, actions) => ({
  hideAction: actions._colors.hide,
  deleteAction: actions._colors.delete,
  clearErrors: actions._colors.clearErrors,
  context: () => context
});

export default (component) => composeAll(
    composeWithTracker(singleComposer),
    useDeps(depsMapper)
  )(component);
