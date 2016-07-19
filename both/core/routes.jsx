import React from 'react';
import {mount} from 'react-mounter';

import {
  LayoutDefault,
} from '/app/configs/theme.jsx';

// import MainLayout from './components/main_layout.jsx';
import PostList from '../../app/modules/core/containers/postlist';
import Post from '../../app/modules/core/containers/post';
import NewPost from '../../app/modules/core/containers/newpost';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(LayoutDefault);

  FlowRouter.route('/', {
    name: 'posts.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<PostList />)
      });
    }
  });

  FlowRouter.route('/post/:postId', {
    name: 'posts.single',
    action({postId}) {
      mount(MainLayoutCtx, {
        content: () => (<Post postId={postId}/>)
      });
    }
  });

  FlowRouter.route('/new-post', {
    name: 'newpost',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NewPost/>)
      });
    }
  });
}
