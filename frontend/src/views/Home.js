import React from "react";
import "../styles/home.css"
import YoutubeVideo from "../components/YoutubeVideo";
import MusicGenre from "../components/MusicGenre";
import InfoBoard from "../components/InfoBoard";
import { useAuth0 } from '@auth0/auth0-react'

const Home = () => {
  const videoLinkInputRef = React.useRef(null);
  const [videoId, setVideoId] = React.useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [isGenreLoading, setLoading] = React.useState("");
  const { user, isAuthenticated } = useAuth0();

  const postMusicLink = async (videoId, videoUrl) => {
    setLoading(true)

    let userId = ""
    if(isAuthenticated) {
      userId = user?.sub
    }

    let videoTitle = await getMusicTitle(videoId)
    console.log(videoTitle)

    const videoInfo = {
      videoId: videoId,
      userId : userId,
      videoUrl: videoUrl,
      videoTitle: videoTitle,
    }
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(videoInfo)
      };

    try {
        await fetch(
            `${serverUrl}/api/music/post-music`, requestOptions);
        
    } catch (error) {
        console.log(error)
    }
    setLoading(false)
};

  const getMusicTitle = async (videoId) => {
    let videoTitle = ""
    try {
      const response = await fetch(
          `${serverUrl}/api/music/get-music-title?videoId=${videoId}`);


      const responseData = await response.json();
      videoTitle = responseData.videoTitle

    } catch (error) {
        console.log(error)
    }

    return videoTitle
  }

  const handleVideoLink = async () => {
    console.log(videoLinkInputRef.current.value)
    let videoUrl = videoLinkInputRef.current.value;

    if(!videoUrl) {
      return
    }

    let videoId = videoUrl.split("v=")[1].split("&")[0]
    //set doesnt mutate immediately so we have to use local variable instead and pass it to API
    setVideoId(videoId)
    await postMusicLink(videoId, videoUrl) //API call is made after button click
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
      <MusicGenre isLoading={isGenreLoading} videoId={videoId}/>
    </div>
    <InfoBoard/>
  </div>
  )
};

export default Home;
