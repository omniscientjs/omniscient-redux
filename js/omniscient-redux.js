import { connect } from 'react-redux';

import component from './component';

// function that creates a decorated component that is rendered
// with the selected reducer state and dispatch function applied
const smartComponent = (select, Component) => component.classDecorator(connect(select))(Component);

export default smartComponent;
