import React, { useEffect, useState, useRef } from 'react';
// import { useStaticQuery, graphql } from 'gatsby';

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
	const audioElementRef = useRef<HTMLAudioElement | null>(null);

	// const data = useStaticQuery(graphql`
	// 	query AllImagesInDirectory {
	// 		allS3Object(filter: { Key: { regex: "/^music/[^/]+$/" } }) {
	// 			nodes {
	// 				Key
	// 				localFile {
	// 					publicURL
	// 				}
	// 			}
	// 		}
	// 	}
	// `);
	// console.log(data);

	useEffect(() => {
		const audioElement = audioElementRef.current;

		if (audioElement) {
			audioElement.pause();
			audioElement.currentTime = 0;
			audioElement.src = songs[currentSong].src;
		} else {
			const newAudioElement = new Audio(songs[currentSong].src);
			newAudioElement.addEventListener('ended', switchToNextSong);
			newAudioElement.addEventListener('loadedmetadata', () => {
				setIsLoaded(true);
				setCurrentTime(newAudioElement.currentTime);
			});
			audioElementRef.current = newAudioElement;
		}

		if (isPlaying) {
			audioElementRef.current?.play().then(() => setIsPlaying(true));
		}

		const timer = setInterval(() => {
			if (isPlaying) {
				setCurrentTime(audioElementRef.current?.currentTime || 0);
			}
		}, 100);

		return () => {
			clearInterval(timer);
		};
	}, [currentSong, isPlaying]);

	const switchToNextSong = () => {
		const nextSongIndex = (currentSong + 1) % songs.length;
		setCurrentSong(nextSongIndex);
	};

	const play = () => {
		setIsPlaying(true);
	};

	const pause = () => {
		setIsPlaying(false);
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
						{formatTime(currentTime)} /{' '}
						{formatTime(audioElementRef.current?.duration ?? 0)}
					</p>
				) : (
					<p>0:00 / 0:00</p>
				)}
			</div>

			<div className={styles.timeline}>
				<input
					type='range'
					min={0}
					max={audioElementRef.current?.duration ?? 0}
					value={currentTime}
					onChange={(e) => {
						if (audioElementRef.current) {
							audioElementRef.current.currentTime = Number(e.target.value);
						}
					}}
				/>
			</div>
		</div>
	);
};

export default MusicPlayer;
