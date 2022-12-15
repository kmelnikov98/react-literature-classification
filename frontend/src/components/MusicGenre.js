import React from 'react'
import "../styles/musicGenre.css"
import Spinner from 'react-bootstrap/Spinner';
import Chip from './Chip';

const MusicGenre = ({ musicGenre, isLoading }) => {

  if (isLoading) {
    return (
      <div className='loadingGenreContainer'>  
        <Spinner animation="border" style={{ width: "4rem", height: "4rem" }} />
        <div className="fs-2" style={{ marginTop: "15px" }}> Classifying Music Genre...</div>
      </div>
    )
  }
  return (
    musicGenre && <div className='musicGenreContainer' style={{ fontSize: "55px"}}>  
      <Chip label={musicGenre} />
  </div>
  )
}

export default MusicGenre