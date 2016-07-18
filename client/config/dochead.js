import {DocHead} from 'meteor/kadira:dochead';

export default function () {
  var title = 'Website Title';

  var description = {
    name: 'description',
    content: 'Website description'
  };

  var viewport = {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1'
  };

  var favicon = {
    rel: 'icon',
    sizes: '16x16 32x32',
    type: 'image/png',
    href: '/favicon.png'
  };

  DocHead.setTitle(title);
  DocHead.addMeta(description);
  DocHead.addMeta(viewport);
  DocHead.addLink(favicon);
}
