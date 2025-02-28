import * as React from "react";

interface YouTubePlayerProps {
    videoId: string;
    width?: string;
    height?: string;
    additionalParams?: boolean;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
    videoId,
    width = "720",
    height = "405",
    additionalParams = false,
}) => {
    let embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

    if (additionalParams) {
        embedUrl += "?origin=https://eternitydrum.com&color=white&rel=0";
    }

    return (
        <iframe
            className="ep-yt-player"
            width={width}
            height={height}
            src={embedUrl}
            title="Youtube Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            loading="lazy"
            allowFullScreen
        ></iframe>
    );
};

export default YouTubePlayer;
