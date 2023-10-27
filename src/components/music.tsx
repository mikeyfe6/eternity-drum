import React, { useEffect, useState } from 'react';
import { Howl } from 'howler';

import * as styles from '../styles/modules/music.module.scss';

import samba from '../music/01-Samba.mp3';
import afrosamba from '../music/02-Afro-Samba.mp3';

type Howl = typeof Howl;

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
	const [seconds, setSeconds] = useState<number | null>(null);
	const [currTime, setCurrTime] = useState({ min: 0, sec: 0 });

	const [sound, setSound] = useState<Howl | null>(null);
	const soundRef = React.useRef<Howl | null>(null);
	const prevSoundRef = React.useRef<Howl | null>(null); // Add reference for previous sound

	useEffect(() => {
		if (sound) {
			sound.stop();
		}
		const newSound = new Howl({
			src: [songs[currentSong].src],
			onend: () => {
				setIsPlaying(false);
				setCurrTime({ min: 0, sec: 0 });
				setSeconds(0);
			},
		});
		setSound(newSound);
		soundRef.current = newSound;
	}, [currentSong]);

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

	useEffect(() => {
		const interval = setInterval(updateCurrentTime, 1000);

		return () => clearInterval(interval);
	}, [sound]);

	const playingButton = () => {
		if (soundRef.current) {
			if (soundRef.current.playing()) {
				soundRef.current.pause();
			} else {
				soundRef.current.play();
			}
			setIsPlaying(soundRef.current.playing()); // Update isPlaying state based on whether the sound is playing
		}
	};

	const nextSong = () => {
		setCurrTime({ min: 0, sec: 0 });
		setCurrentSong((prevSong) => (prevSong + 1) % songs.length);

		if (soundRef.current) {
			soundRef.current.stop();
			if (isPlaying) {
				// Only play the next song automatically if the current song was playing.
				const newSound = new Howl({
					src: [songs[(currentSong + 1) % songs.length].src],
					onend: () => {
						setIsPlaying(false);
						setCurrTime({ min: 0, sec: 0 });
						setSeconds(0);
					},
					onload: () => {
						if (soundRef.current) {
							soundRef.current.stop();
						}
						newSound.play();
						setIsPlaying(true);
						setSeconds(0);
						setCurrTime({ min: 0, sec: 0 });
					},
				});
				setSound(newSound);
				soundRef.current = newSound;
				prevSoundRef.current = newSound;
			} else {
				setIsPlaying(false); // Update isPlaying state
			}
		}
	};

	const prevSong = () => {
		setCurrTime({ min: 0, sec: 0 });
		setCurrentSong((prevSong) => (prevSong - 1 + songs.length) % songs.length);

		if (soundRef.current) {
			soundRef.current.stop();
			if (isPlaying) {
				// Only play the previous song automatically if the current song was playing.
				const newSound = new Howl({
					src: [songs[(currentSong - 1 + songs.length) % songs.length].src],
					onend: () => {
						setIsPlaying(false);
						setCurrTime({ min: 0, sec: 0 });
						setSeconds(0);
					},
					onload: () => {
						if (soundRef.current) {
							soundRef.current.stop();
						}
						newSound.play();
						setIsPlaying(true);
						setSeconds(0);
						setCurrTime({ min: 0, sec: 0 });
					},
				});
				setSound(newSound);
				soundRef.current = newSound;
				prevSoundRef.current = newSound;
			} else {
				setIsPlaying(false); // Update isPlaying state
			}
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
					value={seconds || 0}
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
