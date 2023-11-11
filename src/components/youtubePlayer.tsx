import React from 'react';

interface YouTubePlayerProps {
	videoId: string;
	width?: string;
	height?: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
	videoId,
	width = '720',
	height = '405',
}) => {
	const embedUrl = `https://www.youtube.com/embed/${videoId}?origin=https://eternitydrum.com&color=white&rel=0`;

	return (
		<iframe
			id='ep-yt-player'
			title='Vanaf nu ook online lessen voor jongeren STVS JOURNAAL 9 april 2020'
			width={width}
			height={height}
			src={embedUrl}
			allowFullScreen
		></iframe>
	);
};

export default YouTubePlayer;
