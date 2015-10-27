// import 'babel/polyfill';
import ReactDOM from 'react-dom';

import App from './app';
import '../less/index.less';

const el = document.querySelector('#app');
const render = () => ReactDOM.render(App(), el);
render();
