import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

function CustomButton({ buttonText, onClick, buttonType }) {
  return (
    <Button
      color="primary"
      variant="contained"
      type={buttonType === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
}

CustomButton.defaultProps = {
  buttonText: 'Button',
  onClick: () => {},
  buttonType: 'button',
};

CustomButton.propTypes = {
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  buttonType: PropTypes.string,
};

export default CustomButton;
