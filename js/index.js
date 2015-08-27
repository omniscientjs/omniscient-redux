// import 'babel/polyfill';
import React from 'react';

import App from './app';
import '../less/index.less';

const el = document.querySelector('#app');
const render = () => React.render(App(), el);
render();
