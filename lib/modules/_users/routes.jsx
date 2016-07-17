import React from 'react';
import {mount} from 'react-mounter';

import {
  LayoutDefault,
//  Simple
} from '/app/configs/theme.jsx';


import Login from '/app/modules/_users/components/login/wrapper.jsx';
import Register from '/app/modules/_users/components/register/wrapper.jsx';
import Password from '/app/modules/_users/components/password/wrapper.jsx';
import PwdReqSent from '/app/modules/_users/components/password/success.jsx';
import PwdReset from '/app/modules/_users/components/password/resetWrapper.jsx';

import Account from '/app/modules/_users/components/account/wrapper.jsx';
import Profile from '/app/modules/_users/components/profile/wrapper.jsx';

import UsersCollection from '/app/modules/_users/components/users/collection.jsx';
import UsersAdd from '/app/modules/_users/components/users/add.jsx';
import UsersSingle from '/app/modules/_users/components/users/single.jsx';
import UsersEdit from '/app/modules/_users/components/users/edit.jsx';

export default function (injectDeps, {FlowRouter}) {

  const LayoutDefaultCtx = injectDeps(LayoutDefault);

  FlowRouter.route('/register', {
    name: 'users.register',
    action() {

      if (Meteor.userId()) {
        FlowRouter.go('/profile');
      }

      mount(LayoutDefaultCtx, {
        content: () => (<Register />)
      });

    }
  });

  FlowRouter.route('/password', {
    name: 'users.password',
    action() {

      if (Meteor.userId()) {
        FlowRouter.go('/profile');
      }

      mount(LayoutDefaultCtx, {
        content: () => (<Password />)
      });
    }
  });

  FlowRouter.route('/prrq/:_code', {
    name: 'users.prrq',
    action({_code}) {

      mount(LayoutDefaultCtx, {
        content: () => (<PwdReset code={_code}/>)
      });
    }

  });

  FlowRouter.route('/prrs/:_email', {
    name: 'users.prrs',
    action({_email}) {

      mount(LayoutDefaultCtx, {
        content: () => (<PwdReqSent email={_email}/>)
      });
    }

  });

  FlowRouter.route('/login', {
    name: 'users.login',
    action() {

      if (Meteor.userId()) {
        FlowRouter.go('/profile');
      }

      mount(LayoutDefaultCtx, {
        content: () => (<Login />)
      });
    }
  });

  FlowRouter.route('/logout', {
    name: 'users.logout',
    action() {
      Meteor.logout(() => {
        FlowRouter.go('/login');
      });
    }
  });

  FlowRouter.route('/account', {
    name: 'users.account',
    action() {

      if (!Meteor.userId()) {
        FlowRouter.go('/login');
      }

      mount(LayoutDefaultCtx, {
        content: () => (<Account />)
      });
    }
  });

  FlowRouter.route('/profile', {
    name: 'users.profile',
    action() {

      if (!Meteor.userId()) {
        FlowRouter.go('/login');
      }

      mount(LayoutDefaultCtx, {
        content: () => (<Profile name='users.profile'/>)
      });
    }
  });

  FlowRouter.route('/users', {
    name: 'users.collection',
    action() {

      if (!Meteor.userId()) {
        FlowRouter.go('/login');
      }

      mount(LayoutDefaultCtx, {
        content: () => (<UsersCollection />)
      });
    }
  });

  FlowRouter.route('/users/add', {
    name: 'users.add',
    action() {

      if (!Meteor.userId()) {
        FlowRouter.go('/login');
      }

      mount(LayoutDefaultCtx, {
        content: () => (<UsersAdd />)
      });
    }
  });

  FlowRouter.route('/users/:_id', {
    name: '_users.usersSingle',
    action({_id}) {

      // console.log(' /users/:_id ', _id);
      if (!Meteor.userId()) {
        FlowRouter.go('/login');
      }

      mount(LayoutDefaultCtx, {
        content: () => (<UsersSingle _id={_id}/>),
      });
    }
  });

  FlowRouter.route('/users/:_id/edit', {
    name: '_users.usersEdit',
    action({_id}) {

      if (!Meteor.userId()) {
        FlowRouter.go('/login');
      }

      mount(LayoutDefaultCtx, {
        content: () => (<UsersEdit _id={_id}/>)
      });
    }
  });

}
