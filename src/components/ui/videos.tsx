import * as React from "react";

import YouTubePlayer from "./youtubePlayer";

const Videos: React.FC = () => {
    return (
        <>
            <h3>15 Jaar Eternity & Untold!</h3>
            <YouTubePlayer videoId="dav38cHRAM0" />
            <hr />
            <h3>ETERNITY @ Notting Hill Carnival (UK)</h3>
            <YouTubePlayer videoId="czwOwdNREgU" />
            <YouTubePlayer videoId="6u3690Hc7EI" />
            <YouTubePlayer videoId="incatDwpaqk" />
            <YouTubePlayer videoId="V281m7npf6o" />
            <YouTubePlayer videoId="uVWWOwVlr1k" />
            <YouTubePlayer videoId="0im5wdxXxDM" />
            <YouTubePlayer videoId="czwOwdNREgU" />
        </>
    );
};

export default Videos;
