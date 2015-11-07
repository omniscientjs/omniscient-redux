import omniscient from 'omniscient';

// create an omniscient components that don't render when dispatch change
const component = omniscient.withDefaults({
  isIgnorable: (_, key) => key == 'dispatch'
});

component.debug();

export default component;
