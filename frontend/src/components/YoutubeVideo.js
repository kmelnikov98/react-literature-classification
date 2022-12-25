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
        videoId && (<div style={{ marginTop: "1rem" }}>
          <YouTube videoId={videoId} opts={opts}/>
        </div>
    ));
};

export default YoutubeVideo