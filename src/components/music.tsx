import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

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
	const [isLoaded, setIsLoaded] = useState(false);

	const data = useStaticQuery(graphql`
		query AllImagesInDirectory {
			allS3Object(filter: { Key: { regex: "/^music/[^/]+$/" } }) {
				nodes {
					Key
					localFile {
						publicURL
					}
				}
			}
		}
	`);

	console.log(data);

	const play = () => {
		audioElement.play().then(() => {
			setIsPlaying(true);
		});
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
		setIsLoaded(false);
	};

	const prevSong = () => {
		if (isPlaying) {
			pause();
		}

		const prevSongIndex = (currentSong - 1 + songs.length) % songs.length;
		setCurrentSong(prevSongIndex);
		audioElement.src = songs[prevSongIndex].src;
		setIsLoaded(false);
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${String(seconds).padStart(2, '0')}`;
	};

	useEffect(() => {
		audioElement.addEventListener('canplay', () => {
			if (!isLoaded) {
				setIsLoaded(true);
				setCurrentTime(audioElement.currentTime);
			}
		});

		audioElement.addEventListener('timeupdate', () => {
			if (isLoaded) {
				setCurrentTime(audioElement.currentTime);
			}
		});

		audioElement.addEventListener('ended', () => {
			setIsPlaying(false);

			const nextSongIndex = (currentSong + 1) % songs.length;
			setCurrentSong(nextSongIndex);
			audioElement.src = songs[nextSongIndex].src;
			setIsLoaded(false);

			audioElement.load();
			if (isPlaying) {
				audioElement.play();
				setIsPlaying(true);
			}
		});

		return () => {
			audioElement.removeEventListener('canplay', () => {});
			audioElement.removeEventListener('timeupdate', () => {});
			audioElement.removeEventListener('ended', () => {});
		};
	}, [audioElement, isLoaded, isPlaying]);

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
				<button className={styles.controlButton} onClick={nextSong}>
					<i className='fas fa-step-forward'></i>
				</button>
			</div>

			<div className={styles.time}>
				{isLoaded ? (
					<p>
						{formatTime(currentTime)} / {formatTime(audioElement.duration || 0)}
					</p>
				) : (
					<p>0:00 / 0:00</p>
				)}
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
