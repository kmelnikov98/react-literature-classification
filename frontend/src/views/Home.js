import React from "react";
import "../styles/home.css"
import YoutubeVideo from "../components/YoutubeVideo";

const Home = () => {
  const videoLinkInputRef = React.useRef(null);
  const [videoUrl, setVideoUrl] = React.useState("");

  let videoId; //undefined initially
  if(videoUrl) {
    videoId = videoUrl.split("v=")[1].split("&")[0];
  }

  const handleVideoLink = () => {
    setVideoUrl(videoLinkInputRef.current.value);
  };

  return(
  <div>
    <div className="box">
      <input ref={videoLinkInputRef} className="form-control form-control-lg" type="text" placeholder="Enter a music video..."></input>
      <div className="buttonContainer">
        <button
            type="button"
            className="btn btn-primary"
            onClick={handleVideoLink}>
            Search
        </button>
      </div>
    </div>
    <div className="containerBox">
      <YoutubeVideo videoId={videoId}/>
    </div>
  </div>
  )
};

export default Home;
