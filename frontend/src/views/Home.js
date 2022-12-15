import React from "react";
import "../styles/home.css"
import YoutubeVideo from "../components/YoutubeVideo";
import MusicGenre from "../components/MusicGenre";

const Home = () => {
  const videoLinkInputRef = React.useRef(null);
  const [videoId, setVideoId] = React.useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [musicGenre, setMusicGenre] = React.useState("");
  const [isGenreLoading, setLoading] = React.useState("");

  const classifyMusicGenre = async (videoId) => {
    console.log("here")
    let genre = ""
    
    setLoading(true)

    try {
        const response = await fetch(
            `${serverUrl}/api/music/get-music-genre?videoId=${videoId}`);
        
        const responseData = await response.json();
        genre = responseData.genre
    } catch (error) {
        console.log(error)
    }

    setLoading(false)
    return genre
};

  const handleVideoLink = async () => {
    console.log(videoLinkInputRef.current.value)
    let videoUrl = videoLinkInputRef.current.value;

    if(!videoUrl) {
      return
    }

    let videoId = videoUrl.split("v=")[1].split("&")[0]
    //set doesnt mutate immediately so we have to use local variable instead and pass it to API
    setVideoId(videoId)
    let genre = await classifyMusicGenre(videoId) //API call is made after button click
    setMusicGenre(genre)
  };


  return(
  <div>
    <div className="box">
      <input ref={videoLinkInputRef} className="form-control form-control-lg" type="text" placeholder="Enter a youtube music video..."></input>
        <button
            type="button"
            className="btn btn-primary ms-2"
            onClick={handleVideoLink}>
            Search
        </button>
    </div>
    <div className="containerBox">
      <YoutubeVideo videoId={videoId}/>
      <MusicGenre className="musicGenre" musicGenre={musicGenre} isLoading={isGenreLoading}/>
    </div>
  </div>
  )
};

export default Home;
