import React, { useEffect, useState } from 'react';
import { Howl } from 'howler';

import * as styles from '../styles/modules/music.module.scss';

import samba from '../music/01-Samba.mp3';
import afrosamba from '../music/02-Afro-Samba.mp3';

type HowlType = typeof Howl;

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
	const [seconds, setSeconds] = useState<number | null>(0);
	const [duration, setDuration] = useState<number | null>(0);

	const soundRef = React.useRef<HowlType | null>(null);

	useEffect(() => {
		const sound = soundRef.current;

		if (sound) {
			if (isPlaying) {
				if (sound.seek() === 0) {
					sound.play();
				} else {
					sound.play();
				}
			} else {
				sound.pause();
			}
		} else {
			const newSound = new Howl({
				src: [songs[currentSong].src],
				onend: () => {
					setIsPlaying(false);
					setSeconds(0); // Reset seconds to 0 when the song ends
				},
				onload: () => {
					if (isPlaying) {
						newSound.play();
					}
					setDuration(newSound.duration());
				},
			});
			soundRef.current = newSound;
		}

		return () => {
			if (sound) {
				sound.stop();
			}
		};
	}, [isPlaying, currentSong]);

	useEffect(() => {
		// Update the time as the song plays
		const sound = soundRef.current;
		if (sound && isPlaying) {
			const updateInterval = setInterval(() => {
				const currentTime = sound.seek() || 0;
				setSeconds(currentTime);
			}, 1000); // Update every 1 second
			return () => clearInterval(updateInterval);
		}
	}, [isPlaying]);

	const prevSong = () => {
		const sound = soundRef.current;
		if (sound) {
			sound.stop();
			updateCurrentTime(sound);
			setSeconds(0);
		}
		const prevSongIndex = (currentSong - 1 + songs.length) % songs.length;
		setCurrentSong(prevSongIndex);

		// Update the duration for the new song
		setDuration(soundRef.current ? soundRef.current.duration() : null);
	};

	const nextSong = () => {
		const sound = soundRef.current;
		if (sound) {
			sound.stop();
			updateCurrentTime(sound);
			setSeconds(0);
		}
		const nextSongIndex = (currentSong + 1) % songs.length;
		setCurrentSong(nextSongIndex);

		// Update the duration for the new song
		setDuration(soundRef.current ? soundRef.current.duration() : null);
	};

	const playingButton = () => {
		const sound = soundRef.current;
		if (sound) {
			if (sound.playing()) {
				sound.pause();
			} else {
				if (sound.seek() === 0) {
					sound.play();
				} else {
					sound.play();
				}
			}
			setIsPlaying(!isPlaying);
		}
	};

	const formatTime = (time: number | null) => {
		if (time === null) {
			return '0:00';
		}
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${String(seconds).padStart(2, '0')}`;
	};

	const updateCurrentTime = (sound: HowlType | null) => {
		if (sound) {
			const currentTime = sound.seek() || 0;
			setSeconds(currentTime);
		}
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
					{formatTime(seconds)}
					{duration !== null && <span> / {formatTime(duration)}</span>}
				</p>
			</div>
			<div className={styles.timeline}>
				<input
					type='range'
					min={0}
					max={duration || 0}
					value={seconds || 0}
					onChange={(e) => {
						if (soundRef.current) {
							const newTime = Number(e.target.value);
							soundRef.current.seek(newTime);
							setSeconds(newTime);
						}
					}}
				/>
			</div>
		</div>
	);
};

export default MusicPlayer;
