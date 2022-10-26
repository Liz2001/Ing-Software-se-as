import PropTypes from "prop-types";
import React from "react";

function Button({ color, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="btn d-grid col-6 mx-auto"
      style={{ backgroundColor: color }}
    >
      {text}
    </button>
  );
}

export default Button;

Button.defaultProps = {
  color: "steelblue",
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
};

/*
  Navbar
  Login
  Registro
  Usuario   
*/
