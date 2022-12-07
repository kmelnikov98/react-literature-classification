import React from "react";
import "../styles/home.css"
import YoutubeVideo from "../components/YoutubeVideo";
import MusicGenre from "../components/MusicGenre";

const Home = () => {
  const videoLinkInputRef = React.useRef(null);
  const [videoUrl, setVideoUrl] = React.useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [musicGenre, setMusicGenre] = React.useState('');

  const getMusicGenre = async ({ videoId }) => {

    const videoInfo = {
      videoId: videoId,
    }

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(videoInfo)
      };
  
    try {
        const response = await fetch(
            `${serverUrl}/api/music/get-music-genre`, requestOptions
        );

        const responseData = await response.json();
        setMusicGenre(responseData.message);
    } catch (error) {
        console.log(error)
    }
};

  let videoId; //undefined initially
  if(videoUrl) {
    videoId = videoUrl.split("v=")[1].split("&")[0];
    setMusicGenre(getMusicGenre(videoId))
  }

  const handleVideoLink = () => {
    setVideoUrl(videoLinkInputRef.current.value);
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
