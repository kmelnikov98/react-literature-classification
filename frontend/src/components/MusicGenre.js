import React from 'react'
import "../styles/musicGenre.css"
import Spinner from 'react-bootstrap/Spinner';
import { useAuth0 } from '@auth0/auth0-react'
import Chip from './Chip';
import { useEffect } from 'react';

const MusicGenre = ({ videoId, isLoading }) => {

  const { user, isAuthenticated } = useAuth0();
  const [musicGenre, setMusicGenre] = React.useState("");
  const [isClassificationInProgress, setClassificationProgress] = React.useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;


  useEffect(() => {
    setMusicGenre("") //reset music genre on re-render
},[videoId]) // <-- here put the parameter to listen - trigger useEffect when optional parameter is changed
// if no optional param specified, then use effect is called on re-render

  const classifyMusicGenre = async (videoId) => {
    let genre = ""
    setClassificationProgress(true)

    try {
        const response = await fetch(
            `${serverUrl}/api/music/get-music-genre?videoId=${videoId}`);
        
        const responseData = await response.json();
        genre = responseData.genre
    } catch (error) {
        console.log(error)
    }
    setClassificationProgress(false)
    return genre
  };



  const handleMusicGenreClassification = async () => {

    if (!videoId || videoId === "") {
      return
    }
  
    let genre = await classifyMusicGenre(videoId)
    setMusicGenre(genre)
  } 

  if (isLoading) {
    return (
      <div className='loadingGenreContainer'>  
        <Spinner animation="border" style={{ width: "4rem", height: "4rem" }} />
        <div className="fs-2" style={{ marginTop: "15px" }}> Getting Music Info...</div>
      </div>
    )
  }
  else if(!musicGenre || musicGenre === "") {
    console.log("hey")
    return(
      <div className='loadingGenreContainer' style={{ fontSize: "100px"}}>  
        <button type="button" className="btn btn-primary lg-2" style={{ fontSize: "27px"}}
          onClick={ handleMusicGenreClassification }> Classify Music Genre</button>
        {isClassificationInProgress && <Spinner animation="grow" style={{ width: "3rem", height: "3rem", marginTop: "1rem" }}  />}
      </div>
    )
  }
  else {
    return (
      <div className='musicGenreContainer' style={{ fontSize: "55px"}}>  
        <Chip label={musicGenre} />
    </div>
    )
  }
}

export default MusicGenre