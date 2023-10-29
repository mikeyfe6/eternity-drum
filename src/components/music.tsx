import React, { useEffect, useState, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import * as styles from '../styles/modules/music.module.scss';

import albumCover from '../images/logo/ep-logo-small.png';

const MusicPlayer: React.FC = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSong, setCurrentSong] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);
	const [duration, setDuration] = useState(0);

	const audioElementRefs = useRef<Array<HTMLAudioElement | null>>([]);

	const data = useStaticQuery(graphql`
		query AllMusicInDirectory {
			allS3Object(filter: { Key: { regex: "/^music/[^/]+$/" } }) {
				nodes {
					Key
				}
			}
		}
	`);

	const songs = data.allS3Object.nodes.map((node: any) => {
		const fullTitle = node.Key.split('/').pop();
		const title = fullTitle.substring(3, fullTitle.length - 4);
		const formattedTitle = title.replace(/-/g, ' ');
		return {
			title: formattedTitle,
			artist: 'Eternity Percussion',
			src: process.env.GATSBY_AWS_URL + node.Key,
		};
	});

	useEffect(() => {
		const audioElement = audioElementRefs.current[currentSong];

		if (!audioElement) {
			audioElementRefs.current[currentSong] = new Audio(songs[currentSong].src);
			audioElementRefs.current[currentSong]?.addEventListener(
				'ended',
				switchToNextSong
			);
			if (audioElementRefs.current[currentSong]) {
				audioElementRefs.current[currentSong]?.addEventListener(
					'canplay',
					() => {
						setIsLoaded(true);
						setDuration(audioElementRefs.current[currentSong]!.duration);
						if (isMobileDevice()) {
							audioElementRefs.current[currentSong]?.play();
						}
					}
				);
			}
		}

		if (isPlaying) {
			audioElementRefs.current[currentSong]
				?.play()
				.then(() => setIsPlaying(true));
		}

		audioElementRefs.current[currentSong]?.addEventListener(
			'timeupdate',
			() => {
				if (audioElementRefs.current[currentSong]) {
					setCurrentTime(audioElementRefs.current[currentSong]!.currentTime);
				}
			}
		);

		return () => {
			audioElementRefs.current[currentSong]?.pause();
		};
	}, [currentSong, isPlaying]);

	const isMobileDevice = () => {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		);
	};

	const switchToNextSong = () => {
		const nextSongIndex = (currentSong + 1) % songs.length;
		setCurrentSong(nextSongIndex);
	};

	const play = () => {
		setIsPlaying(true);
		audioElementRefs.current[currentSong]?.play().then(() => {
			setIsPlaying(true);
		});
	};

	const pause = () => {
		setIsPlaying(false);
		audioElementRefs.current[currentSong]?.pause();
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${String(seconds).padStart(2, '0')}`;
	};

	return (
		<div className={styles.component}>
			<div className={styles.albumCover}>
				<img src={albumCover} alt='Album Cover' />
			</div>

			<h3 className={styles.title}>{songs[currentSong].title}</h3>
			<p className={styles.subTitle}>{songs[currentSong].artist}</p>

			<div className={styles.controls}>
				<button
					className={styles.controlButton}
					onClick={() => {
						setCurrentTime(0);
						setCurrentSong(
							currentSong === 0 ? songs.length - 1 : currentSong - 1
						);
					}}
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
					onClick={() => {
						setCurrentTime(0);
						setCurrentSong((currentSong + 1) % songs.length);
					}}
				>
					<i className='fas fa-step-forward'></i>
				</button>
			</div>

			<div className={styles.time}>
				{isLoaded ? (
					<>
						<span>{formatTime(currentTime)}</span>
						<span> {formatTime(duration)}</span>
					</>
				) : (
					<>
						<span>0:00</span>
						<span>0:00</span>
					</>
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
							const audioElement = audioElementRefs.current[currentSong];
							if (audioElement) {
								audioElement.currentTime = Number(e.target.value);
							}
						}
					}}
				/>
			</div>
		</div>
	);
};

export default MusicPlayer;
