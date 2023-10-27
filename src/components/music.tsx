import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';

import samba from '../music/01-Samba.mp3';
import afrosamba from '../music/02-Afro-Samba.mp3';

interface Song {
	title: string;
	artist: string;
	src: string;
}

const songs: Song[] = [
	{
		title: 'Samba',
		artist: 'Eternity Percussion',
		src: samba,
	},
	{
		title: 'Afro-Samba',
		artist: 'Eternity Percussion',
		src: afrosamba,
	},
	// Add more songs to the list
];

const MusicPlayer: React.FC = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSong, setCurrentSong] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [currTime, setCurrTime] = useState({ min: 0, sec: 0 });

	const [play, { pause, sound, duration }] = useSound(songs[currentSong].src);

	const updateCurrentTime = (sound: HTMLAudioElement) => {
		if (sound) {
			const currentTime = sound.currentTime; // Get the current time in seconds
			setSeconds(currentTime);

			const min = Math.floor(currentTime / 60);
			const sec = Math.floor(currentTime % 60);

			setCurrTime({
				min,
				sec,
			});
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			updateCurrentTime(sound);
		}, 1000);

		return () => clearInterval(interval);
	}, [sound]);

	const playingButton = () => {
		if (isPlaying) {
			pause();
			setIsPlaying(false);
		} else {
			play();
			setIsPlaying(true);
		}
	};

	const nextSong = () => {
		setCurrTime({ min: 0, sec: 0 }); // Reset the time display when switching songs
		setCurrentSong((prevSong) => (prevSong + 1) % songs.length);
		if (sound) {
			sound.pause();
		}
	};

	const prevSong = () => {
		setCurrTime({ min: 0, sec: 0 }); // Reset the time display when switching songs
		setCurrentSong((prevSong) => (prevSong - 1 + songs.length) % songs.length);
		if (sound) {
			sound.pause();
		}
	};

	return (
		<div className='component'>
			<h2>Playing Now</h2>
			<img
				className='musicCover'
				src='https://picsum.photos/200/200'
				alt='Album Cover'
			/>
			<div>
				<h3 className='title'>{songs[currentSong].title}</h3>
				<p className='subTitle'>{songs[currentSong].artist}</p>
			</div>
			<div className='controls'>
				<button className='controlButton' onClick={prevSong}>
					<i
						className='fas fa-step-backward'
						style={{ fontSize: '3em', color: '#27AE60' }}
					></i>
				</button>
				<button className='controlButton' onClick={playingButton}>
					<i
						className={`fas ${
							isPlaying ? 'fa-pause-circle' : 'fa-play-circle'
						}`}
						style={{ fontSize: '3em', color: '#27AE60' }}
					></i>
				</button>
				<button className='controlButton' onClick={nextSong}>
					<i
						className='fas fa-step-forward'
						style={{ fontSize: '3em', color: '#27AE60' }}
					></i>
				</button>
			</div>
			<div className='time'>
				<p>
					{currTime.min}:{currTime.sec < 10 ? '0' + currTime.sec : currTime.sec}
				</p>
				{duration !== null && (
					<p>
						{Math.floor(duration / 60)}:
						{duration % 60 < 10 ? '0' + (duration % 60) : duration % 60}
					</p>
				)}
			</div>
			<input
				type='range'
				min='0'
				max={duration || 0}
				defaultValue='0'
				value={seconds}
				className='timeline'
				onChange={(e) => {
					if (sound) {
						sound.currentTime = Number(e.target.value); // Set the audio's current time
					}
				}}
			/>
		</div>
	);
};

export default MusicPlayer;
