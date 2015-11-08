import React from 'react';
const { div, span } = React.DOM;

import component from '../component';
import Clicker from './clicker';

const AnotherCounterComponent =
  component('AnotherCounterComponent', () =>
    div({},
      span({}, "Same counter, another component:"),
      Clicker()));

export default AnotherCounterComponent;
