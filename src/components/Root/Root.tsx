import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { store } from '../../store';

const Root: React.FC<ReactNode> = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

Root.defaultProps = {
  children: null,
};

Root.propTypes = {
  children: PropTypes.element,
};

export default Root;
