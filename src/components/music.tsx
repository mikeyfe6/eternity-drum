import React, { useEffect, useState } from 'react';
import { Howl } from 'howler';
import { useStaticQuery, graphql } from 'gatsby';

import * as styles from '../styles/modules/music.module.scss';

import samba from '../music/01-Samba.mp3';
import afrosamba from '../music/02-Afro-Samba.mp3';

type HowlType = typeof Howl;

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
];

const MusicPlayer: React.FC = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSong, setCurrentSong] = useState(0);
	const [seconds, setSeconds] = useState<number | null>(null);
	const [currTime, setCurrTime] = useState({ min: 0, sec: 0 });
	const [playingSong, setPlayingSong] = useState<number | null>(null);

	const [sound, setSound] = useState<HowlType | null>(null);
	const soundRef = React.useRef<HowlType | null>(null);

	useEffect(() => {
		if (sound) {
			if (isPlaying) {
				sound.play();
			} else {
				sound.pause();
			}
		} else {
			const newSound = new Howl({
				src: [songs[currentSong].src],
				onend: () => {
					setIsPlaying(false);
				},
				onload: () => {
					if (isPlaying) {
						newSound.play();
					}
					updateCurrentTime();
					setPlayingSong(currentSong);
				},
			});
			setSound(newSound);
			soundRef.current = newSound;
		}

		return () => {
			if (sound) {
				sound.stop();
			}
		};
	}, [isPlaying, currentSong]);

	useEffect(() => {
		if (isPlaying) {
			const interval = setInterval(updateCurrentTime, 100);

			return () => {
				if (interval) {
					clearInterval(interval);
				}
			};
		}
	}, [sound, isPlaying]);

	const updateCurrentTime = () => {
		if (soundRef.current) {
			const currentTime = soundRef.current.seek() || 0;
			setSeconds(currentTime);

			const min = Math.floor(currentTime / 60);
			const sec = Math.floor(currentTime % 60);

			setCurrTime({
				min,
				sec,
			});
		}
	};

	const prevSong = () => {
		if (isPlaying) {
			soundRef.current?.stop();
			setIsPlaying(false);
		} else {
			setPlayingSong(null);
		}

		const prevSongIndex = (currentSong - 1 + songs.length) % songs.length;
		const newSound = new Howl({
			src: [songs[prevSongIndex].src],
			onend: () => {
				setIsPlaying(false);
			},
		});
		setSound(newSound);
		soundRef.current = newSound;
		setCurrentSong(prevSongIndex);
	};

	const nextSong = () => {
		if (isPlaying) {
			soundRef.current?.stop();
			setIsPlaying(false);
		} else {
			setPlayingSong(null);
		}

		const nextSongIndex = (currentSong + 1) % songs.length;
		const newSound = new Howl({
			src: [songs[nextSongIndex].src],
			onend: () => {
				setIsPlaying(false);
			},
		});
		setSound(newSound);
		soundRef.current = newSound;
		setCurrentSong(nextSongIndex);
	};

	const playingButton = () => {
		if (soundRef.current) {
			if (soundRef.current.playing()) {
				soundRef.current.pause();
				setIsPlaying(false);
			} else if (playingSong !== currentSong) {
				soundRef.current.stop();
				soundRef.current.play();
				setIsPlaying(true);
				setPlayingSong(currentSong);
			}
		}
	};

	console.log('currTime', currTime, 'seconds', seconds);
	console.log('isPlaying', isPlaying);
	console.log('currentSong', currentSong);
	console.log('sound', sound);
	console.log('playingSong', playingSong);

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
					{currTime.min}:{currTime.sec < 10 ? '0' + currTime.sec : currTime.sec}
				</p>
				{sound && seconds !== null && (
					<p>
						{Math.floor((sound.duration() - seconds) / 60)}:
						{(Math.floor(sound.duration() - seconds) % 60)
							.toString()
							.padStart(2, '0')}
					</p>
				)}
			</div>
			<div className={styles.timeline}>
				<input
					type='range'
					min={0}
					max={sound?.duration() || 0}
					value={seconds ?? 0}
					onChange={(e) => {
						if (sound) {
							const newTime = Number(e.target.value);
							sound.seek(newTime);
							setSeconds(newTime);
						}
					}}
				/>
			</div>
		</div>
	);
};

export default MusicPlayer;
