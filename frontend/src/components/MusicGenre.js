import React from 'react'
import "../styles/musicGenre.css"

const MusicGenre = ({ MusicGenre }) => {

  return (
    MusicGenre && <h3 className="musicGenreContainer"> { MusicGenre } </h3>
  )
}

export default MusicGenre