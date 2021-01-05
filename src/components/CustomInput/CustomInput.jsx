import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const CustomInput = ({
  inputName, placeholder, type, inputValue, onChange, error, onFocus, autoFocus,
}) => (
  <div>
    <TextField
      id={inputName}
      type={type}
      placeholder={placeholder}
      value={inputValue}
      onChange={onChange}
      label={inputName}
      error={!!error}
      onFocus={onFocus}
      autoFocus={autoFocus}
    />
  </div>
);

CustomInput.defaultProps = {
  inputName: '',
  placeholder: '',
  type: 'text',
  inputValue: '',
  onChange: () => {},
  onFocus: () => {},
  error: '',
  autoFocus: false,
};

CustomInput.propTypes = {
  inputName: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  inputValue: PropTypes.string || PropTypes.number,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  error: PropTypes.string,
  autoFocus: PropTypes.bool,
};

export default CustomInput;
