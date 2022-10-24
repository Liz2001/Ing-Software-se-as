import React from 'react'

const Video = ({pregunta}) => {
  return (////Francisco aca se muestra lo que es el Video.
    <video controls width="100%">
    <source src={pregunta} type="video/mp4" /> 
    Sorry, your browser doesn't support embedded videos.
    </video>
  )
}

export default Video