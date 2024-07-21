import React, { useEffect, useState, useRef } from 'react';

import * as styles from '../styles/modules/audio.module.scss';

import albumCover from '../images/logo/ep-logo-small.png';

import { fetchS3Files } from '../utils/aws-init';

const MusicPlayer: React.FC = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSong, setCurrentSong] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(100);
	const [songs, setSongs] = useState<Array<any>>([]);

	const audioElementRefs = useRef<Array<HTMLAudioElement | null>>([]);

	useEffect(() => {
		const fetchSongs = async () => {
			const bucketName = process.env.GATSBY_AWS_EP_BUCKET_NAME ?? '';
			const fetchedSongs = await fetchS3Files(bucketName, 'music/');
			setSongs(fetchedSongs);
		};
		fetchSongs();
	}, []);

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

		if (audioElementRefs.current[currentSong]) {
			const audioElement = audioElementRefs.current[currentSong];
			if (audioElement) {
				audioElement.volume = volume / 100;
			}
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

			navigator.mediaSession.setActionHandler('play', () => {
				play();
			});

			navigator.mediaSession.setActionHandler('pause', () => {
				pause();
			});

			navigator.mediaSession.setActionHandler('previoustrack', () => {
				setCurrentSong(currentSong === 0 ? songs.length - 1 : currentSong - 1);
				setCurrentTime(0);
			});

			navigator.mediaSession.setActionHandler('nexttrack', () => {
				setCurrentSong((currentSong + 1) % songs.length);
				setCurrentTime(0);
			});
		}

		return () => {
			if (audioElementRefs.current[currentSong]) {
				audioElementRefs.current[currentSong]?.pause();
			}
		};
	}, [currentSong, isPlaying, songs, volume]);

	const switchToNextSong = () => {
		const nextSongIndex = (currentSong + 1) % songs.length;
		setCurrentSong(nextSongIndex);
		if (audioElementRefs.current[nextSongIndex]) {
			audioElementRefs.current[nextSongIndex].currentTime = 0;
		}
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

		const audioElement = audioElementRefs.current[currentSong];
		if (audioElement) {
			setDuration(audioElement.duration);
		}
	};

	useEffect(() => {
		const audioElement = audioElementRefs.current[currentSong];
		if (audioElement) {
			setDuration(audioElement.duration);
		}
	}, [currentSong]);

	return (
		<div className={styles.component}>
			{!isLoaded && (
				<button onClick={loadMusic} className={styles.loadingBtn}>
					<i className='fa-solid fa-power-off' />
				</button>
			)}

			{isLoaded && (
				<div className={styles.musicInfo}>
					<div className={styles.albumCover}>
						<img src={albumCover} alt='Album Cover' />
					</div>

					<div className={styles.artistInfo}>
						<h3 className={styles.title}>{songs[currentSong]?.title}</h3>
						<p className={styles.subTitle}>{songs[currentSong]?.artist}</p>
					</div>
				</div>
			)}

			{isLoaded && (
				<div className={styles.controls}>
					<button
						className={`${styles.controlButton} fas fa-step-backward`}
						onClick={() => {
							if (
								audioElementRefs.current[currentSong] &&
								audioElementRefs.current[currentSong].currentTime > 10
							) {
								audioElementRefs.current[currentSong].currentTime = 0;
							} else {
								const prevSongIndex =
									currentSong === 0 ? songs.length - 1 : currentSong - 1;

								setCurrentSong(prevSongIndex);

								if (audioElementRefs.current[prevSongIndex]) {
									audioElementRefs.current[prevSongIndex].currentTime = 0;
								}
							}
						}}
					/>
					<button
						className={`${styles.controlButton} fas ${
							isPlaying ? 'fa-pause-circle' : 'fa-play-circle'
						}`}
						onClick={isPlaying ? pause : play}
					/>
					<button
						className={`${styles.controlButton} fas fa-step-forward`}
						onClick={() => {
							const nextSongIndex = (currentSong + 1) % songs.length;
							setCurrentSong(nextSongIndex);
							if (audioElementRefs.current[nextSongIndex]) {
								audioElementRefs.current[nextSongIndex].currentTime = 0;
							}
						}}
					/>

					<div className={styles.controlVolume}>
						{volume === 0 && (
							<button
								className='fa-solid fa-volume-mute'
								onClick={() => setVolume(100)}
							/>
						)}
						{volume >= 1 && volume <= 49 && (
							<button
								className='fa-solid fa-volume-low'
								onClick={() => setVolume(100)}
							/>
						)}
						{volume >= 50 && volume <= 100 && (
							<button
								className='fa-solid fa-volume-high'
								onClick={() => setVolume(0)}
							/>
						)}
						<span>{volume}</span>
						<input
							type='range'
							min={0}
							max={100}
							value={volume}
							onChange={(event) => setVolume(parseInt(event.target.value, 10))}
						/>
					</div>
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

			{isLoaded &&
				songs.map((song, index) => (
					<audio
						key={index}
						ref={(el) => (audioElementRefs.current[index] = el)}
						src={song.src}>
						<track kind='captions' />
					</audio>
				))}
		</div>
	);
};

export default MusicPlayer;
