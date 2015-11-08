import component from '../component';
import Menu from './menu';

import { DOM } from 'react';
const { div } = DOM;

const App = component('App', ({ children }) =>
  div({},
    div({}, "App"),
    Menu(),
    children));

export default App;
