import {createApp} from 'mantra-core';
import initContext from './configs/context';

if(Meteor.isClient){
  import '/imports/client/bootstrap/bootstrap.min.js';
  import '/imports/client/bootstrap/html5shiv.min.js';
  import '/imports/client/bootstrap/usebootstrap.min.js';

  import {DocHead} from 'meteor/kadira:dochead';
  var title = 'Website Title';
  DocHead.setTitle(title);
}

// modules
import coreModule from './modules/core';
import commentsModule from './modules/comments';

import _usersModule from './modules/_users';
import _colorsModule from './modules/_colors';

// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(commentsModule);
app.loadModule(_usersModule);
app.loadModule(_colorsModule);

app.init();
