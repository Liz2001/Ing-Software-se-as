import PropTypes from "prop-types";
import React from "react";

function Button({ color, text, onClick }) {
  return (
    <div className="d-grid">
      <button
        onClick={onClick}
        className="rounded-0 btn btn-secondary btn-block"
      >
        {text}
      </button>
    </div>
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
