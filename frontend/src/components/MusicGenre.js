import React from 'react'
import "../styles/musicGenre.css"
import Dropdown from 'react-bootstrap/Dropdown'; //react-bootstrap is what we have installed in terms of components
import Chip from './Chip';

const MusicGenre = ({ musicGenre }) => {
  return (
    musicGenre && <div>  
      <Chip label={musicGenre}/>
  </div>
  )
}

export default MusicGenre