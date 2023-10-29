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
	const [songs, setSongs] = useState<Array<any>>([]);

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

	useEffect(() => {
		const newSongs = data.allS3Object.nodes.map((node: any) => {
			const fullTitle = node.Key.split('/').pop();
			const title = fullTitle.substring(3, fullTitle.length - 4);
			const formattedTitle = title.replace(/-/g, ' ');
			return {
				title: formattedTitle,
				artist: 'Eternity Percussion',
				src: process.env.GATSBY_AWS_URL + node.Key,
			};
		});

		setSongs(newSongs);
	}, [data]);

	useEffect(() => {
		const audioElement = audioElementRefs.current[currentSong];

		if (!audioElement && songs[currentSong]) {
			audioElementRefs.current[currentSong] = new Audio(songs[currentSong].src);
			audioElementRefs.current[currentSong]?.addEventListener(
				'ended',
				switchToNextSong
			);
			audioElementRefs.current[currentSong]?.addEventListener('canplay', () => {
				setIsLoaded(true);
				setDuration(audioElementRefs.current[currentSong]!.duration);
			});
		}

		if (isPlaying) {
			audioElementRefs.current[currentSong]
				?.play()
				.then(() => setIsPlaying(true))
				.catch((error) => console.error(error));
		}

		audioElementRefs.current[currentSong]?.addEventListener(
			'timeupdate',
			() => {
				if (audioElementRefs.current[currentSong]) {
					setCurrentTime(audioElementRefs.current[currentSong]!.currentTime);
				}
			}
		);

		if ('mediaSession' in navigator && songs[currentSong]) {
			navigator.mediaSession.metadata = new MediaMetadata({
				title: songs[currentSong].title,
				artist: songs[currentSong].artist,
				album: 'Eternity Percussion',
				artwork: [
					{
						src: albumCover,
						sizes: '48x48',
						type: 'image/png',
					},
				],
			});

			navigator.mediaSession.setActionHandler('play', function () {
				play();
			});

			navigator.mediaSession.setActionHandler('pause', function () {
				pause();
			});

			navigator.mediaSession.setActionHandler('previoustrack', function () {
				setCurrentTime(0);
				setCurrentSong(currentSong === 0 ? songs.length - 1 : currentSong - 1);
			});

			navigator.mediaSession.setActionHandler('nexttrack', function () {
				setCurrentTime(0);
				setCurrentSong((currentSong + 1) % songs.length);
			});
		}

		return () => {
			if (audioElementRefs.current[currentSong]) {
				audioElementRefs.current[currentSong]?.pause();
			}
		};
	}, [currentSong, isPlaying, songs]);

	const switchToNextSong = () => {
		const nextSongIndex = (currentSong + 1) % songs.length;
		setCurrentSong(nextSongIndex);
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);

		return `${minutes}:${String(seconds).padStart(2, '0')}`;
	};

	const pause = () => {
		setIsPlaying(false);
		audioElementRefs.current[currentSong]?.pause();
	};

	const play = () => {
		setIsPlaying(true);
		audioElementRefs.current[currentSong]
			?.play()
			.catch((error) => console.error(error));
	};

	const loadMusic = () => {
		setIsLoaded(true);
		setCurrentSong(0);
	};

	return (
		<div className={styles.component}>
			{!isLoaded && (
				<button onClick={loadMusic} className={styles.loadingBtn}>
					Open muziekspeler
				</button>
			)}

			{isLoaded && (
				<div className={styles.musicInfo}>
					<div className={styles.albumCover}>
						<img src={albumCover} alt='Album Cover' />
					</div>

					<div className={styles.artistInfo}>
						<h3 className={styles.title}>{songs[currentSong].title}</h3>
						<p className={styles.subTitle}>{songs[currentSong].artist}</p>
					</div>
				</div>
			)}

			{isLoaded && (
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
			)}

			{isLoaded && (
				<>
					<div className={styles.time}>
						<span>{formatTime(currentTime)}</span>
						<span>-{formatTime(duration - currentTime)}</span>
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
				</>
			)}
		</div>
	);
};

export default MusicPlayer;
