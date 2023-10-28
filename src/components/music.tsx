import React, { useEffect, useState } from 'react';
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
	const [audioElement] = useState(new Audio(songs[currentSong].src));
	const [currentTime, setCurrentTime] = useState(0);

	const play = () => {
		audioElement.play();
		setIsPlaying(true);
	};

	const pause = () => {
		audioElement.pause();
		setIsPlaying(false);
	};

	const nextSong = () => {
		if (isPlaying) {
			pause();
		}

		const nextSongIndex = (currentSong + 1) % songs.length;
		setCurrentSong(nextSongIndex);
		audioElement.src = songs[nextSongIndex].src;

		play();
	};

	const prevSong = () => {
		if (isPlaying) {
			pause();
		}

		const prevSongIndex = (currentSong - 1 + songs.length) % songs.length;
		setCurrentSong(prevSongIndex);
		audioElement.src = songs[prevSongIndex].src;

		play();
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${String(seconds).padStart(2, '0')}`;
	};

	useEffect(() => {
		audioElement.addEventListener('timeupdate', () => {
			setCurrentTime(audioElement.currentTime);
		});

		audioElement.addEventListener('ended', () => {
			nextSong();
		});

		return () => {
			audioElement.removeEventListener('timeupdate', () => {});
			audioElement.removeEventListener('ended', () => {});
		};
	}, [audioElement]);

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
				<button className={styles.controlButton} onClick={prevSong}>
					<i className='fas fa-step-backward'></i>
				</button>
				{isPlaying ? (
					<button className={styles.controlButton} onClick={pause}>
						<i className='fas fa-pause-circle'></i>
					</button>
				) : (
					<button className={styles.controlButton} onClick={play}>
						<i className='fas fa-play-circle'></i>
					</button>
				)}
				<button className={styles.controlButton} onClick={nextSong}>
					<i className='fas fa-step-forward'></i>
				</button>
			</div>
			<div className={styles.time}>
				<p>
					{formatTime(currentTime)}
					<span> / {formatTime(audioElement.duration)}</span>
				</p>
			</div>
			<div className={styles.timeline}>
				<input
					type='range'
					min={0}
					max={isNaN(audioElement.duration) ? 0 : audioElement.duration}
					value={currentTime}
					onChange={(e) => {
						audioElement.currentTime = Number(e.target.value);
					}}
				/>
			</div>
		</div>
	);
};

export default MusicPlayer;
