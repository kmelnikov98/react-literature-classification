import React from "react";
import "../styles/home.css"
import YoutubeVideo from "../components/YoutubeVideo";
import MusicGenre from "../components/MusicGenre";

const Home = () => {
  const videoLinkInputRef = React.useRef(null);
  const [videoId, setVideoId] = React.useState("");
  const [videoLink, setLink] = React.useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [musicGenre, setMusicGenre] = React.useState('');

  const getMusicGenre = videoId => async () => {
    try {

        const response = await fetch(
            `${serverUrl}/api/music/get-music-genre?videoId=${videoId}`);
        
        const responseData = await response.json();
        console.log(responseData)
        //setMusicGenre(responseData.musicGenre)
        //setLink(responseData.link)
    } catch (error) {
        console.log(error)
    }
};

  const handleVideoLink = () => {
    let videoUrl = videoLinkInputRef.current.value;

    if(!videoUrl) {
      return
    }

    setVideoId(videoUrl.split("v=")[1].split("&")[0]);
    console.log(videoId)
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
      {/* <a href="https://mdelta.123tokyo.xyz/get.php/5/e7/sewad1OnOC8.mp3?cid=MmEwMTo0Zjg6YzAxMDo5ZmE2OjoxfE5BfERF&h=LPDc3a_4wwiUMpD6-fbl3g&s=1670453678&n=_UICIDEBOY_%20-%20Audubon" download>Click to download</a> */}
    </div>
  </div>
  )
};

export default Home;
