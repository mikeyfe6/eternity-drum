import React, { useEffect, useState, useRef } from 'react';
import * as styles from '../styles/modules/music.module.scss';

import samba from '../music/01-Samba.mp3';
import afrosamba from '../music/02-Afro-Samba.mp3';

const songs = [
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
];

const MusicPlayer: React.FC = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSong, setCurrentSong] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);
	const [duration, setDuration] = useState(0);

	const audioElementRefs = useRef<HTMLAudioElement[]>([]);

	useEffect(() => {
		const audioElement = audioElementRefs.current[currentSong];

		if (!audioElement) {
			audioElementRefs.current[currentSong] = new Audio(songs[currentSong].src);
			audioElementRefs.current[currentSong].addEventListener(
				'ended',
				switchToNextSong
			);
			audioElementRefs.current[currentSong].addEventListener('canplay', () => {
				setIsLoaded(true);
				setDuration(audioElementRefs.current[currentSong].duration);
			});
		}

		if (isPlaying) {
			audioElementRefs.current[currentSong]
				?.play()
				.then(() => setIsPlaying(true));
		}

		audioElementRefs.current[currentSong].addEventListener('timeupdate', () => {
			setCurrentTime(audioElementRefs.current[currentSong].currentTime);
		});

		return () => {
			audioElementRefs.current[currentSong].pause();
		};
	}, [currentSong, isPlaying]);

	const switchToNextSong = () => {
		const nextSongIndex = (currentSong + 1) % songs.length;
		setCurrentSong(nextSongIndex);
	};

	const play = () => {
		setIsPlaying(true);
		audioElementRefs.current[currentSong].play().then(() => {
			setIsPlaying(true);
		});
	};

	const pause = () => {
		setIsPlaying(false);
		audioElementRefs.current[currentSong].pause();
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${String(seconds).padStart(2, '0')}`;
	};

	return (
		<div className={styles.component}>
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
				<button
					className={styles.controlButton}
					onClick={() =>
						setCurrentSong(
							currentSong === 0 ? songs.length - 1 : currentSong - 1
						)
					}
				>
					<i className='fas fa-step-backward'></i>
				</button>
				<button
					className={styles.controlButton}
					onClick={isPlaying ? pause : play}
				>
					<i
						className={`fas ${
							isPlaying ? 'fa-pause-circle' : 'fa-play-circle'
						}`}
					></i>
				</button>
				<button
					className={styles.controlButton}
					onClick={() => setCurrentSong((currentSong + 1) % songs.length)}
				>
					<i className='fas fa-step-forward'></i>
				</button>
			</div>

			<div className={styles.time}>
				{isLoaded ? (
					<p>
						{formatTime(currentTime)} / {formatTime(duration)}
					</p>
				) : (
					<p>Loading...</p>
				)}
			</div>

			<div className={styles.timeline}>
				<input
					type='range'
					min={0}
					max={duration}
					value={currentTime}
					onChange={(e) => {
						if (audioElementRefs.current[currentSong]) {
							audioElementRefs.current[currentSong].currentTime = Number(
								e.target.value
							);
						}
					}}
				/>
			</div>
		</div>
	);
};

export default MusicPlayer;
