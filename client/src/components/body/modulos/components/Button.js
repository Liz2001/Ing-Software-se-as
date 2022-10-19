import PropTypes from 'prop-types'
import React from 'react'

function Button({color, text, onClick}) {
  return (
    <button onClick={onClick} 
    className='btn' style={{backgroundColor : color}}> {text} </button>
  )
}

export default Button

Button.defaultProps = {
    color: 'steelblue'
}

Button.propTypes ={
    text : PropTypes.string,
    color : PropTypes.string,
    onClick : PropTypes.func,
}

/*
  Navbar
  Login
  Registro
  Usuario   
*/