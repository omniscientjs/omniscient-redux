import { DOM } from 'react';
const { div, a, ul, li } = DOM;

import component from '../component';
import smartComponent from '../omniscient-redux';
import Actions from '../actions/actions';

const Menu = smartComponent(
  (_) => ({}),
  component('Menu', ({ dispatch }) =>
    div({},
      ul({},
        li({}, a({ href: "#", onClick: () => dispatch(Actions.updatePath("/")) }, "Index route")),
        li({}, a({ href: "#", onClick: () => dispatch(Actions.updatePath("/another")) }, "Another route"))))));

export default Menu;
