import React from 'react'
import YouTube from "react-youtube";

const YoutubeVideo = ({ videoId }) => {
    const opts = {
        height: "390",
        width: "640",
        playerVars: {
          autoplay: 1,
        },
    };

    return (
        videoId && (<div>
          <h3> Youtube Video</h3>
          <YouTube videoId={videoId} opts={opts}/>
        </div>
    ));
};

export default YoutubeVideo