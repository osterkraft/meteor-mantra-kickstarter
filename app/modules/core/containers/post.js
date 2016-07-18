import Post from '../components/post.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import { DocHead } from 'meteor/kadira:dochead';

export const composer = ({context, postId}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('posts.single', postId).ready()) {
    const post = Collections.Posts.findOne(postId);
    onData(null, {post});
    if(post.content){
      DocHead.setTitle(post.title);
      DocHead.addMeta({
        name: 'description', content: post.content.substr(0, 50)
      });
    }
  } else {
    const post = Collections.Posts.findOne(postId);
    if (post) {
      onData(null, {post});
      DocHead.setTitle(post.title);
      if(post.content){
        DocHead.addMeta({
          name: 'description', content: post.content.substr(0, 50)
        });
      }
    } else {
      onData();
    }
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Post);
