import React from "react";
import "../styles/home.css"
import YoutubeVideo from "../components/YoutubeVideo";
import MusicGenre from "../components/MusicGenre";

const Home = () => {
  const videoLinkInputRef = React.useRef(null);
  const [videoId, setVideoId] = React.useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [musicGenre, setMusicGenre] = React.useState('');

  const getMusicGenre = videoId => async () => {
    try {

        const response = await fetch(
            `${serverUrl}/api/music/get-music-genre?videoId=${videoId}`);
        
        const responseData = await response.json();
        console.log(responseData.genre);

        //setMusicGenre(responseData.musicGenre)
        //setLink(responseData.link)
    } catch (error) {
        console.log(error)
    }
};

  const handleVideoLink = () => {
    console.log(videoLinkInputRef.current.value)
    let videoUrl = videoLinkInputRef.current.value;

    if(!videoUrl) {
      return
    }

    let videoId = videoUrl.split("v=")[1].split("&")[0]
    //set doesnt mutate immediately so we have to use local variable instead and pass it to API
    setVideoId(videoId);
    setMusicGenre(getMusicGenre(videoId))
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
      <MusicGenre className="musicGenre" musicGenre={musicGenre}/>
    </div>
  </div>
  )
};

export default Home;
