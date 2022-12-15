import React from 'react'
import "../styles/musicGenre.css"
import Spinner from 'react-bootstrap/Spinner';
import Chip from './Chip';

const MusicGenre = ({ musicGenre, isLoading }) => {

  if (isLoading) {
    return (
      <Spinner animation="border" />
    )
  }
  return (
    musicGenre && <div>  
      <Chip label={musicGenre}/>
  </div>
  )
}

export default MusicGenre