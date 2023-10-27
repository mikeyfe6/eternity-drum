import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';

import * as styles from '../styles/modules/music.module.scss';

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
		<div className={styles.component}>
			{/* <h3>Playing Now</h3> */}
			<img
				className={styles.albumCover}
				src='https://picsum.photos/200/200'
				alt='Album Cover'
			/>
			<div>
				<h3 className={styles.title}>{songs[currentSong].title}</h3>
				<p className={styles.subTitle}>{songs[currentSong].artist}</p>
			</div>
			<div className={styles.controls}>
				<button className={styles.controlButton} onClick={prevSong}>
					<i className='fas fa-step-backward'></i>
				</button>
				<button className={styles.controlButton} onClick={playingButton}>
					<i
						className={`fas ${
							isPlaying ? 'fa-pause-circle' : 'fa-play-circle'
						}`}
					></i>
				</button>
				<button className={styles.controlButton} onClick={nextSong}>
					<i className='fas fa-step-forward'></i>
				</button>
			</div>
			<div className={styles.time}>
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
			<div className={styles.timeline}>
				<input
					type='range'
					min={0}
					max={duration ?? 0}
					value={seconds}
					onChange={(e) => {
						if (sound) {
							const newTime = Number(e.target.value);
							sound.currentTime = newTime; // Set the audio's current time directly
							setSeconds(newTime); // Update the local state as well
						}
					}}
				/>
			</div>
		</div>
	);
};

export default MusicPlayer;
